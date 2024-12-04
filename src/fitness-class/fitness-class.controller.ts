import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { FitnessClassService } from './fitness-class.service';
import { CreateFitnessClassDto } from './dto/create-fitness-class.dto';
import { UpdateFitnessClassDto } from './dto/update-fitness-class.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('fitness-class')
export class FitnessClassController {
  constructor(private readonly fitnessClassService: FitnessClassService) {}

  @Get()
  async findAll() {
    const result = await this.fitnessClassService.findAll();
    return { status: 'success', data: result };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createFitnessClassDto: CreateFitnessClassDto) {
    const result = await this.fitnessClassService.create(createFitnessClassDto);
    return { status: 'success', data: result };
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const result = await this.fitnessClassService.findOne(id);
    return { status: 'success', data: result };
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const result = await this.fitnessClassService.remove(id);
    return { status: 'success', data: result };
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFitnessClassDto: UpdateFitnessClassDto,
  ) {
    const result = await this.fitnessClassService.update(
      id,
      updateFitnessClassDto,
    );
    return { status: 'success', data: result };
  }
}
