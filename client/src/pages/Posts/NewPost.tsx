import { Editor } from "@toast-ui/react-editor";
import { md5 } from "hash-wasm";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";

import { colors } from "../../assets";
import { ButtonOrange, CustomEditor, Input } from "../../components";
import { axiosInstance, extractImageInfos } from "../../utils";
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
  row-gap: 25px;
  display: flex;
  flex-flow: column nowrap;
`;

const STitleInput = styled(Input)`
  align-self: flex-start;
  height: 60px;

  & input {
    height: 80%;
    font-size: 35px;
    border-radius: 3px;

    &::placeholder {
      font-size: 35px;
    }

    &:focus {
      outline: ${colors("orange010")} solid 4px;
    }
  }
`;

const Button = styled(ButtonOrange)`
  width: 120px;
  height: 47px;
  font-size: 19px;
  border-radius: 30px;
`;

interface PostRequest {
  body: string;
  imageLinks: string[];
}

const submitPost = async (payload: PostRequest) => {
  const { body, imageLinks } = payload;
  const { data } = await axiosInstance.post("/v1/user/upload", payload, {
    transformRequest: [],
    headers: {
      tokenNeeded: true,
    },
  });

  return data;
};

export interface Images {
  blob: Blob;
  uri: string;
  md5: string;
}

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState<Images[]>([]);
  const editorRef = useRef<Editor>(null);
  const [submitReady, setSubmitReady] = useState(false);
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

    setSubmitReady(true);
  };

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = editorRef.current.getInstance();

    editor.on("change", () => {
      // 1. img
      const innerHTML = editor.getHTML();
      const imageCounts = (innerHTML.match(/<img\ssrc/g) || []).length;

      console.log(imageCounts);
    });

    editor.on("addImageBlobHook", async () => {
      // 에디터가 사진을 처리하고 DOM에 페인팅 완료할 때까지 대기
      await new Promise((res) => {
        setTimeout(res, 150);
      });

      const addedImage = await extractImageInfos(editor.getHTML());

      setImages((prev) => [...prev, ...addedImage]);
    });
  }, []);

  const uploadImages = async () => {
    const formData = new FormData();

    images.forEach(({ blob }, i) => {
      const ext = blob.type.split("/")[1];
      formData.append("files", blob, `${i}.${ext}`); // 확장자를 안 붙이니 500 에러가 떴음
    });

    const res = await axiosInstance.post("/v1/user/upload", formData, {
      headers: {
        tokenNeeded: true,
      },
    });
  };

  /* 
  axios Response
  {
  "data": {
    "data": [
      "https://main055.s3.ap-northeast-2.amazonaws.com/user1-test1663591886684.png"
    ]
  },
}
  */
  return (
    <SForm onSubmit={(e) => e.preventDefault()}>
      <SBox>
        <SPostSection>
          <STitleInput
            value={title}
            id="title"
            placeholder="제목을 입력해주세요."
            isError={false}
            errorMsg=""
            onChange={(e) => setTitle(e.target.value)}
          />
          <CustomEditor editorRef={editorRef} />
        </SPostSection>
        <PreviewImages images={images} />
      </SBox>

      <Button onClick={handleSubmit}>등록하기</Button>
      <Button onClick={uploadImages}>이미지 전송 테스트</Button>
    </SForm>
  );
};

export default NewPost;
