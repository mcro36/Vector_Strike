import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function ShopView() {
    const navigate = useNavigate();

    return (
        <div className="flex w-full h-full bg-slate-950 p-6 relative overflow-hidden font-sans">
            {/* Header */}
            <div className="absolute top-0 left-0 w-full h-12 border-b border-slate-800 flex items-center px-6 justify-between z-20 bg-slate-900/50 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/hub')} className="text-slate-400 hover:text-white transition">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl font-black text-white uppercase tracking-tighter">Loja de Suprimentos</h1>
                </div>
            </div>

            <div className="w-full h-full flex flex-col items-center justify-center pt-12 opacity-40">
                <ShoppingBag size={48} className="text-tactical-cyan mb-4" />
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Terminal de Compras em Manutenção...</p>
            </div>
        </div>
    );
}
