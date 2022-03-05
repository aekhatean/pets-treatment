class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCase = message.toLowerCase();
    if (
      lowerCase.includes("about") ||
      lowerCase.includes("petsania") ||
      lowerCase.includes("team") ||
      lowerCase.includes("developer")
    ) {
      this.actionProvider.handleAboutUs();
    } else if (
      lowerCase.includes("work") ||
      lowerCase.includes("info") ||
      lowerCase.includes("information") ||
      lowerCase.includes("appointment")
    ) {
      this.actionProvider.handleHowItWorks();
    } else if (
      lowerCase.includes("search") ||
      lowerCase.includes("clinic") ||
      lowerCase.includes("start") ||
      lowerCase.includes("reserve") ||
      lowerCase.includes("doctor") ||
      lowerCase.includes("vet") ||
      lowerCase.includes("sick")
    ) {
      this.actionProvider.handleClinicSearch();
    } else if (
      lowerCase.includes("register") ||
      lowerCase.includes("registration") ||
      lowerCase.includes("Sign up")
    ) {
      this.actionProvider.handleSignUp();
    } else return this.actionProvider.handleDefault();
  }
}

export default MessageParser;
