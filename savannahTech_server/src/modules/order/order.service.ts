import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { MongoRepository, ObjectId } from 'typeorm';
import { ObjectId as ObjectID } from 'mongodb';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: MongoRepository<Order>,
  ) {}

  async create(order: CreateOrderDto) {
    return await this.orderRepository.save(order);
  }

  async createMany() {
    return this.orderRepository.find();
  }

  async findAll() {
    return this.orderRepository.find();
  }

  async findOne(_id: ObjectId) {
    return await this.orderRepository.findOne({
      where: { _id: new ObjectID(_id) },
    });
  }

  async update(_id: ObjectId, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepository.update(
      { _id: new ObjectID(_id) },
      updateOrderDto,
    );
  }

  async remove(_id: ObjectId) {
    return await this.orderRepository.delete(new ObjectID(_id));
  }
}
