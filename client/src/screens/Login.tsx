import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";
import { format } from "path";

const LOGIN = gql(`
query Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      success
      token
    }
  }`);
function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [login, { loading, error }] = useLazyQuery(LOGIN, {
    onCompleted(data) {
      console.log("DATA", data);
      localStorage.setItem("token", data.login.token);
      navigate("/backoffice/dashboard");
    },
    // onError(error) {
    //   console.log("ERROR", error.message);
    // },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login({
      variables: {
        loginInput: {
          email: form.email,
          password: form.password,
        },
      },
    });
  };
  const handleChange = (e: any) => {
    console.log(e);
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="email"
          value={form.email}
          name={"email"}
          onChange={handleChange}
        />
        <input
          placeholder="password"
          value={form.password}
          name={"password"}
          onChange={handleChange}
        />
        <button disabled={loading}>Se connecter</button>
        {error && <p>{error.message}</p>}
      </form>

      <Link to={"/auth/register"}>Pas encore inscrit?</Link>
    </div>
  );
}

export default Login;
