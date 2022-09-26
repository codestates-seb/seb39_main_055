import styled from "styled-components";

const SFooter = styled.footer`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 300px;
  color: ${({ theme }) => theme.colors.black500};
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  border-top: 1px solid #f0f0f0;

  strong {
    margin: 0 5px;
    color: #f0f0f0;
  }
`;

export const SMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  width: 1130px;

  & > h3 {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  & > h4 {
    margin: 10px 0;
    font-size: 16px;
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 600;
  }

  @media screen and (max-width: 1130px) {
    width: 100%;
    padding: 0 20px;
  }
`;

const Footer = () => {
  return (
    <SFooter>
      <SMain>
        <h3>(주) With pet</h3>
        <p>
          대표이사: 모상빈 <strong>|</strong> 김성현 <strong>|</strong> 심소영{" "}
          <strong>|</strong> 윤준영 <strong>|</strong> 박소영 <strong>|</strong>{" "}
          최지인 <strong>|</strong> 나다운
        </p>
        <p>
          <span>
            사업자 등록번호: 012-34-56789 <strong>|</strong>
          </span>{" "}
          <span>통신판매업 신고번호: 2022-서울종로-2022</span>
        </p>
        <h4>소비자피해보상</h4>
        <p>
          With pet 은 통신판매중개자로서 통신판매의 당사자가 아니며 상품
          거래정보 및 거래 등에 대해 책임을 지지 않습니다.
        </p>
        <p>COPYRIGHT</p>
      </SMain>
    </SFooter>
  );
};

export default Footer;
