import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { CommissionType } from '../entities/product.entity';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  commission: number;

  @IsNotEmpty()
  @IsString()
  commissionType: CommissionType;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}
