import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('booking')
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    const booking = await this.bookingService.create(
      req.user.userId,
      createBookingDto,
    );

    return { status: 'success', data: booking };
  }

  @Get()
  async findAll(@Request() req) {
    const result = await this.bookingService.findAll(req.user.userId);
    return { status: 'success', data: result };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.bookingService.findOne(+id);
    return { status: 'success', data: result };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    const result = await this.bookingService.update(+id, updateBookingDto);
    return { status: 'success', data: result };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const result = await this.bookingService.remove(+id, req.user.userId);
    return { status: 'success', data: result };
  }
}
