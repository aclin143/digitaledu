import React from "react";
import { useNavigate } from "react-router-dom";
import {
    UserX,
    UserMinus,
    UserCheck,
    Users,
    Globe,
    BookOpen
} from "lucide-react";

const EcranTrei = () => {
    const navigate = useNavigate();

    const informatii = [
        {
            t: "Sub 14 ani",
            d: "Copiii care nu au împlinit vârsta de 14 ani nu răspund penal, chiar dacă au comis o faptă gravă. Accentul este pus pe educație, consiliere psihologică și implicarea părinților.",
            icon: <UserX size={24} />
        },
        {
            t: "Între 14 și 16 ani",
            d: "Minorii pot răspunde penal doar pentru infracțiuni grave. Legea urmărește aplicarea măsurilor educative, supravegherea copilului și munca neremunerată în folosul comunității.",
            icon: <UserMinus size={24} />
        },
        {
            t: "Între 16 și 18 ani",
            d: "Minorii răspund penal aproape la fel ca adulții, însă pedepsele sunt adaptate vârstei. Se pot aplica amenzi, muncă în folosul comunității sau detenție în instituții speciale.",
            icon: <UserCheck size={24} />
        },
        {
            t: "Peste 18 ani",
            d: "După împlinirea vârstei de 18 ani, persoana răspunde penal pe deplin, iar pedepsele sunt cele prevăzute pentru adulți.",
            icon: <Users size={24} />
        },
        {
            t: "Europa",
            d: "În majoritatea țărilor europene, vârsta de răspundere penală începe între 13 și 14 ani. Copiii beneficiază de protecție specială, iar scopul legii este educarea, nu pedeapsa dură.",
            icon: <Globe size={24} />
        },
        {
            t: "Ideea principală",
            d: "Legea protejează copiii și îi ajută să înțeleagă ce este corect și ce este greșit, pentru a deveni adulți responsabili și respectuoși.",
            icon: <BookOpen size={24} />
        }
    ];

    return (
        <div
            className="min-h-screen p-8 md:p-20 font-sans text-[#0F044C]"
            style={{ background: "linear-gradient(135deg, #EEEEEE 0%, #e2e8f0 100%)" }}
        >
            <div className="max-w-6xl mx-auto">

                {/* HEADER */}
                <header className="mb-16 text-center md:text-left">
                    <h2 className="text-5xl font-black tracking-tight mb-6">
                        Vârsta de Răspundere Penală
                    </h2>
                    <p className="text-[#787A91] text-xl max-w-3xl leading-relaxed">
                        Cum se aplică răspunderea penală în funcție de vârstă în Republica Moldova
                        și în alte țări europene.
                    </p>
                </header>

                {/* GRID CARDURI */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {informatii.map((item, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-[2rem] transition-all duration-500
                                       bg-white/80 backdrop-blur-sm border border-white
                                       shadow-[0_10px_30px_rgba(0,0,0,0.03)]
                                       hover:shadow-[0_20px_40px_rgba(20,30,97,0.1)]
                                       hover:-translate-y-2"
                        >
                            <div
                                className="mb-6 flex items-center justify-center w-14 h-14 rounded-2xl
                                           bg-[#141E6110] text-[#141E61]
                                           group-hover:bg-[#0F044C]
                                           group-hover:text-[#EEEEEE]
                                           transition-all duration-500"
                            >
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

                {/* BUTON CONTINUARE */}
                <div className="mt-20 flex justify-center md:justify-end">
                    <button
                        onClick={() => navigate("/ecranpatru")}
                        className="group relative overflow-hidden bg-[#0F044C] text-[#EEEEEE]
                                   px-12 py-5 rounded-2xl font-bold uppercase text-xs
                                   tracking-[0.3em] transition-all duration-300
                                   hover:shadow-[0_10px_30px_rgba(15,4,76,0.3)]
                                   active:scale-95"
                    >
                        <span className="relative z-10">Următorul nivel</span>
                        <div className="absolute inset-0 bg-[#141E61] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default EcranTrei;
