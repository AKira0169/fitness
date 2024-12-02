import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FitnessClassService } from './fitness-class.service';
import { FitnessClassController } from './fitness-class.controller';
import { FitnessClass } from './entities/fitness-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FitnessClass])],
  controllers: [FitnessClassController],
  providers: [FitnessClassService],
})
export class FitnessClassModule {}
