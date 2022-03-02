import Chatbot from "react-chatbot-kit";
import config from "./config.js";
import MessageParser from "./Messageparser.js";
import ActionProvider from "./ActionProvider.js";

const Bot = () => {
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

export default Bot;
