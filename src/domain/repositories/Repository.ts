import { EntityId, Entity } from '@src/domain/entities';

export interface Repository<T extends Entity> {
  getAll(): Promise<T[]>;
  findById(id: EntityId): Promise<T | null>;
}
