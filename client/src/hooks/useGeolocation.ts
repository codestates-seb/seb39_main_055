/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import {
  changeUserAddress,
  selectUserInfos,
  useAppDispatch,
  useAppSelector,
} from "../redux";

const INITIAL_LOCATION = {
  address: "서울특별시 중구 세종대로 110",
  longitude: 126.97852781,
  latitude: 37.56660794,
};

const useGeolocation: () => [
  boolean,
  { address: string; longitude: number; latitude: number }
] = () => {
  const dispatch = useAppDispatch();
  const { nickname, longitude, latitude } =
    useAppSelector(selectUserInfos) || {};
  const [locPermission, setLocPermission] = useState(() => {
    if (!longitude && !nickname) return false;
    return true;
  });

  useEffect(() => {
    if (!longitude || !latitude) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;

          dispatch(changeUserAddress({ latitude, longitude }));
          setLocPermission(true);
        },
        (err) => {
          dispatch(changeUserAddress(INITIAL_LOCATION));
          setLocPermission(false);
        },
        {
          maximumAge: 1 * 1000, // 1분
        }
      );
    }
  }, [longitude, latitude]);

  return [locPermission, INITIAL_LOCATION];
};

export default useGeolocation;
