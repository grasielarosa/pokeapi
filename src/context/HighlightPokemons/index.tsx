import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { PokeList } from "../../types";

type HighlightPokemons = {
  previous: PokeList;
  current: PokeList;
  next: PokeList;
};

type ContextType = {
  currentPokemons?: Partial<HighlightPokemons | undefined>;
  setCurrentPokemons: Dispatch<
    SetStateAction<Partial<HighlightPokemons | undefined>>
  >;
};
const PokeContext = createContext<ContextType>({
  currentPokemons: {},
  setCurrentPokemons: () => undefined,
});

interface Props {
  children: ReactNode;
}
const PokeProvider: FC<Props> = ({ children }) => {
  const [currentPokemons, setCurrentPokemons] =
    useState<Partial<HighlightPokemons | undefined>>();
  return (
    <PokeContext.Provider value={{ currentPokemons, setCurrentPokemons }}>
      {children}
    </PokeContext.Provider>
  );
};

export { PokeContext, PokeProvider };
