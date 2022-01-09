import { Injectable, NotFoundException } from '@nestjs/common';
import { IProduct } from 'src/interfaces/product.interface';

@Injectable()
export class ProductsService {
  private lastId = 0;
  private products: IProduct[] = [];

  findAll(): IProduct[] {
    return this.products;
  }

  findOne(id: number): IProduct {
    const product = this.products.find((item: IProduct) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
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
    if (index !== -1) {
      const product: IProduct = this.products[index];
      console.log({ product });
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
    return null;
  }

  delete(id: number) {
    const index = this.products.findIndex((item: IProduct) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    this.products.splice(index, 1);
    return {
      message: 'Product deleted',
    };
  }
}
