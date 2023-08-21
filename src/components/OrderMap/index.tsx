import React, { useEffect, useState } from "react";
import { YMaps } from "@pbe/react-yandex-maps";

import { IOrderMap } from "./interface";

import Map from "../Map";

import bemClassName from "../../utils/bem";

import "./index.scss";

const orderMap = bemClassName("order-map");

const OrderMap: React.FC<IOrderMap> = ({ handleExternal }) => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (address && address !== "") {
      handleExternal(true);
    }
    // eslint-disable-next-line
  }, [address]);
  return (
    <>
      <p className={orderMap("text")}>Отметьте адрес доставки на карте</p>
      <YMaps
        query={{
          apikey: "84ecc9c6-c811-4f3c-a5dc-21cbf96b2db9",
        }}
      >
        <Map setAddress={setAddress} />
      </YMaps>
      <p className={orderMap("text")}>
        <b>Адрес доставки:</b> {address}
      </p>
    </>
  );
};

export default OrderMap;