import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanetService } from 'src/planet/planet.service';
import { StarshipService } from 'src/starship/starship.service';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { Starship } from '../starship/entities/starship.entity';
import { Planet } from 'src/planet/entities/planet.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
    private readonly planetService: PlanetService,
    private readonly starshipService: StarshipService,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    return Promise.all([
      this.planetService.findOneByUUID(createBookingDto.destinationUUID),
      this.starshipService.findOneByUUID(createBookingDto.starshipUUID),
    ]).then((e: [Planet, Starship]) => {
      const [destination, startship] = e;
      return this.bookingRepository.save({ ...createBookingDto, startship, destination }).catch((e) => {
        throw e;
      });
    });
  }

  async findAll() {
    return await this.bookingRepository.find();
  }

  async findOne(uuid: string) {
    return await this.bookingRepository.findOne({
      relations: ['destination', 'startship'],
      where: { uuid },
    });
  }

  async update(uuid: string, updateBookingDto: UpdateBookingDto) {
    await this.bookingRepository.update(uuid, updateBookingDto);
    return;
  }

  remove(uuid: string) {
    return `This action removes a #${uuid} booking`;
  }
}
