import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/userContext";
import PreviousButton from "../components/PreviousButton";

function ArticleModify() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
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

  const handleModifyArticle = (e) => {
    e.preventDefault();
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
        navigate("/articles");
        if (data.error) {
          console.warn("error");
        }
      });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col h-screen items-center w-full">
        <PreviousButton />
        <h1 className="text-3xl mb-10">Gestion des Articles</h1>

        <h1 className="text-xl">Modification d'article</h1>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="d-flex flex-wrap justify-content-center">
            {articles.map((article) => (
              <div key={article.id}>
                <h1>{article.title}</h1>
              </div>
            ))}
          </div>
          <form
            className="flex flex-col md:w-4/6"
            onSubmit={handleModifyArticle}
          >
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
            <button
              className="bg-slate-400 rounded-xl hover:scale-110"
              type="submit"
            >
              modifier
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ArticleModify;
