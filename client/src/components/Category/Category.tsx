import MenuIcon from "./MenuIcon";
import { SCategoryMenu } from "./style";

interface CategoryList {
  img: string;
  alt: string;
  menuText: string;
  link: string;
}

interface CategoryProps {
  menuList: CategoryList[];
}

const Category = ({ menuList }: CategoryProps) => {
  return (
    <SCategoryMenu>
      {menuList.map(({ menuText, link, img, alt }) => (
        <MenuIcon
          menuText={menuText}
          link={link}
          img={img}
          alt={alt}
          key={menuText}
        />
      ))}
    </SCategoryMenu>
  );
};

export default Category;
