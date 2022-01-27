import { Button } from 'react-bootstrap';
import React, { FC, MouseEvent } from 'react';
import { Battle, BattleStatus } from '@type/api';
import { useRouter } from 'next/router';
import { GAME_ROUTE } from '@constant/routes';

interface Props {
  battle: Battle;
}

const getVariantByStatus = (status: BattleStatus) => {
  switch (status) {
    case BattleStatus.DONE:
      return 'success';
    case BattleStatus.IDLE:
    case BattleStatus.IN_PROGRESS:
      return 'dark';
  }
};

const BattleActionButton: FC<Props> = ({ battle }) => {
  const router = useRouter();
  const onStartButtonClick = (id: number, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(GAME_ROUTE(id));
  };
  return (
    <Button
      size="sm"
      variant={getVariantByStatus(battle.status)}
      disabled={battle.status === BattleStatus.IN_PROGRESS}
      onClick={(e) => onStartButtonClick(battle.id, e)}
    >
      {(battle.status === BattleStatus.IDLE ||
        battle.status === BattleStatus.IN_PROGRESS) &&
        'Start Game'}
      {battle.status === BattleStatus.DONE && 'Restart Game'}
    </Button>
  );
};

export default BattleActionButton;
