import { Product } from '@src/domain/entities';
import { ProductRepository } from '@src/domain/repositories';

export interface GetProductsRequest {
  search?: string | number;
  page?: number;
  limit?: number;
}

export type GetProductsResponse = Product[];

export class GetProducts {
  public constructor(private readonly productRepository: ProductRepository) {}

  public async execute({
    search,
    page,
    limit,
  }: GetProductsRequest): Promise<GetProductsResponse> {
    return this.productRepository.getAll();
  }
}
