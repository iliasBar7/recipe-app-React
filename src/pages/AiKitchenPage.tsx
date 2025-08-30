import { useState,useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Copy, Check } from "lucide-react";
import api from "../utils/api.ts";



const AiKitchenPage = () => {
    const navigate = useNavigate();

    const [chatPrompt, setChatPrompt] = useState('');
    const [chatResponse, setChatResponse] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [recipeResponse, setRecipeResponse] = useState('');
    const [username, setUsername] = useState('');
    const [chatLoading, setChatLoading] = useState(false);
    const [recipeLoading, setRecipeLoading] = useState(false);
    const [chatCopied, setChatCopied] = useState(false);
    const [recipeCopied, setRecipeCopied] = useState(false);

    useEffect(() => {

        const storedUsername = localStorage.getItem("username") || "";
        setUsername(storedUsername);
    }, []);

    const handleChatSubmit = async () => {
        if (!chatPrompt.trim()) return;
        setChatLoading(true);
        setChatResponse('');
        try {
            const res = await api.get("/ai-ask", { params: { prompt: chatPrompt } });
            setChatResponse(res.data);
        } catch (err) {
            console.log("Error asking AI: ", err);
            setChatResponse("Something went wrong! Please try again.");
        } finally {
            setChatLoading(false);
        }
    };

    const handleRecipeSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setRecipeLoading(true);
        setRecipeResponse('');
        try {
            const res = await api.get("/generate-recipe", {
                params: { ingredients, cuisine, dietaryRestrictions },
            });
            setRecipeResponse(res.data);
        } catch (err) {
            console.log("Error asking AI:", err);
            setRecipeResponse("Oops! Something went wrong. Try again?");
        } finally {
            setRecipeLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        setUsername("");
        navigate("/login");
    };

    const copyToClipboard = async (text: string, type: 'chat' | 'recipe') => {
        try {
            await navigator.clipboard.writeText(text);
            if (type === 'chat') {
                setChatCopied(true);
                setTimeout(() => setChatCopied(false), 2000);
            } else {
                setRecipeCopied(true);
                setTimeout(() => setRecipeCopied(false), 2000);
            }
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 flex flex-col items-center animate-fade-in">

            {/* Top Bar with Home + User Info */}
            <div className="w-full flex justify-between items-center mb-8 max-w-4xl">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 px-5 py-2 rounded-lg shadow-lg transition-all"
                >
                    <Home size={18} />
                    Go to Home
                </button>

                {username && (
                    <div className="flex items-center gap-4 bg-white/80 px-4 py-2 rounded-lg shadow">
                        <span className="font-medium text-gray-700">
                            <strong>{username}</strong>
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Page Title */}
            <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-8 text-center">
                AI Kitchen 🍳
            </h1>

            {/* Create Your Own Recipe Button */}
            <div className="mb-8">
                <button
                    onClick={() => navigate('/create-recipe')}
                    className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg hover:opacity-90 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                    🍽️ Create Your Own Recipe
                </button>
            </div>

            {/* Chatbot Section */}
            <section className="w-full max-w-2xl bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl mb-12 animate-fade-in-up">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Chat with AI 🤖
                </h2>
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        placeholder="Ask something..."
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
                        value={chatPrompt}
                        onChange={(e) => setChatPrompt(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !chatLoading && handleChatSubmit()}
                    />
                    <button
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[80px]"
                        onClick={handleChatSubmit}
                        disabled={!chatPrompt.trim() || chatLoading}
                    >
                        {chatLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span>...</span>
                            </>
                        ) : (
                            'Ask'
                        )}
                    </button>
                </div>
                {chatLoading && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border animate-fade-in-up flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-500"></div>
                        <span className="text-gray-600">AI is thinking...</span>
                    </div>
                )}
                {chatResponse && !chatLoading && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in-up relative group">
                        <p className="text-gray-700 whitespace-pre-line pr-10">
                            {chatResponse}
                        </p>
                        <button
                            onClick={() => copyToClipboard(chatResponse, 'chat')}
                            className="absolute top-3 right-3 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all opacity-0 group-hover:opacity-100"
                            title="Copy to clipboard"
                        >
                            {chatCopied ? (
                                <Check size={16} className="text-green-500" />
                            ) : (
                                <Copy size={16} className="text-gray-500" />
                            )}
                        </button>
                    </div>
                )}
            </section>

            {/* Recipe Generator Section */}
            <section className="w-full max-w-2xl bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl animate-fade-in-up">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Generate a Recipe 🥗
                </h2>
                <form onSubmit={handleRecipeSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Ingredients (e.g. chicken, rice)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Cuisine (e.g. Italian)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Dietary Restrictions (e.g. gluten-free)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
                        value={dietaryRestrictions}
                        onChange={(e) => setDietaryRestrictions(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        disabled={!ingredients.trim()}
                    >
                        Generate Recipe
                    </button>
                </form>
                {recipeLoading && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border animate-fade-in-up flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500"></div>
                        <span className="text-gray-600">Creating your perfect recipe...</span>
                    </div>
                )}
                {recipeResponse && !recipeLoading && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in-up relative group">
                        <p className="text-gray-700 whitespace-pre-line pr-10">
                            {recipeResponse}
                        </p>
                        <button
                            onClick={() => copyToClipboard(recipeResponse, 'recipe')}
                            className="absolute top-3 right-3 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all opacity-0 group-hover:opacity-100"
                            title="Copy to clipboard"
                        >
                            {recipeCopied ? (
                                <Check size={16} className="text-green-500" />
                            ) : (
                                <Copy size={16} className="text-gray-500" />
                            )}
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default AiKitchenPage;