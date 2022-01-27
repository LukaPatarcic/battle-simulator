import { FC } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { BATTLES_ROUTE, CREATE_BATTLE_ROUTE } from '@constant/routes';

const HomePage: FC = () => {
  return (
    <Container>
      <div className="jumbotron mt-5">
        <h1 className="display-4">Welcome to Battle Simulator</h1>
        <p className="lead">Let's get started by creating a new battle</p>
        <hr className="my-4" />
        <Button
          size="lg"
          className="me-3"
          variant="dark"
          href={CREATE_BATTLE_ROUTE}
        >
          Create Battle
        </Button>
        <Button size="lg" variant="outline-dark" href={BATTLES_ROUTE}>
          View Battles
        </Button>
      </div>
    </Container>
  );
};

export default HomePage;
