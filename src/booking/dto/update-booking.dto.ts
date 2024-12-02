import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsString, IsOptional } from 'class-validator';
import { CreateBookingDto } from './create-booking.dto'; // Assuming this includes fitnessClassId

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  @IsOptional()
  @IsInt()
  fitnessClassId?: number;

  @IsOptional()
  @IsString()
  status?: string;
}
