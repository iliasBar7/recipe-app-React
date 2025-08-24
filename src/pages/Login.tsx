import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";



export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/auth/login", {
                username,
                password,
            });
            const token = res.data.token;
            localStorage.setItem("token", token);
            setError("");
            // redirect or show success
            navigate("/ai-kitchen");
        } catch (err) {
            setError("Login failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
            <input
    type="text"
    placeholder="Username"
    className="w-full mb-2 p-2 border rounded"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    />
    <input
    type="password"
    placeholder="Password"
    className="w-full mb-2 p-2 border rounded"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    />
    <button
    onClick={handleLogin}
    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
        Login
        </button>
    {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        </div>
    );
    }
