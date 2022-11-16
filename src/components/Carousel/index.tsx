import React, { FC, MutableRefObject, useRef } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import { usePokemons } from "../../hooks";
import "./carousel.scss";

const Carousel: FC = () => {
  const { list, handleClickOnList } = usePokemons();
  const slideList = useRef() as MutableRefObject<HTMLDivElement>;

  const handleClick = (direction: string) => {
    if (slideList.current.children.length > 0) {
      const firstSlide = slideList.current.children[0];
      const index = slideList.current.children.length - 1;
      const lastSlide = slideList.current.children[index];
      const slideSize = firstSlide.clientWidth;
      const moveSquares = direction === "next" ? slideSize : -slideSize;

      slideList.current.scrollBy(moveSquares, 0);

      direction === "next"
        ? slideList.current.appendChild(firstSlide)
        : slideList.current.insertBefore(
            lastSlide,
            slideList.current.firstChild
          );
    }
  };
  return (
    <aside>
      <p className="title">Find your Pokemon</p>

      <div className="container">
        <div className="container__sliders" ref={slideList}>
          {list?.map((elem, index) => (
            <button
              onClick={() => handleClickOnList(index)}
              className="container__slider"
            >
              <p>{elem.name}</p>
            </button>
          ))}
        </div>
        <button
          className="container__buttons container__buttons--left"
          onClick={() => handleClick("previous")}
        >
          <SlArrowLeft size={60} />
        </button>
        <button
          className="container__buttons container__buttons--right"
          onClick={() => handleClick("next")}
        >
          <SlArrowRight size={60} />
        </button>
      </div>
    </aside>
  );
};

export { Carousel };
