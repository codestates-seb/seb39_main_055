/* eslint-disable consistent-return */
import { Editor } from "@toast-ui/react-editor";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import styled, { css } from "styled-components";

import { colors, mobile, tablet } from "../../../assets";
import { ButtonOrange, CustomEditor } from "../../../components";
import { axiosInstance } from "../../../utils";
import { isArrayOfString } from "../../../utils/type-guards";
import PreviewImages from "./PreviewImages";

const SForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  row-gap: 25px;
  height: 1050px;
`;

const SBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 80vw;
`;

const SPostSection = styled.section`
  width: 70%;
  row-gap: 30px;
  display: flex;
  flex-flow: column nowrap;
`;

const SH1 = styled.h1`
  align-self: flex-start;
  height: max-content;
  font-size: 42px;
  line-height: 3rem;
  padding-bottom: 5px;
  color: ${colors("black300")};
  border-bottom: 1px solid ${colors("black050")};

  ${tablet(css`
    font-size: 30px;
  `)}

  ${mobile(css`
    font-size: 25px;
  `)}
`;

const Button = styled(ButtonOrange)`
  width: 120px;
  height: 47px;
  font-size: 19px;
  border-radius: 30px;
`;

interface PostRequest {
  body: string;
  images: Images[];
}

const uploadImages = async (images: Images[]) => {
  const formData = new FormData();

  if (!images.length) return null;

  images.forEach(({ file, md5 }) => {
    const ext = file.type.split("/")[1];
    formData.append("files", file, `${md5}.${ext}`);
  });

  const res = await axiosInstance.post<string[]>("/v1/user/upload", formData, {
    headers: {
      tokenNeeded: true,
    },
  });

  return res.data;
};

interface ThreadRequest {
  body: string;
  threadImages: null | { image: string }[] | string[];
}

const threadImgTransformer = (data: ThreadRequest) => {
  const { threadImages } = data;
  let transformed = threadImages;

  if (!threadImages) {
    transformed = null;
  }
  if (isArrayOfString(threadImages)) {
    transformed = threadImages.map((url) => ({ image: url }));
  }

  data.threadImages = transformed;

  return data;
};

const submitPost = async (payload: PostRequest) => {
  const { body, images } = payload;

  // const imageURLs = await uploadImages(images); // imageURLs = ["http://dgdfg", "http://dgdfg"]
  const imageURLs = [
    "https://main055.s3.ap-northeast-2.amazonaws.com/user28-3de780dcc470be912494e3810d6059401663821267423.jpeg",
    "https://main055.s3.ap-northeast-2.amazonaws.com/user28-3de780dcc470be912494e3810d6059401663821267423.jpeg",
  ];

  const { data } = await axiosInstance.post(
    "/v1/user/upload",
    { body, threadImages: imageURLs },
    {
      transformRequest: [threadImgTransformer],
      headers: {
        tokenNeeded: true,
      },
    }
  );

  return data;
};

export interface Images {
  file: Blob;
  uri: string;
  md5: string;
}

const NewPost = () => {
  const [images, setImages] = useState<Images[]>([]);
  const [defaultImg, setDefaultImg] = useState(0);
  const editorRef = useRef<Editor>(null);
  const { mutate, isLoading } = useMutation(
    (payload: PostRequest) => submitPost(payload),
    {
      onSuccess: () => {
        console.log("g");
      },
    }
  );

  const handleSubmit = async () => {
    if (!editorRef.current) return;

    mutate({ images, body: editorRef.current.getInstance().getHTML() });
  };

  return (
    <SForm onSubmit={(e) => e.preventDefault()}>
      <SBox>
        <SPostSection>
          <SH1>반려동물과 관련된 다양한 정보를 공유해요!</SH1>
          <CustomEditor editorRef={editorRef} />
        </SPostSection>
        <PreviewImages
          images={images}
          setImages={setImages}
          editorRef={editorRef}
          defaultImg={defaultImg}
          setDefaultImg={setDefaultImg}
        />
      </SBox>
      <Button onClick={handleSubmit} isPending={isLoading}>
        등록하기
      </Button>
    </SForm>
  );
};

export default NewPost;
