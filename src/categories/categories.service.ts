import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategorieDTO } from './dtos/create-categorie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CategoriesInterface } from './interfaces/categories.interface';
import { Model } from 'mongoose';
import { UpdateCategorieDTO } from './dtos/update-categorie.dto';
import { PlayersService } from 'src/players/players.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Categorie')
    private readonly categorieModel: Model<CategoriesInterface>,
    private readonly playersService: PlayersService,
  ) {}

  async createCategorie(
    payload: CreateCategorieDTO,
  ): Promise<CategoriesInterface> {
    const { categorie } = payload;

    const existCategorie = await this.categorieModel
      .findOne({ categorie })
      .exec();

    if (existCategorie) {
      throw new ConflictException('This categorie already exist');
    }

    const createdCategory = new this.categorieModel(payload);

    return await createdCategory.save();
  }

  async getAllCategories(): Promise<CategoriesInterface[]> {
    return await this.categorieModel.find().populate('players').exec();
  }

  async getCategorieById(_id: string): Promise<CategoriesInterface> {
    const existCategorie = await this.categorieModel.findOne({ _id }).exec();

    if (!existCategorie) {
      throw new NotFoundException('Categorie doesnt exists');
    }
    return existCategorie;
  }

  async updateCategorie(
    payload: UpdateCategorieDTO,
    categorie: string,
  ): Promise<void> {
    const existCategorie = await this.categorieModel.find({ categorie }).exec();

    if (!existCategorie) {
      throw new NotFoundException('Categorie doesnt exists');
    }

    this.categorieModel
      .findOneAndUpdate(
        {
          categorie,
        },
        { $set: payload },
      )
      .exec();
  }

  async connectCategorieToPlayer(params: string[]): Promise<void> {
    const categorie = params['categorie'];
    const idPlayer = params['idPlayer'];

    const existCategorie = await this.categorieModel
      .findOne({ categorie })
      .exec();

    const playerAlreadyCreatedCategory = await this.categorieModel
      .find({
        categorie,
      })
      .where('players')
      .in(idPlayer)
      .exec();

    if (playerAlreadyCreatedCategory.length > 0) {
      throw new BadRequestException('Player already has category');
    }
    await this.playersService.getPlayerById(idPlayer);

    if (!existCategorie) {
      throw new NotFoundException('Categorie doesnt exists');
    }

    existCategorie.players.push(idPlayer);
    await this.categorieModel
      .findOneAndUpdate(
        {
          categorie,
        },
        {
          $set: existCategorie,
        },
      )
      .exec();
  }
}
