import { useSearchParams } from "react-router-dom";

import MenuIcon from "./MenuIcon";
import { SCategoryMenu } from "./style";

interface CategoryList {
  img: string;
  alt: string;
  menuText: string;
  link: string;
  selected?: boolean;
}

interface CategoryProps {
  menuList: CategoryList[];
  baseQueryString?: string;
  extraQueryString?: string;
}

const Category = ({
  menuList,
  baseQueryString,
  extraQueryString,
}: CategoryProps) => {
  const [params] = useSearchParams();

  const baseQuery = baseQueryString ? `${baseQueryString}&` : "";
  const extraQuery = extraQueryString ? `${extraQueryString}=` : "";

  return (
    <SCategoryMenu>
      {menuList.map(({ menuText, link, img, alt }) => (
        <MenuIcon
          menuText={menuText}
          link={`${baseQuery}${extraQuery}${link}`}
          img={img}
          selected={params.get(extraQueryString || "") === link}
          alt={alt}
          key={menuText}
        />
      ))}
    </SCategoryMenu>
  );
};

export default Category;
