import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const images = [
    "/images/police.png",
    "/images/judge.png",
    "/images/teacher.png",
    "/images/doctor.png",
    "/images/student.png",
    "/images/lawyer.png",
];

// iconițe watermark (emoji) – transparente
const bgIcons = [
    { t: "⚖️", x: 12, y: 18, s: 54, o: 0.07, r: -18 },
    { t: "📜", x: 78, y: 12, s: 46, o: 0.06, r: 14 },
    { t: "🏛️", x: 86, y: 58, s: 64, o: 0.07, r: -10 },
    { t: "🛡️", x: 18, y: 72, s: 48, o: 0.06, r: 10 },
    { t: "📚", x: 54, y: 78, s: 44, o: 0.05, r: -8 },
    { t: "🔎", x: 42, y: 38, s: 56, o: 0.05, r: 8 },
];

export default function EcranZero() {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        const i = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 1300);
        return () => clearInterval(i);
    }, []);

    const isMobile = window.innerWidth < 640;
    const radius = isMobile ? 145 : 260;


    return (
        <div
            className="relative min-h-[140vh] text-[#EEEEEE] overflow-hidden"
            style={{
                fontFamily:
                    "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji','Segoe UI Emoji'",
                background: "linear-gradient(180deg, #000000 0%, #141E61 100%)",
            }}
        >
            {/* WATERMARK ICONS */}
            <div className="absolute inset-0 pointer-events-none">
                {bgIcons.map((ic, k) => (
                    <span
                        key={k}
                        style={{
                            position: "absolute",
                            left: `${ic.x}%`,
                            top: `${ic.y}%`,
                            fontSize: ic.s,
                            opacity: ic.o,
                            transform: `rotate(${ic.r}deg)`,
                            filter: "blur(0.2px)",
                        }}
                    >
            {ic.t}
          </span>
                ))}
            </div>

            {/* "Pașaport civic interactiv" — pronunțat, în colț */}
            <div className="absolute top-6 left-6 z-20">
                <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md shadow-[0_0_30px_rgba(238,238,238,0.12)]">
          <span className="text-sm tracking-widest uppercase text-[#EEEEEE]/90 ">
             PAȘAPORT CIVIC
          </span>
                </div>
            </div>

            {/* CONTENT */}
            <div className="relative z-10 px-6 pt-28">
                {/* TEXT BLOCK — simplu, curat, fără “story” în plus */}
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-6l md:text-8xl font-extrabold tracking-wide leading-[1.02]">
                        LEGISLAND
                    </h1>

                    <p className="mt-8 text-xl md:text-2xl leading-relaxed text-[#EEEEEE]/90">
                        Acest pașaport nu este un document formal.
                    </p>

                    <p className="mt-4 text-lg md:text-xl leading-relaxed text-[#EEEEEE]/80">
                        Este dovada că înveți să gândești, să decizi și să acționezi{" "}
                        <span className="font-semibold text-[#EEEEEE]">
              ca cetățean democratic.
            </span>
                    </p>
                </div>

                {/* CAROUSEL AREA — separat ca să NU interfereze cu textul */}
                <div className="mt-32 flex justify-center">
                    <div className="
  relative
  w-[340px] h-[340px]
  sm:w-[420px] sm:h-[420px]
  md:w-[520px] md:h-[520px]
  flex items-center justify-center
">

                    {/* HALO */}
                        <div className="absolute inset-10 rounded-full border border-[#141E61] opacity-45" />

                        {images.map((src, i) => {
                            const angle = ((i - index) * 2 * Math.PI) / images.length;
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;
                            const active = i === index;

                            return (
                                <img
                                    key={src}
                                    src={src}
                                    alt=""
                                    className={`
                    absolute
w-28 h-28
sm:w-36 sm:h-36
md:w-48 md:h-48

                    transition-all duration-700
                    ${active ? "scale-125 opacity-100" : "scale-90 opacity-45"}
                  `}
                                    style={{
                                        transform: `translate(${x}px, ${y}px)`,
                                        boxShadow: active ? "0 0 35px #EEEEEE" : "0 0 0 transparent",
                                        filter: active ? "none" : "grayscale(35%)",
                                    }}
                                />
                            );
                        })}

                        {/* BUTTON CENTRAL */}
                        <button     onClick={() => navigate("/identitate")}
                            className="
                relative z-10
                px-12 py-4 rounded-full font-semibold text-lg
                bg-[#EEEEEE] text-[#0F044C]
                shadow-[0_0_40px_#141E61]
                hover:scale-105 transition
              "
                        >
                            Începe călătoria
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
