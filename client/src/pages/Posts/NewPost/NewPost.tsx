/* eslint-disable consistent-return */
import { Editor } from "@toast-ui/react-editor";
import { AxiosResponse } from "axios";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
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
  width: 125px;
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

  if (!images.length) return [];

  images.forEach(({ file, md5 }) => {
    const ext = file.type.split("/")[1];
    formData.append("files", file, `${md5}.${ext}`);
  });

  const { data } = await axiosInstance.post<AxiosResponse<string[]>>(
    "/v1/user/upload",
    formData,
    {
      headers: {
        tokenNeeded: true,
      },
    }
  );

  return data.data;
};

interface ThreadPostRequest {
  body: string;
  threadImages: { image: string }[] | string[];
}

interface ThreadImageResponse {
  image: string;
  threadImageId: number;
  threadImageStatus: string;
}

interface ThreadPostResponse {
  body: string;
  createdAt: string;
  likes: number;
  threadId: number;
  threadImages: ThreadImageResponse[];
  threadStatus: string;
  updatedAt: string;
}

interface ServerError {
  fieldErrors: null;
  message: string;
  status: number;
  violationErrors: null;
}

const threadImgTransformer = (data: ThreadPostRequest) => {
  const { threadImages } = data;
  let transformed = threadImages;

  if (isArrayOfString(threadImages)) {
    transformed = threadImages.map((url) => ({ image: url }));
  }

  data.threadImages = transformed;

  return data;
};

const submitPost = async (payload: PostRequest) => {
  const { body, images } = payload;

  const imageURLs = await uploadImages(images);

  const { data } = await axiosInstance.post(
    "/v1/user/thread/write",
    { body, threadImages: imageURLs },
    {
      transformRequest: [threadImgTransformer],
      headers: {
        tokenNeeded: true,
      },
    }
  );

  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });

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
  const [bodyErr, setBodyErr] = useState(false);
  const editorRef = useRef<Editor>(null);
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation<
    AxiosResponse<ThreadPostResponse>,
    ServerError,
    PostRequest
  >((payload) => submitPost(payload), {
    onSuccess: (data) => {
      const { threadId } = data.data;

      if (threadId >= 0) {
        navigate(`/v1/user/thread/${threadId}`);
      }
    },
    onError: (err) => {
      /*  if (err ===  "Required request body is missing") {
        toas
      } */
    },
  });

  const handleSubmit = async () => {
    if (!editorRef.current) return;

    const body = editorRef.current.getInstance().getHTML();

    if (body.match(/^<p><br><\/p>$/g)) {
      setBodyErr(true);
      return;
    }
    setBodyErr(false);
    mutate({ images, body: editorRef.current.getInstance().getHTML() });
  };

  return (
    <SForm onSubmit={(e) => e.preventDefault()}>
      <SBox>
        <SPostSection>
          <SH1>반려동물과 관련된 다양한 정보를 공유해요!</SH1>
          <CustomEditor
            editorRef={editorRef}
            isError={bodyErr}
            errorMessage="한 글자 이상 입력해주세요."
          />
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
