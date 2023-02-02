import React from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/userContext";

function Header() {
  const navigate = useNavigate();
  const { setUser, user } = useCurrentUserContext();
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
    setUser({});
    navigate("/");
  };

  return (
    <div className="flex justify-between bg-slate-400 h-10 items-center w-full pr-3 pl-3">
      <button type="button" onClick={routeArticle} className="">
        <img src="./src/media/accueil.png" alt="maison" className="h-10" />
      </button>
      <h1 className="text-4xl">Toujours sans</h1>
      {/* bouton apparait */}
      {user.isAdmin ? (
        <button type="button" onClick={routeManager}>
          <p>gestion</p>
        </button>
      ) : null}
      <button type="button" onClick={() => handleLogout()}>
        <img
          className="h-10"
          src="./src/media/option-de-deconnexion.png"
          alt="deconnexion"
        />
      </button>
    </div>
  );
}

export default Header;
