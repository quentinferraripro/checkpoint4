import { useState, useEffect } from "react";
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

  // Pour le delete des articles
  const [id, setId] = useState();

  const handleDeleteTutorial = async () => {
    fetch(`http://localhost:5000/api/articles/${id}`, {
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
      <h1 className="text-3xl mb-10">Gestion des Articles</h1>
      <h2 className="text-xl">Création d'article</h2>
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

        <button type="submit" className="bg-red-500">
          valider
        </button>
      </form>
      <UploadImage />
      <h1 className="text-xl">suppression d'articles</h1>
      <div>
        <h1 className="text-center my-3 text-xl">Articles</h1>
        <div className="d-flex flex-wrap justify-content-center">
          {articles.map((article) => (
            <div key={article.id}>
              <h1>{article.title}</h1>
              <button
                type="button"
                onClick={() => {
                  setId(article.id);
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
