import { content } from "../translation/translation";

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse = (message) => {
    const lowerCase = message.toLowerCase();
    console.log(message);
    const lang = localStorage.getItem("lang");
    console.log(lang);
    console.log(content[lang].about);
    if (
      lowerCase.includes("about") ||
      lowerCase.includes("petsania") ||
      lowerCase.includes("team") ||
      lowerCase.includes("developer")
    ) {
      this.actionProvider.handleAboutUs();
    }
    if (
      lowerCase.includes("work") ||
      lowerCase.includes("info") ||
      lowerCase.includes("information")
    ) {
      this.actionProvider.handleHowItWorks();
    }
    if (
      lowerCase.includes("search") ||
      lowerCase.includes("clinic") ||
      lowerCase.includes("start") ||
      lowerCase.includes("reserv")
    ) {
      this.actionProvider.handleClinicSearch();
    }
    if (lowerCase.includes("register") || lowerCase.includes("registration")) {
      this.actionProvider.handleSignUp();
    }
    console.log(this.state);
    return this.actionProvider.handleDefault();
  };
}

export default MessageParser;
