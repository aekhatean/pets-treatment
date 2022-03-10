import Modal from "react-modal";
import WarningIcon from "@mui/icons-material/Warning";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { useContext } from "react";

Modal.setAppElement("#root");
const ModalDelete = (props) => {
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
          border: "4px solid orange",
          borderRadius: "10px",
        },
      }}
    >
      <div dir={lang === "en" ? "ltr" : "rtl"}>
        <h4 className="text-warning">
          <WarningIcon />{" "}
          {lang === "en" ? content.en.warning : content.ar.warning}
        </h4>
        <p>
          {lang === "en"
            ? content.en.delete_confirm
            : content.ar.delete_confirm}
        </p>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-danger mx-2"
            onClick={() => {
              props.deleteFunc();
              props.setIsModalOpen(false);
            }}
          >
            {lang === "en" ? content.en.delete : content.ar.delete}
          </button>
          <button
            className="btn btn-secondary mx-2"
            onClick={() => props.setIsModalOpen(false)}
          >
            {lang === "en" ? content.en.cancel : content.ar.cancel}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDelete;
