import { BrowserRouter, Routes, Route } from "react-router-dom";

import EcranZero from "./components/EcranZero";
import EcranUnu from "./components/EcranUnu";
import EcranDoi from "./components/EcranDoi";
import EcranTrei from "./components/EcranTrei";
import EcranPatru from "./components/EcranPatru";
import EcranCinci from "./components/EcranCinci";
import EcranSase from "./components/EcranSase";
import EcranSapte from "./components/EcranSapte";
import EcranOpt from "./components/EcranOpt";
import Footer from "./components/Footer";

function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">

                {/* CONȚINUT PAGINI */}
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<EcranZero />} />
                        <Route path="/identitate" element={<EcranUnu />} />
                        <Route path="/formular" element={<EcranDoi />} />
                        <Route path="/ecrantrei" element={<EcranTrei />} />
                        <Route path="/ecranpatru" element={<EcranPatru />} />
                        <Route path="/ecrancinci" element={<EcranCinci />} />
                        <Route path="/ecran6" element={<EcranSase />} />
                        <Route path="/ecran7" element={<EcranSapte />} />
                        <Route path="/ecran8" element={<EcranOpt />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
