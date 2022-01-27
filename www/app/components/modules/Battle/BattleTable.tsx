import { Button, Table } from 'react-bootstrap';
import React, { FC } from 'react';
import { Battle } from '@type/api';
import ReactTimeAgo from 'react-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import TimeAgo from 'javascript-time-ago';
import { useRouter } from 'next/router';
import { BATTLE_ROUTE, CREATE_ARMY_ROUTE } from '@constant/routes';
import styles from './BattleTable.module.scss';
import BattleActionButton from '@module/Battle/BattleActionButton';
import Link from 'next/link';

interface Props {
  rows: Battle[];
}

export const BattleTable: FC<Props> = ({ rows }) => {
  TimeAgo.addDefaultLocale(en);
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
          <th />
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.id}
            className={styles['table-row']}
            onClick={() => router.push(BATTLE_ROUTE(row.id))}
          >
            <td>{row.id}</td>
            <td>{row.title}</td>
            <td>{row.armies.length}</td>
            <td>
              <ReactTimeAgo date={row.createdAt} />
            </td>
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
