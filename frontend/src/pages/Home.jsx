import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/login`;
    navigate(path);
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-8xl pb-10">Toujours sans</h1>
      <h2 className="text-4xl mb-4">
        Des voies débouchées pour une vie apaisée
      </h2>
      <button
        type="button"
        className="bg-slate-400 text-xl rounded-xl shadow-sm"
        onClick={routeChange}
      >
        Decouvre LA voie
      </button>
    </div>
  );
}

export default Home;
