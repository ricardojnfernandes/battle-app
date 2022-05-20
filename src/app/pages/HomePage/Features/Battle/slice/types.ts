import { Repo } from 'types/Repo';

/* --- STATE --- */
export interface BattleState {
  userid: string | undefined;
  loading: boolean;
  champion: ChampionEnum;
  points: number;
  error?: BattleErrorType | null;
}

export enum ChampionEnum {
  NoChampion = 0,
  Godzilla = 1, 
  HarryPotter = 2,
  SpiderMan = 3
}

export enum BattleErrorType {
  RESPONSE_ERROR = 1,
}

export interface SignupOutput {
  id: string;
  champion: ChampionEnum;
}

export interface ClientPunch {
  id: string;
  punches: number;
}

export interface GameData {
  Running: boolean;
  Standings: any;
}


/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = BattleState;
