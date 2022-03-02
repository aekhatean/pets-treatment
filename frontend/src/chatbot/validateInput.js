const validateInput = () => {
  var x = document.getElementsByClassName("react-chatbot-kit-chat-input")[0]
    .value;
  if (x === "" || x.length <= 3) {
    return false;
  } else return true;
};

export default validateInput;
