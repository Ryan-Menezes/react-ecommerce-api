import { Repository } from '@src/domain/repositories';
import { Product } from '@src/domain/entities';

export interface ProductRepository extends Repository<Product> {}
