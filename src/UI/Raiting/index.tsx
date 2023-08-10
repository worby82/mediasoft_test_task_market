import { useEffect, useState } from "react";

import Icon from "../Icon";

import { IRaiting } from "./interface";
import bemClassName from "../../utils/bem";

import "./index.scss";

const raiting = bemClassName("raiting");

const Raiting: React.FC<IRaiting> = ({
  count,
  externalClassName = "",
  full,
  reviews_count,
}) => {
  const [countValue, setCountValue] = useState(0);

  useEffect(() => {
    if (count) {
      setCountValue(count);
    }
  }, []);
  return (
    <div className={`${raiting()} ${externalClassName}`}>
      {count ? (
        <>
          {full && (
            <p className={raiting("text")}>
              {Math.floor(count)},{Math.floor((count % 1) * Math.pow(10, 1))}
            </p>
          )}
          <div className={raiting("stars")}>
            {[...Array(5)].map((item, id) => {
              return (
                <div key={id} className={raiting("item")}>
                  <Icon iconName="star" externalClassName={raiting("icon")} />
                  {id + 1 <= Math.trunc(count) && (
                    <div className={raiting("gold-icon-wrapper")}>
                      <Icon
                        iconName="star"
                        externalClassName={raiting("icon", { gold: true })}
                      />
                    </div>
                  )}
                  {id + 1 === Math.trunc(count) + 1 &&
                    Math.floor((count % 1) * 100) > 0 && (
                      <div
                        className={raiting("gold-icon-wrapper")}
                        style={{ width: `${Math.floor((count % 1) * 100)}%` }}
                      >
                        <Icon
                          iconName="star"
                          externalClassName={raiting("icon", { gold: true })}
                        />
                      </div>
                    )}
                </div>
              );
            })}
          </div>
          {reviews_count && (
            <p className={raiting("reviews-count")}>{reviews_count} отзывов</p>
          )}
        </>
      ) : (
        <div className={raiting("stars")}>
          {[...Array(5)].map((item, id) => {
            return (
              <div
                key={id}
                className={raiting("item", { clickable: !count })}
                onClick={() => setCountValue(id + 1)}
              >
                <Icon iconName="star" externalClassName={raiting("icon")} />
                {id + 1 <= Math.trunc(countValue) && (
                  <div className={raiting("gold-icon-wrapper")}>
                    <Icon
                      iconName="star"
                      externalClassName={raiting("icon", { gold: true })}
                    />
                  </div>
                )}
                {id + 1 === Math.trunc(countValue) + 1 &&
                  Math.floor((countValue % 1) * 100) > 0 && (
                    <div
                      className={raiting("gold-icon-wrapper")}
                      style={{
                        width: `${Math.floor((countValue % 1) * 100)}%`,
                      }}
                    >
                      <Icon
                        iconName="star"
                        externalClassName={raiting("icon", { gold: true })}
                      />
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Raiting;