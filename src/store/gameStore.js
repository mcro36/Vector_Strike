import { create } from 'zustand';
import challengesData from '../data/challenges';

// Rank thresholds based on challenge progress (1-31)
const getRank = (challengeId) => {
    if (challengeId === 1) return "Cadete";
    if (challengeId <= 11) return "Aspirante";
    if (challengeId <= 16) return "2º Tenente";
    if (challengeId <= 19) return "1º Tenente";
    if (challengeId <= 21) return "Capitão";
    if (challengeId <= 25) return "Major";
    if (challengeId <= 29) return "Ten. Coronel";
    if (challengeId <= 30) return "Coronel";
    return "General";
};

// Calculate phase based on challenge ID
const getPhase = (challengeId) => {
    if (challengeId === 1) return 1; // Treino
    if (challengeId <= 11) return 2; // Cinemática
    if (challengeId <= 21) return 3; // Dinâmica
    return 4; // Global
};

export const useGameStore = create((set, get) => ({
    playerName: "",
    avatar: "avatar_tim", // avatar_tim or avatar_nicole
    diamonds: 0,
    currentChallengeId: 1, // Starts at challenge 1

    // Computed (derived) state helpers
    get currentPhase() { return getPhase(get().currentChallengeId); },
    get currentRank() { return getRank(get().currentChallengeId); },
    get totalChallenges() { return challengesData.length; },
    get challengeData() { return challengesData.find(c => c.id === get().currentChallengeId); },

    // Actions
    login: (name, selectedAvatar) => set({ playerName: name, avatar: selectedAvatar }),

    addDiamonds: (amount) => set((state) => ({ diamonds: state.diamonds + amount })),

    deductDiamonds: (amount) => set((state) => ({ diamonds: Math.max(0, state.diamonds - amount) })),

    advanceChallenge: () => set((state) => ({
        currentChallengeId: Math.min(state.currentChallengeId + 1, 31)
    })),

    // Development/Reset helper
    resetGame: () => set({
        playerName: "",
        diamonds: 0,
        currentChallengeId: 1
    })
}));
