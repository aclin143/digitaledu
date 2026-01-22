import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    HeartHandshake,
    Equal,
    Scale,
    HandHeart,
    Users,
    CheckCircle,
    MessageSquareText,
    Sparkles,
    ArrowRight,
} from "lucide-react";

const VALORI = [
    { id: "respect", label: "Respect", icon: HeartHandshake, hint: "Ex: Am ascultat fără să întrerup." },
    { id: "egalitate", label: "Egalitate", icon: Equal, hint: "Ex: Am tratat pe toți la fel." },
    { id: "dreptate", label: "Dreptate", icon: Scale, hint: "Ex: Am ales ce e corect, nu ce e ușor." },
    { id: "solidaritate", label: "Solidaritate", icon: HandHeart, hint: "Ex: Am ajutat când cineva a avut nevoie." },
    { id: "participare", label: "Participare", icon: Users, hint: "Ex: Am spus părerea mea și am cooperat." },
];

export default function Ecran7() {
    const navigate = useNavigate();

    // checked values
    const [checked, setChecked] = useState([]);
    // arguments per value: { respect: "..." }
    const [args, setArgs] = useState({});

    // open questions (optional, rămân pe ecran)
    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");

    const toggleValue = (id) => {
        setChecked((prev) => {
            const isOn = prev.includes(id);

            // dacă debifează -> șterge argumentul
            if (isOn) {
                setArgs((a) => {
                    const copy = { ...a };
                    delete copy[id];
                    return copy;
                });
                return prev.filter((x) => x !== id);
            }

            // dacă bifează -> adaugă, dar nu forța argument instant
            return [...prev, id];
        });
    };

    const minLen = 8;

    const completedCount = useMemo(() => {
        return checked.filter((id) => (args[id] || "").trim().length >= minLen).length;
    }, [checked, args]);

    const progress = checked.length === 0 ? 0 : Math.round((completedCount / checked.length) * 100);

    const canContinue =
        checked.length > 0 && completedCount === checked.length;

    return (
        <div className="min-h-screen p-5 sm:p-8 md:p-20 text-[#0F044C]"
             style={{
                 background:
                     "radial-gradient(circle at 20% 10%, rgba(15,4,76,0.10) 0%, transparent 55%), radial-gradient(circle at 80% 0%, rgba(20,30,97,0.12) 0%, transparent 60%), linear-gradient(135deg, #EEEEEE 0%, #E2E8F0 100%)",
             }}
        >
            <div className="max-w-6xl mx-auto space-y-10">

                {/* HEADER */}
                <header className="bg-white/75 backdrop-blur-md border border-white rounded-[2rem] p-8 shadow-[0_18px_50px_rgba(15,4,76,0.08)]">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

                    <div>
                            <div className="inline-flex items-center gap-2 text-[#141E61]">
                                <Sparkles size={18} />
                                <span className="uppercase text-xs font-black tracking-[0.35em]">
                  Valori democratice
                </span>
                            </div>
                        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0F044C]">

                        Nivelul 7
                            </h1>
                            <p className="mt-3 text-[#787A91] text-lg max-w-3xl leading-relaxed">
                                Bifează valorile pe care le-ai folosit și scrie un argument scurt pentru fiecare.
                            </p>
                        </div>

                        {/* PROGRESS BADGE */}
                        <div className="
  w-full md:min-w-[220px]
  rounded-2xl border border-white
  bg-[#0F044C] text-white
  p-5
  shadow-[0_18px_45px_rgba(15,4,76,0.25)]
">

                        <p className="text-[10px] uppercase font-black tracking-[0.35em] opacity-80">
                                progres argumentare
                            </p>
                            <div className="mt-2 flex items-end justify-between">
                                <span className="text-3xl font-black">{progress}%</span>
                                <span className="text-[11px] font-mono opacity-80">
                  {completedCount}/{checked.length || 0}
                </span>
                            </div>
                            <div className="mt-3 w-full h-2 rounded-full bg-white/15 overflow-hidden">
                                <div className="h-full bg-white transition-all" style={{ width: `${progress}%` }} />
                            </div>
                            <p className="mt-3 text-[11px] opacity-80 leading-relaxed">
                                Ca să mergi mai departe: bifezi cel puțin o valoare și scrii argument la fiecare bifă.
                            </p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">

                    {/* LEFT: VALUES */}
                    <section className="space-y-5">
                        {VALORI.map((v) => {
                            const Icon = v.icon;
                            const active = checked.includes(v.id);
                            const ok = active && (args[v.id] || "").trim().length >= minLen;

                            return (
                                <div
                                    key={v.id}
                                    className={`rounded-[2rem] border bg-white/75 backdrop-blur-md shadow-[0_14px_40px_rgba(0,0,0,0.05)] overflow-hidden transition
                    ${active ? "border-[#0F044C]/25" : "border-white"}
                  `}
                                >
                                    {/* TOP ROW */}
                                    <button
                                        onClick={() => toggleValue(v.id)}
                                        className={`w-full flex items-center gap-4 p-6 text-left transition
                      ${active ? "bg-[#0F044C] text-white" : "bg-white/70 hover:bg-white"}
                    `}
                                    >
                                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center
                      ${active ? "bg-white/15" : "bg-[#0F044C]/5"}
                    `}>
                                            <Icon size={26} className={active ? "text-white" : "text-[#0F044C]"} />
                                        </div>

                                        <div className="flex-1">
                                            <p className={`text-xl font-black ${active ? "text-white" : "text-[#0F044C]"}`}>
                                                {v.label}
                                            </p>
                                            <p className={`text-sm ${active ? "text-white/80" : "text-[#787A91]"}`}>
                                                {active ? "Bifat — acum scrie argumentul" : "Apasă ca să bifezi"}
                                            </p>
                                        </div>

                                        <div className={`px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em]
                      ${active ? (ok ? "bg-emerald-500 text-white" : "bg-white/15 text-white") : "bg-[#141E6110] text-[#0F044C]"}
                    `}>
                                            {active ? (ok ? "OK" : "ARGUMENT") : "NEALES"}
                                        </div>
                                    </button>

                                    {/* ARGUMENT */}
                                    {active && (
                                        <div className="p-6 bg-gradient-to-br from-white/80 to-white">
                                            <div className="flex items-center gap-2 mb-3 text-[#0F044C]">
                                                <MessageSquareText size={18} />
                                                <p className="font-black">
                                                    Argument (minim {minLen} caractere)
                                                </p>
                                            </div>

                                            <textarea
                                                value={args[v.id] || ""}
                                                onChange={(e) =>
                                                    setArgs((prev) => ({ ...prev, [v.id]: e.target.value }))
                                                }
                                                placeholder={v.hint}
                                                className={`w-full h-24 rounded-2xl border p-4 resize-none outline-none transition
                          ${ok ? "border-emerald-400 bg-emerald-50/40" : "border-[#787A91]/25 bg-white"}
                          focus:border-[#0F044C]/40
                        `}
                                            />

                                            {!ok && (
                                                <p className="mt-2 text-xs text-[#787A91]">
                                                    Scrie un motiv scurt și clar (de ex. o situație reală din joc).
                                                </p>
                                            )}

                                            {ok && (
                                                <div className="mt-3 flex items-center gap-2 text-emerald-600">
                                                    <CheckCircle size={18} />
                                                    <span className="text-sm font-bold">Argument complet</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </section>

                    {/* RIGHT: OPEN QUESTIONS */}
                    <section className="rounded-[2rem] border border-white bg-white/75 backdrop-blur-md shadow-[0_14px_40px_rgba(0,0,0,0.05)] p-7 space-y-6">
                        <h2 className="text-xl font-black text-[#0F044C]">
                            Întrebări deschise (opțional)
                        </h2>

                        <div>
                            <label className="font-black text-[#0F044C]">
                                Ce m-a schimbat LEGISLAND?
                            </label>
                            <textarea
                                value={q1}
                                onChange={(e) => setQ1(e.target.value)}
                                className="w-full h-24 mt-2 rounded-2xl border border-[#787A91]/25 p-4 resize-none"
                            />
                        </div>

                        <div>
                            <label className="font-black text-[#0F044C]">
                                Ce decizie a fost cea mai dificilă?
                            </label>
                            <textarea
                                value={q2}
                                onChange={(e) => setQ2(e.target.value)}
                                className="w-full h-24 mt-2 rounded-2xl border border-[#787A91]/25 p-4 resize-none"
                            />
                        </div>

                        <div>
                            <label className="font-black text-[#0F044C]">
                                Ce fel de cetățean vreau să devin?
                            </label>
                            <textarea
                                value={q3}
                                onChange={(e) => setQ3(e.target.value)}
                                className="w-full h-24 mt-2 rounded-2xl border border-[#787A91]/25 p-4 resize-none"
                            />
                        </div>

                        {/* ACTION */}
                        <button
                            onClick={() => navigate("/ecran8")}
                            disabled={!canContinue}
                            className={`w-full mt-2 inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.35em] transition active:scale-95
                ${
                                canContinue
                                    ? "bg-[#0F044C] text-white hover:shadow-[0_18px_45px_rgba(15,4,76,0.25)]"
                                    : "bg-[#0F044C]/15 text-[#0F044C]/35 cursor-not-allowed"
                            }`}
                        >
                            Continuă
                            <ArrowRight size={18} />
                        </button>

                        {!canContinue && (
                            <p className="text-xs text-[#787A91] leading-relaxed">
                                Bifează cel puțin o valoare și scrie argument la fiecare bifă.
                            </p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
