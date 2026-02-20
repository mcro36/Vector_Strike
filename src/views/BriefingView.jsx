import { useGameStore } from '../store/gameStore';
import { useNavigate } from 'react-router-dom';

export default function BriefingView() {
    const { playerName, avatar, currentRank, currentPhase, diamonds, challengeData, resetGame } = useGameStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        resetGame();
        // App.jsx Router will automatically redirect to "/" because playerName is now empty
    };

    return (
        <div className="flex w-full h-full bg-slate-950 p-6 relative overflow-hidden font-sans">
            {/* Background Hologram grid */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Top Status Bar (Reduced Height & Text) */}
            <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-r from-tactical-dark via-slate-800 to-tactical-dark border-b border-tactical-cyan flex items-center px-4 justify-between z-20 shadow-lg">
                <div className="flex gap-2 items-center">
                    <div className="px-2 py-0.5 bg-tactical-light border border-slate-600 rounded text-[10px] text-tactical-cyan uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-green-500"></span> Operador: <strong className="text-white">{playerName}</strong>
                    </div>
                    <div className="px-2 py-0.5 border border-tactical-alert/50 text-tactical-alert bg-tactical-alert/10 uppercase text-[10px] tracking-wider rounded">
                        Patente Local: {currentRank}
                    </div>
                </div>

                <div className="flex flex-col items-end gap-0.5">
                    <div className="font-mono text-tactical-neon flex items-center gap-1.5">
                        <span className="text-[8px] uppercase text-slate-400">Total Diamonds:</span>
                        <span className="text-sm font-bold tracking-widest">{diamonds}♦</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-[8px] uppercase text-slate-500 hover:text-tactical-alert transition-colors tracking-wider cursor-pointer leading-none"
                    >
                        [Trocar de Conta]
                    </button>
                </div>
            </div>

            {/* Main Content Area: Now using relative positioning to place the General at the top-left */}
            <div className="w-full h-full pt-10 px-4 flex justify-end items-center z-10 relative">

                {/* Floating General Mentor Avatar (Top-Left) */}
                <div className="absolute top-12 left-6 w-32 h-[11rem] z-0">
                    <div className="absolute inset-0 bg-tactical-alert/10 blur-xl rounded-full"></div>
                    <div
                        className="w-full h-full bg-slate-800 border-[1px] border-slate-700/50 rounded-md flex flex-col justify-end relative shadow-lg bg-cover bg-top"
                        style={{ backgroundImage: "url('avatar_general.png')" }}
                    >
                        <div className="absolute top-1.5 left-1.5 font-mono text-[7px] opacity-70 uppercase text-white bg-black/50 px-1 py-0.5 rounded backdrop-blur-sm">Comando Central</div>
                        <div className="h-1/4 w-full bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent absolute bottom-0"></div>
                    </div>
                </div>

                {/* Right Column: Transmission & Mission (Stacked) */}
                <div className="w-full max-w-sm flex flex-col gap-3">

                    {/* Dialog Box: Now at the top of the right column */}
                    <div className="panel-tactical w-full p-3 relative shadow-md">
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-tactical-alert to-transparent"></div>
                        <h3 className="text-tactical-alert text-[9px] uppercase tracking-widest mb-1 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-tactical-alert block animate-pulse"></span>
                            Transmissão de Comando
                        </h3>
                        <p className="text-slate-300 text-[11px] leading-tight italic font-medium">
                            "{challengeData?.storyContext}"
                        </p>
                    </div>

                    {/* Mission Details & Deploy: Below transmission */}
                    <div className="panel-tactical w-full text-right relative backdrop-blur-md p-4">
                        {/* Tactical decoration corner */}
                        <div className="absolute -top-1 -left-1 w-2 h-2 border-t-[1px] border-l-[1px] border-tactical-cyan"></div>

                        <div className="mb-0.5 text-slate-400 font-mono text-[9px] tracking-widest uppercase">Operação de Campo</div>
                        <h1 className="text-2xl text-white font-black uppercase mb-0.5">
                            Fase 0{currentPhase}
                        </h1>
                        <h2 className="text-[11px] text-tactical-neon font-bold mb-2 truncate uppercase tracking-widest">
                            {challengeData?.title}
                        </h2>

                        <div className="flex flex-col items-end gap-1 mb-3 font-mono text-[10px] group">
                            <div className="flex w-full justify-between items-center text-slate-400 border-b border-slate-800 py-0.5">
                                <span>Progresso:</span>
                                <strong className="text-tactical-cyan">{challengeData?.id}/31</strong>
                            </div>
                            <div className="flex w-full justify-between items-center text-slate-400 border-b border-slate-800 py-0.5">
                                <span>Tipo:</span>
                                <strong className="text-tactical-alert text-[9px]">Física Tática</strong>
                            </div>
                            <div className="flex w-full justify-between items-center text-slate-400 border-b border-slate-800 py-0.5">
                                <span>Premiação:</span>
                                <strong className="text-white flex items-center gap-1">200<span className="text-tactical-neon text-[7px]">♦</span></strong>
                            </div>
                        </div>

                        <button
                            className="btn-tactical w-full py-2 text-xs relative group overflow-hidden shadow-lg shadow-tactical-cyan/10"
                            onClick={() => navigate('/mission')}
                        >
                            <div className="absolute inset-0 w-full h-full bg-tactical-neon/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                            <span className="relative z-10 flex items-center justify-center gap-1.5">
                                INICIAR DEPLOY
                                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
