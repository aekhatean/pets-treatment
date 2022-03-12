import { useState, useContext, useEffect } from "react";
import ModalSuccess from "../components/ModalSuccess";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { useHistory } from "react-router-dom";

const ActivateAccount = () => {
  let history = useHistory();
  const { lang } = useContext(LanguageContext);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
  const redirect = () => {
    history.push("/login");
  };
  useEffect(() => {
    setIsModalSuccessOpen(true);
  }, []);
  return (
    <ModalSuccess
      setIsModalOpen={setIsModalSuccessOpen}
      isModalOpen={isModalSuccessOpen}
      successText={content[lang].activate_account_success}
      hideFunc={redirect}
      withBg={true}
    />
  );
};

export default ActivateAccount;
