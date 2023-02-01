import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/userContext";

function Login() {
  const { setUser, setToken } = useCurrentUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/signup`;
    navigate(path);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      email,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    if (email && password) {
      // on appelle le back
      fetch("http://localhost:5000/api/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setUser(result.user);
          setToken(result.token);
          navigate("/articles");
        })
        .catch(console.error);
    } else {
      setErrorMessage("Please specify email and password");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>Rejoins-nous pour haïr ensemble les alergènes.</h1>
      <div>
        <button type="button" className="bg-blue-500" onClick={routeChange}>
          s'incrire
        </button>
      </div>
      <h2 className=" mt-36">
        Déjà des notres? Connecte toi pour lire nos derniers articles
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center"
      >
        <div className="mb-3 w-full flex flex-col items-center justify-center">
          <label htmlFor="email" className="form-label mr-2">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="border-2 border-black rounded-lg w-1/4"
            id="email"
          />
        </div>
        <div className="mb-3 w-full flex flex-col items-center justify-center">
          <label htmlFor="password" className="form-label mr-2">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border-2 border-black rounded-lg w-1/4"
            id="password"
          />
        </div>
        <button type="submit" className="bg-gray-400 rounded-xl w-24">
          Connexion
        </button>
      </form>
      <div>{errorMessage}</div>
    </div>
  );
}

export default Login;
