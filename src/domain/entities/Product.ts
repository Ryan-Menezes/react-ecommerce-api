import { Entity } from '@src/domain/entities';

export interface Image {
  readonly name: string;
  readonly url: string;
}

export interface Price extends Entity {
  readonly value: number;
  readonly currency: string;
}

export interface MetaData {
  [key: string]: string | number;
}

export interface Product extends Entity {
  readonly name: string;
  readonly description: string | null;
  readonly price: Price | null;
  readonly images: Image[];
  readonly metadata: MetaData;
}
