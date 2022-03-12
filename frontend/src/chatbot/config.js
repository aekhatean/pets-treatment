import { createChatBotMessage } from "react-chatbot-kit";
import { ReactComponent as ButtonIcon } from "../assets/kwala.svg";
import Overview from "./widgets/Overview/Overview";
import About from "./widgets/About/About";
import HowItWorks from "./widgets/HowItWorks/HowItWorks";
import Search from "./widgets/Search/Search";
import SingUp from "./widgets/SignUp/SignUp";
import Login from "./widgets/login/login";
import Contact from "./widgets/contact/contact";
const config = {
  initialMessages: [
    createChatBotMessage(
      "Hello I'm Kiwi,  Please select a topic or write your questions below. مرحبا بك أنا كيوى, كيف يمكننى مساعدتك؟",
      {
        withAvatar: true,
        delay: 1000,
        widget: "overview",
      }
    ),
  ],
  customComponents: {
    botAvatar: props => <ButtonIcon {...props} />,
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: "#1A2E3B",
    },
    chatButton: {
      backgroundColor: "#1A2E3B",
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
    {
      widgetName: "Login",
      widgetFunc: props => <Login {...props} />,
    },
    {
      widgetName: "contact us",
      widgetFunc: props => <Contact {...props} />,
    },
  ],
};

export default config;
