import { SIconBox, SIconImg, SIconText, SImgLink } from "./style";

interface MenuIconProps {
  img: string;
  alt: string;
  menuText: string;
  link: string;
}

const MenuIcon = ({ img, alt, menuText, link }: MenuIconProps) => {
  return (
    <SIconBox>
      <SImgLink to={link}>
        <SIconImg src={img} alt={alt} />
      </SImgLink>

      <SIconText>{menuText}</SIconText>
    </SIconBox>
  );
};

export default MenuIcon;
