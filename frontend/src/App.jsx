import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../index.css";
import "./styles/App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Articles from "./pages/Articles";
import ArticleManagement from "./pages/ArticleManagement";
import ArticleModify from "./pages/ArticleModify";
import ArticleDelete from "./pages/ArticleDelete";

import { CurrentUserContextProvider } from "./contexts/userContext";
import { CurrentArticleContextProvider } from "./contexts/articleContext";

function App() {
  return (
    <BrowserRouter>
      <CurrentArticleContextProvider>
        <CurrentUserContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/management" element={<ArticleManagement />} />
            <Route
              path="/articles/:articleId/modify"
              element={<ArticleModify />}
            />
            <Route
              path="/articles/:articleId/delete"
              element={<ArticleDelete />}
            />
          </Routes>
        </CurrentUserContextProvider>
      </CurrentArticleContextProvider>
    </BrowserRouter>
  );
}

export default App;
