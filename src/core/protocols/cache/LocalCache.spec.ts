import { LocalCache } from '@src/core/protocols/cache';

const makeSut = () => {
  const sut = new LocalCache();

  return {
    sut,
  };
};

describe('LocalCache', () => {
  const itemKey = 'any-key';
  const itemValue = 'any-value';

  it('should add item to cache', async () => {
    const { sut } = makeSut();

    await sut.set(itemKey, itemValue);

    expect(await sut.get(itemKey)).toBe(itemValue);
    expect(await sut.getAll()).toEqual([itemValue]);
  });

  it('should remove item to cache', async () => {
    const { sut } = makeSut();

    await sut.set(itemKey, itemValue);

    expect(await sut.get(itemKey)).toBe(itemValue);
    expect(await sut.getAll()).toEqual([itemValue]);

    await sut.remove(itemKey);

    expect(await sut.get(itemKey)).toBeNull();
    expect(await sut.getAll()).toEqual([]);
  });

  it('should return null if item does not exist in cache', async () => {
    const { sut } = makeSut();

    await sut.set(itemKey, itemValue);

    expect(await sut.get('invalid-key')).toBeNull();
  });

  it('should replace item to cache', async () => {
    const { sut } = makeSut();

    await sut.set(itemKey, itemValue);
    await sut.set(itemKey, `${itemValue}2`);
    await sut.set(itemKey, `${itemValue}3`);

    expect(await sut.get(itemKey)).toBe(`${itemValue}3`);
    expect(await sut.getAll()).toEqual([`${itemValue}3`]);
  });

  it('should clear cache', async () => {
    const { sut } = makeSut();

    await sut.set(itemKey, itemValue);
    await sut.set(`${itemKey}2`, `${itemValue}2`);

    expect(await sut.getAll()).toEqual([itemValue, `${itemValue}2`]);

    await sut.clear();

    expect(await sut.getAll()).toEqual([]);
  });
});
