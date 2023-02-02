import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/userContext";
import PreviousButton from "../components/PreviousButton";

function ArticleManagement() {
  const [articles, setArticles] = useState([]);
  // eslint-disable-next-line camelcase
  const { token } = useCurrentUserContext();
  const { articleId } = useParams();
  // fetch des article
  const fetchTutorials = () => {
    fetch(`http://localhost:5000/api/articles`)
      .then((response) => response.json())
      .then((data) => setArticles(data));
  };
  useEffect(() => {
    fetchTutorials();
  }, []);

  // Pour le delete des articles

  const handleDeleteTutorial = async () => {
    fetch(`http://localhost:5000/api/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        if (data.error) {
          console.warn("error");
        }
      });
  };

  return (
    <div className="flex flex-col h-screen items-center w-full">
      <PreviousButton />
      <h1 className="text-3xl mb-10">Gestion des Articles</h1>

      <h1 className="text-2xl mb-5">suppression d'articles</h1>
      <div>
        <div className="d-flex flex-wrap justify-content-center">
          {articles.map((article) => (
            <div className="mb-5 bg-slate-200 rounded-sm" key={article.id}>
              <h1 className="text-xl mb-1">{article.title}</h1>
              <button
                className="bg-slate-400 rounded-xl"
                type="button"
                onClick={() => {
                  handleDeleteTutorial();
                }}
              >
                supprimer
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArticleManagement;
