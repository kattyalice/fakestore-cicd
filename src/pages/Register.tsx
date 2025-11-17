import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../lib/firebase";
import "../styles/auth-styles.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Basic client-side validation (prevents Firebase error spam)
    if (!email || !password || !displayName) {
      setError("All fields are required.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName,
      });

      navigate("/profile");
    } catch (err: any) {
      // Firebase errors are very ugly — this cleans them a bit
      const msg = err?.message?.replace("Firebase:", "").trim();
      setError(msg || "Registration failed.");
    }
  };

  return (
    <div className="form">
      <h1>Register</h1>

      {/* Top-level error message for better UX */}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <legend className="legend">Register</legend>

          <input
            className="input"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input"
            type="text"
            placeholder="Name"
            autoComplete="name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn btn-success w-100 mt-2">
            Register
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;