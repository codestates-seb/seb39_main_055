import { Store } from "../types";

export const removePlaceFromLocalStorage = () => {
  localStorage.removeItem("recentPlace");
};

export const getPlaceFromLocalStorage = (): null | Store[] => {
  const result = localStorage.getItem("recentPlace");
  const place = result ? JSON.parse(result) : null;
  return place;
};

export const addPlaceToLocalStorage = (data: Store) => {
  let placeLocalStorageData = getPlaceFromLocalStorage();

  // 로컬 스토리지 데이터가 없을 경우 (첫 방문)
  if (!placeLocalStorageData) {
    placeLocalStorageData = [data];
    localStorage.setItem("recentPlace", JSON.stringify(placeLocalStorageData));
    return;
  }

  // 로컬 스토리지 데이터가 있을 경우 중복 제거
  const currentId = data.storeId;
  const mappedStoreId = placeLocalStorageData.map(
    (storageData) => storageData.storeId
  );

  if (!mappedStoreId.includes(currentId)) {
    placeLocalStorageData.push(data);
  }

  // 최근 방문 기록이 10개 이상일 경우 가장 오랜된 목록 제거
  if (placeLocalStorageData.length > 10) {
    placeLocalStorageData.shift();
  }

  localStorage.setItem("recentPlace", JSON.stringify(placeLocalStorageData));
};
