import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCityDto } from './dto/create-city.dto';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

@Controller('apartments')
export class ApartmentsController {
  constructor(private apartmentsService: ApartmentsService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllApartments() {
    return this.apartmentsService.getAllApartments();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createApartment(@Body() createApartmentDto: CreateApartmentDto) {
    return this.apartmentsService.createApartment(createApartmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateApartment(@Body() updateApartmentDto: UpdateApartmentDto) {
    return this.apartmentsService.updateApartment(updateApartmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteApartment(@Param('id') id: string) {
    return this.apartmentsService.deleteApartment(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/cities')
  async getAllCities() {
    return this.apartmentsService.getAllCities();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/cities')
  async createCity(@Body() createCityDto: CreateCityDto) {
    return this.apartmentsService.createCity(createCityDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/citites/:id')
  async getCityApartments(@Param('id') id: string) {
    return this.apartmentsService.getCityApartments(id);
  }
}
