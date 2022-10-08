import room from "../assets/images/main-menu/1.png";
import barber from "../assets/images/main-menu/2.png";
import cafe from "../assets/images/main-menu/3.png";
import restaurant from "../assets/images/main-menu/4.png";
import playground from "../assets/images/main-menu/5.png";
import hospital from "../assets/images/main-menu/6.png";
import { CategoryList } from "../components/Category/Category";

export const menuList: CategoryList[] = [
  {
    img: room,
    alt: "숙소",
    menuText: "숙소",
    baseLink: "/place/list",
    queryKey: "category",
    queryValue: "room",
  },
  {
    img: barber,
    alt: "미용",
    menuText: "미용",
    baseLink: "/place/list",
    queryKey: "category",
    queryValue: "barber",
  },
  {
    img: cafe,
    alt: "카페",
    menuText: "카페",
    baseLink: "/place/list",
    queryKey: "category",
    queryValue: "cafe",
  },
  {
    img: restaurant,
    alt: "맛집",
    menuText: "맛집",
    baseLink: "/place/list",
    queryKey: "category",
    queryValue: "restaurant",
  },
  {
    img: playground,
    alt: "운동장",
    menuText: "운동장",
    baseLink: "/place/list",
    queryKey: "category",
    queryValue: "playground",
  },
  {
    img: hospital,
    alt: "동물병원",
    menuText: "동물병원",
    baseLink: "/place/list",
    queryKey: "category",
    queryValue: "hospital",
  },
];
