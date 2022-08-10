import { IsBoolean, IsString } from 'class-validator';

export class AddTaskStepDto {
  @IsString()
  name: string;

  @IsBoolean()
  isDone: boolean;
}
