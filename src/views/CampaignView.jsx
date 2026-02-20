import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { ArrowLeft, BarChart } from 'lucide-react';
import challengesData from '../data/challenges';

const getPhase = (challengeId) => {
    if (challengeId === 1) return 1;
    if (challengeId <= 11) return 2;
    if (challengeId <= 21) return 3;
    return 4;
};

export default function CampaignView() {
    const navigate = useNavigate();
    const { currentChallengeId } = useGameStore();

    const challengeData = challengesData.find(c => c.id === currentChallengeId);
    const currentPhase = getPhase(currentChallengeId);

    return (
        <div className="flex w-full h-full bg-slate-950 p-6 relative overflow-hidden font-sans">
            {/* Background Hologram grid */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

            {/* Header */}
            <div className="absolute top-0 left-0 w-full h-12 border-b border-slate-800 flex items-center px-6 justify-between z-20 bg-slate-900/50 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/hub')} className="text-slate-400 hover:text-white transition">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl font-black text-white uppercase tracking-tighter">Campanha Operacional</h1>
                </div>
            </div>

            {/* Main Content Area: Map + Mission Details Sidebar */}
            <div className="w-full h-full pt-12 flex gap-4 z-10">

                {/* Left Side: Map Placeholder */}
                <div className="flex-1 flex flex-col items-center justify-center p-8 border-r border-slate-900/50">
                    <div className="w-24 h-24 border-2 border-tactical-cyan/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                        <div className="w-16 h-16 border border-tactical-cyan/40 rounded-full"></div>
                    </div>
                    <p className="text-slate-600 font-mono text-[10px] uppercase tracking-widest text-center">
                        Sensores de Área: Ativados<br />
                        <span className="text-slate-700">Aguardando coordenadas do setor...</span>
                    </p>
                </div>

                {/* Right Side: Mission Details (Transferred from Hub) */}
                <div className="w-80 h-full bg-slate-900/40 backdrop-blur-sm border-l border-slate-800 p-6 flex flex-col justify-center">
                    <div className="panel-tactical w-full text-right relative backdrop-blur-md p-4">
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
                            <span className="relative z-10 flex items-center justify-center gap-1.5 uppercase font-bold tracking-widest">
                                Iniciar
                                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                        </button>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800">
                        <button className="w-full panel-tactical !p-2 flex items-center justify-center gap-2 border-tactical-alert/50 text-tactical-alert hover:bg-tactical-alert/10 transition group">
                            <BarChart size={14} className="group-hover:scale-110 transition" />
                            <span className="text-[9px] font-bold uppercase tracking-widest">Dificuldade</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
