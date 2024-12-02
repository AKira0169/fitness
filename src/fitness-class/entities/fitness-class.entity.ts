// fitness-class.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fitness_classes')
export class FitnessClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('date')
  date: Date;

  @Column('time') // Use 'time' to store time in HH:mm format
  time: string;
  @Column('int')
  maxAttendees: number;
}
