import { useRef } from "react";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

export default function Diploma() {
    const diplomaRef = useRef(null);
    const numeCopil = localStorage.getItem("copilFullName");

    const downloadDiploma = async () => {
        if (!diplomaRef.current) return;

        const canvas = await html2canvas(diplomaRef.current, {
            scale: 2,
            useCORS: true,
        });

        const link = document.createElement("a");
        link.download = `Diploma_${numeCopil || "LEGISLAND"}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
            style={{
                background:
                    "radial-gradient(circle at top, #1a237e 0%, #020617 70%)",
            }}
        >
            {/* TITLU */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-widest mb-4">
                    FELICITĂRI!
                </h1>
                <p className="text-white/70 text-lg max-w-xl mx-auto">
                    Ai finalizat cu succes experiența educațională <span className="font-bold">LEGISLAND</span>.
                    Această diplomă certifică implicarea și responsabilitatea ta civică.
                </p>
            </div>

            {/* CARD DIPLOMĂ */}
            <div className="relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-10 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">

                {/* STRĂLUCIRE DECORATIVĂ */}
                <div className="absolute -inset-1 rounded-[2.6rem] bg-gradient-to-r from-[#FFD700]/20 via-white/10 to-[#FFD700]/20 blur-xl opacity-70 pointer-events-none" />

                {/* DIPLOMA */}
                <div
                    ref={diplomaRef}
                    className="relative"
                >
                    <img
                        src="/images/diploma.png"
                        alt="Diplomă Legisland"
                        className="w-full max-w-[900px] rounded-xl"
                    />

                    {/* NUME COPIL */}
                    <div
                        className="
    absolute font-black text-[#0F044C] whitespace-nowrap
    text-[9px] sm:text-[12px] md:text-[20px] lg:text-[24px]
    tracking-[0.1em]
  "
                        style={{
                            top: "49%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        {numeCopil ? numeCopil.toUpperCase() : "—"}
                    </div>

                </div>
            </div>

            {/* BUTON DESCĂRCARE */}
            <button
                onClick={downloadDiploma}
                className="mt-12 flex items-center gap-4 px-14 py-5 rounded-2xl
                bg-gradient-to-r from-[#FFD700] to-[#E6B800]
                text-[#0F044C] font-black uppercase tracking-[0.3em]
                hover:scale-105 hover:shadow-[0_20px_50px_rgba(255,215,0,0.45)]
                active:scale-95 transition"
            >
                <Download size={22} />
                Descarcă diploma
            </button>

            {/* SUBTEXT */}
            <p className="mt-6 text-white/40 text-xs tracking-widest uppercase">
                Certificat digital • Legisland
            </p>
        </div>
    );
}
