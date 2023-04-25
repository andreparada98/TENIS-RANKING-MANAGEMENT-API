import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerDTO } from './dto/player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersValidationParamsPipe } from './pipes/players-validations-params.pipe';
import { UpdatePlayerDTO } from './dto/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() payload: PlayerDTO) {
    return await this.playerService.createPlayer(payload);
  }

  @Put(':_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() payload: UpdatePlayerDTO,
    @Param('_id', PlayersValidationParamsPipe) _id: string,
  ): Promise<Player> {
    return await this.playerService.updatePlayer(_id, payload);
  }

  @Get()
  async getAllPlayers(): Promise<Player[]> {
    return await this.playerService.getAllPlayer();
  }

  @Get('/:_id')
  async getPlayerById(
    @Param('_id', PlayersValidationParamsPipe) _id: string,
  ): Promise<Player> {
    return await this.playerService.getPlayerById(_id);
  }

  @Delete(':_id')
  async deletePlayer(
    @Param('_id', PlayersValidationParamsPipe) _id: string,
  ): Promise<void> {
    this.playerService.deletePlayer(_id);
  }
}
