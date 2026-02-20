import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { useNavigate } from 'react-router-dom';

export default function LoginView() {
    const login = useGameStore((state) => state.login);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('avatar_tim');

    const handleStart = () => {
        if (name.trim()) {
            login(name, avatar);
            navigate('/hub');
        }
    };

    return (
        <div className="flex w-full h-full bg-slate-900 border-4 border-slate-800 items-center justify-center relative overflow-hidden">

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] z-0"></div>

            {/* Central Panel: Login Info & Avatars */}
            <div className="panel-tactical w-[90%] max-w-4xl flex flex-col items-center gap-6 relative z-10 p-8">
                <div className="text-center w-full whitespace-nowrap">
                    {/* REDUCED FONT SIZE BY ~20% (text-4xl/5xl to text-3xl/4xl) */}
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-[0.2em] mb-1 truncate">
                        COMBAT PHYSICS <span className="text-tactical-cyan">SIMULATOR</span>
                    </h1>
                </div>

                {/* COLOCOU OS AVATARES ENTRE O TITULO E O NOME */}
                <div className="flex gap-8 justify-center w-full">
                    {/* Avatar Tim */}
                    {/* REDUCED AVATAR SIZE BY ~15% (w-40/h-56 -> w-32/h-48) */}
                    <button
                        onClick={() => setAvatar('avatar_tim')}
                        className={`w-32 h-48 rounded-lg transition-all border-4 relative overflow-hidden group bg-cover bg-center
                            ${avatar === 'avatar_tim' ? 'border-tactical-cyan shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105' : 'border-slate-700 hover:border-slate-500 opacity-70'}
                        `}
                        style={{ backgroundImage: "url('avatar_tim.png')" }}
                    >
                        {/* Background Gradient for Text */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                        {/* Text info (Item 4: Removido "Recruta") */}
                        <div className="absolute inset-0 flex flex-col items-center justify-end p-2 pb-4">
                            <span className="font-bold text-white tracking-widest text-lg drop-shadow-md">TIM</span>
                        </div>
                    </button>

                    {/* Avatar Nicole */}
                    {/* REDUCED AVATAR SIZE BY ~15% (w-40/h-56 -> w-32/h-48) */}
                    <button
                        onClick={() => setAvatar('avatar_nicole')}
                        className={`w-32 h-48 rounded-lg transition-all border-4 relative overflow-hidden group bg-cover bg-center
                            ${avatar === 'avatar_nicole' ? 'border-tactical-cyan shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105' : 'border-slate-700 hover:border-slate-500 opacity-70'}
                        `}
                        style={{ backgroundImage: "url('avatar_nicole.png')" }}
                    >
                        {/* Background Gradient for Text */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                        {/* Text info (Item 4: Removido "Recruta") */}
                        <div className="absolute inset-0 flex flex-col items-center justify-end p-2 pb-4">
                            <span className="font-bold text-white tracking-widest text-lg drop-shadow-md">NICOLE</span>
                        </div>
                    </button>
                </div>

                <div className="flex flex-col gap-2 w-full max-w-sm mt-4">
                    {/* REDUCED INPUT BASE SIZE BY ~15% (p-4/text-xl -> p-3/text-lg) */}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="[SEU NOME AQUI]"
                        className="bg-slate-900 border border-slate-700 focus:border-tactical-cyan p-3 text-center text-white outline-none font-mono text-lg transition-colors w-full uppercase placeholder-slate-600"
                        autoComplete="off"
                    />
                </div>

                {/* RENOMEOU PARA ALISTAR-SE (Item 3) */}
                <button
                    className="btn-tactical text-xl w-full max-w-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleStart}
                    disabled={!name.trim()}
                >
                    ALISTAR-SE
                </button>
            </div>

            {/* Decorative corner brackets (Page) */}
            <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-slate-700 opacity-50 z-20"></div>
            <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-slate-700 opacity-50 z-20"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-slate-700 opacity-50 z-20"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-slate-700 opacity-50 z-20"></div>
        </div>
    );
}
