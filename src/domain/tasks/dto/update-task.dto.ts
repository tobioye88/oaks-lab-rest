import { IsNumber, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  title: string;
}
