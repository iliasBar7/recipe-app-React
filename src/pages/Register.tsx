import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/publicApi.ts";
import { Home } from "lucide-react";
import { z } from "zod";

//  Zod schema for validation
const registerSchema = z.object({
    username: z.string().min(3, "Username is required"),
    email: z.email({ message: "Invalid email address" }),
    password: z
        .string()
        .regex(
            /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[@#$!%&*]).{8,}$/,
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
        ),
});

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const result = registerSchema.safeParse(formData);

        if (!result.success) {
            const firstError = result.error?.message;
            setError(firstError || "Invalid input");
            return;
        }

        try {
            await api.post("/users/register", formData);
            navigate("/login");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-white px-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">Create Account</h2>

                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />

                <button
                    type="submit"
                    className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition"
                >
                    Register
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-purple-500 hover:underline cursor-pointer"
                    >
            Login
          </span>
                </p>

                {/* Go to Home Button */}
                <div className="mt-6 flex justify-center">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
                    >
                        <Home size={18} />
                        Go to Home
                    </button>
                </div>
            </form>
        </div>
    );
}
