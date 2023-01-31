import { ProductNotFoundError } from '@src/errors';
import { ProductRepository } from '@src/domain/repositories';
import { GetProductById } from '@src/domain/use-cases/product';
import productObjectRepositoryFixture from '@tests/fixtures/product-object-repository';

const makeProductRepositoryMock = () => {
  const productRepository: jest.Mocked<ProductRepository> = {
    getAll: jest.fn(),
    findById: jest.fn(),
  };

  return {
    productRepository,
  };
};

const makeSut = () => {
  const { productRepository } = makeProductRepositoryMock();
  const sut = new GetProductById(productRepository);

  return {
    productRepository,
    sut,
  };
};

describe('GetProductById', () => {
  it('should return product of a specific id', async () => {
    const { productRepository, sut } = makeSut();
    const req = { id: 'any-id' };
    productRepository.findById = jest.fn((id) =>
      Promise.resolve(productObjectRepositoryFixture)
    );

    const response = await sut.execute(req);

    expect(productRepository.findById).toBeCalledTimes(1);
    expect(productRepository.findById).toBeCalledWith(req.id);
    expect(response).toEqual(productObjectRepositoryFixture);
  });

  it('should throw an error if the product does not exist', async () => {
    const { productRepository, sut } = makeSut();
    const req = { id: 'invalid-id' };
    productRepository.findById = jest.fn((id) => Promise.resolve(null));

    const promise = sut.execute(req);

    await expect(promise).rejects.toThrow(ProductNotFoundError);
    expect(productRepository.findById).toBeCalledTimes(1);
    expect(productRepository.findById).toBeCalledWith(req.id);
  });
});
