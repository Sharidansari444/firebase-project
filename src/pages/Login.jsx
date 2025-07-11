import { auth, provider } from "../firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ADMIN_EMAIL = "admin@example.com"; // Change to your admin email

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User:", result.user);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      if (email !== ADMIN_EMAIL) {
        alert("Unauthorized: Only admin can log in with email.");
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Email login failed:", error);
      alert("Invalid credentials.");
    }
  };

  useEffect(() => {
    if (user) navigate("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 mb-4"
        >
          Sign in with Google
        </button>

        <div className="text-center text-gray-500 mb-4">OR</div>

        {/* Email/Password Login */}
        <form onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 mb-3 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 mb-4 rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600"
          >
            Login with Email
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
