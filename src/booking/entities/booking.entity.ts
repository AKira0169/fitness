import { FitnessClass } from 'src/fitness-class/entities/fitness-class.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookings, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: User;

  @ManyToOne(() => FitnessClass, (fitnessClass) => fitnessClass.bookings, {
    onDelete: 'CASCADE',
    eager: true,
  })
  fitnessClass: FitnessClass;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
