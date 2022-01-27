import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BattleTable } from '@module/Battle/BattleTable';
import Link from 'next/link';
import { CREATE_ARMY_ROUTE } from '@constant/routes';

interface Props {
  rows: any;
}

const BattlesPage: FC<Props> = ({ rows }) => (
  <Container>
    <h1>Battles</h1>
    <Row>
      <Col xs={12} className="d-flex justify-content-end align-items-end">
        <Link href={CREATE_ARMY_ROUTE}>
          <a className="btn btn-success ms-2 btn-sm">Add Battle</a>
        </Link>
        <Link href={CREATE_ARMY_ROUTE}>
          <a className="btn btn-outline-success ms-2 btn-sm">Add Army</a>
        </Link>
      </Col>
      <Col xs={12}>
        <BattleTable rows={rows} />
      </Col>
    </Row>
  </Container>
);

export default BattlesPage;
