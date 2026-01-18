export default function Header() {
    return (
        <header className="bg-[#0B0F2A] border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-6">

                <div className="grid grid-cols-3 items-center">

                    {/* STÂNGA – ȘCOALĂ */}
                    <div className="flex justify-start">
                        <img
                            src="/images/nicolae-iorga.png"
                            alt="Liceul Nicolae Iorga"
                            className="h-14 md:h-16 object-contain opacity-90 hover:opacity-100 transition"
                        />
                    </div>

                    {/* CENTRU – FEDERAȚIE (FOCAL POINT) */}
                    <div className="flex justify-center">
                        <img
                            src="/images/federatie.png"
                            alt="Federația"
                            className="h-18 md:h-20 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        />
                    </div>

                    {/* DREAPTA – JOC */}
                    <div className="flex justify-end">
                        <img
                            src="/images/legisland.png"
                            alt="Legisland"
                            className="h-14 md:h-16 object-contain opacity-90 hover:opacity-100 transition"
                        />
                    </div>

                </div>

            </div>
        </header>
    );
}
