import { SIconImg, SIconList, SIconText, SImgLink } from "./style";

interface MenuIconProps {
  img: string;
  alt: string;
  menuText: string;
  link: string;
}

const MenuIcon = ({ img, alt, menuText, link }: MenuIconProps) => {
  return (
    <SIconList>
      <SImgLink to={link}>
        <SIconImg src={img} alt={alt} />
      </SImgLink>

      <SIconText>{menuText}</SIconText>
    </SIconList>
  );
};

export default MenuIcon;
