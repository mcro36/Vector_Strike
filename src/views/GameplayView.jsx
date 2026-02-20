import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { useNavigate } from 'react-router-dom';

export default function GameplayView() {
    const { challengeData, currentPhase, addDiamonds, avatar } = useGameStore();
    const navigate = useNavigate();

    const [timeLeft, setTimeLeft] = useState(60);
    const [hintLevel, setHintLevel] = useState(0); // 0=none, 1=text, 2=formula
    const [diamondsSpent, setDiamondsSpent] = useState(0);

    // Timer effect
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timerId = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft]);

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
            // Base reward 200
            let baseReward = 200;
            // Time penalty
            if (timeLeft <= 0) { // meaning > 60s since default is 60s
                baseReward -= 50;
            }
            // Hint penalties
            baseReward -= diamondsSpent;

            earned = Math.max(50, baseReward); // Enforce minimum reward
            addDiamonds(earned);

            // Navigate to feedback passing props
            navigate('/result', { state: { success: true, earned, timeSpent: 60 - timeLeft, hints: hintLevel } });
        } else {
            // Wrong answer
            navigate('/result', { state: { success: false, earned: 0, timeSpent: 60 - timeLeft, hints: hintLevel } });
        }
    };

    if (!challengeData) return null;

    return (
        <div className="flex flex-col w-full h-full bg-slate-900 overflow-hidden relative font-sans">
            {/* Dynamic Backgrounds based on Phase */}
            <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle at center, transparent 0%, rgba(15, 23, 42, 1) 100%)'
            }}></div>

            {/* Top HUD */}
            <div className="w-full flex justify-between items-center px-8 py-4 z-20">
                <div className="flex gap-4 items-center">
                    {/* Intel Button */}
                    <button
                        onClick={handleIntelClick}
                        disabled={hintLevel >= 2}
                        className={`panel-tactical !p-2 !py-2 flex items-center gap-3 transition-all ${hintLevel >= 2 ? 'opacity-50 cursor-not-allowed border-slate-700' : 'hover:border-tactical-cyan cursor-pointer'}`}
                    >
                        <div className="w-8 h-8 rounded-full bg-blue-900 border border-tactical-cyan flex items-center justify-center">
                            <span className="text-tactical-cyan font-bold block pb-1">?</span>
                        </div>
                        <div className="flex flex-col items-start pr-4">
                            <span className="text-xs text-tactical-cyan uppercase tracking-widest font-bold">Solicitar Intel</span>
                            <span className="text-[10px] text-slate-400">
                                {hintLevel === 0 ? '-30♦ (Texto)' : hintLevel === 1 ? '-70♦ (Blueprint)' : 'Max Intel'}
                            </span>
                        </div>
                    </button>
                </div>

                <div className="flex gap-4">
                    {/* Timer Panel */}
                    <div className={`panel-tactical !p-3 flex items-center gap-4 ${timeLeft <= 10 ? 'border-tactical-alert/50 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'border-tactical-neon/30'}`}>
                        <div className="flex flex-col text-right">
                            <span className="text-[10px] uppercase text-tactical-neon tracking-widest">Tempo Limite</span>
                            <span className={`text-3xl font-mono font-black ${timeLeft <= 10 ? 'text-tactical-alert animate-pulse' : 'text-slate-200'}`}>
                                {timeLeft > 0 ? `00:${timeLeft.toString().padStart(2, '0')}` : '00:00'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Content - Wide Landscape Split */}
            <div className="flex-1 flex px-12 z-10 h-full max-h-[60%]">

                {/* Left Side: Avatar Reaction Placeholder */}
                <div className="w-1/4 h-full hidden md:flex flex-col justify-end pt-8 pr-8 opacity-80">
                    <div className="relative w-full aspect-[2/3] border-b-2 border-r-2 border-slate-800 rounded-br-2xl flex items-end">
                        <span className="absolute top-2 left-2 text-[10px] text-slate-500 font-mono">Sensors Alpha</span>
                        <div className="w-full text-center pb-4 text-xs font-mono text-slate-600">[{avatar.toUpperCase()}_POSE]</div>
                    </div>
                </div>

                {/* Right Side: Problem Dashboard */}
                <div className="w-full md:w-3/4 h-full flex flex-col justify-center">

                    {/* Main Question Panel */}
                    <div className="panel-tactical w-full !border-l-4 !border-l-tactical-cyan p-8 mb-6 relative">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-slate-800 to-transparent"></div>
                        <h2 className="text-2xl font-bold text-white leading-relaxed z-10 relative">
                            {challengeData.question}
                        </h2>
                    </div>

                    {/* Hint Render Area */}
                    <div className="min-h-[100px] w-full mb-4">
                        {hintLevel > 0 && (
                            <div className={`p-4 border-l-2 bg-slate-800/80 animate-fade-in
                ${hintLevel === 1 ? 'border-blue-500' : 'border-tactical-alert'}
              `}>
                                <p className="text-sm font-mono text-slate-300 mb-2">
                                    <strong className="text-blue-400">INTEL RCV:</strong> {challengeData.hint1}
                                </p>
                                {hintLevel === 2 && (
                                    <div className="mt-4 p-4 bg-tactical-dark border border-tactical-cyan/30 rounded inline-block font-mono text-tactical-neon whitespace-pre-line shadow-[inset_0_0_20px_rgba(6,182,212,0.1)] relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-[1px] bg-tactical-cyan opacity-50 shadow-[0_0_10px_#06b6d4]"></div>
                                        {challengeData.hint2}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Tactics (Options) */}
            <div className="w-full h-auto p-8 flex justify-center gap-6 z-20 mt-auto bg-gradient-to-t from-slate-950 to-transparent">
                {challengeData.options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="flex-1 max-w-[30%] btn-tactical !py-6 group"
                    >
                        <div className="flex gap-4 items-center pl-4">
                            <span className="text-slate-500 font-mono text-sm opacity-50 group-hover:text-tactical-cyan transition">0{idx + 1}</span>
                            <span className="text-xl w-full text-left font-bold text-white group-hover:text-tactical-dark group-active:text-tactical-dark transition">{opt}</span>
                        </div>
                    </button>
                ))}
            </div>

        </div>
    );
}
