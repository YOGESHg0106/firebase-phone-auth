import { useNavigate } from "react-router-dom";
import "../styles/WelcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  // Function to logout
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="welcome-container">
      <h1>🎉 Welcome! 🎉</h1>
      <p>You have successfully logged in using your phone number.</p>

      <img
        src="https://source.unsplash.com/400x200/?success,technology"
        alt="Success"
        style={{ borderRadius: "10px", marginTop: "10px" }}
      />

      <p>Thank you for using our service. Stay connected!</p>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default WelcomePage;
