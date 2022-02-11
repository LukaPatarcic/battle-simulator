import type { GetServerSideProps, NextPage } from 'next';
import Default from '@layout/Default/Default';
import BattlesPage from '@template/BattlePage/BattlesPage';
import { getBattles } from '@api/battles';
import { Battle } from '@type/api';
import { LOGIN_ROUTE } from '@constant/routes';
import { getAuthToken } from '@api/auth';

interface Props {
	battles: Battle[];
}

const Battles: NextPage<Props> = ({ battles }) => {
	return (
		<Default>
			<BattlesPage rows={battles} />
		</Default>
	);
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
	try {
		const accessToken = await getAuthToken(ctx);
		const battles = await getBattles(accessToken);
		return { props: { battles } };
	} catch (err) {
		return { props: {}, redirect: LOGIN_ROUTE };
	}
};

export default Battles;
