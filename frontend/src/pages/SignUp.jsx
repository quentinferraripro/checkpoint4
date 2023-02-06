import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleForm = (e) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      email,
      firstname,
      lastname,
      city,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
    e.preventDefault();
    // on créé et on redirige
    fetch("http://localhost:5000/api/register", requestOptions)
      .then(() => {
        navigate("/login");
      })
      .catch(console.error);
  };

  return (
    <div className="h-screen w-full">
      <form
        onSubmit={handleForm}
        className="flex flex-col items-center justify-center mt-5 w-6/6"
      >
        <div className="mb-3 w-6/6">
          <label htmlFor="firstname" className="form-label">
            Prénom
          </label>
          <input
            onChange={(e) => setFirstname(e.target.value)}
            type="firstname"
            className="form-control flex flex-col items-center justify-center mb-8 border-2 border-black rounded-lg w-6/6"
            id="firstname"
          />
        </div>
        <div className="mb-3 w-6/6">
          <label htmlFor="lastname" className="form-label">
            Nom
          </label>
          <input
            onChange={(e) => setLastname(e.target.value)}
            type="lastname"
            className="form-control flex flex-col items-center justify-center mb-8 border-2 border-black rounded-lg"
            id="lastname"
          />
        </div>
        <div className="mb-3 w-6/6">
          <label htmlFor="city" className="form-label">
            Ville
          </label>
          <input
            onChange={(e) => setCity(e.target.value)}
            type="city"
            className="form-control flex flex-col items-center justify-center mb-8 border-2 border-black rounded-lg"
            id="city"
          />
        </div>
        <div className="mb-3 w-6/6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control flex flex-col items-center justify-center mb-8 border-2 border-black rounded-lg"
            id="email"
          />
        </div>
        <div className="mb-3 w-6/6">
          <label htmlFor="password" className="form-label">
            Mot de passe
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control flex flex-col items-center justify-center mb-8 border-2 border-black rounded-lg"
            id="password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-lg md:text-xl w-28 rounded-xl"
        >
          Inscription
        </button>
      </form>
    </div>
  );
}

export default SignUp;
