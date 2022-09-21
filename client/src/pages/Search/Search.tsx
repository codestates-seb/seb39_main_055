import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [params] = useSearchParams();
  return <div>{params.get("search")}</div>;
};

export default Search;
