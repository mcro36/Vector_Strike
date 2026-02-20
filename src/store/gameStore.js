import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';
import challengesData from '../data/challenges';

// Rank thresholds based on challenge progress (1-31)
export const getRank = (challengeId) => {
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
    avatar: "avatar_tim",
    diamonds: 0,
    totalXp: 0,
    currentChallengeId: 1,
    isLoading: false,

    // Computed (derived) state helpers
    get currentPhase() { return getPhase(get().currentChallengeId); },
    get currentRank() { return getRank(get().currentChallengeId); },
    get totalChallenges() { return challengesData.length; },
    get challengeData() { return challengesData.find(c => c.id === get().currentChallengeId); },

    // Actions
    login: async (name, selectedAvatar) => {
        set({ isLoading: true });
        const trimmedName = name.trim().toUpperCase();

        try {
            // 1. Check if profile exists (using uppercase to avoid duplicates)
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('player_name', trimmedName)
                .maybeSingle();

            if (data) {
                // Load existing profile
                set({
                    playerName: data.player_name,
                    avatar: data.avatar,
                    diamonds: data.diamonds,
                    totalXp: data.total_xp || 0,
                    currentChallengeId: data.challenge_id,
                    isLoading: false
                });
                return { success: true, isNew: false };
            } else {
                // 2. Create new profile
                const { data: newProfile, error: createError } = await supabase
                    .from('profiles')
                    .insert([{
                        player_name: trimmedName,
                        avatar: selectedAvatar,
                        diamonds: 0,
                        total_xp: 0,
                        challenge_id: 1
                    }])
                    .select()
                    .single();

                if (newProfile) {
                    set({
                        playerName: newProfile.player_name,
                        avatar: newProfile.avatar,
                        diamonds: newProfile.diamonds,
                        totalXp: newProfile.total_xp,
                        currentChallengeId: newProfile.challenge_id,
                        isLoading: false
                    });
                    return { success: true, isNew: true };
                }
            }
        } catch (err) {
            console.error("Supabase Login Error:", err);
            set({ isLoading: false });
            return { success: false, error: err.message };
        }
    },

    syncWithCloud: async () => {
        const { playerName, avatar, diamonds, totalXp, currentChallengeId } = get();
        if (!playerName) return;

        try {
            await supabase
                .from('profiles')
                .update({
                    avatar,
                    diamonds,
                    total_xp: totalXp,
                    challenge_id: currentChallengeId,
                    updated_at: new Date().toISOString()
                })
                .eq('player_name', playerName);
        } catch (err) {
            console.error("Cloud Sync Error:", err);
        }
    },

    addDiamonds: async (amount) => {
        const xpEarned = amount * 2;
        set((state) => ({
            diamonds: state.diamonds + amount,
            totalXp: state.totalXp + xpEarned
        }));
        await get().syncWithCloud();
    },

    deductDiamonds: async (amount) => {
        set((state) => ({ diamonds: Math.max(0, state.diamonds - amount) }));
        await get().syncWithCloud();
    },

    advanceChallenge: async () => {
        const nextId = Math.min(get().currentChallengeId + 1, 31);
        set({ currentChallengeId: nextId });
        await get().syncWithCloud();
    },

    resetGame: () => {
        localStorage.removeItem('vector_strike_session_user');
        set({
            playerName: "",
            diamonds: 0,
            totalXp: 0,
            currentChallengeId: 1
        });
    }
}));
