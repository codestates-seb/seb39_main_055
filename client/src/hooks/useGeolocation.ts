/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import {
  changeUserAddress,
  selectUser,
  selectUserInfos,
  useAppDispatch,
  useAppSelector,
} from "../redux";

const useGeolocation: () => [boolean] = () => {
  const dispatch = useAppDispatch();
  const { loginStatus } = useAppSelector(selectUser);
  const { longitude, latitude } = useAppSelector(selectUserInfos) || {};
  const [locPermission, setLocPermission] = useState(() => {
    if (!loginStatus) return false;
    // 로그인 상태에서는 유저의 위치 정보가 존재하므로 위치 정보 권한이 부여된 것으로 판단
    return true;
  });
  useEffect(() => {
    // 로그인 상태에서는 회원 정보의 위,경도를 이용
    if (loginStatus) return;

    const watcherId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        const { latitude: currentLat, longitude: currentLon } = coords;

        if (currentLat === latitude && currentLon === longitude) return;

        dispatch(
          changeUserAddress({ latitude: currentLat, longitude: currentLon })
        );
        setLocPermission(true);
      },
      (err) => {
        if (longitude || latitude) return;

        setLocPermission(false);
      },
      {
        maximumAge: 60 * 1000, // 1분
      }
    );

    return () => navigator.geolocation.clearWatch(watcherId);
  }, [longitude, latitude]);

  return [locPermission];
};

export default useGeolocation;
