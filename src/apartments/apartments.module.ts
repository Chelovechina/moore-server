import { Module } from '@nestjs/common';
import { ApartmentsController } from './apartments.controller';
import { ApartmentsService } from './apartments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './schemas/city.schema';
import { Apartment, ApartmentSchema } from './schemas/aparment.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: City.name, schema: CitySchema },
      { name: Apartment.name, schema: ApartmentSchema },
    ]),
    AuthModule,
  ],
  controllers: [ApartmentsController],
  providers: [ApartmentsService],
})
export class ApartmentsModule { }
