import { ProductNotFoundError } from '@src/errors';
import { EntityId } from '@src/domain/entities';
import { Product } from '@src/domain/entities';
import { ProductRepository } from '@src/domain/repositories';

export interface GetProductByIdRequest {
  id: EntityId;
}

export type GetProductByIdResponse = Product;

export class GetProductById {
  public constructor(private readonly productRepository: ProductRepository) {}

  public async execute({
    id,
  }: GetProductByIdRequest): Promise<GetProductByIdResponse> {
    const product = await this.productRepository.findById(id);

    if (product === null) {
      throw new ProductNotFoundError(
        'There is no product registered with this id'
      );
    }

    return product;
  }
}
