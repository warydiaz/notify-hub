import { IsBoolean, IsIn, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from './pagination.dto.js';

const SEVERITY_VALUES = ['low', 'medium', 'high'] as const;

export class FiltersGetAlertsDto extends PaginationDto {
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  resolved?: boolean;
  @IsOptional()
  @IsIn(SEVERITY_VALUES, { message: `severity must be one of: ${SEVERITY_VALUES.join(', ')}` })
  severity!: 'low' | 'medium' | 'high';
}
