import { StripeProductClient } from '@src/core/protocols/clients/stripe';
import { StripeProductRepository } from '@src/core/repositories/product';
import stripeProductObjectFixture from '@tests/fixtures/stripe-product-object';
import stripePriceObjectFixture from '@tests/fixtures/stripe-price-object';
import productObjectRepositoryFixture from '@tests/fixtures/product-object-repository';

const makeSut = () => {
  const stripeProduct = jest.mocked<StripeProductClient>(
    new StripeProductClient()
  );
  const sut = new StripeProductRepository(stripeProduct);

  return {
    stripeProduct,
    sut,
  };
};

describe.skip('StripeProductRepository', () => {
  it('should return all formatted products', async () => {
    const { sut, stripeProduct } = makeSut();
    // stripeProduct.getProducts = jest.fn((params) =>
    //   Promise.resolve([
    //     stripeProductObjectFixture,
    //     {
    //       ...stripeProductObjectFixture,
    //       default_price: null,
    //     },
    //   ])
    // );
    // stripeProduct.getPriceTo = jest.fn((product_id, price_id) =>
    //   Promise.resolve(stripePriceObjectFixture)
    // );

    const products = await sut.getAll();

    expect(products).toEqual([
      productObjectRepositoryFixture,
      {
        ...productObjectRepositoryFixture,
        price: null,
      },
    ]);
  });
});
