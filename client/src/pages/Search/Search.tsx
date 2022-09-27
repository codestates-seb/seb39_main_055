import { useSearchParams } from "react-router-dom";

import dummyImg from "../../assets/images/test.png";
import { Category, PlaceCard, SearchBar } from "../../components";
import { searchCategories } from "../../constants";
import { SBox, SH1, SHeader, SUList } from "./style";

const dummy = [
  {
    image: dummyImg,
    alt: "Ff",
    location: "경기 가평군",
    distance: "12km",
    storeName: "도그더왈츠 애견펜션",
    meanRating: 4.5,
    reviews: 12,
  },
  {
    image: dummyImg,
    alt: "Ff",
    location: "경기 가평군",
    distance: "12km",
    storeName: "도그더왈츠 애견펜션1",
    meanRating: 4.5,
    reviews: 12,
  },
  {
    image: dummyImg,
    alt: "Ff",
    location: "경기 가평군",
    distance: "12km",
    storeName: "도그더왈츠 애견펜션2",
    meanRating: 4.5,
    reviews: 12,
  },
  {
    image: dummyImg,
    alt: "Ff",
    location: "경기 가평군",
    distance: "12km",
    storeName: "도그더왈츠 애견펜션3",
    meanRating: 4.5,
    reviews: 12,
  },
  {
    image: dummyImg,
    alt: "Ff",
    location: "경기 가평군",
    distance: "12km",
    storeName: "도그더왈츠 애견펜션4",
    meanRating: 4.5,
    reviews: 12,
  },
  {
    image: dummyImg,
    alt: "Ff",
    location: "경기 가평군",
    distance: "12km",
    storeName: "도그더왈츠 애견펜션5",
    meanRating: 4.5,
    reviews: 12,
  },
  {
    image: dummyImg,
    alt: "Ff",
    location: "경기 가평군",
    distance: "12km",
    storeName: "도그더왈츠 애견펜션6",
    meanRating: 4.5,
    reviews: 12,
  },
  {
    image: dummyImg,
    alt: "Ff",
    location: "경기 가평군",
    distance: "12km",
    storeName: "도그더왈츠 애견펜션7",
    meanRating: 4.5,
    reviews: 12,
  },
  {
    image: dummyImg,
    alt: "Ff",
    location: "경기 가평군",
    distance: "12km",
    storeName: "도그더왈츠 애견펜션8",
    meanRating: 4.5,
    reviews: 12,
  },
  {
    image: dummyImg,
    alt: "Ff",
    location: "경기 가평군",
    distance: "12km",
    storeName: "도그더왈츠 애견펜션9",
    meanRating: 4.5,
    reviews: 12,
  },
];

const Search = () => {
  const [params] = useSearchParams();

  const keyword = params.get("search");
  return (
    <SBox>
      <SHeader>
        <SearchBar />
        <SH1>{`‘${keyword}’에 대한 검색 결과입니다.`}</SH1>
        <Category
          menuList={searchCategories}
          baseQueryString={`?search=${keyword}`}
          extraQueryString="category"
        />
      </SHeader>

      <SUList>
        {dummy.map(
          ({
            image,
            alt,
            location,
            distance,
            storeName,
            meanRating,
            reviews,
          }) => (
            <PlaceCard
              image={image}
              alt={alt}
              location={location}
              distance={distance}
              storeName={storeName}
              meanRating={meanRating}
              reviews={reviews}
              key={storeName}
            />
          )
        )}
      </SUList>
    </SBox>
  );
};

export default Search;
