import all from "../assets/images/main-menu/0.png";
import room from "../assets/images/main-menu/1.png";
import barber from "../assets/images/main-menu/2.png";
import cafe from "../assets/images/main-menu/3.png";
import restaurant from "../assets/images/main-menu/4.png";
import playground from "../assets/images/main-menu/5.png";
import hospital from "../assets/images/main-menu/6.png";

// 클라이언트 카테고리명과 서버 API 카테고리면 매칭
export const mappedCategories = {
  all: "total",
  room: "숙소",
  barber: "미용",
  cafe: "카페",
  restaurant: "맛집",
  playground: "운동장",
  hospital: "동물병원",
};

export const searchCategories = [
  {
    img: all,
    alt: "전체",
    menuText: "전체",
    link: "all",
  },
  {
    img: room,
    alt: "숙소",
    menuText: "숙소",
    link: "room",
  },
  {
    img: barber,
    alt: "미용",
    menuText: "미용",
    link: "barber",
  },
  {
    img: cafe,
    alt: "카페",
    menuText: "카페",
    link: "cafe",
  },
  {
    img: restaurant,
    alt: "맛집",
    menuText: "맛집",
    link: "restaurant",
  },
  {
    img: playground,
    alt: "운동장",
    menuText: "운동장",
    link: "playground",
  },
  {
    img: hospital,
    alt: "동물병원",
    menuText: "동물병원",
    link: "hospital",
  },
];
