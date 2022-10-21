import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreatePlanetDto {
  @ApiProperty()
  @Expose()
  @IsString()
  name: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  distanceToEarth: number;

  @ApiProperty()
  @Expose()
  @IsBoolean()
  active: boolean;
}
