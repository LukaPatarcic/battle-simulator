import * as validators from 'calidators';
import { useReducer, useMemo, createContext, useEffect } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

function validateField(fieldValue = '', fieldConfig) {
	const specialProps = ['initialValue'];
	for (const validatorName in fieldConfig) {
		if (!specialProps.includes(validatorName)) {
			let validatorConfig = fieldConfig[validatorName];
			if (typeof validatorConfig === 'string') {
				validatorConfig = { message: validatorConfig };
			}
			const configuredValidator = validators[validatorName](validatorConfig);
			const errorMessage = configuredValidator(fieldValue);

			if (errorMessage) {
				return errorMessage;
			}
		}
	}
	return null;
}

function validateFields(fieldValues, fieldConfigs) {
	const errors = {};

	for (const fieldName in fieldConfigs) {
		const fieldConfig = fieldConfigs[fieldName];
		const fieldValue = fieldValues[fieldName];
		errors[fieldName] = validateField(fieldValue, fieldConfig);
	}
	return errors;
}

function getInitialState(config) {
	let conf = config;
	if (typeof config === 'function') {
		conf = config({});
	}
	const initialValues = {};
	const initialBlurred = {};
	for (const fieldName in conf.fields) {
		if (conf.fields[fieldName]) {
			initialValues[fieldName] = conf.fields[fieldName].initialValue || '';
			initialBlurred[fieldName] = false;
		}
	}
	const initialErrors = validateFields(initialValues, conf.fields);
	return {
		values: initialValues,
		errors: initialErrors,
		blurred: initialBlurred,
		submitted: false,
	};
}

function validationReducer(state, action) {
	const blurred = {
		...state.blurred,
		[action.payload]: true,
	};
	const values = { ...state.values, ...action.payload };
	switch (action.type) {
		case 'change':
			return {
				...state,
				values,
			};
		case 'submit':
			return { ...state, submitted: true };
		case 'validate':
			return { ...state, errors: action.payload };
		case 'blur':
			return { ...state, blurred };
		default:
			throw new Error('Unknown action type');
	}
}

function getErrors(state, config) {
	if (config.showErrors === 'always') {
		return state.errors;
	}
	if (state.submitted) {
		return state.errors;
	}
	if (config.showErrors === 'blur') {
		return Object.entries(state.blurred)
			.filter(([, blurred]) => blurred)
			.reduce((acc, [name]) => ({ ...acc, [name]: state.errors[name] }), {});
	}
	return state.submitted ? state.errors : {};
}

export const ValidationContext = createContext({});

export function ValidationProvider({ config, children }) {
	const context = useValidation(config);
	const memoizedContext = useMemo(() => context, [context]);
	return (
		<ValidationContext.Provider value={memoizedContext}>
			{children}
		</ValidationContext.Provider>
	);
}

const useValidation = (config) => {
	let conf = config;
	const [state, dispatch] = useReducer(
		validationReducer,
		getInitialState(conf),
	);

	if (typeof conf === 'function') {
		conf = conf(state.values);
	}

	useEffect(() => {
		const { defaultValues } = conf || {};
		if (typeof defaultValues === 'function') {
			defaultValues().then((payload) => {
				dispatch({
					type: 'change',
					payload,
				});
			});
		}
	}, []);

	useDeepCompareEffect(() => {
		const errors = validateFields(state.values, config.fields);
		dispatch({ type: 'validate', payload: errors });
	}, [state.values, config.fields]);

	const errors = useMemo(() => getErrors(state, config), [state, config]);

	const isFormValid = useMemo(
		() => Object.values(errors).every((error) => error === null),
		[errors],
	);

	return {
		errors,
		submitted: state.submitted,
		isFormValid,
		getFormProps: () => ({
			onSubmit: (e) => {
				e.preventDefault();
				const errors = validateFields(state.values, config.fields);

				const isFormValid = Object.values(errors).every(
					(error) => error === null,
				);
				dispatch({ type: 'submit' });
				dispatch({ type: 'validate', payload: errors });
				if (config.onSubmit) {
					config.onSubmit({ ...state, isFormValid });
				}
			},
		}),
		getFieldProps: (fieldName, overrides: any = {}) => ({
			onChange: (e) => {
				const value =
					typeof e?.target?.value === 'undefined' ? e : e?.target?.value;
				if (!config.fields[fieldName]) {
					return;
				}
				dispatch({
					type: 'change',
					payload: { [fieldName]: value },
				});
				if (overrides.onChange) {
					overrides.onChange(e);
				}
			},
			onBlur: (e) => {
				dispatch({ type: 'blur', payload: fieldName });
				if (overrides.onBlur) {
					overrides.onBlur(e);
				}
			},
			name: overrides.name || fieldName,
			value: state.values[fieldName] || '',
		}),
	};
};

export default useValidation;
