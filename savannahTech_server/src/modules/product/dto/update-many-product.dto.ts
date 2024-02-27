import {
  ArrayMinSize,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { ObjectId } from 'typeorm';

export class UpdateManyProductDto {
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @ArrayMinSize(1)
  selectedResources: ObjectId[];

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  commission: number;
}
