import React, { useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/PhoneAuth.css";

const PhoneAuth = () => {
  const [phone, setPhone] = useState("+91"); // Pre-filled +91
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  // Function to handle phone input (prevents removing +91)
  const handlePhoneChange = (e) => {
    let input = e.target.value;
    if (!input.startsWith("+91")) {
      input = "+91" + input.replace(/\D/g, ""); // Keep only numbers after +91
    }
    setPhone(input);
  };

  // Setup reCAPTCHA
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => console.log("reCAPTCHA solved"),
          "expired-callback": () =>
            console.log("reCAPTCHA expired. Try again."),
        }
      );
    }
  };

  // Send OTP
  const sendOtp = async () => {
    if (phone.length < 13) {
      setMessage("❌ Please enter a valid 10-digit phone number.");
      return;
    }

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );
      setConfirmationResult(confirmation);
      setMessage("✅ OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("❌ Failed to send OTP. Please try again.");
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!otp) {
      setMessage("❌ Please enter the OTP.");
      return;
    }

    try {
      await confirmationResult.confirm(otp);
      setMessage("✅ Verified Successfully!");

      // Redirect to the welcome page after 2 seconds
      setTimeout(() => navigate("/welcome"), 2000);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("❌ Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="phone-auth-container">
      <h2>📱 Phone Authentication</h2>

      {/* Phone Number Input */}
      <input
        type="tel"
        value={phone}
        onChange={handlePhoneChange}
        className="input-field"
        maxLength="13" // +91 + 10 digits
      />
      <button onClick={sendOtp}>Send OTP</button>

      {/* OTP Input & Verify Button */}
      {confirmationResult && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="input-field"
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      <p className="message">{message}</p>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneAuth;
