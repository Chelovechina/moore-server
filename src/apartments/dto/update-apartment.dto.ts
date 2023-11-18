import { ApartmentStatusesEnum } from '../schemas/aparment.schema';

export class UpdateApartmentDto {
  readonly _id: string;
  readonly status: ApartmentStatusesEnum;
  readonly statusMessage: string;
  readonly clientName: string;
  readonly clientPhoneNumber: string;
  readonly agreement: number;
}
