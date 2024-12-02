import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @IsNotEmpty()
  fitnessClassId: number;
}
