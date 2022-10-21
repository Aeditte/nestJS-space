import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsDate, IsString, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty()
  @Expose()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @Expose()
  @IsUUID()
  destinationUUID: string;

  @ApiProperty()
  @Expose()
  @IsUUID()
  starshipUUID: string;

  @ApiProperty()
  @Expose()
  @IsString()
  traveller: string;

  @ApiProperty()
  @Expose()
  @IsDate()
  departureDate: Date;
}
