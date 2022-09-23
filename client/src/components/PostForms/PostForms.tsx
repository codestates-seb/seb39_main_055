/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { Editor } from "@toast-ui/react-editor";
import { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { MutationFunction, useMutation, UseMutationOptions } from "react-query";
import { useNavigate } from "react-router-dom";

import {
  ThreadErrorResponse,
  ThreadImages,
  ThreadPostForm,
  ThreadPostResponse,
} from "../../types";
import CustomEditor from "../Editor/CustomEditor/CustomEditor";
import { Button } from "../Form";
import PreviewImages from "./PreviewImages/PreviewImages";
import { SBox, SForm, SH1, SPostSection } from "./style";

interface PostFormsProps {
  initialBody?: string;
  buttonText: string;
  mutation: MutationFunction<AxiosResponse<ThreadPostResponse>, ThreadPostForm>;
  mutateOptions?: Omit<
    UseMutationOptions<
      AxiosResponse<ThreadPostResponse>,
      ThreadErrorResponse,
      ThreadPostForm
    >,
    "mutationFn"
  >;
}

const PostForms = ({
  initialBody = "",
  buttonText,
  mutation,
  mutateOptions,
}: PostFormsProps) => {
  const [images, setImages] = useState<ThreadImages[]>([]);
  const [defaultImg, setDefaultImg] = useState(0);
  const [bodyErr, setBodyErr] = useState(false);
  const editorRef = useRef<Editor>(null);
  const navigate = useNavigate();
  const { mutate, data, isLoading, isSuccess } = useMutation(
    mutation,
    mutateOptions
  );

  useEffect(() => {
    if (isSuccess) {
      const { threadId } = data.data;
      navigate(`/v1/user/thread/${threadId}`, { replace: true });
    }
  }, [isSuccess]);

  const handleSubmit = async () => {
    if (!editorRef.current) return;

    const body = editorRef.current.getInstance().getHTML();
    console.log(images, body);
    if (body.match(/^<p><br><\/p>$/g)) {
      setBodyErr(true);
      return;
    }
    setBodyErr(false);
    mutate({ images, body });
  };

  return (
    <SForm onSubmit={(e) => e.preventDefault()}>
      <SBox>
        <SPostSection>
          <SH1>반려동물과 관련된 다양한 정보를 공유해요!</SH1>
          <CustomEditor
            value={initialBody}
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
        {buttonText}
      </Button>
    </SForm>
  );
};

export default PostForms;
