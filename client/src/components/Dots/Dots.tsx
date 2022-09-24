import { TbDots } from "react-icons/tb";

import { useCloseElement } from "../../hooks";
import { useModal } from "../Modal";
import {
  SButtonContainer,
  SCancelButton,
  SContainer,
  SDeleteButton,
  SModal,
} from "./style";

interface Prop {
  name: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Dots = ({ name, onEdit, onDelete }: Prop) => {
  const [isTabOpen, setIsTabOpen, tabRef] = useCloseElement();
  const { openModal, closeModal } = useModal();

  const handleDelete = () => {
    onDelete();
    closeModal();
  };

  return (
    <>
      <TbDots onClick={() => setIsTabOpen((prev) => !prev)} />
      <SModal isOpen={isTabOpen} ref={tabRef}>
        <div onClick={() => onEdit()}>수정</div>
        <div
          onClick={() =>
            openModal(
              <SContainer>
                <main>
                  <header>{name}의 기록을 삭제 하시겠습니까?</header>
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
              </SContainer>
            )
          }
        >
          삭제
        </div>
      </SModal>
    </>
  );
};

export default Dots;
