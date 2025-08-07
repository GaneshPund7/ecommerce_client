import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,CreateDateColumn,UpdateDateColumn,
} from 'typeorm';

import { Product } from './product';

@Entity({ name: 'product_image' })
export class ProductImage {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', nullable: false })
  imageUrl!: string;
 
  @ManyToOne(() => Product, (product) => product.images, 
  { onDelete: 'CASCADE' 

  })
  product!: Product;

  @CreateDateColumn()
  createdAt!: Date;
  

  @UpdateDateColumn()
  updatedAt!: Date;
}
