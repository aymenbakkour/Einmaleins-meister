import { useState, useEffect } from "react";
import { UserStats, GameResult, UserProfile, Language } from "../lib/types";

const defaultStats: UserStats = {
  totalGames: 0,
  totalStars: 0,
  history: [],
};

export function useStats() {
  const [stats, setStats] = useState<UserStats>(defaultStats);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [language, setLanguage] = useState<Language>("de");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("einmaleins_stats");
    const storedProfile = localStorage.getItem("einmaleins_profile");
    const storedLang = localStorage.getItem("einmaleins_lang");

    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStats(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stats", e);
      }
    }
    
    if (storedProfile) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProfile(JSON.parse(storedProfile));
      } catch (e) {
        console.error("Failed to parse profile", e);
      }
    }

    if (storedLang === "de" || storedLang === "ar") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(storedLang as Language);
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);
  }, []);

  const addResult = (result: GameResult) => {
    setStats((prev) => {
      const newStats = {
        totalGames: prev.totalGames + 1,
        totalStars: prev.totalStars + result.stars,
        history: [result, ...prev.history],
      };
      localStorage.setItem("einmaleins_stats", JSON.stringify(newStats));
      return newStats;
    });
  };

  const clearStats = () => {
    setStats(defaultStats);
    localStorage.removeItem("einmaleins_stats");
  };

  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem("einmaleins_profile", JSON.stringify(newProfile));
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("einmaleins_lang", lang);
  };

  return { stats, profile, language, isLoaded, addResult, clearStats, saveProfile, changeLanguage };
}
