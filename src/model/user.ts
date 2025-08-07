import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', 
    nullable: false })
  userName!: string;

  @Column({ type: 'varchar', 
    nullable: false 
})
  email!: string;

  @Column({ type: 'varchar', 
    nullable: true 
})
  mobile?: string;

  @Column({ type: 'text', 
    nullable: true
 })
  address?: string;

  @Column({ type: 'varchar',
     nullable: false }
    )
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}
