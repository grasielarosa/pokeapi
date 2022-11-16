import { useContext, useEffect } from "react";
import { PokeContext } from "../../context/HighlightPokemons";
import { usePokemons } from "../../hooks";
import { Modal } from "../Modal";
import "./circles.scss";

const Circles = () => {
  const { currentPokemons } = useContext(PokeContext);
  const { handleClickCard, cardIsVisible, setCardIsVisible, cardInfo } =
    usePokemons();
  const onKeyDown = (e: { key: string }) => {
    if (e.key === "Escape") setCardIsVisible(false);
  };
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div className="circles-box">
        <div
          className="circles-box__small"
          onClick={() => handleClickCard(currentPokemons!.previus!.name)}
        >
          <img src={currentPokemons?.previus?.avatar} alt="" />
          <p>previus</p>
        </div>

        <div
          className="circles-box__big circles-box__big front "
          onClick={() => handleClickCard(currentPokemons!.current!.name)}
        >
          <img src={currentPokemons?.current?.avatar} alt="" />
        </div>

        <div
          className="circles-box__small"
          onClick={() => handleClickCard(currentPokemons!.next!.name)}
        >
          <img src={currentPokemons?.next?.avatar} alt="" />
          <p>next</p>
        </div>
      </div>
      {cardIsVisible && cardInfo && (
        <Modal cardInfo={cardInfo} close={setCardIsVisible} />
      )}
    </>
  );
};

export { Circles };
