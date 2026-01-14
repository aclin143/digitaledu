import { BrowserRouter, Routes, Route } from "react-router-dom";
import EcranZero from "./components/EcranZero";
import EcranUnu from "./components/EcranUnu";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EcranZero />} />
                <Route path="/identitate" element={<EcranUnu />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
