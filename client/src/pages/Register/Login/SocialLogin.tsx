import styled from "styled-components";

import { ReactComponent as Google } from "../../../assets/images/social/google.svg";
import Kakao from "../../../assets/images/social/kakao.png";
import Naver from "../../../assets/images/social/naver-wide.png";

const NaverImg = styled.img.attrs({
  src: Naver,
})`
  height: 40px;
`;

const KakaoImg = styled.img.attrs({
  src: Kakao,
})`
  height: 40px;
`;

const GoogleSVG = styled(Google)`
  height: 60px;
`;

const SSection = styled.section``;

const SSocialBox = styled.div``;

const SocialLogin = () => {
  return (
    <SSection>
      <SSocialBox>
        <NaverImg />
      </SSocialBox>
      <SSocialBox>
        <KakaoImg />
      </SSocialBox>
      <SSocialBox>
        <GoogleSVG />
      </SSocialBox>
    </SSection>
  );
};

export default SocialLogin;
