import styled from "styled-components";

import { colors } from "../../../assets";
import { ReactComponent as Google } from "../../../assets/images/social/google.svg";
import Kakao from "../../../assets/images/social/kakao.png";
import Naver from "../../../assets/images/social/naver.png";

const NaverImg = styled.img.attrs({
  src: Naver,
})`
  height: 40px;
  width: 40px;
  border: 1px solid ${colors("black050")};
  border-radius: 100%;
  cursor: pointer;
`;

const KakaoImg = styled.img.attrs({
  src: Kakao,
})`
  height: 40px;
  width: 40px;
  padding: 8px 6px 6px 7px;
  border: 1px solid ${colors("black050")};
  border-radius: 100%;
  cursor: pointer;
`;

const GoogleSVG = styled(Google)`
  height: 40px;
  width: 40px;
  border: 1px solid ${colors("black050")};
  border-radius: 100%;
  cursor: pointer;
`;

const SSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  row-gap: 10px;
  margin: 25px;
`;

const SH3 = styled.h3`
  font-size: 16px;
  color: ${colors("black250")};
`;

const SSocialBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 80%;
`;

type Social = "google" | "naver" | "kakao";

const SocialLogin = () => {
  const handleSocialLoginClick = (type: Social) => {
    window.location.href = `https://soyoungp.shop/oauth2/authorization/${type}?redirect_uri=http://localhost:3000/login/oauth`;
  };

  return (
    <SSection>
      <SH3>SNS로 간편하게 시작하기</SH3>
      <SSocialBox>
        <NaverImg onClick={() => handleSocialLoginClick("naver")} />
        <KakaoImg onClick={() => handleSocialLoginClick("kakao")} />
        <GoogleSVG
          viewBox="4 4 38 38"
          onClick={() => handleSocialLoginClick("google")}
        />
      </SSocialBox>
    </SSection>
  );
};

export default SocialLogin;
