import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return 'Hola mundo!!!';
    // return this.appService.getHello();
  }

  @Get('nuevo')
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return `cons /sas/`;
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

  @Get('categories/:id/products/:productId')
  getCategory(@Param('id') id: number, @Param('productId') productId: number) {
    return `category ${id}, products ${productId}`;
  }
}
