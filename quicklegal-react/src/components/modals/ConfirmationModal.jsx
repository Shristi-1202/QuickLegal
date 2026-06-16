function ConfirmationModal({ close }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={close}>
          ×
        </span>

        <div style={{ textAlign: "center", padding: "20px" }}>
          <h3 style={{ color: "green", marginBottom: "15px" }}>
            Thank You!
          </h3>
          <p>Your request has been submitted successfully.</p>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
