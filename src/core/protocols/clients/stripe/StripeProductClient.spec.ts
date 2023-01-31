import { StripeProductClient } from '@src/core/protocols/clients/stripe';

const makeSut = () => {
  const stripeProduct = new StripeProductClient();

  return {
    stripeProduct,
  };
};

describe('StripeProductClient', () => {
  const stripePriceId = 'price_1MEcQJJxRPM20N1wz2ahDfzl';
  const stripeProductId = 'planreward';
  const stripeProductApi = {
    id: expect.any(String),
    object: expect.any(String),
    active: true,
    attributes: expect.any(Array),
    created: expect.any(Number),
    default_price: null,
    description: null,
    images: expect.any(Array),
    livemode: expect.any(Boolean),
    metadata: expect.any(Object),
    name: expect.any(String),
    package_dimensions: null,
    shippable: null,
    statement_descriptor: null,
    tax_code: null,
    type: expect.any(String),
    unit_label: null,
    updated: expect.any(Number),
    url: null,
  };

  const stripePriceApi = {
    id: stripePriceId,
    object: expect.any(String),
    active: true,
    billing_scheme: expect.any(String),
    created: expect.any(Number),
    currency: expect.any(String),
    custom_unit_amount: null,
    livemode: expect.any(Boolean),
    lookup_key: null,
    metadata: expect.any(Object),
    nickname: null,
    product: expect.any(String),
    recurring: expect.any(Object),
    tax_behavior: expect.any(String),
    tiers_mode: null,
    transform_quantity: null,
    type: 'one_time',
    unit_amount: expect.any(Number),
    unit_amount_decimal: expect.any(String),
  };

  it('should get all products', async () => {
    const { stripeProduct } = makeSut();
    const products = await stripeProduct.getProducts();

    expect(products).toEqual(expect.arrayContaining([stripeProductApi]));
    expect(products.length).toBeLessThanOrEqual(10);
  });

  it('should search for all products that match the search', async () => {
    const { stripeProduct } = makeSut();
    const products = await stripeProduct.getProducts({
      search: 'Gold',
    });

    expect(products).toEqual(
      expect.arrayContaining([
        {
          ...stripeProductApi,
          name: 'Gold Special',
        },
      ])
    );
    expect(products.length).toBeLessThanOrEqual(10);
  });

  it('should find product by id', async () => {
    const { stripeProduct } = makeSut();
    const product = await stripeProduct.getProduct(stripeProductId);

    expect(product).toEqual({
      ...stripeProductApi,
      id: stripeProductId,
    });
  });

  it("should return null if product doesn't exist", async () => {
    const { stripeProduct } = makeSut();
    const product = await stripeProduct.getProduct('invalid-id');

    expect(product).toEqual(null);
  });

  it('should find price by id', async () => {
    const { stripeProduct } = makeSut();
    const price = await stripeProduct.getPriceTo(
      'prod_MyZZJyNW7NNoSr',
      stripePriceId
    );

    expect(price).toEqual({
      ...stripePriceApi,
      id: stripePriceId,
      product: 'prod_MyZZJyNW7NNoSr',
    });
  });

  it('should return null if price is not related to a product', async () => {
    const { stripeProduct } = makeSut();
    const price = await stripeProduct.getPriceTo('invalid-id', stripePriceId);

    expect(price).toEqual(null);
  });

  it("should return null if price doesn't exist", async () => {
    const { stripeProduct } = makeSut();
    const price = await stripeProduct.getPriceTo(
      'prod_MyZZJyNW7NNoSr',
      'invalid-id'
    );

    expect(price).toEqual(null);
  });
});
