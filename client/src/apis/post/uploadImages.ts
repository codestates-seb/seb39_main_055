import { AxiosResponse } from "axios";

import { ThreadImages } from "../../types";
import { axiosInstance } from "../../utils";

const uploadImages = async (images: ThreadImages[]) => {
  const needToUpload = new Map();
  const formData = new FormData();
  let responseIndex = 0;

  images.forEach(({ file, id }, i) => {
    if (file) {
      // 유저가 첨부한 이미지: 로컬 경로(Blob://)만 존재
      const ext = file.type.split("/")[1];

      needToUpload.set(i, responseIndex); // image 배열 인덱스 -> 요청 데이터 배열 인덱스 매핑
      formData.append("files", file, `${id}.${ext}`);
      responseIndex += 1;
    }
  });

  if (responseIndex < 1) return [];
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
