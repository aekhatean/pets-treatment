import { createChatBotMessage } from "react-chatbot-kit";
import { content } from "../translation/translation";
class ActionProvider {
  constructor(createChatbotMessage, setStateFunc) {
    this.setState = setStateFunc;
  }
  handleDefault = () => {
    let lang = localStorage.getItem("lang");
    const message = createChatBotMessage(content[lang].overview_widget, {
      withAvatar: true,
      widget: "overview",
    });

    this.updateChatbotState(message);
  };
  handleAboutUs = () => {
    let lang = localStorage.getItem("lang");
    const messages = createChatBotMessage(content[lang].about_widget, {
      widget: "About",
      withAvatar: true,
    });
    this.updateChatbotState(messages);
  };

  handleHowItWorks = () => {
    let lang = localStorage.getItem("lang");
    const messages = createChatBotMessage(content[lang].howItWorks_widget, {
      widget: "How it works",
      withAvatar: true,
    });
    this.updateChatbotState(messages);
  };

  handleClinicSearch = () => {
    let lang = localStorage.getItem("lang");
    const messages = createChatBotMessage(content[lang].search_widget, {
      widget: "Search",
      withAvatar: true,
    });
    this.updateChatbotState(messages);
  };
  handleSignUp = () => {
    let lang = localStorage.getItem("lang");
    const messages = createChatBotMessage(content[lang].signUp_widget, {
      widget: "Sign up",
      withAvatar: true,
    });
    this.updateChatbotState(messages);
  };
  updateChatbotState(message) {
    this.setState(state => ({
      ...state,
      messages: [...state.messages, message],
    }));
  }
}

export default ActionProvider;
