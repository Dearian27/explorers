export interface IPlayer {
  id: number;
  index?: number; //? no sure is it needed
  name: string;
  role: string;
  isClone: boolean;
  wasClone: boolean;
  disabledCellIds: number[];
}
