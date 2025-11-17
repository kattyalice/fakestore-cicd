import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const Logout = () => {
  useEffect(() => {
    // Guard so Jest tests don't try to hit real Firebase auth in weird environments
    if (typeof window !== "undefined") {
      void signOut(auth);
    }
  }, []);

  return <div>Logout</div>;
};

export default Logout;