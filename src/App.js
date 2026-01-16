import { BrowserRouter, Routes, Route } from "react-router-dom";
import EcranZero from "./components/EcranZero";
import EcranUnu from "./components/EcranUnu";
import EcranDoi from "./components/EcranDoi";
import EcranTrei from "./components/EcranTrei";
import EcranPatru from "./components/EcranPatru";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EcranZero />} />
                <Route path="/identitate" element={<EcranUnu />} />
                <Route path="/formular" element={<EcranDoi/>}/>
                <Route path="ecrantrei" element={<EcranTrei/>}/>
                <Route path="/ecranpatru" element={<EcranPatru/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
