import React, { useContext, useEffect, useState } from "react";
import { getPokemons } from "../api/api";
import { Carousel } from "../components";
import { PokeContext } from "../context/HighlightPokemon";
import { PokeList } from "../types";

import "./home.scss";

const Circles = () => {
  const { currentPokemons, setCurrentPokemons } = useContext(PokeContext);

  useEffect(() => {
    setCurrentPokemons({
      previus: { id: "1", name: "Bulbasaur" },
      current: { id: "2", name: "Ivisaur" },
      next: { id: "3", name: "Venusaur" },
    });
  }, []);
  const url =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  return (
    <div className="circles-box">
      <div className="circles-box__small">
        <img src={`${url}${currentPokemons?.previus?.id}.png`} alt="" />
      </div>
      <div className="circles-box__big">
        <img src={`${url}${currentPokemons?.current?.id}.png`} alt="" />
      </div>
      <div className="circles-box__small">
        <img
          src={`${url}${currentPokemons?.next?.id}.png`}
          alt=""
          style={{ maxWidth: "100%", display: "block", marginInline: "auto" }}
        />
      </div>
    </div>
  );
};

const Home = () => {
  const { setCurrentPokemons } = useContext(PokeContext);
  const [list, setList] = useState<PokeList[]>();

  useEffect(() => {
    getPokemons().then((itens) => setList(itens));
    if (list) {
      setCurrentPokemons({
        previus: {
          name: list![0].name,
          id: list![0].id,
          url: list![0].url,
        },
        current: {
          name: list![1].name,
          id: list![1].id,
          url: list![1].url,
        },
        next: {
          name: list![2].name,
          id: list![2].id,
          url: list![2].url,
        },
      });
    }
  }, []);
  return (
    <>
      <main>
        <div className="header">
          <h1>POKESEARCH</h1>
        </div>
        <Circles />
      </main>
      <Carousel list={list} />
    </>
  );
};

export { Home };
