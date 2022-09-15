import { Link } from "react-router-dom";

import {
  SArrow,
  SArticle,
  SH1,
  SH2,
  SImg,
  SLink,
  SMoreInfoBox,
  SP,
  SSection,
} from "./style";

export interface BannerProps {
  image: string;
  summary: string;
  place: string;
  link: string;
}

const Banner = ({ image, summary, place, link }: BannerProps) => {
  return (
    <SArticle>
      <SLink to={link}>
        <SImg src={image} />
      </SLink>
      <SSection>
        <SH1>{summary}</SH1>
        <SH2>{place}</SH2>
        <SMoreInfoBox>
          <Link to={link}>
            <SP>View More</SP>
            <SArrow />
          </Link>
        </SMoreInfoBox>
      </SSection>
    </SArticle>
  );
};

export default Banner;
