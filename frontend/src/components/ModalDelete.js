import Modal from "react-modal";
import WarningIcon from "@mui/icons-material/Warning";

Modal.setAppElement("#root");
const ModalDelete = (props) => {
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
      <h4 className="text-warning">
        <WarningIcon /> Warning
      </h4>
      <p>Are you sure you want to delete?</p>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-danger mx-2"
          onClick={() => props.deleteFunc()}
        >
          Delete
        </button>
        <button
          className="btn btn-secondary mx-2"
          onClick={() => props.setIsModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
