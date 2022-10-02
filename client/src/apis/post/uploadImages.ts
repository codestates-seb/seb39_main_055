import { AxiosResponse } from "axios";

import { ThreadImages } from "../../types";
import { axiosInstance } from "../../utils";

/**
 * @param images 업로드되어야 하는 이미지는 file: Blob 객체, 이전에 이미 업로드되었던 이미지는 file: null.
 * @returns 서버에 업로드된 이미지 경로를 담은 배열을 반환(string[])
 */
const uploadImages = async (images: ThreadImages[]) => {
  // 업로드할 이미지와 그렇지 않은 이미지가 혼재되어 있을 경우 이미지의 순서를 유지하기 위해
  // images 배열 인덱스 -> 요청 데이터 배열 인덱스 맵핑
  const imageIdxMap = new Map();
  const formData = new FormData();
  let pendingUploadIdx = 0;

  images.forEach(({ file, id }, i) => {
    // 1. 유저가 첨부한 이미지(pending upload): file === Blob 객체
    // 2. 이전에 이미 업로드되었던 이미지(uploaded): file === null
    if (file) {
      const ext = file.type.split("/")[1];

      imageIdxMap.set(i, pendingUploadIdx);
      formData.append("files", file, `${id}.${ext}`);
      pendingUploadIdx += 1;
    }
  });

  // 업로드할 이미지가 없을 경우, 불필요한 API 요청을 보내지 않도록 함
  if (pendingUploadIdx < 1) return images.map(({ uri }) => uri);

  const { data } = await axiosInstance.post<AxiosResponse<string[]>>(
    "/v1/user/upload",
    formData,
    {
      headers: {
        tokenNeeded: true,
      },
    }
  );

  return images.map(({ uri }, i) => {
    const mappedIndex = imageIdxMap.get(i);

    if (mappedIndex >= 0) return data.data[mappedIndex];
    return uri;
  });
};

export default uploadImages;
