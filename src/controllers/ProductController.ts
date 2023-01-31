import { Request, Response } from '@src/controllers';
import { StripeProductClient } from '@src/core/protocols/clients/stripe';
import { ProductRepository } from '@src/domain/repositories';
import { StripeProductRepository } from '@src/core/repositories/product';
import { GetProductById, GetProducts } from '@src/domain/use-cases/product';
import { ProductNotFoundError } from '@src/errors';

class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  public async index(): Promise<Response> {
    try {
      const getProductsUseCase = new GetProducts(this.productRepository);
      const products = await getProductsUseCase.execute({});

      return {
        response: {
          products,
        },
        statusCode: 200,
      };
    } catch {
      return {
        response: {
          message:
            'There was an internal server error, please try again later.',
        },
        statusCode: 500,
      };
    }
  }

  public async show(req: Request): Promise<Response> {
    try {
      const getProductByIdUseCase = new GetProductById(this.productRepository);
      const products = await getProductByIdUseCase.execute({
        id: req.params.id,
      });

      return {
        response: {
          products,
        },
        statusCode: 200,
      };
    } catch (e) {
      if (e instanceof ProductNotFoundError) {
        return {
          response: {
            message: e.message,
          },
          statusCode: 404,
        };
      }

      return {
        response: {
          message:
            'There was an internal server error, please try again later.',
        },
        statusCode: 500,
      };
    }
  }
}

const stripeProductClient = new StripeProductClient();
const productRepository = new StripeProductRepository(stripeProductClient);
const productController = new ProductController(productRepository);

export { productController };
