import type { NextPage } from 'next';
import Default from '@layout/Default/Default';
import CreateBattlePage from '@template/BattlePage/CreateBattlePage';
import { GetServerSideProps } from 'next';
import { getBattles } from '@api/battles';
import { Battle } from '@type/api';
import CreateArmyPage from '@template/ArmyPage/CreateArmyPage';

interface Props {
  battles: Battle[];
}
const CreateArmies: NextPage<Props> = ({ battles }) => {
  return (
    <Default>
      <CreateArmyPage battles={battles} />
    </Default>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const battles = await getBattles();
  return { props: { battles } };
};

export default CreateArmies;
