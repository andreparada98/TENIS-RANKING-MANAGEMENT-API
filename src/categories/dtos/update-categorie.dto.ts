import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';
import { TenisEvent } from '../interfaces/categories.interface';

export class UpdateCategorieDTO {
  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<TenisEvent>;
}
