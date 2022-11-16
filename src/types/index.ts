export type PokeList = {
  name: string;
  url?: string;
  id: string;
  avatar: string;
};

export type CardInfo = {
  name: string;
  avatar: string;
  abilities: [] | undefined;
  experience: number | undefined;
  stats: [] | undefined;
  types: [] | undefined;
};
