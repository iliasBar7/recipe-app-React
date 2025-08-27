import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import api from "../utils/api.ts";

type Recipe = {
    id?: number;
    title: string;
    description: string;
    ingredients: string[];
    instructions: string;
};

export default function CreateRecipePage() {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [form, setForm] = useState<Recipe>({
        title: "",
        description: "",
        ingredients: [],
        instructions: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await api.get("/recipes/get-all");
                setRecipes(res.data);
            } catch (err) {
                console.error("Error loading recipes:", err);
            }
        };
        fetchRecipes();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleIngredientsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, ingredients: e.target.value.split(",") });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { ...newRecipe } = form;
            const payload = {
                ...newRecipe,
                ingredients: form.ingredients.join(", "),
            };
            const res = await api.post("/recipes", payload);
            setRecipes([...recipes, res.data]);
            setForm({ title: "", description: "", ingredients: [], instructions: "" });
            setIsEditing(false);
        } catch (err) {
            console.error("Error saving recipe:", err);
        }
    };

    const handleEdit = async (id: number) => {
        try {
            const res = await api.get(`/recipes/${id}`);
            setForm(res.data);
            setIsEditing(true);
        } catch (err) {
            console.error("Error loading recipe:", err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/recipes/${id}`);
            setRecipes(recipes.filter((r) => r.id !== id));
        } catch (err) {
            console.error("Error deleting recipe:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-6 py-10 animate-fade-in flex flex-col items-center">
            {/* Page Title */}
            <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-6 text-center">
                Create Your Recipe 🍲
            </h1>

            {/* 🏠 Home Button */}
            <div className="mb-8">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 px-5 py-2 rounded-lg shadow-lg transition-all"
                >
                    <Home size={18} />
                    Go to Home
                </button>
            </div>

            {/* 📝 Recipe Form */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl mb-12 animate-fade-in-up"
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Recipe Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="e.g. Spaghetti Carbonara"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                        <textarea
                            name="instructions"
                            value={form.instructions}
                            onChange={handleChange}
                            placeholder="Step-by-step cooking instructions..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
                            rows={6}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-8 w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                    {isEditing ? "Update Recipe" : "Add Recipe"}
                </button>
            </form>

            {/* 📋 Recipe List */}
            <div className="w-full max-w-2xl space-y-4">
                {recipes.map((recipe) => (
                    <div
                        key={recipe.id}
                        className="bg-white/90 backdrop-blur-sm border border-gray-200 p-6 rounded-xl shadow-lg animate-fade-in-up"
                    >
                        <h2 className="text-xl font-bold text-indigo-700">{recipe.title}</h2>
                        <p className="text-gray-600">{recipe.description}</p>
                        <p className="text-sm mt-2">
                            <strong>Ingredients:</strong>{" "}
                            {Array.isArray(recipe.ingredients)
                                ? recipe.ingredients.join(", ")
                                : String(recipe.ingredients)}
                        </p>
                        <p className="text-sm mt-2">
                            <strong>Instructions:</strong> {recipe.instructions}
                        </p>
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => handleEdit(recipe.id!)}
                                className="bg-yellow-400 text-white px-4 py-1 rounded hover:bg-yellow-500"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(recipe.id!)}
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
