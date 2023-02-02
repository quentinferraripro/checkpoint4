import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/userContext";

import Article from "../components/Article";

function Articles() {
  const { token } = useCurrentUserContext();
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // recupération des articles.
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      headers: myHeader,
    };

    fetch("http://localhost:5000/api/articles", requestOptions)
      .then((response) => response.json())
      .then((articleList) => setArticles(articleList))
      .catch(() => {
        navigate("/login");
      });
  }, []);

  return (
    <div>
      <div className="flex justify-between h-80">
        <img src="./src/media/dolipranne.png" alt="pub1" />
        <img src="./src/media/goutte.png" alt="pub2" />
      </div>
      <div className="flex flex-col items-center">
        {articles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </div>
      <div className="flex justify-between">
        <img src="./src/media/oxygen.png" alt="pub3" />
        <img src="./src/media/antihistaminique.png" alt="pub4" />
      </div>
    </div>
  );
}

export default Articles;
