import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PlaceForm } from "../../../components";
import { useAppSelector } from "../../../redux";

const NewPlace = () => {
  const navigate = useNavigate();
  const { userInfos } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userInfos?.userRole !== "ROLE_OWNER") {
      navigate("/business");
    }
  }, [userInfos, navigate]);

  return <PlaceForm isEditPage={false} />;
};

export default NewPlace;
