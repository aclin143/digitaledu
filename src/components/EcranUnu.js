import { useRef, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import { db } from "../firebase";

export default function EcranUnu() {
    const [form, setForm] = useState({
        fullName: "",
        age: "",
        className: "",
        community: "",
        citizenMeaning: "",
        responsibility: null,
    });
    const [submitStatus, setSubmitStatus] = useState("idle");
    const [hasSignature, setHasSignature] = useState(false);
    const [isHovered, setIsHovered] = useState(null);
   const navigate = useNavigate();
    const canvasRef = useRef(null);
    const drawing = useRef(false);

    const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

    const getPos = (e) => {
        const c = canvasRef.current;
        const r = c.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: (clientX - r.left) * (c.width / r.width),
            y: (clientY - r.top) * (c.height / r.height),
        };
    };

    const start = (e) => {
        drawing.current = true;
        const ctx = canvasRef.current.getContext("2d");
        const { x, y } = getPos(e);
        ctx.beginPath(); ctx.moveTo(x, y);
    };

    const draw = (e) => {
        if (!drawing.current) return;
        const ctx = canvasRef.current.getContext("2d");
        const { x, y } = getPos(e);
        ctx.lineWidth = 2.5; ctx.lineCap = "round"; ctx.strokeStyle = "#EEEEEE";
        ctx.lineTo(x, y); ctx.stroke();
        setHasSignature(true);
    };

    const stop = () => (drawing.current = false);
    const clearSignature = () => {
        const c = canvasRef.current;
        c.getContext("2d").clearRect(0, 0, c.width, c.height);
        setHasSignature(false);
    };

    const isValid =
        form.fullName.trim().length > 3 &&
        Number(form.age) >= 6 &&
        Number(form.age) <= 100 &&
        form.className.trim().length > 1 &&
        form.community.trim().length > 2 &&
        form.citizenMeaning.trim().length > 2 &&
        form.responsibility >= 1 &&
        form.responsibility <= 10 &&
        hasSignature;




    const saveToFirebase = async () => {
        console.log("CLICK");
        console.log("isValid =", isValid);
        console.log("form =", form);
        console.log("hasSignature =", hasSignature);

        if (!isValid) return;

        console.log("TRECE DE VALIDARE");

        const signatureBase64 = canvasRef.current.toDataURL("image/png");

        const docRef = await addDoc(collection(db, "pasapoarteCivice"), {
            ...form,
            signature: signatureBase64,
            createdAt: serverTimestamp(),
        });

// 🔑 CHEI CORECTE
        localStorage.setItem("pasaportId", docRef.id);
        localStorage.setItem("copilFullName", form.fullName);


        localStorage.setItem("pasaportId", docRef.id);


        setSubmitStatus("success");


        console.log("SALVAT");
    };
    return (
        <div
            className="min-h-screen flex items-center justify-center p-6 selection:bg-[#EEEEEE] selection:text-[#0F044C]"
            style={{ background: "radial-gradient(circle at center, #141E61 0%, #000000 100%)" }}
        >
            {/* CONTAINER DOCUMENT OFICIAL */}
            <div className="relative w-full max-w-[1000px] bg-[#0F044C] border border-[#787A91]/40 shadow-[0_0_80px_rgba(0,0,0,0.8)] rounded-sm overflow-hidden transition-all duration-700">

                {/* GRID DE SECURITATE FUNDAL */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                     style={{ backgroundImage: `linear-gradient(#787A91 1px, transparent 1px), linear-gradient(90deg, #787A91 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

                {/* ANTET GUVERNAMENTAL */}
                <header className="
  relative z-10
  grid grid-cols-1
  sm:grid-cols-[120px_1fr_120px]
  lg:grid-cols-[180px_1fr_180px]
  gap-4
  items-center
  px-5 sm:px-8 lg:px-10
  py-5 sm:py-6 lg:py-8
  border-b border-[#787A91]/30
  bg-gradient-to-b from-[#141E61]/50 to-transparent
">

                    <img
                        src="/images/legisland.png"
                        className="h-10 sm:h-12 mx-auto sm:mx-0"
                        alt="Legisland"
                    />


                    <div className="text-center">
                        <h1 className="
  text-[11px] sm:text-[12px]
  tracking-[0.5em] sm:tracking-[0.8em]
  uppercase font-black text-[#EEEEEE]
  text-center
">
                            Pașaport Civic Digital
                        </h1>

                        <div className="flex items-center justify-center gap-4 mt-2">
                            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#787A91]" />
                            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#787A91]">Status: Validare Identitate</p>
                            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#787A91]" />
                        </div>
                    </div>

                    <img
                        src="/images/nicolae-iorga.png"
                        className="h-12 sm:h-14 mx-auto sm:ml-auto"
                        alt="Nicolae Iorga"
                    />

                </header>

                {/* CORP DOCUMENT */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[340px_1fr] divide-y lg:divide-y-0 lg:divide-x divide-[#787A91]/20">

                    {/* LEFT PANEL: BIOMETRICS */}
                    <div className="p-5 sm:p-8 lg:p-10 space-y-8 bg-black/30">
                        <div
                            className="relative group cursor-none"
                            onMouseEnter={() => setIsHovered('photo')}
                            onMouseLeave={() => setIsHovered(null)}
                        >
                            <div className="absolute -inset-1 bg-gradient-to-b from-[#787A91]/40 to-transparent rounded-sm group-hover:from-[#EEEEEE]/30 transition-all duration-500" />
                            <div className="relative aspect-[3/4] border border-[#787A91]/50 overflow-hidden bg-[#141E61]/20">
                                <img
                                    src="/images/img.png"
                                    alt="Identitate"
                                    className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-1000 group-hover:scale-110"
                                />
                                {/* Laser Scan Animation */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#EEEEEE]/20 to-transparent h-[10%] w-full animate-[scan_3s_ease-in-out_infinite] opacity-0 group-hover:opacity-100" />
                                <div className="absolute inset-0 border-[20px] border-[#0F044C]/40 pointer-events-none" />
                            </div>
                            {/* HUD Corners */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#EEEEEE]/40" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#EEEEEE]/40" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#EEEEEE]/40" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#EEEEEE]/40" />
                        </div>

                        <div className="space-y-6">
                            <Field label="Titular Document" active={isHovered === 'name'}>
                                <Input
                                    placeholder="Prenume"
                                    value={form.fullName}
                                    onChange={v => setField("fullName", v)}
                                    onFocus={() => setIsHovered('name')}
                                    onBlur={() => setIsHovered(null)}
                                />
                            </Field>

                            <div className="grid grid-cols-2 gap-6">
                                <Field label="Vârstă" active={isHovered === 'age'}>
                                    <Input
                                        placeholder="10"
                                        value={form.age}
                                        onChange={v => setField("age", v)}
                                        onFocus={() => setIsHovered('age')}
                                        onBlur={() => setIsHovered(null)}
                                    />
                                </Field>
                                <Field label="Clasă" active={isHovered === 'class'}>
                                    <Input
                                        placeholder="X-A"
                                        value={form.className}
                                        onChange={v => setField("className", v)}
                                        onFocus={() => setIsHovered('class')}
                                        onBlur={() => setIsHovered(null)}
                                    />
                                </Field>
                            </div>

                            <Field label="Comunitate de Origine" active={isHovered === 'community'}>
                                <Input
                                    placeholder="Localitate"
                                    value={form.community}
                                    onChange={v => setField("community", v)}
                                    onFocus={() => setIsHovered('community')}
                                    onBlur={() => setIsHovered(null)}
                                />
                            </Field>
                        </div>
                    </div>

                    {/* RIGHT PANEL: DECLARATION */}
                    <div className="p-5 sm:p-8 lg:p-10 space-y-10 bg-gradient-to-br from-transparent to-[#141E61]/10">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-[15px] tracking-[0.5em] uppercase font-black text-[#fff]">Ce înseamnă a fi cetățean?</label>
                                <span className="text-[9px] font-mono text-[#fff]/70 uppercase tracking-widest">Secțiune Obligatorie</span>
                            </div>
                            <textarea
                                value={form.citizenMeaning}
                                onChange={e => setField("citizenMeaning", e.target.value)}
                                onFocus={() => setIsHovered('decl')}
                                onBlur={() => setIsHovered(null)}
                                className={`w-full h-48 bg-black/40 border ${isHovered === 'decl' ? 'border-[#EEEEEE]/40 ring-1 ring-[#EEEEEE]/10' : 'border-[#787A91]/20'} p-6 text-[#EEEEEE] outline-none transition-all duration-500 resize-none font-serif italic text-lg leading-relaxed shadow-inner`}
                                placeholder="Introduceți opinia dumneavoastră aici..."
                            />
                        </div>
                        {/* SCALE SECTION */}
                        <div className="space-y-4">
                            <label className="text-[15px] tracking-[0.4em] uppercase font-black text-[#fff]">
                                Cât de RESPONSABIL sunt? (1-10)
                            </label>
                            <div className="flex justify-between items-center gap-2">
                                {[...Array(10)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setField("responsibility", i + 1)}
                                        className={`flex-1 py-5 sm:py-6 lg:py-8 text-xs font-bold transition-all duration-300 border ${
                                            form.responsibility === i + 1
                                                ? 'bg-[#EEEEEE] text-[#0F044C] border-[#EEEEEE] shadow-[0_0_15px_#EEEEEE]'
                                                : 'bg-[#141E61]/30 text-[#787A91] border-[#787A91]/20 hover:border-[#EEEEEE]/50'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end border-b border-[#787A91]/20 pb-2">
                                <label className="text-[15px] tracking-[0.5em] uppercase font-black text-[#fff]/80">Semnătură Digitala</label>
                                <button onClick={clearSignature} className="text-[9px] text-[#787A91] hover:text-[#EEEEEE] uppercase font-mono transition-colors">
                                    [ Resetează ]
                                </button>
                            </div>
                            <div className="relative group bg-[#02040A] border border-[#787A91]/30 hover:border-[#EEEEEE]/40 transition-colors duration-500">
                                <canvas
                                    ref={canvasRef}
                                    width={window.innerWidth < 640 ? 320 : 500}
                                    height={window.innerWidth < 640 ? 140 : 180}
                                    className="w-full max-w-full cursor-crosshair opacity-80 group-hover:opacity-100 touch-none"
                                    onMouseDown={start}
                                    onMouseMove={draw}
                                    onMouseUp={stop}
                                    onMouseLeave={stop}
                                    onTouchStart={start}
                                    onTouchMove={draw}
                                    onTouchEnd={stop}
                                />


                                {!hasSignature && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <span className="text-[10px] tracking-[1.5em] uppercase font-thin text-[#787A91] animate-pulse">Confirmare Manuală</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* MACHINE READABLE ZONE */}
                <div className="bg-[#000000] px-5 sm:px-8 lg:px-10 py-5 sm:py-6 lg:py-8 border-t border-[#787A91]/20 group">
                    <div className="font-mono text-[13px] tracking-[0.4em] text-[#787A91] group-hover:text-[#EEEEEE]/50 transition-colors duration-700 leading-loose break-all">
                        P&lt;ROU&lt;
                        {(
                            String(form.fullName || "")
                                .toUpperCase()
                                .replace(/\s/g, '<')
                        ) || "IDENTITATE<NEVALIDATA"}
                        &lt;&lt;&lt;&lt;&lt;&lt;&lt;
                        <br />
                        LG2026&lt;
                        {String(form.age || "XX")}
                        &lt;
                        {String(form.className || "XX").replace(/-/g, '')}
                        &lt;ROU&lt;&lt;&lt;&lt;IORGA&lt;SISTEM&lt;V1
                    </div>
                </div>


                {/* FOOTER ACTIONS */}
                <footer className="px-5 sm:px-8 lg:px-10 py-5 sm:py-6 lg:py-8 border-t border-[#787A91]/20 bg-[#141E61]/40 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full ${isValid ? 'bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,44,44,0.4)]'}`} />
                        <span className="text-[10px] font-mono tracking-widest text-[#787A91]">
                            {isValid ? 'VERIFICARE FINALIZATĂ' : 'DATE INCOMPLETE'}
                        </span>
                    </div>

                    <button
                        onClick={async () => {
                            await saveToFirebase();
                            navigate("/formular");
                        }}


                        disabled={!isValid}
                        className={`relative px-14 py-4 font-black uppercase text-[11px] tracking-[0.5em] transition-all duration-500
                            ${isValid
                            ? "bg-[#EEEEEE] text-[#0F044C] hover:bg-white hover:px-16 hover:shadow-[0_0_30px_rgba(238,238,238,0.3)] active:scale-95"
                            : "bg-[#787A91]/10 text-[#787A91]/40 cursor-not-allowed border border-[#787A91]/20 grayscale"
                        }`}
                    >
                        Continuă spre Emitere
                    </button>
                </footer>
                {submitStatus === "success" && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                        <div className="bg-[#0F044C] border border-[#787A91]/40 px-10 py-8 text-center shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                            <h2 className="text-[#EEEEEE] text-lg font-black tracking-widest mb-4">
                                DATE TRIMISE CU SUCCES
                            </h2>
                            <p className="text-[#787A91] text-sm mb-6">
                                Formularul a fost înregistrat.
                            </p>
                            <button
                                onClick={() => setSubmitStatus("idle")}
                                className="bg-[#EEEEEE] text-[#0F044C] px-8 py-3 text-xs font-black tracking-widest hover:bg-white transition"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}

            </div>

            <style jsx>{`
                @keyframes scan {
                    0%, 100% { top: 0%; }
                    50% { top: 90%; }
                }
            `}</style>
        </div>

    );
}

function Field({ label, active, children }) {
    return (
        <div className="space-y-2">
            <label className={`text-[9px] font-black uppercase tracking-[0.3em] transition-colors duration-300 ${active ? 'text-[#EEEEEE]' : 'text-[#787A91]'}`}>
                {label}
            </label>
            <div className={`transition-all duration-300 ${active ? 'translate-x-1' : ''}`}>
                {children}
            </div>
        </div>
    );
}

function Input({ value, onChange, ...props }) {
    return (
        <input
            {...props}
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-black/20 border-b border-[#787A91]/30 py-2.5 px-0 text-[17px] text-[#EEEEEE] focus:border-[#EEEEEE] focus:bg-white/5 outline-none transition-all placeholder:text-[#fff]/70 uppercase font-bold tracking-widest"
        />
);

}
