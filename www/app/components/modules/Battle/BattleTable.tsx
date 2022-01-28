import { Table } from 'react-bootstrap';
import React, { FC } from 'react';
import { Battle } from '@type/api';
import { useRouter } from 'next/router';
import { BATTLE_ROUTE } from '@constant/routes';
import BattleActionButton from '@module/Battle/BattleActionButton';
import jsAgo from 'js-ago';
import styles from './BattleTable.module.scss';

interface Props {
	rows: Battle[];
}

export const BattleTable: FC<Props> = ({ rows }) => {
	const router = useRouter();
	return (
		<Table striped hover>
			<thead>
				<tr>
					<th>#</th>
					<th>Title</th>
					<th>Armies no.</th>
					<th>Created At</th>
					<th>Status</th>
					<th aria-label="empty" />
				</tr>
			</thead>
			<tbody>
				{rows.map((row, index) => (
					<tr
						key={row.id}
						className={styles['table-row']}
						onClick={() => router.push(BATTLE_ROUTE(row.id))}
					>
						<td>{index + 1}</td>
						<td>{row.title}</td>
						<td>{row.armies.length}</td>
						<td>{jsAgo(new Date(row.createdAt))}</td>
						<td>{row.status}</td>
						<td>
							<BattleActionButton battle={row} />
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};
