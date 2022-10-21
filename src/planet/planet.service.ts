import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './entities/planet.entity';

@Injectable()
export class PlanetService {
  constructor(
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
  ) {}

  create(createPlanetDto: CreatePlanetDto) {
    return this.planetRepository.save(createPlanetDto);
  }

  findAll(): Promise<Planet[]> {
    return this.planetRepository.find();
  }

  async findOneByUUID(uuid: string): Promise<Planet> {
    try {
      return await this.planetRepository.findOneOrFail({ where: { uuid } });
    } catch (e) {
      throw EntityNotFoundError;
    }
  }

  async update(uuid: string, updatePlanetDto: UpdatePlanetDto): Promise<Planet> {
    const planet = await this.findOneByUUID(uuid)
      .then(({ id }) => {
        return this.planetRepository.save({ id, ...updatePlanetDto });
      })
      .catch(() => {
        throw new EntityNotFoundError(Planet, uuid);
      });

    return planet;
  }

  async remove(uuid: string) {
    return await this.planetRepository.delete(uuid).catch(() => {
      throw new EntityNotFoundError(Planet, uuid);
    });
  }
}
