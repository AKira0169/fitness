import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { FitnessClass } from 'src/fitness-class/entities/fitness-class.entity';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(FitnessClass)
    private readonly fitnessClassRepository: Repository<FitnessClass>,
  ) {}

  async create(userId: number, createBookingDto: CreateBookingDto) {
    // Fetch the fitness class and its bookings in one query
    const fitnessClass = await this.fitnessClassRepository.findOne({
      where: { id: createBookingDto.fitnessClassId },
      relations: ['bookings', 'bookings.user'], // Eagerly load bookings for the fitness class
    });

    // Check if the fitness class exists
    if (!fitnessClass) {
      throw new NotFoundException('Fitness class not found');
    }

    // Check if the user already booked this fitness class
    const existingBooking = fitnessClass.bookings.find(
      (booking) => booking.user.id === userId,
    );

    if (existingBooking) {
      throw new ConflictException('User has already booked this fitness class');
    }

    // Check if the fitness class is full
    if (fitnessClass.bookings.length >= fitnessClass.maxAttendees) {
      throw new NotFoundException('Fitness class is full');
    }

    // Create the booking only with the ids
    const booking = this.bookingRepository.create({
      user: { id: userId },
      fitnessClass: { id: createBookingDto.fitnessClassId },
      status: 'pending',
    });

    // Save the booking
    const savedBooking = await this.bookingRepository.save(booking);

    return {
      status: 'success',
      data: savedBooking,
    };
  }

  async findAll() {
    return await this.bookingRepository.find();
  }

  async findOne(id: number) {
    return await this.bookingRepository.findOneBy({ id });
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const Booking = await this.bookingRepository.findOne({
      where: { id: id },
    });
    if (!Booking) {
      throw new NotFoundException('Booking not found');
    }
    await this.bookingRepository.update(id, updateBookingDto);

    return 'updated';
  }

  async remove(id: number, userId: number) {
    const Booking = await this.bookingRepository.findOne({
      where: { id: id },
    });
    if (!Booking) {
      throw new NotFoundException('Booking not found');
    }
    if (Booking.user.id !== userId) {
      throw new NotFoundException(
        'You are not authorized to delete this booking',
      );
    }

    await this.bookingRepository.delete(id);

    return Booking;
  }
}
