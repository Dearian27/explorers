export interface IPlayer {
  id: number;
  name: string;
  role: string;
  isClone: boolean;
  cloneStartDay?: number; //?  mean start day of setting isClone to true
  disabledCellIds: number[];
}
