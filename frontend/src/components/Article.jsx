/* eslint-disable react/prop-types */
import React from "react";

function Article({ article: { title, content, picture } }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <img src={picture} alt="illustration" />
    </div>
  );
}

export default Article;
