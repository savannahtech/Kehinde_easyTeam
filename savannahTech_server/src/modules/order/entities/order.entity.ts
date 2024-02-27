import { Product } from '../../product/entities/product.entity';
import { Transform } from 'class-transformer';
import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectId,
} from 'typeorm';

@Entity()
export class Order {
  @ObjectIdColumn()
  @Transform((params) => params.obj._id.toString())
  _id: ObjectId;

  @Column()
  customerName: string;

  @ObjectIdColumn()
  staffID: ObjectId;

  @ManyToOne(() => Product, { eager: true })
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
