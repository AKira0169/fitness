import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FitnessClassModule } from './fitness-class/fitness-class.module';
import { User } from './user/entities/user.entity';
import { FitnessClass } from './fitness-class/entities/fitness-class.entity';
import { Booking } from './booking/entities/booking.entity';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, FitnessClass, Booking], // Ensure the User entity is listed here
      synchronize: true,
    }),

    UserModule,
    AuthModule,
    FitnessClassModule,
    BookingModule,
  ],
})
export class AppModule {}
