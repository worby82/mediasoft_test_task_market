import { useEffect, useRef, useState } from "react";
import { useYMaps } from "@pbe/react-yandex-maps";

import { IAppMap } from "./interface";

import bemClassName from "../../utils/bem";

const mapClass = bemClassName("map");

const Map: React.FC<IAppMap> = ({ setAddress }) => {
  const mapRef = useRef(null);
  const ymaps = useYMaps([
    "Map",
    "geolocation",
    "geocode",
    "Placemark",
    "control.GeolocationControl",
    "control.SearchControl",
    "control.ZoomControl",
  ]);
  const [location, setLocation] = useState<Array<number>>([55.75, 37.57]);
  const [map, setMap] = useState<ymaps.Map | null>(null);
  const [placemark, setPlacemark] = useState<ymaps.Placemark | null>(null);

  const handleClickMap = (event: ymaps.IEvent<MouseEvent, {}>) => {
    const coord = event.get("coords");
    setLocation(coord);
    if (ymaps) {
      ymaps.geocode(coord).then((res: any) => {
        setAddress(res.geoObjects.get(0).getAddressLine());
      });
    }
  };

  useEffect(() => {
    if (map && ymaps) {
      map.setCenter(location);
      if (placemark) {
        placemark.geometry?.setCoordinates(location);
      }
    }
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }
    const myPlacemark = new ymaps.Placemark(location, {});
    const myMap = new ymaps.Map(mapRef.current, {
      center: location,
      zoom: 17,
    });
    myMap.geoObjects.add(myPlacemark);
    myMap.controls.add(new ymaps.control.ZoomControl());
    myMap.controls.add(new ymaps.control.GeolocationControl());
    myMap.controls.add(
      new ymaps.control.SearchControl({
        options: {
          size: "small",
          provider: "yandex#search",
        },
      })
    );
    myMap.events.add("click", handleClickMap);
    setMap(myMap);
    setPlacemark(myPlacemark);
    ymaps.geolocation
      .get({
        mapStateAutoApply: true,
      })
      .then(
        (result: any) => {
          setAddress(result.geoObjects.get(0).properties.get("text"));
          setLocation(result.geoObjects.get(0).geometry.getCoordinates());
        },
        (err: any) => {
          console.log("Ошибка: " + err);
        }
      );
      // eslint-disable-next-line
  }, [ymaps]);

  return (
    <div
      ref={mapRef}
      className={mapClass()}
      style={{ width: "100%", height: "340px" }}
    />
  );
};

export default Map;