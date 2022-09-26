import { useLocation } from "react-router-dom";

import { PlaceForm } from "../../../components";
import { Store } from "../../../types";

function storeDataTransfromer(storeImages: { storeImage: string }[]) {
  const transformedImgs = storeImages.map(({ storeImage }) => ({
    file: null,
    uri: storeImage,
    id: storeImage, // 이미지 md5를 직접 계산하기에는 성능 저하 우려가 있어 url로 대신 사용
  }));

  return transformedImgs;
}

interface LocationWithState {
  state: Store;
}

const EditPlace = () => {
  const { state } = useLocation() as LocationWithState;
  return (
    <PlaceForm
      isEditPage
      state={{ ...state, storeImages: storeDataTransfromer(state.storeImages) }}
    />
  );
};

export default EditPlace;
