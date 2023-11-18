import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Manager, ManagerDocument } from './schemas/manager.schema';
import { Model } from 'mongoose';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import * as bcript from 'bcryptjs';

@Injectable()
export class ManagersService {
  constructor(
    @InjectModel(Manager.name) private managerModel: Model<Manager>,
  ) { }

  async getAllManagers(): Promise<ManagerDocument[]> {
    return this.managerModel.find().exec();
  }

  async createManager(dto: CreateManagerDto): Promise<ManagerDocument> {
    const candidate: ManagerDocument[] = await this.managerModel.find({
      email: dto.email,
    });

    if (candidate.length !== 0) {
      throw new HttpException(
        'Менеджер с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword: string = await bcript.hash(dto.password, 5);
    const manager: ManagerDocument = new this.managerModel({
      ...dto,
      password: hashPassword,
    });

    return manager.save();
  }

  async deleteManager(id: string): Promise<ManagerDocument> {
    const deletedManager = this.managerModel.findOneAndDelete(
      { _id: id },
      { new: true },
    );

    if (deletedManager !== undefined) return deletedManager;

    throw new HttpException(
      'Такого менеджера не существует',
      HttpStatus.BAD_REQUEST,
    );
  }

  async updateManager(dto: UpdateManagerDto): Promise<ManagerDocument> {
    const updatedManager = this.managerModel.findOneAndUpdate(
      { _id: dto._id },
      dto,
      { new: true },
    );

    if (updatedManager !== undefined) return updatedManager;

    throw new HttpException(
      'Такого менеджера не существует',
      HttpStatus.BAD_REQUEST,
    );
  }
}
