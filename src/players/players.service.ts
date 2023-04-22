import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PlayerDTO } from './dto/player.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async createOrUpdatePlayer(payload: PlayerDTO): Promise<void> {
    const { email } = payload;

    const playerFind = await this.playerModel
      .findOne({
        email: email,
      })
      .exec();

    if (playerFind) {
      await this.updatePlayer(payload);
    } else {
      await this.createPlayer(payload);
    }
  }

  private async createPlayer(payload: PlayerDTO): Promise<Player> {
    const createdPLayer = new this.playerModel(payload);
    return await createdPLayer.save();
  }

  private async updatePlayer(payload: PlayerDTO): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate(
        {
          email: payload.email,
        },
        {
          $set: payload,
        },
      )
      .exec();
  }

  async getAllPlayer(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    const findPlayer = await this.playerModel.findOne({ email }).exec();
    if (!findPlayer) {
      throw new NotFoundException(`Player with e-mail ${email} not found`);
    }
    return findPlayer;
  }

  async deletePlayer(email: string): Promise<any> {
    return await this.playerModel.deleteOne({ email }).exec;
  }
}
