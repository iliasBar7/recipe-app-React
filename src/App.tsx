import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoute";
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

                {/*Protected Routes*/}
                <Route
                    path="/ai-kitchen"
                    element={
                        <PrivateRoute>
                            <AiKitchenPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/create-recipe"
                    element={
                        <PrivateRoute>
                            <CreateRecipePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/recipe/:id"
                    element={
                        <PrivateRoute>
                            <RecipeViewPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

