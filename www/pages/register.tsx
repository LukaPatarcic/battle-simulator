import { signUp } from '@api/auth';
import Default from '@layout/Default/Default';
import { useState } from 'react';
import { Message } from '@type/index';
import useForm from '@hook/useForm';
import RegisterPage from '@template/AuthPage/RegisterPage';
import { LOGIN_ROUTE } from '@constant/routes';
import { useRouter } from 'next/router';
import {
	SOMETHING_WENT_WRONG_WHILE_CREATING_YOUR_ACCOUNT,
	SUCCESSFULLY_REGISTERED_YOUR_ACCOUNT,
} from '@constant/messages';
import { registerFields } from '@validation/auth';

const Register = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<Message>({
		message: '',
		type: 'success',
	});
	const { getFieldProps, getFormProps, errors } = useForm({
		fields: registerFields,
		onSubmit: async (context: {
			values: { title: string };
			isFormValid: boolean;
		}) => {
			if (context.isFormValid) {
				const credentials = context?.values || {};
				setLoading(true);
				signUp(credentials)
					.then(() => {
						setMessage({
							message: SUCCESSFULLY_REGISTERED_YOUR_ACCOUNT,
							type: 'success',
						});
						setTimeout(() => router.push(LOGIN_ROUTE), 2000);
					})
					.catch((err) => {
						console.log(err);
						setMessage({
							message:
								typeof err.message === 'string'
									? err.message
									: err?.message?.[0] ||
									  SOMETHING_WENT_WRONG_WHILE_CREATING_YOUR_ACCOUNT,
							type: 'danger',
						});
					})
					.finally(() => {
						setLoading(false);
					});
			}
		},
		showErrors: 'blur',
	});

	return (
		<Default>
			<RegisterPage
				errors={errors}
				message={message}
				loading={loading}
				getFieldProps={getFieldProps}
				getFormProps={getFormProps}
			/>
		</Default>
	);
};

export default Register;
