import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IProduct } from 'src/interfaces/product.interface';

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

  @Put(':id')
  updatePut(@Param('id') id: number, @Body() payload: IProduct) {
    payload.id = id;
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

  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: IProduct) {
    payload.id = id;
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

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      message: `Producto eliminado`,
      id,
      body: {
        limit: 10,
        offset: 20,
        brand: '',
      },
    };
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy filter`;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProduct(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `product ${id}`;
  }

  @Get()
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
