import { Injectable } from '@nestjs/common';
import { IProduct } from 'src/interfaces/product.interface';

@Injectable()
export class ProductsService {
  private lastId = 0;
  private products: IProduct[] = [
    {
      id: 1,
      name: 'product 1',
      price: 5,
    },
  ];

  findAll(): IProduct[] {
    return this.products;
  }

  findOne(id: number): IProduct {
    const product = this.products.find((item: IProduct) => item.id === id);
    return product;
  }

  create(payload: IProduct) {
    this.lastId++;
    const newProduct: IProduct = {
      id: this.lastId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, changes: IProduct) {
    const index = this.products.findIndex((item: IProduct) => item.id === id);
    const product = this.products[index];
    const newData = {
      ...product,
      ...changes,
    };
    this.products.splice(index, 1, newData);
    return {
      message: 'Product updated',
      newData,
    };
  }

  delete(id: number) {
    const index = this.products.findIndex((item: IProduct) => item.id === id);
    this.products.splice(index, 1);
    return {
      message: 'Product deleted',
    };
  }
}
