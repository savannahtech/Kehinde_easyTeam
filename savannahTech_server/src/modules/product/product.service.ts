import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId as ObjectID } from 'mongodb';
import { ObjectId, MongoRepository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { UpdateManyProductDto } from './dto/update-many-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: MongoRepository<Product>,
  ) {}

  async create(product: CreateProductDto) {
    try {
      return await this.productRepository.save(product);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(_id: ObjectId) {
    try {
      const product = await this.productRepository.findOne({
        where: { _id: new ObjectID(_id) },
      });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  async update(_id: ObjectId, updateProductDto: UpdateProductDto) {
    try {
      return await this.productRepository.update(
        { _id: new ObjectID(_id) },
        updateProductDto,
      );
    } catch (error) {
      throw error;
    }
  }

  async updateMany({ selectedResources, commission }: UpdateManyProductDto) {
    try {
      return await Promise.all(
        selectedResources.map(async (product) => {
          await this.update(product, { commission });
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(_id: ObjectId) {
    try {
      const result = await this.productRepository.delete(new ObjectID(_id));
      if (result.affected === 0) {
        throw new NotFoundException('Product not found');
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}
