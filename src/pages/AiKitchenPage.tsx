import { useState } from 'react';
import api from "../utils/api.ts"

const AiKitchenPage = () => {
    const [chatPrompt, setChatPrompt] = useState('');
    const [chatResponse, setChatResponse] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [recipeResponse, setRecipeResponse] = useState('');

    const handleChatSubmit = async () => {
     if (!chatPrompt.trim()) return;
     try {
         const res = await api.get("/ai-ask", {
             params: { prompt: chatPrompt },
         });
         setChatResponse(res.data);
     }  catch (err){
         console.log("Error asking AI: ", err);
         setChatResponse("Something went wrong!. Please try again.");
     }
    };

    const handleRecipeSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const res = await api.get("/generate-recipe", {
                params: {
                    ingredients,
                    cuisine,
                    dietaryRestrictions,
                },
            });

            console.log("Recipe response:", res.data);
            setRecipeResponse(res.data);

        } catch (err) {
            console.log("Error asking AI:", err);
            setRecipeResponse("Oops! Something went wrong. Try again?");
        }
    };



    return (
        <div className="min-h-screen bg-gray-50 p-6 animate-fade-in">
            <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">AI Kitchen 🍳</h1>

            {/* Chatbot Section */}
            <section className="mb-12 bg-white p-6 rounded shadow-md transition-all">
                <h2 className="text-2xl font-semibold mb-4">Chat with AI 🤖</h2>
                <input
                    type="text"
                    placeholder="Ask something..."
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-400 transition mb-2"
                    value={chatPrompt}
                    onChange={(e) => setChatPrompt(e.target.value)}
                />
                <button
                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
                    onClick={handleChatSubmit}
                >
                    Ask
                </button>
                {chatResponse && (
                    <p className="mt-4 text-gray-700 whitespace-pre-line animate-fade-in-up">{chatResponse}</p>
                )}
            </section>

            {/* Recipe Generator Section */}
            <section className="bg-white p-6 rounded shadow-md transition-all">
                <h2 className="text-2xl font-semibold mb-4">Generate a Recipe 🥗</h2>
                <form onSubmit={handleRecipeSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Ingredients (e.g. chicken, rice)"
                        className="w-full p-3 border rounded focus:ring-2 focus:ring-green-400 transition"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Cuisine (e.g. Italian)"
                        className="w-full p-3 border rounded focus:ring-2 focus:ring-green-400 transition"
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Dietary Restrictions (e.g. gluten-free)"
                        className="w-full p-3 border rounded focus:ring-2 focus:ring-green-400 transition"
                        value={dietaryRestrictions}
                        onChange={(e) => setDietaryRestrictions(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        Generate Recipe
                    </button>
                </form>
                {recipeResponse && (
                    <p className="mt-4 text-gray-700 whitespace-pre-line animate-fade-in-up">{recipeResponse}</p>
                )}
            </section>
        </div>
    );
};

export default AiKitchenPage;
