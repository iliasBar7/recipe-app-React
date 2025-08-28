import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home } from "lucide-react";
import api from "../utils/api.ts";

type Recipe = {
    id: number;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    username?: string;
};

export default function RecipeViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/recipes/${id}`);
                const recipeData = {
                    ...res.data,
                    ingredients: String(res.data.ingredients || "")
                };
                setRecipe(recipeData);
            } catch (err) {
                console.error("Error fetching recipe:", err);
                setRecipe(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRecipe();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600">Loading recipe...</p>
                </div>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white">
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-4">Recipe not found.</p>
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition mx-auto"
                    >
                        <Home size={18} />
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    // Split ingredients string into array for display
    const ingredientsList = recipe.ingredients
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white px-6 py-10">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl border border-indigo-100">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-indigo-600">{recipe.title}</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => navigate("/create-recipe")}
                            className="flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg transition"
                        >
                            Back to Recipes
                        </button>
                    </div>
                </div>

                {recipe.description && (
                    <p className="text-gray-700 mb-6 italic text-lg">{recipe.description}</p>
                )}

                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-indigo-500 mb-3">🧂 Ingredients</h2>
                    {ingredientsList.length > 0 ? (
                        <ul className="list-disc list-inside text-gray-800 space-y-2 bg-gray-50 p-4 rounded-lg">
                            {ingredientsList.map((item, index) => (
                                <li key={index} className="text-gray-700">{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 italic">No ingredients listed</p>
                    )}
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-indigo-500 mb-3">👨‍🍳 Instructions</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                            {recipe.instructions || "No instructions provided"}
                        </p>
                    </div>
                </div>

                {recipe.username && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            Recipe created by: <span className="font-medium text-gray-700">{recipe.username}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}