import { CategoriesService } from './categories.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategorieDTO } from './dtos/create-categorie.dto';
import { CategoriesInterface } from './interfaces/categories.interface';
import { UpdateCategorieDTO } from './dtos/update-categorie.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategorie(
    @Body() payload: CreateCategorieDTO,
  ): Promise<CategoriesInterface> {
    return await this.categoriesService.createCategorie(payload);
  }

  @Get()
  async getCategories(): Promise<CategoriesInterface[]> {
    return await this.categoriesService.getAllCategories();
  }

  @Get(':categorie')
  async getCategorieById(
    @Param('categorie') categorie: string,
  ): Promise<CategoriesInterface> {
    return await this.categoriesService.getCategorieById(categorie);
  }

  @Put(':categorie')
  @UsePipes(ValidationPipe)
  async updateCategorie(
    @Body() payload: UpdateCategorieDTO,
    @Param('categorie') categorie: string,
  ): Promise<void> {
    return await this.categoriesService.updateCategorie(payload, categorie);
  }

  @Post(':categorie/player/:idPlayer')
  async connectCategorieToPlayer(@Param() params: string[]): Promise<void> {
    return await this.categoriesService.connectCategorieToPlayer(params);
  }
}
