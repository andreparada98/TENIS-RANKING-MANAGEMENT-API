import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';

export interface CategoriesInterface extends Document {
  readonly categorie: string;
  description: string;
  events: Array<TenisEvent>;
  players: Array<Player>;
}

export interface TenisEvent {
  name: string;
  operation: string;
  value: number;
}
