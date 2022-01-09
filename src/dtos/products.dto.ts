import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;
}

// export class UpdateProductDto {
//   @IsString()
//   readonly name?: string;

//   @IsNumber()
//   @IsPositive()
//   readonly price?: number;
// }

export class UpdateProductDto extends PartialType(CreateProductDto) {}
