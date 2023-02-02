import React, { useRef, useState } from "react";
import { useCurrentUserContext } from "../contexts/userContext";

function UploadImage() {
  const pictureRef = useRef(null);
  const { token } = useCurrentUserContext();
  const [article, setArticle] = useState();

  const [msg, setMsg] = useState("Aucun upload effectué");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pictureRef.current.files[0]) {
      // recupération des articles.
      const myHeader = new Headers();
      myHeader.append("Authorization", `Bearer ${token}`);

      const formData = new FormData();
      formData.append("avatar", pictureRef.current.files[0]);

      const requestOptions = {
        method: "POST",
        headers: myHeader,
        body: formData,
      };
      // on appelle le back
      fetch("http://localhost:5000/api/articles", requestOptions)
        .then((response) => response.json())
        .then((results) => {
          // maj avatar
          setArticle({ ...article, picture: results.picture });
          setMsg("Upload réussi !");
        })
        .catch((error) => {
          console.error(error);
          setMsg("Upload échoué !");
        });
    } else {
      setMsg(
        "Vous auriez pas oublié un truc ? Le fichier à uploader, par exemple ?"
      );
    }
  };

  return (
    <div className="mb-10">
      <form
        className="flex flex-col"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <input type="file" ref={pictureRef} />
        <button className="bg-slate-400" type="submit">
          Envoyer
        </button>
      </form>
      <p>{msg}</p>
    </div>
  );
}

export default UploadImage;
