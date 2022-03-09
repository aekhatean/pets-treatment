import { createChatBotMessage } from "react-chatbot-kit";
import { content } from "../translation/translation";

const lang = localStorage.getItem("lang");

class ActionProvider {
  constructor(createChatbotMessage, setStateFunc) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
  }
  handleDefault = () => {
    const message = createChatBotMessage(
      "How can I help? Here is the overview.",
      {
        withAvatar: true,
        widget: "overview",
      }
    );

    this.addMessageToBotState(message);
  };
  handleAboutUs = () => {
    const messages = createChatBotMessage(
      "The About Us page contains all the information you need about the team behind petsania",
      { widget: "About", withAvatar: true }
    );
    this.updateChatbotState(messages);
  };

  handleHowItWorks = () => {
    const messages = createChatBotMessage(
      "The How it works page will provide you with all the information you need to start using our website",
      { widget: "How it works", withAvatar: true }
    );
    this.updateChatbotState(messages);
  };

  handleClinicSearch = () => {
    const messages = createChatBotMessage(
      "Let's get started, search for a clinic and get the best care for your pet",
      { widget: "Search", withAvatar: true }
    );
    this.updateChatbotState(messages);
  };
  handleSignUp = () => {
    const messages = createChatBotMessage(
      "Sign up now for free to access petsania's clinic reservation services, first things first choose if you are a pet owner or a vet",
      { widget: "Sign up", withAvatar: true }
    );
    this.updateChatbotState(messages);
  };
  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
