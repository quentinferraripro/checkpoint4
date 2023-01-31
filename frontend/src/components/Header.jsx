import React from "react";

function Header() {
  return (
    <div className="flex bg-slate-400 h-10">
      <img
        src="./src/media/accueil.png"
        alt="maison"
        className="flex justify-start"
      />
      <h1 className="w-full flex justify-center">Toujours sans</h1>
    </div>
  );
}

export default Header;
