import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import Chatbot from "react-chatbot-kit";
import config from "./config.js";
import MessageParser from "./Messageparser.js";
import ActionProvider from "./ActionProvider.js";
import validateInput from "./validateInput.js";
import { content } from "../translation/translation";

const Bot = () => {
  const { lang, setLang } = useContext(LanguageContext);
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        validator={validateInput}
        headerText={content[lang].bot_header}
        placeholderText={content[lang].bot_placeholder}
      />
    </div>
  );
};

export default Bot;
