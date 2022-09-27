import { useNavigate } from "react-router-dom";

const PlaceList = () => {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate("/place/5")}>
      button
    </button>
  );
};

export default PlaceList;
