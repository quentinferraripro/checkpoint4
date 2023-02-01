import React from "react";
import { useNavigate } from "react-router-dom";
import PreviousButton from "./PreviousButton";

function Header() {
  const navigate = useNavigate();

  const routeArticle = () => {
    const path = `/articles`;
    navigate(path);
  };

  const routeManager = () => {
    const path = `/management`;
    navigate(path);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex bg-slate-400 h-10 items-center w-full">
      <button
        type="button"
        onClick={routeArticle}
        className="flex justify-start"
      >
        <img src="./src/media/accueil.png" alt="maison" className="h-10" />
      </button>
      <h1 className="w-1/2 flex justify-end text-4xl">Toujours sans</h1>
      <PreviousButton />
      <button type="button" onClick={routeManager}>
        <p>gestion</p>
      </button>
      <button type="button" onClick={() => handleLogout()}>
        deconnection
      </button>
    </div>
  );
}

export default Header;
