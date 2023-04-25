import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdatePlayerDTO {
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  name: string;
}
