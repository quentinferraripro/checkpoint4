import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../index.css";
import "./styles/App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Articles from "./pages/Articles";
import Avatar from "./pages/Avatar";
import ArticleManagement from "./pages/ArticleManagement";

import { CurrentUserContextProvider } from "./contexts/userContext";

function App() {
  return (
    <BrowserRouter>
      <CurrentUserContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/avatar" element={<Avatar />} />
          <Route path="/management" element={<ArticleManagement />} />
        </Routes>
      </CurrentUserContextProvider>
    </BrowserRouter>
  );
}

export default App;
