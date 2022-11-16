import React from "react";
import { PokeProvider } from "./context/HighlightPokemons";
import { Home } from "./screens/Home";
import "./styles/style.scss";

function App() {
  return (
    <PokeProvider>
      <Home />
    </PokeProvider>
  );
}

export default App;
