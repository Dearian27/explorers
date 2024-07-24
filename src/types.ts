export interface RoleParams {
  id: number;
  isEvil: boolean;
  name: string;
  value: number;
  minCount?: number;
  mandatory?: boolean;
  single?: boolean;
}

export interface PlayerMessage {
  id: number;
  playerId: number;
  text: string;
}
