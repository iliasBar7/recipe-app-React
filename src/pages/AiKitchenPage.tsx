import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from "../utils/auth.ts";

const AiKitchenPage = () => {
    const navigate = useNavigate();

    const [chatPrompt, setChatPrompt] = useState('');
    const [chatResponse, setChatResponse] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [recipeResponse, setRecipeResponse] = useState('');

    const handleChatSubmit = async () => {
        if (!chatPrompt.trim()) return;
        try {
            const res = await auth.get("/ai-ask", { params: { prompt: chatPrompt } });
            setChatResponse(res.data);
        } catch (err) {
            console.log("Error asking AI: ", err);
            setChatResponse("Something went wrong! Please try again.");
        }
    };

    const handleRecipeSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const res = await auth.get("/generate-recipe", {
                params: { ingredients, cuisine, dietaryRestrictions },
            });
            setRecipeResponse(res.data);
        } catch (err) {
            console.log("Error asking AI:", err);
            setRecipeResponse("Oops! Something went wrong. Try again?");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 flex flex-col items-center animate-fade-in">

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
                    />
                    <button
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
                        onClick={handleChatSubmit}
                    >
                        Ask
                    </button>
                </div>
                {chatResponse && (
                    <p className="mt-4 text-gray-700 whitespace-pre-line animate-fade-in-up">
                        {chatResponse}
                    </p>
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
                        className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Generate Recipe
                    </button>
                </form>
                {recipeResponse && (
                    <p className="mt-4 text-gray-700 whitespace-pre-line animate-fade-in-up">
                        {recipeResponse}
                    </p>
                )}
            </section>
        </div>
    );
};

export default AiKitchenPage;
