import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile, deleteUser } from "firebase/auth";
import "../styles/auth-styles.css";

const Profile: React.FC = () => {
  const { user } = useAuth();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email] = useState(user?.email || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!user) {
    return (
      <h2 className="error text-center mt-5">
        You must be logged in to view your profile.
      </h2>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (!user) return;

      await updateProfile(user, { displayName });
      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteAccount = async () => {
    setError("");
    setSuccess("");

    try {
      if (!user) return;

      const ok = window.confirm(
        "Are you sure you want to permanently delete your account?"
      );
      if (!ok) return;

      await deleteUser(user);
      setSuccess("Account deleted successfully.");

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="form">
      <h1>Profile</h1>

      <form onSubmit={handleUpdateProfile}>
        <fieldset className="fieldset">
          <legend className="legend">Update Profile</legend>

          <input
            className="input"
            type="text"
            placeholder="Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <input
            className="input"
            type="email"
            value={email}
            disabled
            placeholder="Email"
          />

          <button className="btn btn-primary w-100 mt-2" type="submit">
            Update Profile
          </button>

          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}

          <button
            type="button"
            className="btn btn-danger w-100 mt-3"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Profile;