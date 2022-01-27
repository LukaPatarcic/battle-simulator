import type { GetServerSideProps, NextPage } from 'next';
import { Battle, Log } from '@type/api';
import Default from '@layout/Default/Default';
import { getBattleById } from '@api/battles';
import { getLogs } from '@api/logs';
import LogsPage from '@template/LogPage/LogsPage';

interface Props {
  logs: Log[];
  battle: Battle;
}

const Home: NextPage<Props> = ({ logs, battle }) => {
  return (
    <Default>
      <LogsPage logs={logs} battle={battle} />
    </Default>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = Number(ctx.query.id);
  const logs = await getLogs(id);
  const battle = await getBattleById(id);
  return { props: { logs, battle } };
};

export default Home;
