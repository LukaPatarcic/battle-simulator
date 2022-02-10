import type { NextPage } from 'next';
import Default from '@layout/Default/Default';
import CreateBattlePage from '@template/BattlePage/CreateBattlePage';
import { useEffect, useState } from 'react';
import { Message } from '@type/index';
import useForm from '@hook/useForm';
import { createBattle, getBattleById } from '@api/battles';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { LOGIN_ROUTE } from '@constant/routes';
import { useRouter } from 'next/router';

const CreateBattles: NextPage = () => {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<Message>({
		message: '',
		type: 'success',
	});
	const session = useSession();
	const router = useRouter();
	const { getFieldProps, getFormProps, errors } = useForm({
		fields: {
			title: {
				isRequired: 'Please enter a title',
				isMaxLength: {
					message: 'Max length is 100 characters',
					length: 100,
				},
			},
		},
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
							message: 'Successfully created a battle',
							type: 'success',
						});
					})
					.catch(() => {
						setMessage({
							message: 'Something went wrong while creating your battle',
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

	useEffect(() => {
		if (session.status != 'authenticated') {
			router.push(LOGIN_ROUTE);
		}
	}, []);

	if (session.status != 'authenticated') {
		return null;
	}

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);
	return { props: { session } };
};

export default CreateBattles;
