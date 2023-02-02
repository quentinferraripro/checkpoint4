import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/userContext";
import PreviousButton from "../components/PreviousButton";

function ArticleModify() {
  const [title, setTitle] = useState("");
  console.warn(title);

  console.warn("hello");
  const [content, setContent] = useState("");
  console.warn(content);
  const [articles, setArticles] = useState([]);
  console.warn(articles);
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
  const body = JSON.stringify({
    title,
    content,
  });

  const handleModifyArticle = () => {
    fetch(`http://localhost:5000/api/articles/${articleId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data.error) {
          console.warn("error");
        }
      });
  };

  return (
    <div>
      <div className="flex flex-col h-screen items-center w-full">
        <PreviousButton />
        <h1 className="text-3xl mb-10">Gestion des Articles</h1>

        <h1 className="text-xl">suppression d'articles</h1>
        <div>
          <h1 className="text-center my-3 text-xl">Articles</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {articles.map((article) => (
              <div key={article.id}>
                <h1>{article.title}</h1>
              </div>
            ))}
          </div>
          <form className="flex flex-col" onSubmit={handleModifyArticle}>
            <input
              name={title}
              value={title}
              placeholder="title"
              className=" border-2 border-black p-4 h-10 mb-2 rounded-lg"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              name={content}
              value={content}
              placeholder="content"
              className=" border-2 border-black p-4 h-10 mb-10 rounded-lg"
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <button className="bg-slate-400 rounded-xl" type="submit">
              modifier
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ArticleModify;
