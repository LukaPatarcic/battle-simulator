import type { NextPage } from 'next';
import Default from '@layout/Default/Default';
import { GetServerSideProps } from 'next';
import { getBattles } from '@api/battles';
import { Battle } from '@type/api';
import CreateArmyPage from '@template/ArmyPage/CreateArmyPage';
import { useEffect, useState } from 'react';
import { Message } from '@type/index';
import useForm from '@hook/useForm';
import { createArmy } from '@api/armies';
import { LOGIN_ROUTE } from '@constant/routes';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getAuthToken } from '@api/auth';

interface Props {
	battles: Battle[];
}
const CreateArmies: NextPage<Props> = ({ battles }) => {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<Message>({
		message: '',
		type: 'success',
	});
	const router = useRouter();
	const session = useSession();
	console.log(session);
	const { getFieldProps, getFormProps, errors } = useForm({
		fields: {
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
		},
		onSubmit: async (context: {
			values: {
				name: string;
				units: string;
				attackStrategy: string;
				battleId: string;
			};
			isFormValid: boolean;
		}) => {
			if (context.isFormValid) {
				const { name, units, attackStrategy, battleId } = context?.values || {};

				setLoading(true);
				createArmy(
					{
						name,
						units: parseInt(units, 10),
						attackStrategy,
						battleId: parseInt(battleId, 10),
					},
					session.data.accessToken as string,
				)
					.then(() => {
						setMessage({
							message: 'Successfully created an army',
							type: 'success',
						});
					})
					.catch(() => {
						setMessage({
							message: 'Something went wrong while creating your army',
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
			<CreateArmyPage
				battles={battles}
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
	const accessToken = await getAuthToken(ctx);
	const [battles, session] = await Promise.all([
		getBattles(accessToken),
		getSession(ctx),
	]);
	return { props: { battles, session } };
};

export default CreateArmies;
