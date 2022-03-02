class ActionProvider {
  constructor(createChatbotMessage, setStateFunc, createClientMessage) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleHello() {
    const message = this.createChatBotmessage("Hello. Nice to meet you.");

    this.setState(prev => ({
      ...prev,
      messages: [...prev.messages],
    }));
  }
}

export default ActionProvider;
