import { IsString } from 'class-validator';

export class AlertByIdDto {
  @IsString()
  id!: string;
}
