import { createChatBotMessage } from "react-chatbot-kit";
import { ReactComponent as ButtonIcon } from "../assets/robot.svg";
import Overview from "./widgets/Overview/Overview";

const config = {
  initialMessages: [
    createChatBotMessage(
      `Hi​! I'm a Bot. Let me know if you have any questions regarding our website!`
    ),
    createChatBotMessage("Select the topic or write your question below.", {
      withAvatar: false,
      delay: 1000,
      widget: "overview",
    }),
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
  widgets: [
    {
      widgetName: "overview",
      widgetFunc: props => <Overview {...props} />,
      mapStateToProps: ["gist"],
    },
  ],
};

export default config;
