import { EntityRepository, Repository } from 'typeorm';
import { Battle } from './battle.entity';

@EntityRepository(Battle)
export class BattleRepository extends Repository<Battle> {}
