import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useGameStore, getRank } from '../store/gameStore';
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
                    .select('player_name, total_xp, avatar, challenge_id')
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
        <div className="flex flex-col w-full h-full bg-slate-950 p-4 relative overflow-hidden font-sans">
            {/* Background Hologram grid */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

            {/* Header Area */}
            <div className="flex justify-between items-center mb-4 z-10 relative">
                <button
                    onClick={() => navigate('/hub')}
                    className="panel-tactical !p-2 px-4 flex items-center gap-2 hover:border-tactical-alert transition-all text-slate-400 hover:text-white"
                >
                    <ArrowLeft size={16} />
                    <span className="text-[10px] uppercase font-mono tracking-[0.2em] font-bold text-tactical-alert">Voltar</span>
                </button>

                <div className="flex flex-col items-center">
                    <h1 className="text-xl font-black text-white tracking-[0.3em] flex items-center gap-2">
                        <Trophy className="text-tactical-neon" size={20} />
                        RANKING <span className="text-tactical-cyan">GLOBAL</span>
                    </h1>
                    <div className="h-0.5 w-40 bg-gradient-to-r from-transparent via-tactical-cyan to-transparent mt-1"></div>
                </div>

                <div className="w-16"></div> {/* Spacer for symmetry */}
            </div>

            {/* Leaderboard Table Container - Dimension reduced by ~30% (max-w-2xl) */}
            <div className="flex-1 w-full max-w-2xl mx-auto z-10 relative overflow-hidden flex flex-col mb-2">
                <div className="panel-tactical !bg-slate-900/60 backdrop-blur-md flex-1 flex flex-col overflow-hidden border-tactical-cyan/20">

                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-2 p-2 px-4 border-b border-slate-800 bg-tactical-dark/50 text-slate-500 font-mono text-[8px] uppercase tracking-widest">
                        <div className="col-span-1 text-center">#</div>
                        <div className="col-span-3 text-center">Patente</div>
                        <div className="col-span-5">Operador</div>
                        <div className="col-span-3 text-right">Total XP</div>
                    </div>

                    {/* Table Body */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {loading ? (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                <div className="w-8 h-8 border-3 border-tactical-cyan/20 border-t-tactical-cyan rounded-full animate-spin"></div>
                                <span className="text-[9px] text-tactical-cyan font-mono animate-pulse uppercase tracking-[0.2em]">Escaneando...</span>
                            </div>
                        ) : (
                            leaderboard.map((player, index) => (
                                <div
                                    key={index}
                                    className={`grid grid-cols-12 gap-2 p-2 px-4 items-center border-b border-slate-800/40 hover:bg-slate-800/30 transition-colors
                                        ${index === 0 ? 'bg-tactical-neon/5' : ''}
                                        ${index === 1 ? 'bg-slate-800/20' : ''}
                                        ${index === 2 ? 'bg-orange-950/10' : ''}
                                    `}
                                >
                                    {/* Classificação */}
                                    <div className="col-span-1 flex justify-center">
                                        <span className={`font-mono font-bold text-[10px] ${index < 3 ? 'text-tactical-neon' : 'text-slate-500'}`}>
                                            {index + 1}
                                        </span>
                                    </div>

                                    {/* Patente */}
                                    <div className="col-span-3 flex justify-center">
                                        <span className="text-[7px] px-1.5 py-0.5 border border-slate-700/50 rounded bg-slate-800/80 text-slate-300 font-mono uppercase tracking-tighter whitespace-nowrap">
                                            {getRank(player.challenge_id || 1)}
                                        </span>
                                    </div>

                                    {/* Operador (Nome + Avatar) */}
                                    <div className="col-span-5 flex items-center gap-2">
                                        <div className="w-6 h-6 bg-slate-800 rounded-full border border-slate-700 flex-shrink-0 relative overflow-hidden">
                                            <div
                                                className="w-full h-full bg-cover bg-top opacity-80"
                                                style={{ backgroundImage: `url('${player.avatar}.png')` }}
                                            ></div>
                                        </div>
                                        <span className="text-white font-bold uppercase tracking-tight text-[10px] truncate">
                                            {player.player_name}
                                        </span>
                                    </div>

                                    {/* Pontos XP */}
                                    <div className="col-span-3 text-right">
                                        <span className={`text-sm font-black font-mono tracking-tighter
                                            ${index === 0 ? 'text-tactical-neon' : 'text-slate-200'}
                                        `}>
                                            {player.total_xp.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}

                        {!loading && leaderboard.length === 0 && (
                            <div className="p-8 text-center text-slate-600 font-mono uppercase text-[9px] tracking-widest">
                                Nenhum dado tático encontrado.
                            </div>
                        )}
                    </div>

                    {/* Footer Info */}
                    <div className="p-2 bg-tactical-dark border-t border-slate-800 flex justify-between items-center font-mono opacity-50">
                        <span className="text-[6px] text-slate-500 tracking-widest uppercase">Central Supabase</span>
                        <div className="flex items-center gap-1">
                            <Shield size={8} className="text-tactical-cyan" />
                            <span className="text-[6px] text-slate-500 tracking-widest uppercase">Encriptado</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Corner Brackets */}
            <div className="absolute top-4 right-4 w-10 h-10 border-t border-r border-slate-800 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 w-10 h-10 border-b border-l border-slate-800 pointer-events-none"></div>
        </div>
    );
}
