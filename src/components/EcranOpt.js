import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ShieldCheck,
    Calendar,
    GraduationCap,
    ArrowRight,
    Lock,
} from "lucide-react";

export default function Ecran8() {
    const navigate = useNavigate();
    const [accepted, setAccepted] = useState(false);

    const today = new Date().toLocaleDateString("ro-RO", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <div
            className="min-h-screen p-8 md:p-20 text-[#0F044C]"
            style={{
                background:
                    "radial-gradient(circle at 20% 10%, rgba(15,4,76,0.10) 0%, transparent 55%), linear-gradient(135deg, #EEEEEE 0%, #E2E8F0 100%)",
            }}
        >
            <div className="max-w-4xl mx-auto space-y-10">

                {/* HEADER */}
                <header className="bg-white/80 backdrop-blur-md rounded-[2rem] border border-white p-8 shadow-[0_18px_50px_rgba(15,4,76,0.08)]">
                    <div className="flex items-center gap-4">
                        <ShieldCheck size={36} className="text-[#0F044C]" />
                        <div>
                            <h1 className="text-4xl font-black tracking-tight">
                                Ecranul 8 – Angajament Civic Digital
                            </h1>
                            <p className="text-[#787A91] mt-2 text-lg">
                                Confirmarea finală înainte de diplomă
                            </p>
                        </div>
                    </div>
                </header>

                {/* ANGAJAMENT */}
                <section className="bg-white/80 backdrop-blur-md rounded-[2rem] border border-white p-10 shadow-[0_18px_50px_rgba(15,4,76,0.08)] space-y-8">

                    <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-center">
                        „Mă angajez să respect drepturile celorlalți,<br />
                        să iau decizii responsabile<br />
                        și să contribui activ la comunitatea mea.”
                    </p>

                    {/* CHECKBOX = SEMNĂTURĂ */}
                    <div
                        onClick={() => setAccepted(!accepted)}
                        className={`cursor-pointer flex items-center gap-4 p-6 rounded-2xl border transition
              ${
                            accepted
                                ? "bg-[#0F044C] text-white border-[#0F044C]"
                                : "bg-white border-[#787A91]/30 hover:border-[#0F044C]/40"
                        }`}
                    >
                        <div
                            className={`h-8 w-8 rounded-lg flex items-center justify-center border-2
                ${
                                accepted
                                    ? "bg-white text-[#0F044C] border-white"
                                    : "border-[#787A91]"
                            }`}
                        >
                            {accepted && <ShieldCheck size={18} />}
                        </div>

                        <span className="font-black text-lg">
              Îmi asum acest angajament civic
            </span>
                    </div>

                    {/* META INFO */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#787A91]/20">

                        <div className="flex items-center gap-3">
                            <Calendar className="text-[#0F044C]" />
                            <div>
                                <p className="text-xs uppercase tracking-widest text-[#787A91] font-black">
                                    Dată
                                </p>
                                <p className="font-bold">{today}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <GraduationCap className="text-[#0F044C]" />
                            <div>
                                <p className="text-xs uppercase tracking-widest text-[#787A91] font-black">
                                    Statut
                                </p>
                                <p className="font-bold">Elev – valid</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 opacity-60">
                            <Lock />
                            <div>
                                <p className="text-xs uppercase tracking-widest font-black">
                                    Validare profesor
                                </p>
                                <p className="text-sm italic">Se face ulterior</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ACTION */}
                <div className="flex justify-end">
                    <button
                        disabled={!accepted}
                        onClick={() => navigate("/diploma")}
                        className={`flex items-center gap-3 px-12 py-5 rounded-2xl font-black uppercase tracking-[0.3em] transition active:scale-95
              ${
                            accepted
                                ? "bg-[#0F044C] text-white hover:shadow-[0_18px_45px_rgba(15,4,76,0.3)]"
                                : "bg-[#0F044C]/20 text-[#0F044C]/40 cursor-not-allowed"
                        }`}
                    >
                        Generează diploma
                        <ArrowRight size={18} />
                    </button>
                </div>

            </div>
        </div>
    );
}
