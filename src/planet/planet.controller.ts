import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { PlanetService } from './planet.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './entities/planet.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('planets')
@Controller({ path: '/planets', version: '1' })
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Post()
  create(@Body() createPlanetDto: CreatePlanetDto) {
    return this.planetService.create(createPlanetDto);
  }

  @Post('/many')
  async createMany(@Body() starships: CreatePlanetDto[]) {
    return Promise.all(
      starships.map(async (starship) => {
        return await this.planetService.create(starship);
      }),
    ).then((val) => {
      return val;
    });
  }

  @Get()
  findAll() {
    return this.planetService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string): Promise<Planet> {
    return this.planetService.findOneByUUID(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid', new ParseUUIDPipe()) uuid: string, @Body() updatePlanetDto: UpdatePlanetDto) {
    return this.planetService.update(uuid, updatePlanetDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.planetService.remove(uuid);
  }
}
