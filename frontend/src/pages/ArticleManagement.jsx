import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/userContext";

import UploadImage from "../components/UploadImage";

function ArticleManagement() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [picture] = useState("");
  const [articles, setArticles] = useState([]);
  // eslint-disable-next-line camelcase
  const { token } = useCurrentUserContext();

  // fetch des article
  const fetchTutorials = () => {
    fetch(`http://localhost:5000/api/articles`)
      .then((response) => response.json())
      .then((data) => setArticles(data));
  };
  useEffect(() => {
    fetchTutorials();
  }, []);

  const handleForm = (e) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const body = JSON.stringify({
      title,
      content,
      picture,
    });

    // pour le POST des article
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
    e.preventDefault();
    // on créé et on redirige
    fetch("http://localhost:5000/api/articles", requestOptions)
      .then((response) => {
        response.text();
      })
      .catch(console.error);
  };

  return (
    <div className="flex flex-col h-screen items-center w-full">
      <h1 className="text-3xl mb-10 mt-5">Gestion des Articles</h1>
      <h2 className="text-xl mb-3">Création d'article</h2>

      <form
        className="mb-10 w-full flex flex-col items-center"
        onSubmit={handleForm}
      >
        <input
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
          id="Article"
          type="text"
          required
          pattern=".+"
          className="border-2 border-black rounded-xl mb-3 w-1/2"
        />

        <input
          placeholder="content"
          onChange={(e) => setContent(e.target.value)}
          id="Contenu de l'article"
          type="text"
          required
          pattern=".+"
          className="border-2 border-black rounded-xl mb-3 h-24 w-1/2"
        />

        <button type="submit" className="bg-slate-400 rounded-xl w-16">
          valider
        </button>
      </form>
      <UploadImage />
      <div>
        <h1 className="text-center my-3 text-xl md:text-2xl">Articles</h1>
        <div className="d-flex flex-wrap justify-content-center">
          {articles.map((article) => (
            <div
              className="flex flex-col justify-center items-center mb-5 bg-slate-200"
              key={article.id}
            >
              <h1 className="text-xl">{article.title}</h1>
              <Link
                to={`/articles/${article.id}/modify`}
                className=" mb-1 bg-slate-400 rounded-xl"
              >
                modifier
              </Link>
              <Link
                to={`/articles/${article.id}/delete`}
                className="bg-slate-400 rounded-xl"
              >
                supprimer
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArticleManagement;
