import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User:", result.user);
  } catch (error) {
    console.error("Login failed:", error);
  }
};

  useEffect(() => {
    if (user) navigate("/dashboard");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard Login</h2>
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
