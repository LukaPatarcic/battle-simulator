import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { Button, Col, Container, Row } from 'react-bootstrap';
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
        <Button className="ms-2" size="sm" variant="success">
          <Link href={CREATE_ARMY_ROUTE}>
            <a className="text-white text-decoration-none">Add Battle</a>
          </Link>
        </Button>
        <Button className="ms-2" size="sm" variant="outline-success">
          <Link href={CREATE_ARMY_ROUTE}>
            <a className="text-black text-decoration-none">Add Army</a>
          </Link>
        </Button>
      </Col>
      <Col xs={12}>
        <BattleTable rows={rows} />
      </Col>
    </Row>
  </Container>
);

export default BattlesPage;
