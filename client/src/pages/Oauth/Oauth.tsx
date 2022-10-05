/* eslint-disable camelcase */
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { getUserInfos } from "../../apis";
import { LoadingSpinner } from "../../components";
import { initializeUserInfos, logInUser, useAppDispatch } from "../../redux";

export const SLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 380px);
`;

const Oauth = () => {
  const [searchParams] = useSearchParams();
  const access_token = searchParams.get("access_token") || "";
  const refresh_token = searchParams.get("refresh_token") || "";

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate } = useMutation(getUserInfos, {
    onSuccess: (data) => {
      dispatch(
        logInUser({
          accessToken: access_token,
          refreshToken: refresh_token,
          keepLoggedIn: false,
        })
      );
      dispatch(initializeUserInfos(data));
      navigate("/");
    },
  });

  useEffect(() => {
    mutate(access_token);
  }, [access_token, mutate]);

  return (
    <SLoadingContainer>
      <LoadingSpinner />
    </SLoadingContainer>
  );
};

export default Oauth;
