import React, { useContext } from "react";
import warning from "../assets/warning.png";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";

function NotFoundPage() {
  const { lang, setLang } = useContext(LanguageContext);
  return (
    <div className="center">
      <img src={warning} alt="error404" />
      <h1>{content[lang].pagenotfound}</h1>
    </div>
  );
}

export default NotFoundPage;
