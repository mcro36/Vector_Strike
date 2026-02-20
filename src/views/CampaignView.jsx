import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart } from 'lucide-react';

export default function CampaignView() {
    const navigate = useNavigate();

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

            {/* Main Content Area: Map + Phase Selection Sidebar */}
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

                {/* Right Side: Phase Selection Sidebar */}
                <div className="w-64 h-full bg-slate-900/40 backdrop-blur-sm border-l border-slate-800 p-4 flex flex-col gap-3">
                    <div className="mb-2">
                        <span className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.2em] border-b border-slate-800 block pb-1 mb-2">Seleção de Fase</span>
                    </div>

                    {[1, 2, 3, 4].map(phase => (
                        <button
                            key={phase}
                            className="w-full panel-tactical !py-3 !px-4 flex flex-col items-start hover:border-tactical-neon transition-all bg-slate-900/60 group"
                        >
                            <span className="text-[8px] text-tactical-neon font-mono uppercase tracking-widest opacity-60 group-hover:opacity-100">Fase 0{phase}</span>
                            <span className="text-xs font-bold text-white uppercase tracking-tight">
                                {phase === 1 ? 'Introdução Tática' : phase === 2 ? 'Cinemática Aplicada' : phase === 3 ? 'Dinâmica de Forças' : 'Energia e Gravitação'}
                            </span>
                        </button>
                    ))}

                    <div className="mt-auto pt-4 border-t border-slate-800">
                        <p className="text-[8px] text-slate-500 font-mono text-center">ID_REQ: PHASE_AUTH_REQUIRED</p>
                    </div>
                </div>
            </div>

            {/* Bottom Difficulty Button */}
            <div className="absolute bottom-6 right-6 z-30">
                <button className="panel-tactical !p-2 !px-4 flex items-center gap-2 border-tactical-alert/50 text-tactical-alert hover:bg-tactical-alert/10 transition group">
                    <BarChart size={16} className="group-hover:scale-110 transition" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Dificuldade</span>
                </button>
            </div>
        </div>
    );
}
