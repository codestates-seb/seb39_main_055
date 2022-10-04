/* eslint-disable camelcase */
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getUserInfos } from "../../apis";
import { initializeUserInfos, logInUser, useAppDispatch } from "../../redux";

const Oauth = () => {
  const [searchParams] = useSearchParams();
  const access_token = searchParams.get("access_token") as string;
  const refresh_token = searchParams.get("refresh_token");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate } = useMutation(getUserInfos, {
    onSuccess: (data) => {
      dispatch(logInUser({ token: access_token, keepLoggedIn: false }));
      dispatch(initializeUserInfos(data));
      navigate("/");
    },
  });

  useEffect(() => {
    mutate(access_token);
  }, [access_token, mutate]);

  return <div>loadinga</div>;
};

export default Oauth;
