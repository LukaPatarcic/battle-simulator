import type {GetServerSideProps, NextPage} from 'next'
import HomePage from "@template/HomePage/HomePage";
import {Battle} from "../../app/types/api";
import Default from "@layout/Default/Default";
import {getBattleById} from "../../app/api/battles";
import BattlePage from "@template/BattlePage/BattlePage";

interface Props {
    battle: Battle
}

const Home: NextPage<Props> = ({ battle }) => {
    return <Default>
        <BattlePage battle={battle} />
    </Default>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const id = Number(ctx.query.id);
    const battle = await getBattleById(id);
    return { props: { battle } }
}

export default Home
