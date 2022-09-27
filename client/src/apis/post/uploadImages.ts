import { AxiosResponse } from "axios";

import { ThreadImages } from "../../types";
import { axiosInstance } from "../../utils";

/**
 *
 * @param images 업로드되어야 하는 이미지는 file 속성으로 Blob 객체를 가져야 하며, 이전에 이미 업로드되었던 이미지는 file 속성으로 null 값을 가져야 함.
 * @returns 서버에 업로드된 이미지 경로를 담은 배열을 반환(string[])
 */
const uploadImages = async (images: ThreadImages[]) => {
  const needToUpload = new Map();
  const formData = new FormData();
  let responseIndex = 0;

  images.forEach(({ file, id }, i) => {
    // 1. 유저가 첨부한 이미지(pending upload): 로컬 경로(Blob://)만 존재
    // 2. 이전에 이미 업로드되었던 이미지(uploaded): file 속성 = null
    if (file) {
      const ext = file.type.split("/")[1];

      needToUpload.set(i, responseIndex); // image 배열 인덱스 -> 요청 데이터 배열 인덱스 맵핑
      formData.append("files", file, `${id}.${ext}`);
      responseIndex += 1;
    }
  });

  // 업로드할 이미지가 없을 경우 기존 URL 그대로 반환
  if (responseIndex < 1) return images.map(({ uri }) => uri);

  const { data } = await axiosInstance.post<AxiosResponse<string[]>>(
    "/v1/user/upload",
    formData,
    {
      headers: {
        tokenNeeded: true,
      },
    }
  );

  // 바로 전에 업로드한 이미지, 그렇지 않은 이미지가 혼재되어 있을 경우 이미지의 순서 유지
  return images.map(({ uri }, i) => {
    const mappedIndex = needToUpload.get(i);

    if (mappedIndex >= 0) return data.data[mappedIndex];
    return uri;
  });
};

export default uploadImages;
