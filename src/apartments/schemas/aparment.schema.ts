import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { City } from './city.schema';

export enum ApartmentStatusesEnum {
  RESERVATION = 'Бронь',
  SOLD = 'Куплено',
  BARTER = 'Бартер',
  INSTALLMENT = 'Рассроч',
  CANCEL = 'Отмена',
  ACTIVE = 'Активна',
}

export type ApartmentDocument = HydratedDocument<Apartment>;

@Schema({ timestamps: true })
export class Apartment {
  @Prop({ required: true })
  number: number;

  @Prop({ type: Types.ObjectId, ref: 'City', required: true })
  cityId: City;

  @Prop({ required: true })
  floor: number;

  @Prop({ required: true })
  sqm: number;

  @Prop({ required: true, default: ApartmentStatusesEnum.ACTIVE })
  status: ApartmentStatusesEnum;

  @Prop({ required: true })
  price: number;

  @Prop()
  clientName: string;

  @Prop()
  clientPhoneNumber: string;

  @Prop()
  agreement: number;

  @Prop()
  statusMessage: string;
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
