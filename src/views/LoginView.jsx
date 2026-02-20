import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function LoginView() {
    const { login, isLoading } = useGameStore();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('avatar_tim');

    const handleStart = async () => {
        if (name.trim()) {
            const result = await login(name, avatar);
            if (result?.success) {
                // Save session for restoration after refresh
                localStorage.setItem('vector_strike_session_user', name.trim());
                navigate('/hub'); // Redirecionando para o Hub Principal
            } else {
                alert("Erro ao conectar com a Central de Comando (Supabase). Verifique sua internet.");
            }
        }
    };

    return (
        <div className="flex w-full h-full bg-slate-900 border-4 border-slate-800 items-center justify-center relative overflow-hidden">

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] z-0"></div>

            {/* Central Panel: Login Info & Avatars */}
            <div className="panel-tactical w-[90%] max-w-4xl flex flex-col items-center gap-6 relative z-10 p-8">
                {/* 1 - TITLE FIX: Added py-2 padding and leading-normal to prevent cutoff of the 3D/shadow fonts */}
                <div className="text-center w-full whitespace-nowrap py-2">
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-[0.2em] mb-1 truncate leading-normal">
                        VECTOR <span className="text-tactical-cyan">STRIKE</span>
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

                {/* 3 & 4 - INPUT AND BUTTON HORIZONTAL: Using flex-row with smaller height (py-2 instead of p-3) */}
                <div className="flex flex-row items-center gap-2 w-full max-w-[20rem] mt-4">
                    {/* 2 - DECREASE HEIGHT 10%: Swapped p-3 for py-2 px-3 text-base */}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="NOME"
                        className="bg-slate-900 border border-slate-700 focus:border-tactical-cyan py-2 px-3 text-center text-white outline-none font-mono text-base transition-colors w-full uppercase placeholder-slate-600 flex-1"
                        autoComplete="off"
                    />

                    <button
                        className="btn-tactical !p-0 w-12 h-11 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                        onClick={handleStart}
                        disabled={!name.trim() || isLoading}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-tactical-cyan/40 border-t-tactical-cyan rounded-full animate-spin"></div>
                        ) : (
                            <ChevronRight size={24} />
                        )}
                    </button>
                </div>
                {isLoading && (
                    <p className="text-[10px] text-tactical-cyan font-mono animate-pulse -mt-4 uppercase tracking-[0.3em]">
                        Sincronizando Perfil...
                    </p>
                )}
            </div>

            {/* Decorative corner brackets (Page) */}
            <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-slate-700 opacity-50 z-20"></div>
            <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-slate-700 opacity-50 z-20"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-slate-700 opacity-50 z-20"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-slate-700 opacity-50 z-20"></div>
        </div>
    );
}
