export const armyFields = {
	name: {
		isRequired: 'Please enter a title',
		isMaxLength: {
			message: 'Max length is 100 characters',
			length: 100,
		},
	},
	units: {
		isRequired: 'Please enter number of units',
		isNumber: 'Please enter a number',
		isGreaterThan: {
			message: 'Please enter a value greater than or equal to 80',
			value: 79,
		},
		isLessThan: {
			message: 'Please enter a value less than or equal to 100',
			value: 101,
		},
	},
	attackStrategy: {
		isRequired: 'Please select an attack strategy',
	},
	battleId: {
		isRequired: 'Please select a battle',
	},
};
