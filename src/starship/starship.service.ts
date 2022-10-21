import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starship } from './entities/starship.entity';

@Injectable()
export class StarshipService {
  constructor(
    @InjectRepository(Starship)
    private readonly starshipRepository: Repository<Starship>,
  ) {}

  async create(createStarshipDto: CreateStarshipDto): Promise<Starship> {
    return await this.starshipRepository.save(createStarshipDto);
  }

  findAll(): Promise<Starship[]> {
    return this.starshipRepository.find();
  }

  async findOneByUUID(uuid: string) {
    return await this.starshipRepository.findOneByOrFail({ uuid }).catch(() => {
      throw new EntityNotFoundError(Starship, uuid);
    });
  }

  async update(uuid: string, updateStarshipDto: UpdateStarshipDto): Promise<Starship> {
    return await this.starshipRepository.save({ uuid, ...updateStarshipDto }).catch((e) => {
      throw new EntityNotFoundError(Starship, uuid);
    });
  }

  async remove(uuid: string) {
    return this.starshipRepository.delete(uuid).catch(() => {
      throw new EntityNotFoundError(Starship, uuid);
    });
  }
}
