import React from "react";
import "./DeleteConfirmationModal.css";
import Deleteanimation from "../../public/Deleteanimation.gif";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirmDelete,
}) => {
  return (
    <div className={`modal ${isOpen ? "block" : "hidden"}`}>
      <div className="modal-overlay"></div>
      <div className="modal-container">
        <div className="modal-header">
          <h3>تایید حذف</h3>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body text-center">
          <div
            className="mx-auto text-center w-[100px] h-[100px] "
            style={{
              background: `url(${Deleteanimation})`,
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onConfirmDelete}>
            بله
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            لغو
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
