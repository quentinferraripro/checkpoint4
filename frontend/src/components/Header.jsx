import React from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/userContext";

function Header() {
  const navigate = useNavigate();
  const { setUser, user, token } = useCurrentUserContext();
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
    <div className="flex justify-between bg-slate-400 h-14 items-center w-full pr-3 pl-3 mb-4">
      <button type="button" onClick={routeArticle} className="">
        <img
          src="./src/media/accueil.png"
          alt="maison"
          className="h-8 md:h-10"
        />
      </button>
      <h1 className=" md:text-4xl">Toujours sans</h1>
      {/* bouton apparait */}
      {user.isAdmin ? (
        <button
          className="bg-slate-200 rounded-xl hover:scale-110"
          type="button"
          onClick={routeManager}
        >
          <p className="text-lg">gestion</p>
        </button>
      ) : null}
      {token === null ? (
        ""
      ) : (
        <button type="button" onClick={() => handleLogout()}>
          <img
            className="h-8 md:h-10"
            src="./src/media/option-de-deconnexion.png"
            alt="deconnexion"
          />
        </button>
      )}
    </div>
  );
}

export default Header;
