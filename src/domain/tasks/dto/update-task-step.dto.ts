import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateTaskStepDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsBoolean()
  isDone: boolean;
}
