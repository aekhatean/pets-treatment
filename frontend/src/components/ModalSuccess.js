import Modal from "react-modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { useContext } from "react";

Modal.setAppElement("#root");
const ModalSuccess = (props) => {
  const { lang } = useContext(LanguageContext);

  return (
    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => {
        props.setIsModalOpen(false);
        props.hideFunc && props.hideFunc(false);
      }}
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
          border: "4px solid #b8d8d6",
          borderRadius: "10px",
        },
      }}
    >
      <div dir={lang === "en" ? "ltr" : "rtl"}>
        <h4 className="text-success">
          <CheckCircleIcon />{" "}
          {lang === "en" ? content.en.success : content.ar.success}
        </h4>
        <p>{props.successText}</p>
        <button
          className="btn primary-bg mx-2"
          onClick={() => {
            props.setIsModalOpen(false);
            props.hideFunc && props.hideFunc(false);
          }}
        >
          {lang === "en" ? content.en.close : content.ar.close}
        </button>
      </div>
    </Modal>
  );
};

export default ModalSuccess;
