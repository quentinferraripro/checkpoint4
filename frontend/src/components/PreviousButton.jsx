import React from "react";
import { useNavigate } from "react-router-dom";
import previousbtn from "../media/previousbtn.png";

function PreviousButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className=" md:w-fit w-fit p-3"
    >
      <img src={previousbtn} className="w-8 h-8" alt="previous button" />
    </button>
  );
}

export default PreviousButton;
