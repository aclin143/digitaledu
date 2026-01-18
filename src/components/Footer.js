export default function Footer() {
    return (
        <footer className="bg-[#0B0F2A] border-t border-white/10 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* TITLU FOOTER */}
                <div className="text-center mb-6">
                    <p className="text-[11px] uppercase tracking-[0.4em] text-white/60">
                        Proiect educațional digital
                    </p>
                </div>

                {/* DIVIDER */}
                <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* CREDITS */}
                <div className="text-center text-[12px] text-white/60 tracking-wide space-y-2">
                    <p>
                        Dezvoltat de{" "}
                        <span className="font-semibold text-white">
                            Toderici Calin-Iustin
                        </span>
                    </p>
                    <p>
                        Coordonator educațional{" "}
                        <span className="font-semibold text-white">
                            Paicu Olga
                        </span>
                    </p>
                </div>

                {/* COPYRIGHT */}
                <div className="mt-8 text-center text-[10px] tracking-widest text-white/40">
                    © {new Date().getFullYear()} • Toate drepturile rezervate
                </div>

            </div>
        </footer>
    );
}
