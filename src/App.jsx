import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useGameStore } from './store/gameStore';
import LoginView from './views/LoginView';
import BriefingView from './views/BriefingView';
import GameplayView from './views/GameplayView';
import FeedbackView from './views/FeedbackView';
import CampaignView from './views/CampaignView';
import ShopView from './views/ShopView';

function App() {
  const { playerName, login, isLoading } = useGameStore();
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const savedUser = localStorage.getItem('vector_strike_session_user');
      if (savedUser && !playerName) {
        // Just calling login with the saved name will recover data from Supabase
        await login(savedUser, 'avatar_tim');
      }
      setIsBooting(false);
    };
    restoreSession();
  }, [login, playerName]);

  if (isBooting) {
    return (
      <div className="w-screen h-screen bg-tactical-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-tactical-cyan/20 border-t-tactical-cyan rounded-full animate-spin"></div>
          <span className="text-tactical-cyan font-mono text-xs uppercase tracking-[0.4em] animate-pulse">Restaurando Conexão...</span>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="w-screen h-screen overflow-hidden bg-tactical-dark relative">
        <Routes>
          <Route path="/" element={!playerName ? <LoginView /> : <Navigate to="/campaign" />} />
          <Route path="/hub" element={playerName ? <BriefingView /> : <Navigate to="/" />} />
          <Route path="/mission" element={playerName ? <GameplayView /> : <Navigate to="/" />} />
          <Route path="/result" element={playerName ? <FeedbackView /> : <Navigate to="/" />} />
          <Route path="/campaign" element={playerName ? <CampaignView /> : <Navigate to="/" />} />
          <Route path="/shop" element={playerName ? <ShopView /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
