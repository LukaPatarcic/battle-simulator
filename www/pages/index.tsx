import type { NextPage } from 'next';
import HomePage from '@template/HomePage/HomePage';
import Default from '@layout/Default/Default';

const Home: NextPage = () => {
	return (
		<Default>
			<HomePage />
		</Default>
	);
};

export default Home;
