import { Button } from 'react-bootstrap';
import React, { FC, MouseEvent } from 'react';
import { Battle, BattleStatus } from '@type/api';
import { useRouter } from 'next/router';
import { GAME_ROUTE } from '@constant/routes';
import { restartBattle } from '@api/battles';

interface Props {
  battle: Battle;
}

const BattleActionButton: FC<Props> = ({ battle }) => {
  const router = useRouter();
  const onStartButtonClick = (id: number, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(GAME_ROUTE(id));
  };

  const onRestartButtonClick = (
    id: number,
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    restartBattle(id).then(() => {
      router.push(GAME_ROUTE(id));
    });
  };

  if (
    battle.status === BattleStatus.IDLE ||
    battle.status === BattleStatus.IN_PROGRESS
  ) {
    return (
      <Button
        size="sm"
        variant="dark"
        disabled={battle.status === BattleStatus.IN_PROGRESS}
        onClick={(e) => onStartButtonClick(battle.id, e)}
      >
        Start Game
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      variant="success"
      onClick={(e) => onRestartButtonClick(battle.id, e)}
    >
      Restart Game
    </Button>
  );
};

export default BattleActionButton;
