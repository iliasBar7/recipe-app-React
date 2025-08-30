import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { z } from "zod";
import registerPublicApi from "../utils/registerPublicApi.ts";


const registerSchema = z.object({
    username: z.string().min(3, "Username is required"),
    email: z.email( "Email is required"),
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
            const firstError = result.error.message;
            setError(firstError || "Invalid input");
            return;
        }

        try {
            await registerPublicApi.post("/users/register", formData);
            navigate("/login");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up"
            >
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                    Create Account ✨
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    Sign up to start your journey with <span className="font-semibold">AI Kitchen</span>
                </p>

                {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

                <div className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
                    />

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Register
                    </button>
                </div>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-indigo-500 hover:underline font-medium"
                    >
                        Login
                    </button>
                </p>


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
