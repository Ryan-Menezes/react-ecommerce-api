import {
  CacheDefaultKeyType,
  CacheDefaultValueType,
  Cache,
} from '@src/core/protocols/cache';

export class LocalCache<
  K extends CacheDefaultValueType = CacheDefaultKeyType,
  T = CacheDefaultValueType
> implements Cache<K, T>
{
  private readonly items = new Map<K, T>();

  public async getAll(): Promise<T[]> {
    const items = [];

    for (const value of this.items.values()) {
      items.push(value);
    }

    return items;
  }

  public async get(key: K): Promise<T | null> {
    const item = await this.items.get(key);

    if (!item) {
      return null;
    }

    return item;
  }

  public async set(key: K, value: T): Promise<void> {
    await this.items.set(key, value);
  }

  public async remove(key: K): Promise<void> {
    await this.items.delete(key);
  }

  public async clear(): Promise<void> {
    await this.items.clear();
  }
}
