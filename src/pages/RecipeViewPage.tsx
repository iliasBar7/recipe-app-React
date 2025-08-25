import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home } from "lucide-react";

type Recipe = {
    id: string;
    title: string;
    description: string;
    ingredients: string[];
    instructions: string;
};

export default function RecipeViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("recipes");
        if (stored) {
            const recipes: Recipe[] = JSON.parse(stored);
            const found = recipes.find(r => r.id === id);
            if (found) setRecipe(found);
        }
    }, [id]);

    if (!recipe) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white">
                <p className="text-xl text-gray-600">Recipe not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white px-6 py-10">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl border border-indigo-100">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-indigo-600">{recipe.title}</h1>
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
                    >
                        <Home size={18} />
                        Home
                    </button>
                </div>

                <p className="text-gray-700 mb-6 italic">{recipe.description}</p>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-indigo-500 mb-2">🧂 Ingredients</h2>
                    <ul className="list-disc list-inside text-gray-800 space-y-1">
                        {recipe.ingredients.map((item, index) => (
                            <li key={index}>{item.trim()}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-indigo-500 mb-2">👨‍🍳 Instructions</h2>
                    <p className="text-gray-800 whitespace-pre-line leading-relaxed">{recipe.instructions}</p>
                </div>
            </div>
        </div>
    );
}
