import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { ITaskStep } from '../interfaces/task.interface';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsArray()
  steps?: ITaskStep[];
}
