import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ObjectId } from 'typeorm';
import { UpdateManyProductDto } from './dto/update-many-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId) {
    return this.productService.findOne(id);
  }

  @Patch('many')
  async updateMany(@Body() updateManyProductDto: UpdateManyProductDto) {
    return this.productService.updateMany(updateManyProductDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: ObjectId,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: ObjectId) {
    return this.productService.remove(id);
  }
}
