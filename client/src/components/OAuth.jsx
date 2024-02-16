import { GoogleAuthProvider, signInWithPopup, getAuth } from "@firebase/auth";
import { app } from "../firebase";
import { useState } from "react";
import axios from "axios";

function OAuth() {
  const [loading, setLoading] = useState(false);

  async function handleGoogleClick() {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const requestBody = {
        name: result.username,
        email: result.email,
        photo: result.photoURL,
      };

      const response = await axios.post("/api/auth/google", requestBody);
      const data = response.data;

      if (window && data) {
        window.location.href = "/home";
      }
    } catch (error) {
      console.log("Failed to login with Google.", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-indigo-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-95">
      {loading ? (
        <div className="flex items-center justify-center gap-4">
          <img
            alt="loader"
            src="/loader_small.png"
            className="animate-spin w-4 h-4"
          />
          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <span>Continue with Google</span>
        </div>
      )}
    </button>
  );
}

export default OAuth;
