import type { GetServerSideProps, NextPage } from 'next';
import Default from '@layout/Default/Default';
import BattlesPage from '@template/BattlePage/BattlesPage';
import { getBattles } from '@api/battles';
import { Battle } from '@type/api';

interface Props {
  battles: Battle[];
}

const Battles: NextPage<Props> = ({ battles }) => (
	<Default>
		<BattlesPage rows={battles} />
	</Default>
);

export const getServerSideProps: GetServerSideProps = async () => {
	const battles = await getBattles();
	return { props: { battles } };
};

export default Battles;
