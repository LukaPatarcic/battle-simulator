import type {GetServerSideProps, NextPage} from 'next'
import HomePage from "@template/HomePage/HomePage";
import {getBattles} from "../app/api/battles";
import {Battle} from "../app/types/api";
import Default from "@layout/Default/Default";

interface Props {
  battles: Battle[]
}

const Home: NextPage<Props> = ({ battles }) => {
  return <Default>
    <HomePage rows={battles } />
  </Default>
}

export const getServerSideProps: GetServerSideProps = async () => {
  const battles = await getBattles();
  return { props: { battles } }
}

export default Home
