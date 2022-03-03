import Chatbot from "react-chatbot-kit";
import config from "./config.js";
import MessageParser from "./Messageparser.js";
import ActionProvider from "./ActionProvider.js";
import validateInput from "./validateInput.js";

const Bot = () => {
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        validator={validateInput}
      />
    </div>
  );
};

export default Bot;
