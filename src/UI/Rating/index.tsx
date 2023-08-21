import { useEffect, useState } from "react";

import Icon from "../Icon";

import { IRating } from "./interface";
import bemClassName from "../../utils/bem";

import "./index.scss";

const rating = bemClassName("rating");

const Rating: React.FC<IRating> = ({
  count,
  externalClassName = "",
  full,
}) => {
  const [countValue, setCountValue] = useState(0);

  useEffect(() => {
    if (count) {
      setCountValue(count);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className={`${rating()} ${externalClassName}`}>
      {count ? (
        <>
          {full && (
            <p className={rating("text")}>
              {Math.floor(count)},{Math.floor((count % 1) * Math.pow(10, 1))}
            </p>
          )}
          <div className={rating("stars")}>
            {[...Array(5)].map((item, id) => {
              return (
                <div key={id} className={rating("item")}>
                  <Icon iconName="star" externalClassName={rating("icon")} />
                  {id + 1 <= Math.trunc(count) && (
                    <div className={rating("gold-icon-wrapper")}>
                      <Icon
                        iconName="star"
                        externalClassName={rating("icon", { gold: true })}
                      />
                    </div>
                  )}
                  {id + 1 === Math.trunc(count) + 1 &&
                    Math.floor((count % 1) * 100) > 0 && (
                      <div
                        className={rating("gold-icon-wrapper")}
                        style={{ width: `${Math.floor((count % 1) * 100)}%` }}
                      >
                        <Icon
                          iconName="star"
                          externalClassName={rating("icon", { gold: true })}
                        />
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className={rating("stars")}>
          {[...Array(5)].map((item, id) => {
            return (
              <div
                key={id}
                className={rating("item", { clickable: !count })}
                onClick={() => setCountValue(id + 1)}
              >
                <Icon iconName="star" externalClassName={rating("icon")} />
                {id + 1 <= Math.trunc(countValue) && (
                  <div className={rating("gold-icon-wrapper")}>
                    <Icon
                      iconName="star"
                      externalClassName={rating("icon", { gold: true })}
                    />
                  </div>
                )}
                {id + 1 === Math.trunc(countValue) + 1 &&
                  Math.floor((countValue % 1) * 100) > 0 && (
                    <div
                      className={rating("gold-icon-wrapper")}
                      style={{
                        width: `${Math.floor((countValue % 1) * 100)}%`,
                      }}
                    >
                      <Icon
                        iconName="star"
                        externalClassName={rating("icon", { gold: true })}
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

export default Rating;