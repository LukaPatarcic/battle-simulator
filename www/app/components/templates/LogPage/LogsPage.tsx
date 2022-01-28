import { Battle, Log } from '@type/api';
import { FC } from 'react';
import GameTable from '@module/Game/GameTable';
import { Col, Container, Row } from 'react-bootstrap';

interface Props {
  logs: Log[];
  battle: Battle;
}

const LogsPage: FC<Props> = ({ logs, battle }) => (
	<Container className="mt-3">
		<Row>
			<Col xs={12}>
				<h1>
					Game Logs for
					{battle.title}
				</h1>
			</Col>
			<Col xs={12}>
				<GameTable logs={logs} />
			</Col>
		</Row>
	</Container>
);

export default LogsPage;
