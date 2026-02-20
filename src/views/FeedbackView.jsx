import { useLocation, useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

export default function FeedbackView() {
    const location = useLocation();
    const navigate = useNavigate();
    const { advanceChallenge, totalChallenges, currentChallengeId, currentPhase } = useGameStore();

    const { success, earned, timeSpent, hints } = location.state || { success: false, earned: 0, timeSpent: 0, hints: 0 };

    const handleNext = () => {
        if (success) {
            if (currentChallengeId < totalChallenges) {
                advanceChallenge();
                navigate('/hub');
            } else {
                // Game completed logic
                alert('Treinamento Concluído! Patente Máxima Atingida.');
                navigate('/hub');
            }
        } else {
            // Retry
            navigate('/mission');
        }
    };

    return (
        <div className="flex w-full h-full bg-slate-950 items-center justify-center relative overflow-hidden font-sans">

            {/* Dynamic Background Glow */}
            <div className={`absolute inset-0 blur-3xl opacity-20 transition duration-1000 ${success ? 'bg-tactical-neon' : 'bg-tactical-alert'}`}></div>

            <div className={`panel-tactical w-[60%] max-w-3xl flex flex-col items-center p-12 text-center border-t-4 relative z-10 ${success ? 'border-t-tactical-cyan' : 'border-t-tactical-alert'}`}>

                {/* Status Badge */}
                <div className={`px-6 py-2 rounded-sm text-sm uppercase font-bold tracking-[0.3em] mb-6 ${success ? 'bg-tactical-cyan/20 text-tactical-cyan' : 'bg-tactical-alert/20 text-tactical-alert'}`}>
                    {success ? 'Simulação Completada com Êxito' : 'Falha na Simulação Crítica'}
                </div>

                <h1 className="text-5xl font-black text-white mb-2 uppercase tracking-tighter">
                    {success ? 'Objetivo Atingido' : 'Missão Abortada'}
                </h1>

                <p className="text-slate-400 font-mono mb-8 uppercase text-sm">
                    Relatório Operacional - Fase 0{currentPhase} - Setor {currentChallengeId}
                </p>

                {/* Tactical Diagram */}
                <div className="flex gap-12 w-full justify-center mb-8 border-y border-slate-800 py-6 font-mono bg-tactical-dark/50">
                    <div className="flex flex-col items-center gap-2 w-1/3">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">Recompensa</span>
                        <span className={`text-3xl font-bold ${success ? 'text-tactical-neon' : 'text-slate-600'}`}>{success ? `+ ${earned}♦` : '0♦'}</span>
                    </div>

                    <div className="w-[1px] h-full bg-slate-800"></div>

                    <div className="flex flex-col items-center gap-2 w-1/3">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">Tempo de Ação</span>
                        <span className="text-2xl font-bold text-white">{timeSpent}s</span>
                    </div>

                    <div className="w-[1px] h-full bg-slate-800"></div>

                    <div className="flex flex-col items-center gap-2 w-1/3">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">Intel Utilizada</span>
                        <span className="text-2xl font-bold text-tactical-cyan">Lv {hints}</span>
                    </div>
                </div>

                {/* Action Button */}
                <div className="w-full flex justify-center mt-4">
                    <button
                        className={`btn-tactical w-2/3 py-4 text-xl ${!success ? 'btn-tactical-alert' : ''}`}
                        onClick={handleNext}
                    >
                        {success ? 'Avançar Progressão Tática' : 'Retentar Simulação Física'}
                    </button>
                </div>

                {success && (
                    <button onClick={() => navigate('/hub')} className="mt-6 text-xs text-slate-500 font-mono uppercase hover:text-white transition">
                        Voltar ao Hub de Operações
                    </button>
                )}
            </div>

        </div>
    );
}
