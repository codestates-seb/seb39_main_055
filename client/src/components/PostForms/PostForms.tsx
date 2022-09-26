/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { Editor } from "@toast-ui/react-editor";
import { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { MutationFunction, useMutation, UseMutationOptions } from "react-query";
import { useNavigate } from "react-router-dom";

import {
  ThreadErrorResponse,
  ThreadForm,
  ThreadImages,
  ThreadPostResponse,
} from "../../types";
import CustomEditor from "../Editor/CustomEditor/CustomEditor";
import PreviewImages from "./PreviewImages/PreviewImages";
import { SBox, SButton, SEditorBox, SForm, SH1, SPostSection } from "./style";

interface PostFormsProps {
  threadId?: number;
  body?: string;
  threadImages?: ThreadImages[];
  buttonText: string;
  mutation: MutationFunction<AxiosResponse<ThreadPostResponse>, ThreadForm>;
  mutateOptions?: Omit<
    UseMutationOptions<
      AxiosResponse<ThreadPostResponse>,
      ThreadErrorResponse,
      ThreadForm
    >,
    "mutationFn"
  >;
}

const PostForms = ({
  threadId,
  body = "",
  threadImages,
  buttonText,
  mutation,
  mutateOptions,
}: PostFormsProps) => {
  const [images, setImages] = useState<ThreadImages[]>(threadImages || []);
  const [defaultId, setDefaultId] = useState("");
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
      navigate(`/post/${threadId}`, { replace: true });
    }
  }, [isSuccess]);

  const handleSubmit = async () => {
    if (!editorRef.current) return;

    const body = editorRef.current.getInstance().getHTML();

    if (body.match(/^(<p>(<br>|\s{1,})<\/p>)$/g)) {
      setBodyErr(true);
      return;
    }
    setBodyErr(false);
    mutate({ images, body, threadId });
  };

  return (
    <SForm onSubmit={(e) => e.preventDefault()}>
      <SBox>
        <SH1>반려동물과 관련된 다양한 정보를 공유해요!</SH1>
        <SPostSection>
          <SEditorBox>
            <CustomEditor
              value={body}
              editorRef={editorRef}
              isError={bodyErr}
              errorMessage="한 글자 이상 입력해주세요."
            />
          </SEditorBox>
          <PreviewImages
            images={images}
            setImages={setImages}
            editorRef={editorRef}
            defaultId={defaultId}
            setDefaultId={setDefaultId}
          />
        </SPostSection>
      </SBox>
      <SButton onClick={handleSubmit} isPending={isLoading}>
        {buttonText}
      </SButton>
    </SForm>
  );
};

export default PostForms;
