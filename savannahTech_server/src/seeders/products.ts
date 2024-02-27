import { Product } from '../modules/product/entities/product.entity';
import { createConnection, DataSource } from 'typeorm';
import { products } from './data/products';

async function seed() {
  try {
    const connection = await createConnection();

    await Promise.all(
      products.map(async (product) => {
        await connection.getRepository(Product).save(product);
      }),
    );

    await connection.close();

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seed();
