import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ required: true })
  @IsString()
  title: string;
}
