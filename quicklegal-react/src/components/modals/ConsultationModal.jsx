function ConsultationModal({ close }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={close}>
          ×
        </span>

        <h2>Legal Consultation Booking</h2>

        <form>
          <input
            type="text"
            placeholder="Full Name"
            className="form-control"
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="form-control"
            required
          />

          <button className="submit-btn">
            Book Consultation
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConsultationModal;
