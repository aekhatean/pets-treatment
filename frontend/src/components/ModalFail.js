import Modal from "react-modal";
import ErrorIcon from "@mui/icons-material/Error";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { useContext } from "react";

Modal.setAppElement("#root");
const ModalFail = (props) => {
  const { lang } = useContext(LanguageContext);

  return (
    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.setIsModalOpen(false)}
      style={{
        overlay: {
          background: "rgba(128, 128, 128, 0.5)",
        },
        content: {
          top: "25%",
          left: "20%",
          right: "20%",
          bottom: "50%",
          textAlign: "center",
          border: "4px solid red",
          borderRadius: "10px",
        },
      }}
    >
      <div dir={lang === "en" ? "ltr" : "rtl"}>
        <h4 className="text-danger">
          <ErrorIcon /> {lang === "en" ? content.en.error : content.ar.error}
        </h4>
        <p>{props.errorText}</p>
        <button
          className="btn btn-secondary mx-2"
          onClick={() => props.setIsModalOpen(false)}
        >
          {lang === "en" ? content.en.close : content.ar.close}
        </button>
      </div>
    </Modal>
  );
};

export default ModalFail;
