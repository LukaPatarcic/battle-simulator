import type { GetServerSideProps, NextPage } from 'next';
import { Battle } from '@type/api';
import Default from '@layout/Default/Default';
import { startBattle } from '@api/battles';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { BATTLES_ROUTE } from '@constant/routes';
import Link from 'next/link';

interface Props {
  battle: Battle;
  error: any;
}

const StartGame: NextPage<Props> = ({ battle, error }) => {
  console.log(error, battle);
  if (error) {
    return (
      <Default>
        <Container className="mt-5">
          <Row>
            <Col xs={12}>
              <p className="text-center h3">
                There was an error while trying to start your game:
              </p>
              <p className="text-danger text-center fw-bold h2 mb-4">
                {error.message}
              </p>
            </Col>
            <Col xs={12} className="d-flex justify-content-center">
              <Button variant="dark" size="lg">
                <Link href={BATTLES_ROUTE}>
                  <a className="text-white text-decoration-none">Go Back</a>
                </Link>
              </Button>
            </Col>
          </Row>
        </Container>
      </Default>
    );
  }
  return (
    <Default>
      <div>Hello</div>
    </Default>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = Number(ctx.query.id);
  try {
    const battle = await startBattle(id);
    return { props: { battle } };
  } catch (error) {
    return { props: { error } };
  }
};

export default StartGame;
