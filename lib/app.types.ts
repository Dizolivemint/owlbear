export interface Character {
  name?: string;
  appearance?: string;
  species: string;
  description: string;
  size: string;
  challenge_rating: number;
  attributes: {
    STR: number;
    DEX: number;
    CON: number;
    INT: number;
    WIS: number;
    CHA: number;
  };
  skills: [
    {
      skill: string;
      description: string;
    }
  ];
  actions: [
    {
    action: string;
    description: string;
    }
  ];
  reactions: [
    {
      reaction: string;
      description: string;
    }
  ];
}