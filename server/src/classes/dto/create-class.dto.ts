import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateClassDto {
  @ApiProperty()
  @IsString()
  name: string;
}
