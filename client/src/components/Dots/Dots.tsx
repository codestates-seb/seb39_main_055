import { TbDots } from "react-icons/tb";

import { useCloseElement } from "../../hooks";
import { useModal } from "../Modal";
import {
  SButtonContainer,
  SCancelButton,
  SContainer,
  SDeleteButton,
  SModalContainer,
  STab,
} from "./style";

interface Prop {
  deleteModalTitle: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Dots = ({ deleteModalTitle, onEdit, onDelete }: Prop) => {
  const [isTabOpen, setIsTabOpen, tabRef] = useCloseElement();
  const { openModal, closeModal } = useModal();

  const handleDelete = () => {
    onDelete();
    closeModal();
  };

  return (
    <SContainer>
      <TbDots onClick={() => setIsTabOpen((prev) => !prev)} />
      <STab isOpen={isTabOpen} ref={tabRef}>
        <div onClick={() => onEdit()}>수정</div>
        <div
          onClick={() =>
            openModal(
              <SModalContainer>
                <main>
                  <header>{deleteModalTitle}</header>
                  <p>삭제한 게시물은 다시 복원할 수 없습니다.</p>
                </main>
                <SButtonContainer>
                  <SCancelButton type="button" onClick={() => closeModal()}>
                    취소
                  </SCancelButton>
                  <SDeleteButton type="button" onClick={handleDelete}>
                    삭제
                  </SDeleteButton>
                </SButtonContainer>
              </SModalContainer>
            )
          }
        >
          삭제
        </div>
      </STab>
    </SContainer>
  );
};

export default Dots;
