/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from "react";

import {
  changeLocationPermission,
  changeUserAddress,
  selectUser,
  selectUserInfos,
  useAppDispatch,
  useAppSelector,
} from "../redux";

type UseGeolocationReturn = () => [boolean];

const useGeolocation: UseGeolocationReturn = () => {
  const dispatch = useAppDispatch();
  const permissionRef = useRef<PermissionStatus>();
  const { loginStatus, locationPermission } = useAppSelector(selectUser);
  const { longitude, latitude } = useAppSelector(selectUserInfos) || {};

  const permissionHandler = useCallback(function (this: PermissionStatus) {
    const status = this.state === "granted";

    dispatch(changeLocationPermission(status));
  }, []);

  useEffect(() => {
    (async () => {
      const permissionStatus = await navigator.permissions.query({
        name: "geolocation",
      });

      permissionStatus.addEventListener("change", permissionHandler);
      permissionRef.current = permissionStatus;
    })();
  }, []);

  // permissionStatus의 이벤트 핸들러를 제거하기 위해 Effect 분리
  useEffect(() => {
    return () => {
      if (!permissionRef.current) return;

      permissionRef.current.removeEventListener("change", permissionHandler);
    };
  }, [locationPermission]);

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
        dispatch(changeLocationPermission(true));
      },
      (err) => {
        if (longitude || latitude) return;

        dispatch(changeLocationPermission(false));
      },
      {
        maximumAge: 60 * 1000, // 1분
      }
    );

    return () => navigator.geolocation.clearWatch(watcherId);
  }, [longitude, latitude, loginStatus]);

  return [locationPermission];
};

export default useGeolocation;
