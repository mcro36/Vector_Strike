import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useGameStore } from './store/gameStore';
import LoginView from './views/LoginView';
import BriefingView from './views/BriefingView';
import GameplayView from './views/GameplayView';
import FeedbackView from './views/FeedbackView';
import CampaignView from './views/CampaignView';
import ShopView from './views/ShopView';

function App() {
  const { playerName } = useGameStore();

  return (
    <HashRouter>
      <div className="w-screen h-screen overflow-hidden bg-tactical-dark relative">
        <Routes>
          <Route path="/" element={!playerName ? <LoginView /> : <Navigate to="/hub" />} />
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
