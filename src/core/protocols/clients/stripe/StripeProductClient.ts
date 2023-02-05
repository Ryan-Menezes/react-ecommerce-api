import Stripe from 'stripe';

export type StripeProductClientParams = {
  search?: string;
  limit?: number;
};
export interface StripeProductClientResponse extends Stripe.Product {}
export interface StripePriceClientResponse extends Stripe.Price {}

export interface StripeProductClient {
  getProducts(
    params: StripeProductClientParams
  ): Promise<StripeProductClientResponse[]>;
  getProduct(id: string): Promise<StripeProductClientResponse | null>;
  getPriceTo(
    product_id: string,
    price_id: string
  ): Promise<StripePriceClientResponse | null>;
}

export class StripeProductClient implements StripeProductClient {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2022-11-15',
    });
  }

  public async getProducts({
    search,
    limit,
  }: StripeProductClientParams = {}): Promise<StripeProductClientResponse[]> {
    limit = limit ?? 10;

    if (search) {
      const { data } = await this.stripe.products.search({
        query: `active:\'true\' AND name:\'${search}\'`,
        limit,
      });

      return data;
    }

    const { data } = await this.stripe.products.list({
      active: true,
      limit,
    });

    return data;
  }

  public async getProduct(
    id: string
  ): Promise<StripeProductClientResponse | null> {
    try {
      const {
        data: [product],
      } = await this.stripe.products.list({
        ids: [id],
        active: true,
        limit: 1,
      });

      return product ? product : null;
    } catch {
      return null;
    }
  }

  public async getPriceTo(
    product_id: string,
    price_id: string
  ): Promise<StripePriceClientResponse | null> {
    try {
      const { data } = await this.stripe.prices.list({
        product: product_id,
        active: true,
        type: 'one_time',
        limit: 100,
      });

      const price = data.find((price) => price.id === price_id);

      return price ? price : null;
    } catch {
      return null;
    }
  }
}
