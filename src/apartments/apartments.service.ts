import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Apartment, ApartmentDocument } from './schemas/aparment.schema';
import { Model } from 'mongoose';
import { City, CityDocument } from './schemas/city.schema';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { CreateCityDto } from './dto/create-city.dto';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectModel(City.name) private cityModel: Model<City>,
    @InjectModel(Apartment.name) private apartmentModel: Model<Apartment>,
  ) { }

  async getAllCities(): Promise<CityDocument[]> {
    return this.cityModel.find().exec();
  }

  async getAllApartments(): Promise<ApartmentDocument[]> {
    return this.apartmentModel.find().exec();
  }

  async getCityApartments(cityId: string): Promise<ApartmentDocument[]> {
    return this.apartmentModel.find({ cityId: cityId }).exec();
  }

  async createCity(dto: CreateCityDto): Promise<CityDocument> {
    const city = new this.cityModel(dto);
    return city.save();
  }

  async createApartment(dto: CreateApartmentDto): Promise<ApartmentDocument> {
    const aparment = new this.apartmentModel(dto);
    return aparment.save();
  }

  async updateApartment(dto: UpdateApartmentDto): Promise<ApartmentDocument> {
    const updatedApartment = this.apartmentModel.findOneAndUpdate(
      { _id: dto._id },
      dto,
      { new: true },
    );

    if (updatedApartment !== undefined) return updatedApartment;

    throw new HttpException(
      'Такой квартиры не существует',
      HttpStatus.BAD_REQUEST,
    );
  }

  async deleteApartment(id: string): Promise<ApartmentDocument> {
    const deletedApartment = this.apartmentModel.findOneAndDelete(
      { _id: id },
      { new: true },
    );

    if (deletedApartment !== undefined) return deletedApartment;

    throw new HttpException(
      'Такой квартиры не существует',
      HttpStatus.BAD_REQUEST,
    );
  }
}
