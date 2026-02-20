import { useLocation, useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import challengesData from '../data/challenges';

const getPhase = (challengeId) => {
    if (challengeId === 1) return 1;
    if (challengeId <= 11) return 2;
    if (challengeId <= 21) return 3;
    return 4;
};

export default function FeedbackView() {
    const location = useLocation();
    const navigate = useNavigate();
    const { advanceChallenge, currentChallengeId } = useGameStore();

    const totalChallenges = challengesData.length;
    const currentPhase = getPhase(currentChallengeId);

    const { success, earned, timeSpent, hints, completedId, completedPhase } = location.state || {
        success: false, earned: 0, timeSpent: 0, hints: 0, completedId: currentChallengeId, completedPhase: currentPhase
    };

    const handleNext = async () => {
        if (success) {
            // Only advance if the player is currently on this mission (prevents double advancing if they go back/refresh)
            if (completedId === currentChallengeId) {
                await advanceChallenge();
            }

            if (completedId < totalChallenges) {
                navigate('/mission');
            } else {
                navigate('/hub');
            }
        } else {
            // Retry the same mission
            navigate('/mission');
        }
    };

    return (
        <div className="flex w-full h-full bg-slate-950 items-center justify-center relative overflow-hidden font-sans">

            {/* Dynamic Background Glow */}
            <div className={`absolute inset-0 blur-3xl opacity-20 transition duration-1000 ${success ? 'bg-tactical-neon' : 'bg-tactical-alert'}`}></div>

            <div className={`panel-tactical w-[40%] max-w-2xl flex flex-col items-center p-6 text-center border-t-[2px] relative z-10 ${success ? 'border-t-tactical-cyan' : 'border-t-tactical-alert'}`}>

                {/* Status Badge (Shrunk) */}
                <div className={`px-4 py-1 rounded-sm text-[10px] uppercase font-bold tracking-[0.2em] mb-4 ${success ? 'bg-tactical-cyan/20 text-tactical-cyan' : 'bg-tactical-alert/20 text-tactical-alert'}`}>
                    {success ? 'Simulação Completada com Êxito' : 'Falha na Simulação Crítica'}
                </div>

                <h1 className="text-3xl font-black text-white mb-1 uppercase tracking-tighter">
                    {success ? 'Objetivo Atingido' : 'Missão Abortada'}
                </h1>

                <p className="text-slate-500 font-mono mb-4 uppercase text-[10px]">
                    Relatório Operacional - Fase 0{completedPhase} - Setor {completedId}
                </p>

                {/* Tactical Diagram (Shrunk) */}
                <div className="flex gap-6 w-full justify-center mb-6 border-y border-slate-800 py-4 font-mono bg-tactical-dark/50">
                    <div className="flex flex-col items-center gap-1 w-1/3">
                        <span className="text-[8px] text-slate-500 uppercase tracking-widest">Recompensa</span>
                        <span className={`text-xl font-bold ${success ? 'text-tactical-neon' : 'text-slate-600'}`}>{success ? `+ ${earned}♦` : '0♦'}</span>
                    </div>

                    <div className="w-[1px] h-8 bg-slate-800 self-center"></div>

                    <div className="flex flex-col items-center gap-1 w-1/3">
                        <span className="text-[8px] text-slate-500 uppercase tracking-widest">Tempo de Ação</span>
                        <span className="text-xl font-bold text-white">{timeSpent}s</span>
                    </div>

                    <div className="w-[1px] h-8 bg-slate-800 self-center"></div>

                    <div className="flex flex-col items-center gap-1 w-1/3">
                        <span className="text-[8px] text-slate-500 uppercase tracking-widest">Intel Utilizada</span>
                        <span className="text-xl font-bold text-tactical-cyan">Lv {hints}</span>
                    </div>
                </div>

                {/* Action Button (Shrunk) */}
                <div className="w-full flex justify-center mt-2">
                    <button
                        className={`btn-tactical w-full py-3 text-base ${!success ? 'btn-tactical-alert' : ''}`}
                        onClick={handleNext}
                    >
                        {success ? (completedId === totalChallenges ? 'Finalizar Treinamento' : 'Próxima Missão') : 'Tentar Novamente'}
                    </button>
                </div>

                <div className="flex gap-4 mt-4">
                    <button onClick={() => navigate('/hub')} className="text-[10px] text-slate-500 font-mono uppercase hover:text-white transition tracking-tighter">
                        Voltar ao Hub
                    </button>
                </div>
            </div>

        </div>
    );
}
