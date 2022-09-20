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
    top: 230px;
    right: 10px;
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

const ErrorMsg = styled.p`
  margin-top: 10px;
  color: hsl(358, 62%, 52%);
  font-size: 12px;
`;

interface Prop {
  height?: string;
  value?: string;
  isError?: boolean;
  editorRef?: RefObject<Editor>;
  onChange?: () => void;
}

const CustomEditor = ({
  height = "500px",
  value = "",
  isError = false,
  editorRef,
  onChange,
}: Prop) => {
  const [isEditorFocus, setIsEditorFocus] = useState(false);
  return (
    <>
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
            ["table", "image", "link"],
          ]}
          autofocus
          ref={editorRef}
          onChange={onChange}
          onFocus={() => setIsEditorFocus(true)}
          onBlur={() => setIsEditorFocus(false)}
        />
        {isError && <MdError />}
      </EditorBorder>
      {isError && <ErrorMsg>Body must be at least 30 characters.</ErrorMsg>}
    </>
  );
};

export default CustomEditor;
