import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import LandingPage from "./Components/Landing Page/LandingPage";
import Animation from "./Components/Landing Page/animation";
import Chat from "./Components/Chat/Chat";
import { AnimatePresence } from "framer-motion";
export default function App() {
    return (
        <div>
            <BrowserRouter>
                <AnimatePresence>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/animation" element={<Animation />} />
                        <Route path="/chat" element={<Chat />} />
                    </Routes>
                </AnimatePresence>
            </BrowserRouter>
        </div>
    );
}