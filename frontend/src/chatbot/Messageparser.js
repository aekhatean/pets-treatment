import { content } from "../translation/translation";
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCase = message.toLowerCase();
    let lang = localStorage.getItem("lang");
    if (
      lowerCase.includes("about") ||
      lowerCase.includes(content[lang].brand) ||
      lowerCase.includes(content[lang].team) ||
      lowerCase.includes("developer")
    ) {
      this.actionProvider.handleAboutUs();
    } else if (
      lowerCase.includes("work") ||
      lowerCase.includes("info") ||
      lowerCase.includes("عمل") ||
      lowerCase.includes(content[lang].information_bot) ||
      lowerCase.includes(content[lang].appointments)
    ) {
      this.actionProvider.handleHowItWorks();
    } else if (
      lowerCase.includes(content[lang].search) ||
      lowerCase.includes(content[lang].clinics) ||
      lowerCase.includes("book") ||
      lowerCase.includes("reserve") ||
      lowerCase.includes(content[lang].doctor_bot) ||
      lowerCase.includes(content[lang].vets) ||
      lowerCase.includes("مريض") ||
      lowerCase.includes("sick")
    ) {
      this.actionProvider.handleClinicSearch();
    } else if (
      lowerCase.includes(content[lang].register) ||
      lowerCase.includes("registration") ||
      lowerCase.includes("حساب") ||
      lowerCase.includes("Sign up")
    ) {
    } else if (
      lowerCase.includes("login") ||
      lowerCase.includes("دخول") ||
      lowerCase.includes("log in")
    ) {
      this.actionProvider.handleLogin();
    } else return this.actionProvider.handleDefault();
  }
}

export default MessageParser;
