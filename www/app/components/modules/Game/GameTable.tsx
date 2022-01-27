import { Table } from 'react-bootstrap';
import React, { FC } from 'react';
import { Log } from '@type/api';

interface Props {
  logs: Log[];
}

const GameTable: FC<Props> = ({ logs }) => (
  <Table striped>
    <thead>
      <tr>
        <th>#</th>
        <th>Attacker</th>
        <th>Target</th>
        <th>Damage Done</th>
        <th>Battle Name</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {logs.map((log, index) => (
        <tr key={log.id}>
          <td>{index + 1}</td>
          <td>{log.attacker}</td>
          <td>{log.target}</td>
          <td>{log.damage}</td>
          <td>{log.battle.title}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default GameTable;
