import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

import {
    Shield,
    UserCheck,
    Scale,
    Users,
    Heart,
    Brain,
    Building,
    Gavel,
    GraduationCap,
    Briefcase,
    Stethoscope,
} from "lucide-react";

/* ---------------- ROLES ---------------- */
const ROLES = [
    { label: "Polițist", icon: Shield },
    { label: "Consilier de probațiune", icon: UserCheck },
    { label: "Judecător", icon: Scale },
    { label: "Mediator", icon: Users },
    { label: "Specialist în protecția copilului", icon: Heart },
    { label: "Psiholog", icon: Brain },
    { label: "Lucrător de tineret", icon: Users },
    { label: "Primar", icon: Building },
    { label: "Procuror", icon: Gavel },
    { label: "Profesor", icon: GraduationCap },
    { label: "Avocat", icon: Briefcase },
    { label: "Medic", icon: Stethoscope },
];

export default function Ecran6() {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [invatare, setInvatare] = useState("");

    // întrebări EXTRA (NU se salvează)
    const [calitati, setCalitati] = useState("");
    const [dificultati, setDificultati] = useState("");

    const isValid = role && invatare.trim().length >= 5;

    const saveAndContinue = async () => {
        if (!isValid) return;

        const pasaportId = localStorage.getItem("pasaportId");
        if (!pasaportId) {
            alert("Eroare: copilul nu este identificat.");
            return;
        }

        await updateDoc(doc(db, "pasapoarteCivice", pasaportId), {
            rolJucat: role,
            ceAmInvatatDespreRol: invatare.trim(),
            rolUpdatedAt: serverTimestamp(),
        });

        navigate("/ecran7");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#EEEEEE] to-[#e2e8f0] p-8 md:p-20">
            <div className="max-w-5xl mx-auto space-y-12">

                {/* HEADER */}
                <header>
                    <h1 className="text-4xl md:text-5xl font-black text-[#0F044C] mb-4">
                        Nivelul 6 – EU ÎN ROL CIVIC
                    </h1>
                    <p className="text-[#787A91] text-lg max-w-3xl">
                        Alege rolul pe care l-ai jucat și răspunde la întrebări.
                    </p>
                </header>

                {/* ROLE SELECT */}
                <section className="bg-white/80 rounded-[2rem] p-8 shadow">
                    <h2 className="font-black text-xl text-[#0F044C] mb-6">
                        Rolul jucat
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {ROLES.map((r) => {
                            const Icon = r.icon;
                            const active = role === r.label;

                            return (
                                <button
                                    key={r.label}
                                    onClick={() => setRole(r.label)}
                                    className={`flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all
                    ${
                                        active
                                            ? "bg-[#0F044C] text-white border-[#0F044C]"
                                            : "bg-white hover:bg-[#0F044C]/5 border-[#787A91]/30"
                                    }`}
                                >
                                    <Icon size={26} />
                                    <span className="text-sm font-bold text-center">
                    {r.label}
                  </span>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* ÎNTREBĂRI */}
                <section className="bg-white/80 rounded-[2rem] p-8 shadow space-y-6">

                    <div>
                        <label className="font-black text-[#0F044C]">
                            Ce am învățat despre acest rol? <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={invatare}
                            onChange={(e) => setInvatare(e.target.value)}
                            className="w-full h-28 mt-2 rounded-xl border border-[#787A91]/30 p-4 resize-none text-lg"
                            placeholder="Scrie câteva rânduri..."
                        />
                    </div>

                    <div>
                        <label className="font-black text-[#0F044C]">
                            Ce calități sunt necesare pentru acest rol?
                        </label>
                        <textarea
                            value={calitati}
                            onChange={(e) => setCalitati(e.target.value)}
                            className="w-full h-24 mt-2 rounded-xl border border-[#787A91]/30 p-4 resize-none"
                        />
                    </div>

                    <div>
                        <label className="font-black text-[#0F044C]">
                            Ce dificultăți ai întâlnit?
                        </label>
                        <textarea
                            value={dificultati}
                            onChange={(e) => setDificultati(e.target.value)}
                            className="w-full h-24 mt-2 rounded-xl border border-[#787A91]/30 p-4 resize-none"
                        />
                    </div>

                </section>

                {/* ACTION */}
                <div className="flex justify-end">
                    <button
                        disabled={!isValid}
                        onClick={saveAndContinue}
                        className={`px-10 py-5 rounded-2xl font-black uppercase tracking-[0.25em] transition
              ${
                            isValid
                                ? "bg-[#0F044C] text-white hover:shadow-[0_15px_40px_rgba(15,4,76,0.3)]"
                                : "bg-[#0F044C]/20 text-[#0F044C]/40 cursor-not-allowed"
                        }`}
                    >
                        Continuă
                    </button>
                </div>

            </div>
        </div>
    );
}
