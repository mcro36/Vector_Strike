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

            {/* Top Status Bar */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-tactical-dark via-slate-800 to-tactical-dark border-b border-tactical-cyan flex items-center px-8 justify-between z-20 shadow-lg">
                <div className="flex gap-4 items-center">
                    <div className="px-3 py-1 bg-tactical-light border border-slate-600 rounded text-xs text-tactical-cyan uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full animate-pulse bg-green-500"></span> Operador: <strong className="text-white">{playerName}</strong>
                    </div>
                    <div className="px-3 py-1 border border-tactical-alert/50 text-tactical-alert bg-tactical-alert/10 uppercase text-xs tracking-wider rounded">
                        Patente Local: {currentRank}
                    </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                    <div className="font-mono text-tactical-neon flex items-center gap-2">
                        <span className="text-[10px] uppercase text-slate-400">Total Diamonds:</span>
                        <span className="text-xl font-bold tracking-widest">{diamonds}♦</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-[10px] uppercase text-slate-500 hover:text-tactical-alert transition-colors tracking-wider cursor-pointer"
                    >
                        [Trocar de Conta]
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full h-full pt-12 flex items-center justify-between z-10 gap-8">

                {/* Left Side: General Mentor Avatar and Dialogue */}
                <div className="w-[45%] h-full flex flex-col justify-end pb-8 relative">

                    {/* General Image Box Placeholder */}
                    <div className="relative w-80 h-[28rem] self-center -mb-8 z-0">
                        {/* General BG glow */}
                        <div className="absolute inset-0 bg-tactical-alert/20 blur-3xl rounded-full"></div>
                        {/* Image frame */}
                        <div
                            className="w-full h-full bg-slate-800 border-2 border-slate-700/50 rounded-lg flex flex-col justify-end relative shadow-2xl bg-cover bg-top"
                            style={{ backgroundImage: "url('avatar_general.png')" }}
                        >
                            <div className="absolute top-4 left-4 font-mono text-xs opacity-50 uppercase text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">General Mentor</div>
                            {/* Gradients to blend character feet */}
                            <div className="h-1/3 w-full bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent absolute bottom-0"></div>
                        </div>
                    </div>

                    {/* Dialog Box */}
                    <div className="panel-tactical w-full z-10 p-6 relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tactical-alert to-transparent"></div>
                        <h3 className="text-tactical-alert text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-tactical-alert block"></span>
                            Transmissão Prioritária - Comando Central
                        </h3>
                        <p className="text-slate-200 text-lg leading-relaxed mb-4 italic font-medium">
                            "{challengeData?.storyContext}"
                        </p>
                    </div>
                </div>

                {/* Right Side: Mission Details & Deploy */}
                <div className="w-[50%] h-full flex flex-col justify-center items-end pr-8 gap-8">

                    <div className="panel-tactical w-full max-w-lg text-right relative backdrop-blur-md">
                        {/* Tactical decoration corner */}
                        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-tactical-cyan"></div>

                        <div className="mb-2 text-slate-400 font-mono text-xs tracking-widest uppercase">Diretiva de Missão</div>
                        <h1 className="text-4xl text-white font-black uppercase mb-1">
                            Fase 0{currentPhase}
                        </h1>
                        <h2 className="text-2xl text-tactical-neon font-bold mb-6 truncate uppercase tracking-wide">
                            {challengeData?.title}
                        </h2>

                        <div className="flex flex-col items-end gap-2 mb-8 font-mono text-sm group">
                            <div className="flex w-full justify-between items-center text-slate-300 border-b border-slate-800 py-2">
                                <span>Objetivo Atual:</span>
                                <strong className="text-tactical-cyan">{challengeData?.id} de 31</strong>
                            </div>
                            <div className="flex w-full justify-between items-center text-slate-300 border-b border-slate-800 py-2">
                                <span>Tática Exigida:</span>
                                <strong className="text-tactical-alert">Múltipla Escolha Rápida</strong>
                            </div>
                            <div className="flex w-full justify-between items-center text-slate-300 border-b border-slate-800 py-2">
                                <span>Recompensa Máxima M.Q.:</span>
                                <strong className="text-white flex items-center gap-1">200<span className="text-tactical-neon text-[10px]">♦</span></strong>
                            </div>
                        </div>

                        <button
                            className="btn-tactical w-full py-5 text-xl relative group overflow-hidden shadow-2xl shadow-tactical-cyan/20"
                            onClick={() => navigate('/mission')}
                        >
                            <div className="absolute inset-0 w-full h-full bg-tactical-neon/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                DEPLOY MISSION
                                {/* SVG Arrow icon */}
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
