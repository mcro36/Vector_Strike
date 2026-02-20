import { useState } from 'react';
import { X, Delete } from 'lucide-react';

export default function TacticalCalculator({ onClose }) {
    const [display, setDisplay] = useState('0');

    const handleDigit = (n) => {
        setDisplay(prev => prev === '0' ? String(n) : prev + n);
    };

    const handleOp = (op) => {
        setDisplay(prev => prev + ' ' + op + ' ');
    };

    const calculate = () => {
        try {
            // Basic evaluation for simple tactical operations
            // We use Function instead of eval for a bit more safety in this context
            const result = new Function('return ' + display.replace(/[^-()\d/*+.]/g, ''))();
            setDisplay(String(Number(result).toFixed(2)).replace(/\.00$/, ''));
        } catch {
            setDisplay('ERROR');
            setTimeout(() => setDisplay('0'), 1000);
        }
    };

    const clear = () => setDisplay('0');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="panel-tactical w-64 p-4 !bg-slate-900 border-tactical-cyan shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-mono text-tactical-cyan uppercase tracking-widest">Calculadora Tática v1.0</span>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition">
                        <X size={16} />
                    </button>
                </div>

                {/* Display */}
                <div className="bg-black/50 border border-slate-800 p-3 mb-4 rounded font-mono text-right overflow-hidden">
                    <div className="text-[10px] text-slate-500 uppercase h-3">COMMS_LINK: ACTIVE</div>
                    <div className="text-xl text-tactical-neon font-bold truncate">{display}</div>
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-4 gap-2">
                    <button onClick={clear} className="col-span-2 btn-tactical !py-2 !bg-slate-800 text-tactical-alert text-xs">CLR</button>
                    <button onClick={() => setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0')} className="btn-tactical !py-2 !bg-slate-800 flex items-center justify-center"><Delete size={14} /></button>
                    <button onClick={() => handleOp('/')} className="btn-tactical !py-2 !bg-slate-800 text-tactical-cyan">/</button>

                    {[7, 8, 9].map(n => <button key={n} onClick={() => handleDigit(n)} className="btn-tactical !py-2 !bg-slate-900">{n}</button>)}
                    <button onClick={() => handleOp('*')} className="btn-tactical !py-2 !bg-slate-800 text-tactical-cyan">*</button>

                    {[4, 5, 6].map(n => <button key={n} onClick={() => handleDigit(n)} className="btn-tactical !py-2 !bg-slate-900">{n}</button>)}
                    <button onClick={() => handleOp('-')} className="btn-tactical !py-2 !bg-slate-800 text-tactical-cyan">-</button>

                    {[1, 2, 3].map(n => <button key={n} onClick={() => handleDigit(n)} className="btn-tactical !py-2 !bg-slate-900">{n}</button>)}
                    <button onClick={() => handleOp('+')} className="btn-tactical !py-2 !bg-slate-800 text-tactical-cyan">+</button>

                    <button onClick={() => handleDigit(0)} className="col-span-2 btn-tactical !py-2 !bg-slate-900">0</button>
                    <button onClick={() => setDisplay(prev => prev.includes('.') ? prev : prev + '.')} className="btn-tactical !py-2 !bg-slate-900">.</button>
                    <button onClick={calculate} className="btn-tactical !py-2 !bg-tactical-cyan !text-slate-900 font-bold">=</button>
                </div>
            </div>
        </div>
    );
}
