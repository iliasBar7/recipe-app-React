import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus} from "lucide-react"; // Lucide icons

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-white flex items-center justify-center px-6 relative overflow-hidden">
            {/* ✨ Animated Background Blobs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

            {/* ✨ Main Content */}
            <div className="max-w-xl text-center z-10">
                <h1 className="text-5xl font-extrabold text-indigo-600 mb-4 drop-shadow-lg">
                    Welcome to AI Kitchen 🍳
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                    Discover smart recipes, chat with AI, and cook with confidence. Your culinary assistant is just a click away.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate("/login")}
                        className="flex items-center justify-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-600 transition"
                    >
                        <LogIn size={20} />
                        Login
                    </button>
                    <button
                        onClick={() => navigate("/register")}
                        className="flex items-center justify-center gap-2 bg-white border border-indigo-500 text-indigo-500 px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-100 transition"
                    >
                        <UserPlus size={20} />
                        Register
                    </button>

                </div>
            </div>
        </div>
    );
}
