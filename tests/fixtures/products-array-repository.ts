import productArrayRepositoryFixture from './product-object-repository';

export default [
  {
    ...productArrayRepositoryFixture,
    id: '123',
    name: 'shirt',
  },
  {
    ...productArrayRepositoryFixture,
    id: '456',
    name: 'shoe',
  },
];
