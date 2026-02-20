import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { useNavigate } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import TacticalCalculator from '../components/TacticalCalculator';
import challengesData from '../data/challenges';

const getPhase = (challengeId) => {
    if (challengeId === 1) return 1;
    if (challengeId <= 11) return 2;
    if (challengeId <= 21) return 3;
    return 4;
};

export default function GameplayView() {
    const { currentChallengeId, addDiamonds, avatar } = useGameStore();
    const navigate = useNavigate();

    const challengeData = challengesData.find(c => c.id === currentChallengeId);
    const currentPhase = getPhase(currentChallengeId);

    const [timeElapsed, setTimeElapsed] = useState(0);
    const [hintLevel, setHintLevel] = useState(0); // 0=none, 1=text, 2=formula
    const [diamondsSpent, setDiamondsSpent] = useState(0);
    const [showCalc, setShowCalc] = useState(false);

    // Timer effect - Count up
    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, []);

    const handleIntelClick = () => {
        if (hintLevel === 0) {
            setHintLevel(1);
            setDiamondsSpent(prev => prev + 30); // Penalty for Hint 1
        } else if (hintLevel === 1) {
            setHintLevel(2);
            setDiamondsSpent(prev => prev + 70); // Additional Penalty for Hint 2 (Total 100)
        }
    };

    const handleAnswer = (selectedIndex) => {
        const isCorrect = selectedIndex === challengeData.correctIndex;
        let earned = 0;

        if (isCorrect) {
            const completedId = challengeData.id;
            const completedPhase = currentPhase;

            // Base reward 200
            let baseReward = 200;
            // Time penalty if > 60s
            if (timeElapsed >= 60) {
                baseReward -= 50;
            }
            // Hint penalties
            baseReward -= diamondsSpent;

            earned = Math.max(50, baseReward); // Enforce minimum reward
            addDiamonds(earned);

            // Navigate to feedback passing props (Don't advance yet)
            navigate('/result', {
                state: {
                    success: true,
                    earned,
                    timeSpent: timeElapsed,
                    hints: hintLevel,
                    completedId,
                    completedPhase
                }
            });
        } else {
            // Wrong answer
            navigate('/result', {
                state: {
                    success: false,
                    earned: 0,
                    timeSpent: timeElapsed,
                    hints: hintLevel,
                    completedId: challengeData.id,
                    completedPhase: currentPhase
                }
            });
        }
    };

    if (!challengeData) return null;

    return (
        <div className="flex flex-col w-full h-full bg-slate-900 overflow-hidden relative font-sans">
            {/* Dynamic Backgrounds based on Phase */}
            <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle at center, transparent 0%, rgba(15, 23, 42, 1) 100%)'
            }}></div>

            {/* Top HUD (Reduced height and padding) */}
            <div className="w-full flex justify-between items-center px-4 py-2 z-20">
                <div className="flex gap-2 items-center">
                    {/* Return Button (Added) */}
                    <button
                        onClick={() => navigate('/hub')}
                        className="panel-tactical !p-1.5 !py-1.5 hover:border-tactical-alert transition-colors group"
                        title="Abortar Missão"
                    >
                        <span className="text-[10px] text-slate-500 group-hover:text-tactical-alert font-mono uppercase tracking-tighter">[ABORTAR]</span>
                    </button>

                    {/* Intel Button (Shrunk) */}
                    <button
                        onClick={handleIntelClick}
                        disabled={hintLevel >= 2}
                        className={`panel-tactical !p-1.5 !py-1.5 flex items-center gap-2 transition-all ${hintLevel >= 2 ? 'opacity-50 cursor-not-allowed border-slate-700' : 'hover:border-tactical-cyan cursor-pointer'}`}
                    >
                        <div className="w-6 h-6 rounded-full bg-blue-900 border border-tactical-cyan flex items-center justify-center">
                            <span className="text-tactical-cyan font-bold block pb-0.5 text-xs">?</span>
                        </div>
                        <div className="flex flex-col items-start pr-2">
                            <span className="text-[10px] text-tactical-cyan uppercase tracking-widest font-bold">Solicitar Intel</span>
                            <span className="text-[8px] text-slate-400">
                                {hintLevel === 0 ? '-30♦ (Texto)' : hintLevel === 1 ? '-70♦ (Blueprint)' : 'Max Intel'}
                            </span>
                        </div>
                    </button>

                    {/* Calculator Button (Added) */}
                    <button
                        onClick={() => setShowCalc(true)}
                        className="panel-tactical !p-1.5 !py-1.5 flex items-center gap-2 hover:border-tactical-neon transition-colors"
                    >
                        <Calculator size={14} className="text-tactical-neon" />
                        <span className="text-[10px] text-slate-300 font-mono hidden sm:block uppercase tracking-tighter">Calc</span>
                    </button>
                </div>

                <div className="flex gap-2">
                    {/* Timer Panel (Count Up) */}
                    <div className={`panel-tactical !p-2 flex items-center gap-3 ${timeElapsed >= 120 ? 'border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]' : 'border-tactical-neon/30'}`}>
                        <div className="flex flex-col text-right">
                            <span className="text-[8px] uppercase text-tactical-neon tracking-widest leading-none mb-0.5">Tempo</span>
                            <span className={`text-xl font-mono font-black leading-none ${timeElapsed >= 120 ? 'text-orange-500' : 'text-slate-200'}`}>
                                {Math.floor(timeElapsed / 60).toString().padStart(2, '0')}:{(timeElapsed % 60).toString().padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Content - Wide Landscape Split (Shrunk Gap) */}
            <div className="flex-1 flex px-8 z-10 h-full max-h-[60%] gap-4">

                {/* Left Side: General Avatar (Mentor) - Reduced size and Filter removed */}
                <div className="w-[21%] h-full hidden md:flex flex-col justify-start pt-[20px]">
                    <div className="relative w-full h-[68%] border-b-[1px] border-r-[1px] border-slate-800 rounded-br-xl flex items-end overflow-hidden">
                        <span className="absolute top-1 left-1 text-[8px] text-slate-500 font-mono uppercase tracking-tighter">Comando Central: Ativo</span>
                        {/* Avatar Image Background */}
                        <div
                            className="w-full h-full bg-cover bg-top"
                            style={{ backgroundImage: "url('avatar_general.png')" }}
                        ></div>
                    </div>
                </div>

                {/* Right Side: Problem Dashboard */}
                <div className="w-full md:w-3/4 h-full flex flex-col justify-center">

                    {/* Main Question Panel (Shrunk Text and Padding) */}
                    <div className="panel-tactical w-full !border-l-2 !border-l-tactical-cyan p-4 mb-3 relative">
                        <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-slate-800 to-transparent"></div>
                        <h2 className="text-lg font-bold text-white leading-normal z-10 relative">
                            {challengeData.question}
                        </h2>
                    </div>

                    {/* Hint Render Area (Shrunk) */}
                    <div className="min-h-[60px] w-full mb-2">
                        {hintLevel > 0 && (
                            <div className={`p-2 border-l-[1.5px] bg-slate-800/80 animate-fade-in
                ${hintLevel === 1 ? 'border-blue-500' : 'border-tactical-alert'}
              `}>
                                <p className="text-xs font-mono text-slate-300 mb-1">
                                    <strong className="text-blue-400">INTEL RCV:</strong> {challengeData.hint1}
                                </p>
                                {hintLevel === 2 && (
                                    <div className="mt-2 p-2 bg-tactical-dark border border-tactical-cyan/30 rounded inline-block font-mono text-tactical-neon text-[10px] whitespace-pre-line shadow-[inset_0_0_10px_rgba(6,182,212,0.1)] relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-[0.5px] bg-tactical-cyan opacity-50"></div>
                                        {challengeData.hint2}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Tactics (Options) (Shrunk Height) */}
            <div className="w-full h-auto p-4 flex justify-center gap-3 z-20 mt-auto bg-gradient-to-t from-slate-950 to-transparent">
                {challengeData.options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="flex-1 max-w-[30%] btn-tactical !py-3 !px-4 group"
                    >
                        <div className="flex gap-2 items-center">
                            <span className="text-slate-500 font-mono text-xs opacity-50 group-hover:text-tactical-cyan transition">0{idx + 1}</span>
                            <span className="text-base w-full text-left font-bold text-white group-hover:text-tactical-dark group-active:text-tactical-dark transition">{opt}</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Calculator Overlay */}
            {showCalc && <TacticalCalculator onClose={() => setShowCalc(false)} />}
        </div>
    );
}
