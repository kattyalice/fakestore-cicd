import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const Logout = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      void signOut(auth);
    }
  }, []);

  return <div>Logout</div>;
};

export default Logout;