import { Body, Controller, Post } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerDTO } from './dto/player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  async createPlayer(@Body() payload: PlayerDTO) {
    return await this.playerService.createOrUpdatePlayer(payload);
  }
}
