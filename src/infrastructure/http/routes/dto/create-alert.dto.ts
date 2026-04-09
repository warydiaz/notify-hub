import { IsIn, IsString } from 'class-validator';

const SEVERITY_VALUES = ['low', 'medium', 'high'] as const;

export class CreateAlertDto {
  @IsString()
  title!: string;
  @IsString()
  message!: string;
  @IsIn(SEVERITY_VALUES, { message: `severity must be one of: ${SEVERITY_VALUES.join(', ')}` })
  severity!: 'low' | 'medium' | 'high';
}
