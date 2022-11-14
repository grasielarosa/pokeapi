import React, { FC, useContext } from "react";
import { PokeContext } from "../../context/HighlightPokemon";
import { PokeList } from "../../types";

import "./style.scss";

interface Item {
  item: PokeList;
}

const Slider: FC<Item> = ({ item }) => {
  const { setCurrentPokemons } = useContext(PokeContext);

  const handleClick = (item: PokeList) => {
    const newId = Number(item.id);

    setCurrentPokemons({
      previus: { id: (newId - 1).toString(), name: item.name },
      current: { id: item.id, name: item.name },
      next: { id: (newId + 1).toString(), name: item.name },
    });
  };
  return (
    <div onClick={() => handleClick(item)} className="slider">
      <p
        style={{
          paddingInline: "0.4rem",
        }}
      >
        {item.name}
      </p>
    </div>
  );
};

export { Slider };
