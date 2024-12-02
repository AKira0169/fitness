// fitness-class/dto/create-fitness-class.dto.ts
import {
  IsString,
  IsDateString,
  IsInt,
  IsPositive,
  Max,
} from 'class-validator';

export class CreateFitnessClassDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date: Date;

  @IsString()
  time: string;

  @IsInt()
  @IsPositive()
  @Max(100) // Example max attendees
  maxAttendees: number;
}
