import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.ts";

type Recipe = {
    id?: number;
    title: string;
    description: string;
    ingredients: string; // now simple string
    instructions: string;
    username: string;
};

export default function CreateRecipePage() {
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [form, setForm] = useState<Recipe>({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        username: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await api.get("/recipes/get-all");
                const normalized = (res.data || []).map((r: any) => ({
                    ...r,
                    ingredients: String(r.ingredients || "")
                }));
                setRecipes(normalized);
            } catch (err) {
                console.error("Error loading recipes:", err);
            }
        };

        const storedUsername = localStorage.getItem("username") || "";
        setUsername(storedUsername);
        fetchRecipes();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleIngredientsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, ingredients: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const storedUsername = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        if (!storedUsername || !token) {
            navigate("/login");
            return;
        }

        // Validations
        if (!form.title.trim()) return setError("Title is required");
        if (!form.ingredients.trim()) return setError("Ingredients are required");
        if (!form.instructions.trim()) return setError("Instructions are required");

        const payload = {
            title: form.title,
            description: form.description,
            ingredients: form.ingredients, // direct string
            instructions: form.instructions,
            username: storedUsername
        };

        try {
            if (isEditing && form.id) {
                const res = await api.put(`/recipes/${form.id}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const updated: Recipe = {
                    ...res.data,
                    ingredients: String(res.data.ingredients || ""),
                    username: storedUsername
                };
                setRecipes((prev) =>
                    prev.map((r) => (r.id === updated.id ? updated : r))
                );
            } else {
                const res = await api.post("/recipes", payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const created: Recipe = {
                    ...res.data,
                    ingredients: String(res.data.ingredients || ""),
                    username: storedUsername
                };
                setRecipes((prev) => [...prev, created]);
            }

            // Reset form
            setForm({
                id: undefined,
                title: "",
                description: "",
                ingredients: "",
                instructions: "",
                username: storedUsername
            });
            setIsEditing(false);
            setError("");
        } catch (err) {
            console.error("Error saving recipe:", err);
            setError("Failed to save recipe");
        }
    };

    const handleEdit = async (id: number) => {
        try {
            const res = await api.get(`/recipes/${id}`);
            const data = res.data || {};
            setForm({
                id: data.id,
                title: data.title ?? "",
                description: data.description ?? "",
                ingredients: String(data.ingredients || ""),
                instructions: data.instructions ?? "",
                username
            });
            setIsEditing(true);
            setError("");
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (err) {
            console.error("Error loading recipe:", err);
            setError("Failed to load recipe for editing");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/recipes/${id}`);
            setRecipes((prev) => prev.filter((r) => r.id !== id));
        } catch (err) {
            console.error("Error deleting recipe:", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        setUsername("");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-6 py-10 animate-fade-in flex flex-col items-center">
            {/* Top Bar  + User Info */}
            <div className="w-full flex justify-between items-center mb-8 max-w-5xl">
                <button
                    onClick={() => navigate("/ai-kitchen")}
                    className="flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg transition"
                >
                    Back to Recipes
                </button>

                {username && (
                    <div className="flex items-center gap-4 bg-white/80 px-4 py-2 rounded-lg shadow">
                        <span className="font-medium text-gray-700">
                             <strong>{username}</strong>
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>

                    </div>
                )}
            </div>

            {/* Page Title */}
            <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-6 text-center">
                Create Your Recipe 🍲
            </h1>

            {/* Error Display */}
            {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-lg max-w-3xl w-full">
                    {error}
                </div>
            )}

            {/* Recipe Form */}
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
                            value={form.ingredients}
                            onChange={handleIngredientsChange}
                            placeholder="e.g. eggs, pancetta, parmesan, spaghetti"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
                            required
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
                            required
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

            {/* Recipe List */}
            <div className="w-full max-w-2xl space-y-4">
                <h2 className="text-2xl font-bold text-white text-center mb-4">Your Recipes</h2>
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="bg-white/90 backdrop-blur-sm border border-gray-200 p-6 rounded-xl shadow-lg animate-fade-in-up"
                        >
                            <h2 className="text-xl font-bold text-indigo-700">{recipe.title}</h2>
                            <p className="text-gray-600">{recipe.description}</p>
                            <p className="text-sm mt-2">
                                <strong>Ingredients:</strong> {String(recipe.ingredients)}
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
                    ))
                ) : (
                    <div className="text-center text-white">
                        <p>No recipes yet. Create your first recipe above!</p>
                    </div>
                )}
            </div>
        </div>
    );
}