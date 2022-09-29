import { useLocation } from "react-router-dom";

import { PlaceForm } from "../../../components";
import { Store } from "../../../types";

function storeDataTransfromer(storeImages: { storeImage: string }[]) {
  const transformedImgs = storeImages.map(({ storeImage }) => ({
    file: null,
    uri: storeImage,
    id: storeImage,
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
