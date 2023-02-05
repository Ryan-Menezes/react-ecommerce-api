import { GetProducts, GetProductById } from '@src/domain/use-cases/product';

describe('Route /products', () => {
  it('should get all products', async () => {
    await request
      .get('/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.products.length).toBeGreaterThan(1);
        expect(response.body).toEqual({
          products: expect.arrayContaining([
            {
              id: expect.any(String),
              name: expect.any(String),
              description: expect.any(String),
              price: null,
              images: [],
              metadata: expect.any(Object),
            }
          ]),
          statusCode: 200,
        });
      });
  });

  it('should get all products', async () => {
    await request
      .get('/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.products.length).toBeGreaterThan(1);
        expect(response.body).toEqual({
          products: expect.arrayContaining([
            {
              id: expect.any(String),
              name: expect.any(String),
              description: expect.any(String),
              price: null,
              images: [],
              metadata: expect.any(Object),
            }
          ]),
          statusCode: 200,
        });
      });
  });

  it('should throw a 500 error if there is an error in the product listing', async () => {
    jest.spyOn(GetProducts.prototype, 'execute').mockImplementationOnce(() => Promise.reject());

    await request
      .get('/products')
      .expect('Content-Type', /json/)
      .expect(500)
      .then(response => {
        expect(response.body).toEqual({
          message: 'There was an internal server error, please try again later.',
          statusCode: 500,
        });
      });
  });

  it('should get a 404 error if the product is not found', async () => {
    await request
      .get('/products/invalid-product-id')
      .expect('Content-Type', /json/)
      .expect(404)
      .then(response => {
        expect(response.body).toEqual({
          message: 'There is no product registered with this id',
          statusCode: 404,
        });
      });
  });

  it('should get a 404 error if the product is not found', async () => {
    await request
      .get('/products/invalid-product-id')
      .expect('Content-Type', /json/)
      .expect(404)
      .then(response => {
        expect(response.body).toEqual({
          message: 'There is no product registered with this id',
          statusCode: 404,
        });
      });
  });

  it('should throw a 500 error if there is an error in the search for a product', async () => {
    jest.spyOn(GetProductById.prototype, 'execute').mockImplementationOnce(() => Promise.reject());

    await request
      .get('/products/any-id')
      .expect('Content-Type', /json/)
      .expect(500)
      .then(response => {
        expect(response.body).toEqual({
          message: 'There was an internal server error, please try again later.',
          statusCode: 500,
        });
      });
  });
});
