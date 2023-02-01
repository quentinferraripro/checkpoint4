import { useState } from "react";

function ArticleManagement() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleForm = (e) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      title,
      content,
    });

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
    <div className="">
      <h1>Gestion des Articles</h1>
      <form onSubmit={handleForm}>
        <h2>Création d'article</h2>
        <div className="flex h-12">
          <input
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
            id="Article"
            type="text"
            required
            pattern=".+"
            className="border-2 border-black rounded-xl"
          />
          <img src="./src/media/poubelle.png" alt="poubelle" />
        </div>
        <div className="flex h-12">
          <input
            placeholder="content"
            onChange={(e) => setContent(e.target.value)}
            id="Contenu de l'article"
            type="text"
            required
            pattern=".+"
            className="border-2 border-black rounded-xl"
          />
          <img src="./src/media/poubelle.png" alt="poubelle" />
        </div>

        <button type="submit" className="bg-red-500">
          valider
        </button>
      </form>
      <h1>suppretion d'articles</h1>
    </div>
  );
}

export default ArticleManagement;
