import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CHECK_TOKEN } from "../services/auth.query";

function ProtectedArea({ children }: any) {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const { refetch } = useQuery(CHECK_TOKEN, {
    onCompleted(data) {
      if (data.checkToken.valid) {
        return setAuthorized(true);
      }
      navigate("/auth/login", { replace: true });
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    refetch();
  }, []);
  return (
    <div>{authorized ? children : <div>Vous n'êtes pas autorisé</div>}</div>
  );
}

export default ProtectedArea;
