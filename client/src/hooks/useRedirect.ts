/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface RedirectProps {
  redirect: boolean;
  path?: string;
  replace?: boolean;
}

const useRedirect = ({
  redirect,
  path = "/",
  replace = false,
}: RedirectProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate(`${path}`, { replace });
    }
  }, [redirect, path, replace]);
};

export default useRedirect;
