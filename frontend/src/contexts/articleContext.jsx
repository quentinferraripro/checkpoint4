import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";

const CurrentArticleContext = createContext();

export default CurrentArticleContext;

export function CurrentArticleContextProvider({ children }) {
  // on utilise un hook personnalisé
  const [article, setArticle] = useLocalStorage("article", {});
  const [token, setToken] = useLocalStorage("token", "");

  return (
    <CurrentArticleContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ article, setArticle, token, setToken }}
    >
      {children}
    </CurrentArticleContext.Provider>
  );
}

CurrentArticleContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCurrentArticleContext = () => useContext(CurrentArticleContext);
