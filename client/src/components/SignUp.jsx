import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import OAuth from "./OAuth";

import { GoogleAuthProvider, signInWithPopup, getAuth } from "@firebase/auth";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      console.log("Failed to login with Google.", error.message);
    } finally {
      setLoading(false);
    }
  }

  // bg-[#2e3440] bg-[#333333] bg-[#001220]

  return (
    <main className="p-2 bg-[#001220] bg-[url('/layered-waves-haikei.svg')] text-gray-50 bg-cover bg-center md:p-0 h-screen flex flex-col md:flex-row md:justify-around justify-center items-center">
      <div className="left drop-shadow-md shadow-gray-300 p-0.5">
        <h1 className="text-4xl font-semibold">Summareez</h1>
        <p>Academic insights, summarized!</p>
      </div>
      <div className="form w-full md:w-1/3">
        <form className="flex flex-col gap-2">
          <input
            className="border-b border-gray-400 bg-transparent focus:outline-none p-1"
            type="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email..."
          />
          <input
            className="border-b border-gray-400 bg-transparent focus:outline-none p-1"
            type="password"
            label="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password..."
          />
          <button
            type="submit"
            onClick={console.log("hii")}
            className="relative rounded-md inline-block py-3 font-medium group">
            <span className="absolute rounded-md inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1.5 translate-y-1.5 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute rounded-md inset-0 w-full h-full bg-teal-300 border-2 border-black group-hover:bg-teal-400"></span>
            <span className="relative rounded-md text-black">Sign In</span>
          </button>
        </form>
        <hr className="mt-4" />
        <div className="flex justify-around gap-2 mt-2">
          <button
            type="button"
            onClick={handleGoogleClick}
            className="bg-indigo-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-95">
            {loading ? (
              <div className="flex items-center justify-center gap-4">
                <img
                  alt="loader"
                  src="/loader-dark.svg"
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
        </div>
        <p className="mt-2 text-sm">
          Already have an account?{" "}
          <a className="text-blue-600 underline" href="/login">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
};

export default Signup;
