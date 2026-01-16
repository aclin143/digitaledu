import React, { useState } from "react";
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
    const [dragged, setDragged] = useState(null);
    const [matches, setMatches] = useState({});

    const onDrop = (id) => {
        if (!dragged) return;
        setMatches((prev) => ({ ...prev, [id]: dragged }));
        setDragged(null);
    };

    const allCorrect = ROLES.some(
        (r) => matches[r.id] === r.text
    );


    return (
        <div className="min-h-screen p-10 bg-gradient-to-br from-[#EEEEEE] to-[#E2E8F0]">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center gap-4 mb-8">
                    <Scale size={40} className="text-[#0F044C]" />
                    <div>
                        <h1 className="text-4xl font-black text-[#0F044C]">
                            Justiția pe înțelesul meu
                        </h1>
                        <p className="text-[#787A91]">
                            Trage descrierea corectă peste fiecare rol
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10">

                    {/* LEFT – TEXTS */}
                    <div className="space-y-4">
                        {ROLES.map((r) => (
                            <div
                                key={r.text}
                                draggable
                                onDragStart={() => setDragged(r.text)}
                                className="flex items-start gap-3 p-4 bg-white rounded-xl shadow cursor-grab active:scale-95 transition"
                            >
                                <GripVertical className="text-[#787A91] mt-1" />
                                <p className="text-sm">{r.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT – CARDS */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {ROLES.map((r) => {
                            const placed = matches[r.id];
                            const correct = placed === r.text;

                            return (
                                <div
                                    key={r.id}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => onDrop(r.id)}
                                    className={`p-4 rounded-2xl border-2 transition
                    ${
                                        placed
                                            ? correct
                                                ? "border-emerald-500 bg-emerald-50"
                                                : "border-rose-500 bg-rose-50"
                                            : "border-dashed border-[#787A91]/40 bg-white/80"
                                    }`}
                                >
                                    <img
                                        src={r.image}
                                        alt={r.label}
                                        className="h-32 mx-auto mb-3 object-contain"
                                    />
                                    <h3 className="text-center font-black text-sm mb-2">
                                        {r.label}
                                    </h3>

                                    <div className="text-xs text-center min-h-[60px]">
                                        {placed || "Trage descrierea aici"}
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
                    className={`mt-12 mx-auto flex items-center gap-3 px-14 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] transition
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
