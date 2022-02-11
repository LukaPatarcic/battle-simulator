import type { NextPage } from 'next';
import Default from '@layout/Default/Default';
import { GetServerSideProps } from 'next';
import { getBattles } from '@api/battles';
import { Battle } from '@type/api';
import CreateArmyPage from '@template/ArmyPage/CreateArmyPage';
import { useState } from 'react';
import { Message } from '@type/index';
import useForm from '@hook/useForm';
import { createArmy } from '@api/armies';
import { useSession } from 'next-auth/react';
import { getAuthToken } from '@api/auth';
import { armyFields } from '@validation/armies';
import {
	SOMETHING_WENT_WRONG_WHILE_CREATING_YOUR_ARMY,
	SUCCESSFULLY_CREATED_AN_ARMY,
} from '@constant/messages';

interface Props {
	battles: Battle[];
}
const CreateArmies: NextPage<Props> = ({ battles }) => {
	const session = useSession();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<Message>({
		message: '',
		type: 'success',
	});

	const { getFieldProps, getFormProps, errors } = useForm({
		fields: armyFields,
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
							message: SUCCESSFULLY_CREATED_AN_ARMY,
							type: 'success',
						});
					})
					.catch(() => {
						setMessage({
							message: SOMETHING_WENT_WRONG_WHILE_CREATING_YOUR_ARMY,
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
	const battles = await getBattles(accessToken);
	return { props: { battles } };
};

export default CreateArmies;
