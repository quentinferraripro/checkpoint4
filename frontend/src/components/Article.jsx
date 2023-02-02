/* eslint-disable react/prop-types */
import React from "react";

function Article({ article: { title, content, picture } }) {
  return (
    <div className="mb-10 text-center">
      <h1 className="text-lg md:text-xl">{title}</h1>
      <p className="text-lg md:text-xl">{content}</p>
      <img src={picture} alt="illustration" />
    </div>
  );
}

export default Article;
