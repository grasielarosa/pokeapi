import { useContext, useEffect, useState } from "react";
import { getPokeInfo, getPokemons } from "../../api/api";
import { PokeContext } from "../../context/HighlightPokemons";
import { nameShortener } from "../../helpers/functions";
import { PokeList, CardInfo } from "../../types";

interface Category {
  name: string;
  value: number;
}

const usePokemons = () => {
  const { currentPokemons, setCurrentPokemons } = useContext(PokeContext);
  const [list, setList] = useState<PokeList[]>();
  const [cardIsVisible, setCardIsVisible] = useState(false);
  const [cardInfo, setCardInfo] = useState<CardInfo>();

  const url =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

  const handleClickOnList = (index: number) => {
    if (index === 0 || index >= 900) {
      if (index === 0) {
        const previousCircle = list![899];
        const mainCircle = list![index];
        const nextCircle = list![index + 1];
        setCurrentPokemons({
          previous: previousCircle,
          current: mainCircle,
          next: nextCircle,
        });
      }
      if (index === 900) {
        const previousCircle = list![899];
        const mainCircle = list![900];
        const nextCircle = list![0];
        setCurrentPokemons({
          previous: previousCircle,
          current: mainCircle,
          next: nextCircle,
        });
      }
    } else {
      const previousCircle = list![index - 1];
      const mainCircle = list![index];
      const nextCircle = list![index + 1];
      setCurrentPokemons({
        previous: previousCircle,
        current: mainCircle,
        next: nextCircle,
      });
    }
  };

  const handleClickCard = (name: string) => {
    getPokeInfo(name).then((response) => {
      const mainTypes = response.types.map(
        (item: { type: { name: string } }) => item.type.name
      );
      const mainAbilities = response.abilities.map(
        (item: { ability: { name: string } }) => item.ability.name
      );
      const mainStats = response.stats.map(
        (item: { base_stat: number; stat: { name: string } }) => {
          const percent = (100 * item.base_stat) / 200;
          const statistics: Category = {
            name: nameShortener(item.stat.name),
            value: percent,
          };
          return statistics;
        }
      );
      setCardInfo({
        name: response.name,
        avatar: response.sprites.other.dream_world.front_default,
        types: mainTypes,
        experience: response.base_experience,
        abilities: mainAbilities,
        stats: mainStats,
      });
    });
    setCardIsVisible(true);
  };

  const handleClickButton = (direction: string) => {
    if (direction === "next") {
      const previousCircle = currentPokemons?.current;
      const mainCircle = currentPokemons?.next;
      const newPokemon = Number(currentPokemons!.next?.id) + 1;
      const nextCircle =
        newPokemon > 900
          ? list![0]
          : list!.find((item) => item.id === newPokemon.toString());

      setCurrentPokemons({
        previous: previousCircle,
        current: mainCircle,
        next: nextCircle,
      });
    }
    if (direction === "previous") {
      const newPokemon = Number(currentPokemons!.previous?.id) - 1;
      const previousCircle =
        newPokemon === 0
          ? list![899]
          : list!.find((item) => item.id === newPokemon.toString());
      const mainCircle = currentPokemons?.previous;
      const nextCircle = currentPokemons?.current;

      setCurrentPokemons({
        previous: previousCircle,
        current: mainCircle,
        next: nextCircle,
      });
    }
  };

  const loadList = () => {
    getPokemons().then((items) => {
      setList(items);
    });

    setCurrentPokemons({
      previous: { id: "1", name: "bulbasaur", avatar: `${url}1.svg` },
      current: { id: "2", name: "ivysaur", avatar: `${url}2.svg` },
      next: { id: "3", name: "venusaur", avatar: `${url}3.svg` },
    });
  };

  useEffect(() => {
    loadList();
  }, []);

  return {
    list,
    cardIsVisible,
    cardInfo,
    handleClickOnList,
    handleClickCard,
    handleClickButton,
    setCardIsVisible,
  };
};

export { usePokemons };
