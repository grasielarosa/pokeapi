import React, { FC } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import { Slider } from "../Slider";
import { PokeList } from "../../types";
import "./style.scss";

interface List {
  list: PokeList[] | undefined;
}

const Carousel: FC<List> = ({ list }) => {
  return (
    <aside>
      <p className="title">Find your Pokemon</p>

      <div className="container">
        <div className="container__sliders">
          {list?.map((elem) => (
            <Slider key={elem.id} item={elem} />
          ))}
        </div>
        <button className="left">
          <SlArrowLeft size={60} />
        </button>
        <button className="right">
          <SlArrowRight size={60} />
        </button>
      </div>
    </aside>
  );
};

export { Carousel };
