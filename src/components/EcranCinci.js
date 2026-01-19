import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
    GripVertical,
    BadgeCheck,
    ArrowRight,
    Scale,
} from "lucide-react";

/* ================== DATA ================== */

const ROLES = [
    {
        id: "politist",
        label: "Polițist",
        image: "/images/politist1.png",
        text:
            "Aplică legea, intervine când regulile sunt încălcate și oferă protecție și siguranță copilului.",
    },
    {
        id: "consilier",
        label: "Consilier de probațiune",
        image: "/images/consilierdeprobatiuni1.png",
        text:
            "Sprijină și supraveghează copiii care au încălcat legea și îi ajută să învețe din greșeli.",
    },
    {
        id: "judecator",
        label: "Judecător",
        image: "/images/judecator1.png",
        text:
            "Analizează cazurile și ia decizii corecte, respectând drepturile copilului.",
    },
    {
        id: "mediator",
        label: "Mediator",
        image: "/images/mediator1.png",
        text:
            "Ajută părțile aflate în conflict să ajungă la o înțelegere și reduce stresul.",
    },
    {
        id: "specialist",
        label: "Specialist protecția copilului",
        image: "/images/specialistprotectiacopilului1.png",
        text:
            "Apără drepturile copilului și îl protejează de abuz și neglijare.",
    },
    {
        id: "psiholog",
        label: "Psiholog",
        image: "/images/psiholog1.png",
        text:
            "Oferă sprijin emoțional și ajută copilul să se simtă în siguranță.",
    },
    {
        id: "parinte",
        label: "Părinte",
        image: "/images/parinte1.png",
        text:
            "Oferă protecție, sprijin și educație copilului.",
    },
    {
        id: "tineret",
        label: "Lucrător de tineret",
        image: "/images/lucratordetineret1.png",
        text:
            "Sprijină dezvoltarea tinerilor și organizează activități educative.",
    },
    {
        id: "primar",
        label: "Primar",
        image: "/images/primar1.png",
        text:
            "Conduce comunitatea și creează condiții mai bune de viață.",
    },
    {
        id: "procuror",
        label: "Procuror",
        image: "/images/procuror1.png",
        text:
            "Investighează faptele ilegale și apără legea.",
    },
    {
        id: "profesor",
        label: "Profesor",
        image: "/images/profesor1.png",
        text:
            "Educă și sprijină elevii în dezvoltarea lor.",
    },
    {
        id: "avocat",
        label: "Avocat",
        image: "/images/avocat1.png",
        text:
            "Apără drepturile și interesele copilului.",
    },
    {
        id: "medic",
        label: "Medic",
        image: "/images/medic1.png",
        text:
            "Protejează sănătatea copilului prin consult și tratament.",
    },
];

/* ================== COMPONENT ================== */

export default function EcranCinci() {
    const navigate = useNavigate();

    const [selectedText, setSelectedText] = useState(null);
    const [matches, setMatches] = useState({});

    /* 🔹 texte deja folosite */
    const usedTexts = Object.values(matches);

    /* 🔹 texte rămase (doar acestea apar în stânga) */
    const availableTexts = useMemo(
        () => ROLES.filter((r) => !usedTexts.includes(r.text)),
        [usedTexts]
    );

    const allCorrect =
        ROLES.every((r) => matches[r.id] === r.text);

    return (
        <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#EEEEEE] to-[#E2E8F0]">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center gap-4 mb-8">
                    <Scale size={40} className="text-[#0F044C]" />
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-black text-[#0F044C]">
                            Justiția pe înțelesul meu
                        </h1>
                        <p className="text-[#787A91]">
                            Alege o descriere și apasă pe rolul corect
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10">

                    {/* LEFT – DESCRIPTIONS */}
                    <div className="space-y-4">
                        {availableTexts.map((r) => (
                            <div
                                key={r.text}
                                onClick={() => setSelectedText(r.text)}
                                className={`flex items-start gap-3 p-4 rounded-xl shadow cursor-pointer transition
                                    ${
                                    selectedText === r.text
                                        ? "bg-[#0F044C] text-white scale-[1.02]"
                                        : "bg-white hover:bg-slate-100"
                                }`}
                            >
                                <GripVertical className="mt-1 opacity-50" />
                                <p className="text-sm">{r.text}</p>
                            </div>
                        ))}

                        {availableTexts.length === 0 && (
                            <div className="text-center text-sm text-[#787A91] italic">
                                Toate descrierile au fost plasate
                            </div>
                        )}
                    </div>

                    {/* RIGHT – ROLE CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {ROLES.map((r) => {
                            const placed = matches[r.id];
                            const correct = placed === r.text;

                            return (
                                <div
                                    key={r.id}
                                    onClick={() => {
                                        if (!selectedText || placed) return;

                                        setMatches((prev) => ({
                                            ...prev,
                                            [r.id]: selectedText,
                                        }));
                                        setSelectedText(null);
                                    }}
                                    className={`p-3 sm:p-4 rounded-2xl border-2 transition cursor-pointer
                                        min-h-[260px] flex flex-col justify-between
                                        ${
                                        placed
                                            ? correct
                                                ? "border-emerald-500 bg-emerald-50"
                                                : "border-rose-500 bg-rose-50"
                                            : "border-dashed border-[#787A91]/40 bg-white"
                                    }`}
                                >
                                    <img
                                        src={r.image}
                                        alt={r.label}
                                        className="h-24 sm:h-32 mx-auto object-contain"
                                    />

                                    <h3 className="text-center font-black text-sm mt-2">
                                        {r.label}
                                    </h3>

                                    <div className="text-xs text-center mt-2 min-h-[60px]">
                                        {placed || "Apasă pentru a plasa descrierea"}
                                    </div>

                                    {correct && (
                                        <div className="flex justify-center mt-2 text-emerald-600">
                                            <BadgeCheck size={18} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* NEXT BUTTON */}
                <button
                    onClick={() => navigate("/ecran6")}
                    disabled={!allCorrect}
                    className={`mt-12 mx-auto flex items-center gap-3 px-12 py-5 rounded-2xl
                        font-black uppercase text-[11px] tracking-[0.35em] transition
                        ${
                        allCorrect
                            ? "bg-[#0F044C] text-[#EEEEEE] hover:shadow-[0_15px_40px_rgba(15,4,76,0.35)]"
                            : "bg-[#0F044C]/20 text-[#0F044C]/40 cursor-not-allowed"
                    }`}
                >
                    Nivelul următor
                    <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
}
