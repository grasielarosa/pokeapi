import React from "react";

import { usePokemons } from "../hooks";
import { Carousel, Circles } from "../components";
import "./home.scss";

const Home = () => {
  return (
    <div className="wrapper">
      <header className="wrapper__header">
        <h1>POKESEARCH</h1>
      </header>
      <main className="wrapper__main">
        <Circles />
      </main>
      <footer>
        <Carousel />
      </footer>
    </div>
  );
};

export { Home };
