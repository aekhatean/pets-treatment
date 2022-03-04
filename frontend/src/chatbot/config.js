import { createChatBotMessage } from "react-chatbot-kit";
import { ReactComponent as ButtonIcon } from "../assets/robot.svg";
import Overview from "./widgets/Overview/Overview";
import About from "./widgets/About/About";
import HowItWorks from "./widgets/HowItWorks/HowItWorks";
import Search from "./widgets/Search/Search";
import SingUp from "./widgets/SignUp/SignUp";

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
      backgroundColor: "#67a19c",
    },
    chatButton: {
      backgroundColor: "#67a19c",
    },
  },
  widgets: [
    {
      widgetName: "overview",
      widgetFunc: props => <Overview {...props} />,
      mapStateToProps: ["messages"],
    },
    {
      widgetName: "About",
      widgetFunc: props => <About {...props} />,
    },
    {
      widgetName: "How it works",
      widgetFunc: props => <HowItWorks {...props} />,
    },
    {
      widgetName: "Search",
      widgetFunc: props => <Search {...props} />,
    },
    {
      widgetName: "Sign up",
      widgetFunc: props => <SingUp {...props} />,
    },
  ],
};

export default config;
