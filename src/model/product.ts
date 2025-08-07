import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,OneToMany,
} from 'typeorm';

import { ProductImage } from './productImgs';

@Entity({ name: 'product' })
export class Product {
    
  @PrimaryGeneratedColumn()
  id!: number;


  @Column({ type: 'varchar', 
    unique: true,
     nullable: false
    })
  sku!: string;

  @Column({ type: 'varchar',
     nullable: false 
    })
  productName!: string;


  @Column({ type: 'int', 
    nullable: false 
})
  price!: number;

  @OneToMany(() => ProductImage, 
  (image) => image.product, 
  { cascade: true })
  images!: ProductImage[]

  @CreateDateColumn()
  createdAt!: Date;


  @UpdateDateColumn()
  updatedAt!: Date;
}
