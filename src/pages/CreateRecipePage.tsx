import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

type Recipe = {
    id: string;
    title: string;
    description: string;
    ingredients: string[];
    instructions: string;
};

export default function CreateRecipePage() {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [form, setForm] = useState<Recipe>({
        id: "",
        title: "",
        description: "",
        ingredients: [],
        instructions: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    // Load recipes from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("recipes");
        if (stored) setRecipes(JSON.parse(stored));
    }, []);

    // Save recipes to localStorage
    useEffect(() => {
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }, [recipes]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleIngredientsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, ingredients: e.target.value.split(",") });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            setRecipes(recipes.map(r => (r.id === form.id ? form : r)));
        } else {
            setRecipes([...recipes, { ...form, id: uuidv4() }]);
        }
        setForm({ id: "", title: "", description: "", ingredients: [], instructions: "" });
        setIsEditing(false);
    };

    const handleEdit = (id: string) => {
        const recipe = recipes.find(r => r.id === id);
        if (recipe) {
            setForm(recipe);
            setIsEditing(true);
        }
    };

    const handleDelete = (id: string) => {
        setRecipes(recipes.filter(r => r.id !== id));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50 px-6 py-10">
            <h1 className="text-4xl font-bold text-center text-indigo-600 mb-4">Create Your Recipe 🍲</h1>

            {/* 🏠 Home Button */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
                >
                    <Home size={18} />
                    Go to Home
                </button>
            </div>

            {/* 📝 Recipe Form */}
            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-12 border border-indigo-100"
            >
                <h2 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">Recipe Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="e.g. Spaghetti Carbonara"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="A creamy pasta dish with pancetta and parmesan"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            rows={3}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
                        <input
                            name="ingredients"
                            value={form.ingredients.join(",")}
                            onChange={handleIngredientsChange}
                            placeholder="e.g. eggs, pancetta, parmesan, spaghetti"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                        <textarea
                            name="instructions"
                            value={form.instructions}
                            onChange={handleChange}
                            placeholder="Step-by-step cooking instructions..."
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            rows={6}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-8 w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-transform transform hover:scale-[1.02]"
                >
                    {isEditing ? "Update Recipe" : "Add Recipe"}
                </button>
            </form>


            {/* 📋 Recipe List */}
            <div className="max-w-2xl mx-auto">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="bg-white border p-4 rounded-lg mb-4 shadow-sm">
                        <h2 className="text-xl font-bold text-indigo-700">{recipe.title}</h2>
                        <p className="text-gray-600">{recipe.description}</p>
                        <p className="text-sm mt-2"><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                        <p className="text-sm mt-2"><strong>Instructions:</strong> {recipe.instructions}</p>
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => handleEdit(recipe.id)}
                                className="bg-yellow-400 text-white px-4 py-1 rounded hover:bg-yellow-500"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(recipe.id)}
                                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => navigate(`/recipe/${recipe.id}`)}
                                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
