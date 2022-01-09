import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';

interface IProduct {
  name: string;
  price: number;
}

@Controller('products')
export class ProductsController {
  @Post()
  create(@Body() payload: IProduct) {
    return {
      message: `Listado de productos`,
      payload,
      body: {
        limit: 10,
        offset: 20,
        brand: '',
      },
    };
  }

  @Get('products/filter')
  getProductFilter() {
    return `yo soy filter`;
  }

  @Get('products/:id')
  getProduct(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `product ${id}`;
  }

  @Get('products')
  getProducts(
    @Query(
      'limit',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    limit = 100,
    @Query('offset')
    offset = 5,
    @Query('brand') brand: string,
  ) {
    return `Product: Brand->${brand} Limit->${limit}. Offset ->${offset}`;
  }


}
