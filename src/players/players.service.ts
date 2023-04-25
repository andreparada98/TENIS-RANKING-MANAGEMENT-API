import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PlayerDTO } from './dto/player.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from './interfaces/player.interface';
import { UpdatePlayerDTO } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async createPlayer(payload: PlayerDTO): Promise<Player> {
    const { email } = payload;

    const playerFind = await this.playerModel
      .findOne({
        email: email,
      })
      .exec();

    if (playerFind) {
      throw new ConflictException('User already exists');
    } else {
      const createdPLayer = new this.playerModel(payload);
      return await createdPLayer.save();
    }
  }

  async updatePlayer(_id: string, payload: UpdatePlayerDTO): Promise<Player> {
    const playerFind = await this.playerModel
      .findOne({
        _id,
      })
      .exec();

    if (!playerFind) {
      throw new NotFoundException('Player not found');
    }
    return await this.playerModel
      .findOneAndUpdate(
        {
          _id,
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

  async getPlayerById(_id: string): Promise<Player> {
    const findPlayer = await this.playerModel.findOne({ _id }).exec();
    if (!findPlayer) {
      throw new NotFoundException(`Player with id ${_id} not found`);
    }
    return findPlayer;
  }

  async deletePlayer(_id: string): Promise<any> {
    const findPlayer = await this.playerModel.findOne({ _id }).exec();
    if (!findPlayer) {
      throw new NotFoundException(`Player with id ${_id} not found`);
    }
    return await this.playerModel.deleteOne({ _id }).exec;
  }
}
