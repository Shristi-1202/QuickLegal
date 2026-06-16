import { useLocation } from "react-router-dom";

export default function Welcome() {
  const location = useLocation();
  const data = location.state;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">
          Appointment Confirmed!
        </h1>

        <p><strong>Lawyer:</strong> {data?.lawyer?.name}</p>
        <p><strong>Date:</strong> {data?.date}</p>
        <p><strong>Time:</strong> {data?.time}</p>
      </div>
    </div>
  );
}