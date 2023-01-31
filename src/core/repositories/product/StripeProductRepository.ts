import {
  StripeProductClient,
  StripePriceClientResponse,
  StripeProductClientResponse,
} from '@src/core/protocols/clients/stripe';
import { Price, Image, Product, EntityId } from '@src/domain/entities';
import { ProductRepository } from '@src/domain/repositories';

export class StripeProductRepository implements ProductRepository {
  public constructor(public readonly stripeProduct: StripeProductClient) {}

  public async getAll(): Promise<Product[]> {
    const products = await this.stripeProduct.getProducts();
    const productPromises = products.map((product) =>
      this.parseProductData(product)
    );
    return Promise.all(productPromises);
  }

  public async findById(id: EntityId): Promise<Product | null> {
    const product = await this.stripeProduct.getProduct(id as string);

    if (product === null) {
      return null;
    }

    return this.parseProductData(product);
  }

  private async parseProductData(
    product: StripeProductClientResponse
  ): Promise<Product> {
    const images: Image[] = product.images.map((image) => ({
      name: product.name,
      url: image,
    }));

    const price = await this.getPriceTo(product);

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price,
      images,
      metadata: product.metadata,
    };
  }

  private async getPriceTo(
    product: StripeProductClientResponse
  ): Promise<Price | null> {
    if (!product.default_price) {
      return null;
    }

    let price: StripePriceClientResponse | null;
    const defaultPrice = product.default_price;

    if (typeof defaultPrice === 'object') {
      price = defaultPrice as StripePriceClientResponse;
    } else {
      price = await this.stripeProduct.getPriceTo(
        product.id,
        defaultPrice as string
      );
    }

    if (price === null || price.unit_amount === null) {
      return null;
    }

    return {
      id: price.id,
      value: price.unit_amount,
      currency: price.currency,
    };
  }
}
