import { useCallback, useContext, useEffect, useState } from "react";
import { getPokeInfo, getPokemons } from "../../api/api";
import { PokeContext } from "../../context/HighlightPokemons";
import { PokeList, CardInfo } from "../../types";

interface Category {
  name: string;
  value: number;
}

const usePokemons = () => {
  const { setCurrentPokemons } = useContext(PokeContext);
  const [list, setList] = useState<PokeList[]>();
  const [cardIsVisible, setCardIsVisible] = useState(false);
  const [cardInfo, setCardInfo] = useState<CardInfo>();

  const url =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

  const shortName = (name: string) => {
    switch (name) {
      case "attack":
        return "ATK";
        break;
      case "defense":
        return "DEF";
        break;
      case "special-attack":
        return "SATK";
        break;
      case "special-defense":
        return "SDEF";
        break;
      case "speed":
        return "SPD";
        break;
      default:
        return "HP";
    }
  };

  const handleClickOnList = (index: number) => {
    const previusCircle = list![index - 1];
    const mainCircle = list![index];
    const nextCircle = list![index + 1];

    setCurrentPokemons({
      previus: previusCircle,
      current: mainCircle,
      next: nextCircle,
    });
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
            name: shortName(item.stat.name),
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

  const teste = () => {
    getPokemons().then((items) => {
      setList(items);
    });

    setCurrentPokemons({
      previus: { id: "1", name: "bulbasaur", avatar: `${url}1.svg` },
      current: { id: "2", name: "ivysaur", avatar: `${url}2.svg` },
      next: { id: "3", name: "venusaur", avatar: `${url}3.svg` },
    });
  };

  useEffect(() => {
    if (!list) {
      console.log("change");
      teste();
    }
  }, []);

  // useCallback(() => {
  //   teste();
  // }, []);

  return {
    list,
    cardIsVisible,
    cardInfo,
    handleClickOnList,
    handleClickCard,
    setCardIsVisible,
  };
};

export { usePokemons };
