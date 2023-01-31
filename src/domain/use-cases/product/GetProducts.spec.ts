import { ProductRepository } from '@src/domain/repositories';
import { GetProducts } from '@src/domain/use-cases/product';
import productsArrayRepositoryFixture from '@tests/fixtures/products-array-repository';

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
  const sut = new GetProducts(productRepository);

  return {
    productRepository,
    sut,
  };
};

describe('GetProducts', () => {
  it('should return all products', async () => {
    const { productRepository, sut } = makeSut();
    productRepository.getAll = jest.fn(() =>
      Promise.resolve(productsArrayRepositoryFixture)
    );

    const response = await sut.execute({});

    expect(productRepository.getAll).toBeCalledTimes(1);
    expect(response).toEqual(productsArrayRepositoryFixture);
  });
});
