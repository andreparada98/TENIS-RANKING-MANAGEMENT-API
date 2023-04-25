import { IsEmail, IsNotEmpty } from 'class-validator';

export class PlayerDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  name: string;
  ranking: string;
  positionRanking: number;
  urlPhotoPlayer: string;
}
