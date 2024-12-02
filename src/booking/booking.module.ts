import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from './entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FitnessClass } from 'src/fitness-class/entities/fitness-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, FitnessClass])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
