import React, { FC } from "react";
import { SlArrowLeft } from "react-icons/sl";
import * as Progress from "@radix-ui/react-progress";

import { CardInfo } from "../../types";
import "./modal.scss";

interface Props {
  cardInfo: CardInfo;
  close: (arg0: boolean) => void;
}
interface Category {
  name: string;
  value: number;
}
const Modal: FC<Props> = ({ cardInfo, close }) => {
  return (
    <div className="overlay">
      <div className="card">
        <div className="card__header">
          <div onClick={() => close(false)}>
            <SlArrowLeft />
          </div>
          <h2>{cardInfo.name.toUpperCase()}</h2>
          <div></div>
        </div>
        <div className="card__image">
          <img src={cardInfo?.avatar} alt="" />
        </div>
        <div className="card__content">
          <div className="card__content--type-container">
            {cardInfo.types &&
              cardInfo.types.map((item) => (
                <span className="card__content--type-container__span">
                  {item}
                </span>
              ))}
          </div>
          <div className="card__content--abilities-container">
            {cardInfo.abilities && (
              <>
                <h3>abilities</h3>
                {cardInfo.abilities.map((item) => (
                  <small>{item}</small>
                ))}
              </>
            )}
          </div>
          <div className="card__content--stats-container">
            {cardInfo.stats && (
              <>
                <h3>base stats</h3>
                {cardInfo.stats.map((item: Category) => {
                  return (
                    <div className="stats-table">
                      <strong>{item.name}: </strong>
                      <Progress.Root
                        className="stats-table__progress-root"
                        value={item.value}
                      >
                        <Progress.Indicator
                          className="stats-table__progress-indicator"
                          style={{
                            transform: `translateX(-${100 - item.value}%)`,
                          }}
                        />
                      </Progress.Root>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Modal };
