import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  // ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IProduct } from 'src/interfaces/product.interface';

import { ProductsService } from './../../services/products/products.service';
import { ParseIntPipe } from './../../common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from './../../dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  create(@Body() payload: CreateProductDto) {
    const newProduct = this.productsService.create(payload);
    return {
      message: `Listado de productos`,
      payload,
      body: {
        limit: 10,
        offset: 20,
        newProduct,
      },
    };
  }

  @Put(':id')
  updatePut(@Param('id') id: number, @Body() payload: IProduct) {
    const result = this.productsService.update(id, payload);
    return {
      message: result.message,
      payload,
      body: {
        limit: 10,
        offset: 20,
        product: result.newData,
      },
    };
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    const result = this.productsService.update(id, payload);
    if (result) {
      return {
        message: result.message,
        payload,
        body: {
          limit: 10,
          offset: 20,
          product: result.newData,
        },
      };
    } else {
      return null;
    }
  }

  @Delete(':id')
  delete(
    @Param(
      'id',
      // new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
      ParseIntPipe,
    )
    id: number,
  ) {
    const result = this.productsService.delete(id);
    return {
      message: result.message,
      id,
    };
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy filter`;
  }

  @Get()
  getProducts(
    @Query(
      'limit',
      // new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
      ParseIntPipe,
    )
    limit = 100,
    @Query('offset')
    offset = 5,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProduct(
    @Param(
      'id',
      // new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.productsService.findOne(id);
  }
}
