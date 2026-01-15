import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Scale, Gavel, ShieldAlert, FileText, UserCheck, Lock, AlertCircle, Briefcase } from "lucide-react";

const EcranDoi = () => {
    const navigate = useNavigate();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const termeni = [
        { t: "Contravenție", d: "O faptă ilegală mai puțin gravă, sancționată de obicei cu o amendă sau avertisment.", icon: <AlertCircle size={24} /> },
        { t: "Infracțiune", d: "O faptă gravă care încalcă legea penală și poate duce la pedepse cu închisoarea.", icon: <ShieldAlert size={24} /> },
        { t: "Furt", d: "Luarea unui obiect care nu îți aparține, fără permisiunea proprietarului.", icon: <Lock size={24} /> },
        { t: "Jaf", d: "Un furt comis prin folosirea forței sau prin amenințarea victimei.", icon: <Gavel size={24} /> },
        { t: "Drept", d: "Regulile create de societate pentru a ne asigura că toți trăim în armonie și siguranță.", icon: <Scale size={24} /> },
        { t: "Dosar", d: "O colecție de documente care conțin toate detaliile despre un anumit caz.", icon: <Briefcase size={24} /> },
        { t: "Proces-Verbal", d: "Un document scris în care o autoritate notează oficial ceea ce s-a întâmplat.", icon: <FileText size={24} /> },
        { t: "Responsabilitate", d: "Obligația de a conștientiza acțiunile noastre și de a respecta regulile comunității.", icon: <UserCheck size={24} /> }
    ];

    return (
        <div className="min-h-screen p-8 md:p-20 font-sans text-[#0F044C]"
             style={{ background: "linear-gradient(135deg, #EEEEEE 0%, #e2e8f0 100%)" }}>

            <div className="max-w-6xl mx-auto">
                {/* HEADER ELEGANT */}
                <header className="mb-16 text-center md:text-left">
                    <h2 className="text-5xl font-black tracking-tight mb-6" style={{ color: "#0F044C" }}>
                        Dicționar Civic
                    </h2>
                    <p className="text-[#787A91] text-xl max-w-2xl leading-relaxed">
                        Explorăm împreună conceptele fundamentale pentru a construi o comunitate mai sigură și mai unită.
                    </p>
                </header>

                {/* GRID CARDURI ELEGANTE */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {termeni.map((item, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group p-8 rounded-[2rem] transition-all duration-500 bg-white/80 backdrop-blur-sm border border-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(20,30,97,0.1)] hover:-translate-y-2"
                        >
                            <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-500"
                                 style={{
                                     backgroundColor: hoveredIndex === index ? "#0F044C" : "#141E6110",
                                     color: hoveredIndex === index ? "#EEEEEE" : "#141E61"
                                 }}>
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-bold mb-3 tracking-tight">
                                {item.t}
                            </h3>
                            <p className="text-[#787A91] leading-relaxed group-hover:text-[#0F044C] transition-colors duration-300">
                                {item.d}
                            </p>
                        </div>
                    ))}
                </div>

                {/* BUTON FOOTER MINIMALIST */}
                <div className="mt-20 flex justify-center md:justify-end">
                    <button
                        onClick={() => navigate("/nivelul-urmator")}
                        className="group relative overflow-hidden bg-[#0F044C] text-[#EEEEEE] px-12 py-5 rounded-2xl font-bold uppercase text-xs tracking-[0.3em] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(15,4,76,0.3)] active:scale-95"
                    >
                        <span className="relative z-10">Continuă Explorarea</span>
                        <div className="absolute inset-0 bg-[#141E61] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EcranDoi;