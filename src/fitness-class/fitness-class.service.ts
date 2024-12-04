// fitness-class/fitness-class.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FitnessClass } from './entities/fitness-class.entity';
import { CreateFitnessClassDto } from './dto/create-fitness-class.dto';
import { UpdateFitnessClassDto } from './dto/update-fitness-class.dto';

@Injectable()
export class FitnessClassService {
  constructor(
    @InjectRepository(FitnessClass)
    private fitnessClassRepository: Repository<FitnessClass>, // Inject the repository
  ) {}

  // Create a new fitness class
  async create(
    createFitnessClassDto: CreateFitnessClassDto,
  ): Promise<FitnessClass> {
    const fitnessClass = this.fitnessClassRepository.create(
      createFitnessClassDto,
    );
    return await this.fitnessClassRepository.save(fitnessClass); // Save to DB
  }

  // Get all fitness classes
  async findAll(): Promise<FitnessClass[]> {
    return await this.fitnessClassRepository.find({
      relations: ['bookings'], // Ensure that the bookings relation is loaded
    });
  }

  // Get a single fitness class by ID
  async findOne(id: number): Promise<FitnessClass | undefined> {
    return await this.fitnessClassRepository.findOne({
      where: {
        id,
      },
      relations: ['bookings'], // Specify the related entities to load
    });
  }
  async remove(id: number): Promise<void> {
    const entity = await this.fitnessClassRepository.findOne({ where: { id } }); // Pass an object with 'where' for the id
    if (!entity) {
      throw new NotFoundException(`Fitness class with ID ${id} not found`); // Throw error if not found
    }
    await this.fitnessClassRepository.delete(id); // Proceed with deletion if entity exists
  }
  async update(id: number, updateFitnessClassDto: UpdateFitnessClassDto) {
    await this.fitnessClassRepository.update(id, updateFitnessClassDto); // Update by ID
  }
}
