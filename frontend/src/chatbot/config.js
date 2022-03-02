import { createChatBotMessage } from "react-chatbot-kit";
import { ReactComponent as ButtonIcon } from "../assets/robot.svg";

const config = {
  initialMessages: [
    createChatBotMessage(
      `Hi​! I'm a Bot. Let me know if you have any questions regarding our website!`
    ),
  ],
  botName: "Petsania's Bot",
  customComponents: {
    botAvatar: props => <ButtonIcon {...props} />,
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: "#188b87",
    },
    chatButton: {
      backgroundColor: "#188b87",
    },
  },
};

export default config;
