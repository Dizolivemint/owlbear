export interface Character {
  name?: string;
  species: string;
  challenge_rating: number;
  attributes: {
    STR: number;
    DEX: number;
    CON: number;
    INT: number;
    WIS: number;
    CHA: number;
  };
  skills: Record<string, number>;
  actions: Record<string, string>;
  reactions: Record<string, string>;
  description: string;
  size: string;
}