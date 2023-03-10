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
          console.warn(result);
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
    <div className="flex flex-col justify-center items-center h-75vh">
      <h2 className="text-lg md:text-xl mt-24 text-center mb-4">
        Déjà des nôtres? Connecte-toi pour lire nos derniers articles
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center mb-10"
      >
        <div className="mb-3 w-full flex flex-col items-center justify-center">
          <label htmlFor="email" className="form-label mr-2 text-lg md:text-xl">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="border-2 border-black rounded-lg w-1/2 md:w-1/4"
            id="email"
          />
        </div>
        <div className="mb-3 w-full flex flex-col items-center justify-center">
          <label
            htmlFor="password"
            className="form-label mr-2 text-lg md:text-xl"
          >
            Mot de passe
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border-2 border-black rounded-lg w-1/2 md:w-1/4"
            id="password"
          />
        </div>
        <button
          type="submit"
          className="bg-gray-400 rounded-xl w-32 text-lg md:text-xl"
        >
          Connexion
        </button>
      </form>
      <div>{errorMessage}</div>
      <h1 className="text-lg md:text-xl">
        Rejoins-nous pour haïr ensemble les allergènes.
      </h1>
      <div>
        <button
          type="button"
          className="bg-blue-500 text-lg md:text-xl w-24 rounded-xl"
          onClick={routeChange}
        >
          s'incrire
        </button>
      </div>
    </div>
  );
}

export default Login;
