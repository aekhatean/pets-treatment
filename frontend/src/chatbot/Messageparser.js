// MessageParser starter code
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse = message => {
    const lowerCase = message.toLowerCase();
    return this.actionProvider.handleDefault();
  };
}

export default MessageParser;
