import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";
import { RefObject, useState } from "react";
import { MdError } from "react-icons/md";
import styled, { css } from "styled-components";

import { colors } from "../../../assets";

const EditorBorder = styled.div<{ isFocus: boolean; isError: boolean }>`
  position: relative;
  width: 100%;
  outline: rgba(0, 0, 0, 0) solid 4px;
  border: 1px solid rgba(0, 0, 0, 0);

  svg {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: hsl(358, 68%, 59%);
    font-size: 20px;
  }

  ${({ isFocus, isError }) =>
    isFocus &&
    !isError &&
    css`
      border-radius: 3px;
      outline: ${colors("orange010")} solid 4px;
    `}

  ${({ isError }) =>
    isError &&
    css`
      border: 1px solid hsl(358, 68%, 59%);
      border-radius: 3px;
      outline: hsl(358, 76%, 90%) solid 4px;
    `}
`;

const ErrorMsg = styled.p<Pick<Prop, "isError">>`
  margin-top: 13px;
  color: hsl(358, 62%, 52%);
  font-size: 13px;
  overflow: hidden;
  transition: 400ms all;
  opacity: ${({ isError }) => (isError ? "1" : "0")};
`;

interface Prop {
  height?: string;
  value?: string;
  isError?: boolean;
  errorMessage?: string;
  editorRef?: RefObject<Editor>;
  onChange?: () => void;
}

const CustomEditor = ({
  height = "600px",
  value = "",
  isError = false,
  errorMessage,
  editorRef,
  onChange,
}: Prop) => {
  const [isEditorFocus, setIsEditorFocus] = useState(false);
  return (
    <div>
      <EditorBorder isFocus={isEditorFocus} isError={isError}>
        <Editor
          initialValue={value}
          height={height}
          initialEditType="wysiwyg"
          useCommandShortcut
          toolbarItems={[
            ["bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task", "indent", "outdent"],
            ["table", "link"],
          ]}
          autofocus
          ref={editorRef}
          onChange={onChange}
          onFocus={() => setIsEditorFocus(true)}
          onBlur={() => setIsEditorFocus(false)}
        />
        {isError && <MdError />}
      </EditorBorder>
      <ErrorMsg isError={isError}>{errorMessage}</ErrorMsg>
    </div>
  );
};

export default CustomEditor;
