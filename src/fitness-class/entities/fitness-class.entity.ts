import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from 'src/booking/entities/booking.entity';

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

  @OneToMany(() => Booking, (booking) => booking.fitnessClass)
  bookings: Booking[];
}
