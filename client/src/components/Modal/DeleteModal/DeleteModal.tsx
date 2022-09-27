import styled from "styled-components";

export const SModalContainer = styled.div`
  & > main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 80px;
    background-color: #f5f5f5;

    & > header {
      color: #161616;
      font-size: 25px;
      font-family: "ONE-Mobile-Bold";
    }

    & > p {
      font-size: 20px;
    }
  }
`;

export const SButtonContainer = styled.section`
  display: flex;
  background-color: #f5f5f5;
  border: none;

  & > button {
    flex-basis: 50%;
    height: 100px;
    border: none;
    background-color: #ffffff;
    font-size: 30px;
    font-family: "ONE-Mobile-Regular";
    transition: all 0.3s;

    margin-bottom: -1px;
  }
`;

export const SDeleteButton = styled.button`
  color: #f53a3a;
`;

export const SCancelButton = styled.button`
  color: #a5a5a5;
  border-right: 2px solid #f5f5f5 !important;
`;

interface Prop {
  title: string;
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteModal = ({ title, onDelete, onCancel }: Prop) => {
  return (
    <SModalContainer>
      <main>
        <header>{title}</header>
        <p>삭제한 게시물은 다시 복원할 수 없습니다.</p>
      </main>
      <SButtonContainer>
        <SCancelButton type="button" onClick={onCancel}>
          취소
        </SCancelButton>
        <SDeleteButton type="button" onClick={onDelete}>
          삭제
        </SDeleteButton>
      </SButtonContainer>
    </SModalContainer>
  );
};

export default DeleteModal;
