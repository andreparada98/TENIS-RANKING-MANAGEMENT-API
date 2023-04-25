import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerDTO } from './dto/player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersValidationParamsPipe } from './pipes/players-validations-params.pipe';

@Controller('players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() payload: PlayerDTO) {
    return await this.playerService.createOrUpdatePlayer(payload);
  }

  @Get()
  async getPlayers(@Query('email') email: string): Promise<Player[] | Player> {
    if (email) {
      return await this.playerService.getPlayerByEmail(email);
    } else {
      return await this.playerService.getAllPlayer();
    }
  }

  @Delete()
  async deletePlayer(
    @Query('email', PlayersValidationParamsPipe) email: string,
  ): Promise<void> {
    await this.playerService.deletePlayer(email);
  }
}
