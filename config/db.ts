import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../src/model/user';
import { Product } from '../src/model/product';
import { ProductImage } from '../src/model/productImgs';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  extra: {
    ssl: true,
  },
 
  synchronize: true,
 
  logging: false,

 
  entities: [User, Product, ProductImage],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch((error) => console.error('Connection failed:', error));
