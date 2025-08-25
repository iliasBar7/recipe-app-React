import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AiKitchenPage from "./pages/AiKitchenPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import Register from "./pages/Register.tsx";
import CreateRecipePage from "./pages/CreateRecipePage.tsx";
import RecipeViewPage from "./pages/RecipeViewPage.tsx";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />}/>
                <Route path="/ai-kitchen" element={<AiKitchenPage />} />
                <Route path="/create-recipe" element={<CreateRecipePage/>}/>
                <Route path="/recipe/:id" element={<RecipeViewPage />} />

                {/* Add other routes here */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;

