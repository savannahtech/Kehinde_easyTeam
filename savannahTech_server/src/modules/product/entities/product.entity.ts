import { Transform } from 'class-transformer';
import {
  Entity,
  Column,
  ObjectId,
  ObjectIdColumn,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export enum CommissionType {
  Amount,
  Percentage,
}

@Entity('products')
export class Product {
  @ObjectIdColumn()
  @Transform((params) => params.obj._id.toString())
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  category: string;

  @Column('decimal', { precision: 10, scale: 2 })
  commission: number;

  @Column({ default: CommissionType.Percentage })
  commissionType: CommissionType;

  @Column({ default: '$' })
  currency: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  setDefaultCommissionType() {
    this.commissionType = CommissionType.Percentage;
  }

  constructor() {
    this.commissionType = CommissionType.Percentage;
    this.currency = '$';
  }
}
