import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { StarshipService } from './starship.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starship } from './entities/starship.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('starships')
@Controller({ path: '/starships', version: '1' })
export class StarshipController {
  constructor(private readonly starshipService: StarshipService) {}

  @Post()
  create(@Body() createStarshipDto: CreateStarshipDto) {
    return this.starshipService.create(createStarshipDto);
  }

  @Post('/many')
  async createMany(@Body() starships: CreateStarshipDto[]) {
    return Promise.all(
      starships.map(async (starship) => {
        return await this.starshipService.create(starship);
      }),
    ).then((val) => {
      return val;
    });
  }

  @Get()
  async findAll(): Promise<Starship[]> {
    return await this.starshipService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.starshipService.findOneByUUID(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid', new ParseUUIDPipe()) uuid: string, @Body() updateStarshipDto: UpdateStarshipDto) {
    return this.starshipService.update(uuid, updateStarshipDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.starshipService.remove(uuid);
  }
}
