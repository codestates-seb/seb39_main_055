import styled from "styled-components";

export const SModalSection = styled.section`
  padding: 30px;
  height: 100%;
`;

export const SMImgUList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(0, 130px));
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  max-height: 70vh;
  overflow-y: scroll;
`;

interface SelectedImg {
  selected: boolean;
}

export const SMImgList = styled.li<SelectedImg>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
  border-radius: 5px;

  border: ${({ selected }) => (selected ? "4px solid #FFD801" : "")};
`;
