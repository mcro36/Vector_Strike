import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Trophy, ArrowLeft, Shield } from 'lucide-react';

export default function RankingView() {
    const navigate = useNavigate();
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRanking = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('player_name, total_xp, avatar')
                    .order('total_xp', { ascending: false })
                    .limit(50);

                if (data) {
                    setLeaderboard(data);
                }
            } catch (err) {
                console.error("Error fetching ranking:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRanking();
    }, []);

    return (
        <div className="flex flex-col w-full h-full bg-slate-950 p-6 relative overflow-hidden font-sans">
            {/* Background Hologram grid */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

            {/* Header Area */}
            <div className="flex justify-between items-center mb-6 z-10 relative">
                <button
                    onClick={() => navigate('/hub')}
                    className="panel-tactical !p-2 flex items-center gap-2 hover:border-tactical-alert transition-all text-slate-400 hover:text-white"
                >
                    <ArrowLeft size={16} />
                    <span className="text-[10px] uppercase font-mono tracking-widest italic">Retornar ao Hub</span>
                </button>

                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-black text-white tracking-[0.3em] flex items-center gap-3">
                        <Trophy className="text-tactical-neon" size={24} />
                        RANKING <span className="text-tactical-cyan">GLOBAL</span>
                    </h1>
                    <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-tactical-cyan to-transparent mt-1"></div>
                </div>

                <div className="w-40"></div> {/* Spacer for symmetry */}
            </div>

            {/* Leaderboard Table Container */}
            <div className="flex-1 w-full max-w-4xl mx-auto z-10 relative overflow-hidden flex flex-col">
                <div className="panel-tactical !bg-slate-900/40 backdrop-blur-md flex-1 flex flex-col overflow-hidden border-tactical-cyan/20">

                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 bg-tactical-dark/50 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                        <div className="col-span-2 text-center">Classificação</div>
                        <div className="col-span-7">Operador</div>
                        <div className="col-span-3 text-right">Pontos XP</div>
                    </div>

                    {/* Table Body */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {loading ? (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                                <div className="w-10 h-10 border-4 border-tactical-cyan/20 border-t-tactical-cyan rounded-full animate-spin"></div>
                                <span className="text-[10px] text-tactical-cyan font-mono animate-pulse uppercase tracking-[0.2em]">Escaneando Satélites...</span>
                            </div>
                        ) : (
                            leaderboard.map((player, index) => (
                                <div
                                    key={index}
                                    className={`grid grid-cols-12 gap-4 p-4 items-center border-b border-slate-800/40 hover:bg-slate-800/30 transition-colors
                                        ${index === 0 ? 'bg-tactical-neon/5' : ''}
                                        ${index === 1 ? 'bg-slate-800/20' : ''}
                                        ${index === 2 ? 'bg-orange-950/10' : ''}
                                    `}
                                >
                                    {/* Classificação */}
                                    <div className="col-span-2 flex justify-center">
                                        <div className={`w-8 h-8 rounded flex items-center justify-center font-black font-mono border
                                            ${index === 0 ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]' :
                                                index === 1 ? 'bg-slate-300/20 border-slate-300 text-slate-300' :
                                                    index === 2 ? 'bg-orange-600/20 border-orange-600 text-orange-600' :
                                                        'bg-slate-800 border-slate-700 text-slate-500'}
                                        `}>
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Operador (Nome + Avatar) */}
                                    <div className="col-span-7 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-slate-800 rounded-full border border-slate-700 flex-shrink-0 relative overflow-hidden">
                                            <div
                                                className="w-full h-full bg-cover bg-top opacity-80"
                                                style={{ backgroundImage: `url('${player.avatar}.png')` }}
                                            ></div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold uppercase tracking-tight text-sm">
                                                {player.player_name}
                                            </span>
                                            <span className="text-[9px] text-slate-500 font-mono uppercase tracking-tighter">
                                                Status: Operacional
                                            </span>
                                        </div>
                                    </div>

                                    {/* Pontos XP */}
                                    <div className="col-span-3 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className={`text-xl font-black font-mono tracking-tighter
                                                ${index === 0 ? 'text-tactical-neon animate-pulse' : 'text-slate-200'}
                                            `}>
                                                {player.total_xp.toLocaleString()}
                                            </span>
                                            <span className="text-[8px] text-slate-500 uppercase tracking-[0.2em] -mt-1 font-mono">Total XP</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                        {!loading && leaderboard.length === 0 && (
                            <div className="p-12 text-center text-slate-600 font-mono uppercase text-xs tracking-widest">
                                Nenhum dado tático encontrado.
                            </div>
                        )}
                    </div>

                    {/* Footer Info */}
                    <div className="p-3 bg-tactical-dark border-t border-slate-800 flex justify-between items-center font-mono opacity-50">
                        <span className="text-[8px] text-slate-500 tracking-widest uppercase">Servidor: Central de Comando Supabase</span>
                        <div className="flex items-center gap-2">
                            <Shield size={10} className="text-tactical-cyan" />
                            <span className="text-[8px] text-slate-500 tracking-widest uppercase">Dados Criptografados</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Corner Brackets */}
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-slate-800 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-slate-800 pointer-events-none"></div>
        </div>
    );
}
