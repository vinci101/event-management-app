import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/Auth.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength)
      return "Password must be at least 8 characters long.";
    if (!hasUpperCase)
      return "Password must contain at least one uppercase letter.";
    if (!hasSpecialChar)
      return "Password must contain at least one special character.";
    return "";
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/login"); // Redirect to login page after successful registration
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
          {passwordError && <p className="error">{passwordError}</p>}
          {error && <p className="error">{error}</p>}
        </form>
        <div className="auth-footer">
          <p>Already have an account?</p>
          <Link to="/login" className="login-link">
            Go to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
