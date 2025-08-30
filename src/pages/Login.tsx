import { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth.ts";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await auth.post("/auth/login", {
                username,
                password,
            });


            const { token, username: returnedUsername } = res.data;

            if (!token || !returnedUsername) {
                throw new Error("Missing token or username in response");
            }


            localStorage.setItem("token", token);
            localStorage.setItem("username", returnedUsername);

            setError("");
            navigate("/ai-kitchen");
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid username or password");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                    Welcome Back 👋
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    Please sign in to continue to <span className="font-semibold">AI Kitchen</span>
                </p>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Login
                    </button>
                    {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}
                </div>

                <p className="text-center text-gray-500 text-sm mt-8">
                    Don’t have an account?{" "}
                    <button
                        onClick={() => navigate("/register")}
                        className="text-indigo-500 hover:underline font-medium"
                    >
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
}
