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

            {/* Center Content Placeholder */}
            <div className="w-full h-full flex items-center justify-center pt-12">
                <div className="text-center">
                    <div className="w-16 h-16 border-2 border-tactical-cyan/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <div className="w-10 h-10 border border-tactical-cyan rounded-full"></div>
                    </div>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Aguardando Seleção de Setor...</p>
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
