import { useContext, useEffect } from "react";

import { PokeContext } from "../../context/HighlightPokemons";
import { usePokemons } from "../../hooks";
import { Modal } from "../Modal";
import defaultImage from "../../assets/images/failure.png";
import "./circles.scss";

const Circles = () => {
  const { currentPokemons } = useContext(PokeContext);

  const {
    handleClickCard,
    cardIsVisible,
    setCardIsVisible,
    cardInfo,
    handleClickButton,
  } = usePokemons();

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
          onClick={() => handleClickButton("previous")}
        >
          <img
            src={currentPokemons?.previous?.avatar}
            alt={`${currentPokemons?.previous?.name} image`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = defaultImage;
            }}
          />

          <p>previous</p>
        </div>

        <div
          className="circles-box__big circles-box__big front "
          onClick={() => handleClickCard(currentPokemons!.current!.name)}
        >
          <img
            src={currentPokemons?.current?.avatar}
            alt={`${currentPokemons?.current?.name} image`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = defaultImage;
            }}
          />
        </div>

        <div
          className="circles-box__small"
          onClick={() => handleClickButton("next")}
        >
          <img
            src={currentPokemons?.next?.avatar}
            alt={`${currentPokemons?.next?.name} image`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = defaultImage;
            }}
          />

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
