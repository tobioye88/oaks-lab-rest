import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ITaskStep } from '../interfaces/task.interface';

export class CreateTaskSteps implements ITaskStep {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  isDone: boolean;
}

export class CreateTaskDto {
  @ApiProperty({ required: true })
  @IsString()
  title: string;

  @ApiProperty({ required: false, type: CreateTaskSteps })
  @IsOptional()
  @IsArray()
  @ValidateNested()
  steps?: CreateTaskSteps[];
}
