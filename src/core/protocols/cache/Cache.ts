export type CacheDefaultKeyType = string | number;

export type CacheDefaultValueType = string | number;

export interface Cache<
  K extends CacheDefaultKeyType = CacheDefaultKeyType,
  T = CacheDefaultValueType
> {
  getAll(): Promise<T[]>;
  get(key: K): Promise<T | null>;
  set(key: K, value: T): Promise<void>;
  remove(key: K): Promise<void>;
  clear(): Promise<void>;
}
