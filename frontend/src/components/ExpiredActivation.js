import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { useHistory } from "react-router-dom";
import ModalFail from "./ModalFail";

const ExpiredActivation = () => {
  let history = useHistory();
  const { lang } = useContext(LanguageContext);
  const [isModalFailOpen, setIsModalFailOpen] = useState(false);
  const redirect = () => {
    history.push("/");
  };
  useEffect(() => {
    setIsModalFailOpen(true);
  }, []);
  return (
    <ModalFail
      setIsModalOpen={setIsModalFailOpen}
      isModalOpen={isModalFailOpen}
      errorText={content[lang].error_general_msg}
      func={redirect}
      withBg={true}
    />
  );
};

export default ExpiredActivation;
