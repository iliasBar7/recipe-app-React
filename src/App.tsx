import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AiKitchenPage from "./pages/AiKitchenPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/ai-kitchen" element={<AiKitchenPage />} />
                {/* Add other routes here */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;

