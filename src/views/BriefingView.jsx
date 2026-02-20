import { useGameStore } from '../store/gameStore';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import challengesData from '../data/challenges';

const getPhase = (challengeId) => {
    if (challengeId === 1) return 1;
    if (challengeId <= 11) return 2;
    if (challengeId <= 21) return 3;
    return 4;
};

export default function BriefingView() {
    const { playerName, currentChallengeId, diamonds, resetGame } = useGameStore();
    const navigate = useNavigate();

    const challengeData = challengesData.find(c => c.id === currentChallengeId);
    const currentPhase = getPhase(currentChallengeId);

    // Dynamic Rank based on challengeId
    const currentRank = (() => {
        if (currentChallengeId === 1) return "Cadete";
        if (currentChallengeId <= 11) return "Aspirante";
        if (currentChallengeId <= 16) return "2º Tenente";
        if (currentChallengeId <= 19) return "1º Tenente";
        if (currentChallengeId <= 21) return "Capitão";
        if (currentChallengeId <= 25) return "Major";
        if (currentChallengeId <= 29) return "Ten. Coronel";
        if (currentChallengeId <= 30) return "Coronel";
        return "General";
    })();

    const handleLogout = () => {
        resetGame();
    };

    return (
        <div className="flex w-full h-full bg-slate-950 p-6 relative overflow-hidden font-sans">
            {/* Background Hologram grid */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Top Status Bar */}
            <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-r from-tactical-dark via-slate-800 to-tactical-dark border-b border-tactical-cyan flex items-center px-4 justify-between z-20 shadow-lg">
                <div className="flex gap-2 items-center">
                    <div className="px-2 py-0.5 bg-tactical-light border border-slate-600 rounded text-[10px] text-tactical-cyan uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-green-500"></span> Operador: <strong className="text-white">{playerName}</strong>
                    </div>
                    <div className="px-2 py-0.5 border border-tactical-alert/50 text-tactical-alert bg-tactical-alert/10 uppercase text-[10px] tracking-wider rounded">
                        Patente Local: {currentRank}
                    </div>
                </div>

                <div className="flex gap-3 items-center">
                    <div className="font-mono text-tactical-neon flex items-center gap-1.5">
                        <span className="text-[8px] uppercase text-slate-400">Total Diamonds:</span>
                        <span className="text-sm font-bold tracking-widest">{diamonds}♦</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-1.5 rounded bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-tactical-alert hover:border-tactical-alert transition-all cursor-pointer flex items-center justify-center"
                        title="Trocar de Conta"
                    >
                        <LogOut size={14} />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full h-full pt-10 px-4 flex justify-start items-center z-10 relative">

                {/* General Mentor + Transmission Link (Grouped) */}
                <div className="absolute top-12 left-6 flex items-start gap-[20px]">
                    <div className="w-28 h-[10rem] flex-shrink-0 relative">
                        <div className="absolute inset-0 bg-tactical-alert/10 blur-xl rounded-full"></div>
                        <div
                            className="w-full h-full bg-slate-800 border-[1px] border-slate-700/50 rounded-md flex flex-col justify-end relative shadow-lg bg-cover bg-top"
                            style={{ backgroundImage: "url('avatar_general.png')" }}
                        >
                            <div className="absolute top-1.5 left-1.5 font-mono text-[7px] opacity-70 uppercase text-white bg-black/50 px-1 py-0.5 rounded backdrop-blur-sm">Comando Central</div>
                            <div className="h-1/4 w-full bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent absolute bottom-0"></div>
                        </div>
                    </div>

                    {/* Dialog Box: 20px next to avatar */}
                    <div className="panel-tactical w-60 p-3 mt-4 relative shadow-md self-center">
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-tactical-alert to-transparent"></div>
                        <h3 className="text-tactical-alert text-[9px] uppercase tracking-widest mb-1 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-tactical-alert block animate-pulse"></span>
                            Link Ativo
                        </h3>
                        <p className="text-slate-300 text-[10px] leading-tight italic font-medium">
                            "{challengeData?.storyContext}"
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Utility Bar */}
            <div className="absolute bottom-4 left-0 w-full flex justify-center gap-4 z-20 px-4">
                <button
                    onClick={() => navigate('/campaign')}
                    className="btn-tactical py-1.5 px-6 text-[10px] tracking-widest shadow-lg shadow-tactical-alert/5 border-tactical-alert/30"
                >
                    CAMPANHA
                </button>
                <button
                    onClick={() => navigate('/ranking')}
                    className="btn-tactical py-1.5 px-6 text-[10px] tracking-widest bg-slate-900/50 border-slate-700 hover:border-tactical-cyan transition group"
                >
                    <span className="opacity-70 group-hover:opacity-100 uppercase font-bold text-tactical-cyan">Ranking</span>
                </button>
                <button
                    onClick={() => navigate('/shop')}
                    className="btn-tactical py-1.5 px-6 text-[10px] tracking-widest bg-slate-900/50 border-slate-700 hover:border-tactical-cyan transition group"
                >
                    <span className="opacity-70 group-hover:opacity-100 uppercase">Loja</span>
                </button>
            </div>
        </div>
    );
}
