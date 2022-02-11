import type { NextPage } from 'next';
import Default from '@layout/Default/Default';
import CreateBattlePage from '@template/BattlePage/CreateBattlePage';
import { useState } from 'react';
import { Message } from '@type/index';
import useForm from '@hook/useForm';
import { createBattle } from '@api/battles';
import { useSession } from 'next-auth/react';
import { battleFields } from '@validation/battles';
import {
	SOMETHING_WENT_WRONG_WHILE_CREATING_YOUR_BATTLE,
	SUCCESSFULLY_CREATED_A_BATTLE,
} from '@constant/messages';

const CreateBattles: NextPage = () => {
	const session = useSession();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<Message>({
		message: '',
		type: 'success',
	});
	const { getFieldProps, getFormProps, errors } = useForm({
		fields: battleFields,
		onSubmit: async (context: {
			values: { title: string };
			isFormValid: boolean;
		}) => {
			if (context.isFormValid) {
				const { title } = context?.values || {};

				setLoading(true);
				createBattle({ title }, session.data.accessToken as string)
					.then(() => {
						setMessage({
							message: SUCCESSFULLY_CREATED_A_BATTLE,
							type: 'success',
						});
					})
					.catch(() => {
						setMessage({
							message: SOMETHING_WENT_WRONG_WHILE_CREATING_YOUR_BATTLE,
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
			<CreateBattlePage
				loading={loading}
				message={message}
				getFieldProps={getFieldProps}
				getFormProps={getFormProps}
				errors={errors}
			/>
		</Default>
	);
};

export default CreateBattles;
