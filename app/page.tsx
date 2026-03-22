"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calculator,
  GraduationCap,
  Trophy,
  ArrowLeft,
  Star,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Printer,
  BarChart3,
  Plus,
  Minus,
  X,
  Divide,
  Settings,
  Trash2
} from "lucide-react";
import { Operation, Difficulty, Mode, GameResult, UserProfile, Language } from "../lib/types";
import { useStats } from "../hooks/useStats";
import { useTranslation } from "../lib/i18n";

export default function App() {
  const [mode, setMode] = useState<Mode>("home");
  const [operation, setOperation] = useState<Operation>("multiply");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const { stats, profile, language, isLoaded, addResult, clearStats, saveProfile, changeLanguage } = useStats();
  const { t } = useTranslation(language);

  if (!isLoaded) return null;

  if (!profile) {
    return <ProfileSetup saveProfile={saveProfile} language={language} changeLanguage={changeLanguage} />;
  }

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-sky-50 print:bg-white font-sans text-slate-800 selection:bg-sky-200">
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between relative print:hidden">
        <div className="flex-1 flex items-center">
          {mode !== "home" && (
            <button
              onClick={() => setMode("home")}
              className="p-2 text-sky-600 hover:bg-sky-50 rounded-full transition-colors flex items-center gap-2 font-medium"
            >
              <ArrowLeft className={`w-5 h-5 ${language === "ar" ? "rotate-180" : ""}`} />
              <span className="hidden sm:inline">{t("back")}</span>
            </button>
          )}
        </div>
        <div className="flex items-center justify-center gap-3 text-sky-600 flex-1">
          <Calculator className="w-8 h-8" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {t("appTitle")}
          </h1>
        </div>
        <div className="flex-1 flex justify-end">
          {mode === "home" && (
            <button
              onClick={() => setMode("settings")}
              className="p-2 text-sky-600 hover:bg-sky-50 rounded-full transition-colors"
            >
              <Settings className="w-6 h-6" />
            </button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 md:p-12 print:p-0 print:max-w-none">
        <AnimatePresence mode="wait">
          {mode === "home" && (
            <HomeMenu
              key="home"
              setMode={setMode}
              operation={operation}
              setOperation={setOperation}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              stats={stats}
              profile={profile}
              language={language}
            />
          )}
          {mode === "learn" && <LearnMode key="learn" operation={operation} language={language} />}
          {mode === "test" && (
            <TestMode
              key="test"
              operation={operation}
              difficulty={difficulty}
              addResult={addResult}
              language={language}
            />
          )}
          {mode === "print" && <PrintMode key="print" operation={operation} difficulty={difficulty} language={language} />}
          {mode === "stats" && <StatsMode key="stats" stats={stats} clearStats={clearStats} setMode={setMode} language={language} />}
          {mode === "settings" && <SettingsMode key="settings" profile={profile} saveProfile={saveProfile} language={language} changeLanguage={changeLanguage} setMode={setMode} />}
          {mode === "certificate" && <CertificateMode key="certificate" profile={profile} stats={stats} language={language} />}
        </AnimatePresence>
      </main>
      
      <footer className="text-center py-6 text-slate-400 text-sm print:hidden" dir="ltr">
        {t("devBy")} Aymen Bakkour
      </footer>
    </div>
  );
}

function ProfileSetup({ saveProfile, language, changeLanguage }: { saveProfile: (p: UserProfile) => void, language: Language, changeLanguage: (l: Language) => void }) {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const { t } = useTranslation(language);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && birthdate) {
      saveProfile({ name, birthdate });
    }
  };

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-sky-50 flex items-center justify-center p-6 font-sans text-slate-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-md w-full border border-sky-100"
      >
        <div className="flex justify-end mb-4">
          <button
            onClick={() => changeLanguage(language === "de" ? "ar" : "de")}
            className="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors"
          >
            {language === "de" ? "عربي" : "Deutsch"}
          </button>
        </div>
        <div className="flex justify-center mb-6 text-sky-500">
          <GraduationCap className="w-16 h-16" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-8">{t("profileSetup")}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">{t("childName")}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">{t("birthdate")}</label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg transition-colors shadow-md"
          >
            {t("save")}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function SettingsMode({ profile, saveProfile, language, changeLanguage, setMode }: { profile: UserProfile, saveProfile: (p: UserProfile) => void, language: Language, changeLanguage: (l: Language) => void, setMode: (m: Mode) => void }) {
  const [name, setName] = useState(profile.name);
  const [birthdate, setBirthdate] = useState(profile.birthdate);
  const { t } = useTranslation(language);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && birthdate) {
      saveProfile({ name, birthdate });
      setMode("home");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto w-full pt-8"
    >
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-sky-100">
        <h2 className="text-3xl font-bold text-center mb-8">{t("profileSettings")}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">{t("childName")}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">{t("birthdate")}</label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">{t("language")}</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => changeLanguage("de")}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${language === "de" ? "bg-sky-500 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                Deutsch
              </button>
              <button
                type="button"
                onClick={() => changeLanguage("ar")}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${language === "ar" ? "bg-sky-500 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                عربي
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-4 mt-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg transition-colors shadow-md"
          >
            {t("save")}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

function HomeMenu({
  setMode,
  operation,
  setOperation,
  difficulty,
  setDifficulty,
  stats,
  profile,
  language,
}: {
  setMode: (mode: Mode) => void;
  operation: Operation;
  setOperation: (op: Operation) => void;
  difficulty: Difficulty;
  setDifficulty: (diff: Difficulty) => void;
  stats: any;
  profile: UserProfile;
  language: Language;
}) {
  const { t } = useTranslation(language);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center pt-8"
    >
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center max-w-2xl w-full border border-sky-100">
        <div className="flex justify-between items-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-500 rounded-full">
            <Star className="w-8 h-8 fill-current" />
          </div>
          <button
            onClick={() => setMode("stats")}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-medium transition-colors"
          >
            <BarChart3 className="w-5 h-5" />
            <span>{t("stats")}</span>
          </button>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
          {t("welcomeBack", { name: profile.name })}
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          {t("starsCollected", { stars: stats.totalStars })}
        </p>

        <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <h3 className="text-lg font-bold text-slate-700 mb-4">{t("whatToPractice")}</h3>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button
              onClick={() => setOperation("multiply")}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition-all ${
                operation === "multiply" ? "bg-blue-500 text-white shadow-md scale-105" : "bg-white text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              <X className="w-5 h-5" /> {t("multiply")}
            </button>
            <button
              onClick={() => setOperation("divide")}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition-all ${
                operation === "divide" ? "bg-blue-500 text-white shadow-md scale-105" : "bg-white text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              <Divide className="w-5 h-5" /> {t("divide")}
            </button>
            <button
              onClick={() => setOperation("add")}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition-all ${
                operation === "add" ? "bg-blue-500 text-white shadow-md scale-105" : "bg-white text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              <Plus className="w-5 h-5" /> {t("add")}
            </button>
            <button
              onClick={() => setOperation("subtract")}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition-all ${
                operation === "subtract" ? "bg-blue-500 text-white shadow-md scale-105" : "bg-white text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              <Minus className="w-5 h-5" /> {t("subtract")}
            </button>
          </div>

          <h3 className="text-lg font-bold text-slate-700 mb-4">{t("difficulty")}</h3>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setDifficulty("easy")}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                difficulty === "easy" ? "bg-emerald-500 text-white shadow-md" : "bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200"
              }`}
            >
              {t("easy")}
            </button>
            <button
              onClick={() => setDifficulty("medium")}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                difficulty === "medium" ? "bg-yellow-500 text-white shadow-md" : "bg-white text-slate-600 hover:bg-yellow-50 border border-slate-200"
              }`}
            >
              {t("medium")}
            </button>
            <button
              onClick={() => setDifficulty("hard")}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                difficulty === "hard" ? "bg-red-500 text-white shadow-md" : "bg-white text-slate-600 hover:bg-red-50 border border-slate-200"
              }`}
            >
              {t("hard")}
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
          <button
            onClick={() => setMode("learn")}
            className="group relative flex flex-col items-center p-6 md:p-8 bg-gradient-to-b from-emerald-400 to-emerald-500 rounded-2xl text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="bg-white/20 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <span className="text-xl md:text-2xl font-bold">{t("learn")}</span>
            <span className="text-emerald-50 mt-2 text-xs md:text-sm text-center">
              {t("learnDesc")}
            </span>
          </button>

          <button
            onClick={() => setMode("test")}
            className="group relative flex flex-col items-center p-6 md:p-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-2xl text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="bg-white/20 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <Play className={`w-8 h-8 md:w-10 md:h-10 ${language === "ar" ? "mr-1 rotate-180" : "ml-1"}`} />
            </div>
            <span className="text-xl md:text-2xl font-bold">{t("test")}</span>
            <span className="text-blue-50 mt-2 text-xs md:text-sm text-center">
              {t("testDesc")}
            </span>
          </button>

          <button
            onClick={() => setMode("print")}
            className="group relative flex flex-col items-center p-6 md:p-8 bg-gradient-to-b from-violet-500 to-violet-600 rounded-2xl text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="bg-white/20 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <Printer className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <span className="text-xl md:text-2xl font-bold">{t("print")}</span>
            <span className="text-violet-50 mt-2 text-xs md:text-sm text-center">
              {t("printDesc")}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function LearnMode({ operation, language }: { operation: Operation, language: Language }) {
  const [selectedNumber, setSelectedNumber] = useState<number>(1);
  const { t } = useTranslation(language);

  const getOperationSymbol = () => {
    switch (operation) {
      case "multiply": return "×";
      case "divide": return "÷";
      case "add": return "+";
      case "subtract": return "-";
    }
  };

  const getOperationTitle = () => {
    switch (operation) {
      case "multiply": return t("multiply");
      case "divide": return t("divide");
      case "add": return t("add");
      case "subtract": return t("subtract");
    }
  };

  const calculateResult = (num1: number, num2: number) => {
    switch (operation) {
      case "multiply": return num1 * num2;
      case "divide": return (num1 * num2) / num2; // Show num1 * num2 / num2 = num1
      case "add": return num1 + num2;
      case "subtract": return (num1 + num2) - num2; // Show num1 + num2 - num2 = num1
    }
  };

  const renderEquation = (multiplier: number) => {
    if (operation === "divide") {
      const dividend = multiplier * selectedNumber;
      return (
        <>
          <span className="font-medium text-slate-600">
            {dividend} ÷ {selectedNumber}
          </span>
          <span className="text-slate-300 mx-4">=</span>
          <span className="font-bold text-emerald-600 w-12 text-center">
            {multiplier}
          </span>
        </>
      );
    }
    
    if (operation === "subtract") {
      const minuend = multiplier + selectedNumber;
      return (
        <>
          <span className="font-medium text-slate-600">
            {minuend} - {selectedNumber}
          </span>
          <span className="text-slate-300 mx-4">=</span>
          <span className="font-bold text-emerald-600 w-12 text-center">
            {multiplier}
          </span>
        </>
      );
    }

    return (
      <>
        <span className="font-medium text-slate-600">
          {multiplier} {getOperationSymbol()} {selectedNumber}
        </span>
        <span className="text-slate-300 mx-4">=</span>
        <span className="font-bold text-emerald-600 w-12 text-center">
          {calculateResult(multiplier, selectedNumber)}
        </span>
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          {t("learnTitle", { operation: getOperationTitle() })}
        </h2>
        <p className="text-slate-600">{t("learnSubtitle")}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <button
            key={num}
            onClick={() => setSelectedNumber(num)}
            className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl text-xl font-bold transition-all ${
              selectedNumber === num
                ? "bg-emerald-500 text-white shadow-md scale-110"
                : "bg-white text-slate-700 hover:bg-emerald-100 shadow-sm"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 border border-emerald-100 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-emerald-100 text-emerald-600 px-6 py-2 rounded-full font-bold text-xl">
            {t("theSeries", { num: selectedNumber })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-xl md:text-2xl">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((multiplier) => (
            <div
              key={multiplier}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
            >
              {renderEquation(multiplier)}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

type Question = {
  num1: number;
  num2: number;
  answer: number;
  options: number[];
};

function TestMode({
  operation,
  difficulty,
  addResult,
  language,
}: {
  operation: Operation;
  difficulty: Difficulty;
  addResult: (result: GameResult) => void;
  language: Language;
}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [earnedStars, setEarnedStars] = useState(0);
  const { t } = useTranslation(language);

  const TOTAL_QUESTIONS = 10;

  const getOperationSymbol = () => {
    switch (operation) {
      case "multiply": return "×";
      case "divide": return "÷";
      case "add": return "+";
      case "subtract": return "-";
    }
  };

  const generateOptions = (correctAnswer: number) => {
    const options = new Set<number>([correctAnswer]);
    while (options.size < 4) {
      const offset = Math.floor(Math.random() * 10) - 5;
      let wrongAnswer = correctAnswer + offset;
      
      if (Math.random() > 0.5 && operation === "multiply") {
        const factor = Math.random() > 0.5 ? 1 : -1;
        wrongAnswer = correctAnswer + (Math.floor(Math.random() * 5) + 1) * factor;
      }

      if (wrongAnswer >= 0 && wrongAnswer !== correctAnswer) {
        options.add(wrongAnswer);
      }
    }
    return Array.from(options).sort(() => Math.random() - 0.5);
  };

  const startNewGame = () => {
    const newQuestions: Question[] = [];
    let maxNum = 10;
    if (difficulty === "easy") maxNum = 5;
    if (difficulty === "hard") maxNum = 20;

    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      let num1 = Math.floor(Math.random() * maxNum) + 1;
      let num2 = Math.floor(Math.random() * maxNum) + 1;
      let answer = 0;

      if (operation === "multiply") {
        answer = num1 * num2;
      } else if (operation === "divide") {
        answer = num1;
        num1 = num1 * num2; // dividend
      } else if (operation === "add") {
        answer = num1 + num2;
      } else if (operation === "subtract") {
        answer = num1;
        num1 = num1 + num2; // minuend
      }

      newQuestions.push({
        num1,
        num2,
        answer,
        options: generateOptions(answer),
      });
    }
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setEarnedStars(0);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    startNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operation, difficulty]);

  const handleAnswer = (answer: number) => {
    if (selectedAnswer !== null) return;

    const currentQ = questions[currentIndex];
    const correct = answer === currentQ.answer;

    setSelectedAnswer(answer);
    setIsCorrect(correct);

    let newScore = score;
    if (correct) {
      newScore = score + 1;
      setScore(newScore);
    }

    setTimeout(() => {
      if (currentIndex < TOTAL_QUESTIONS - 1) {
        setCurrentIndex((i) => i + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setIsFinished(true);
        
        let stars = 0;
        if (newScore === TOTAL_QUESTIONS) stars = 3;
        else if (newScore >= 8) stars = 2;
        else if (newScore >= 5) stars = 1;

        setEarnedStars(stars);
        
        addResult({
          id: Date.now().toString(),
          date: new Date().toISOString(),
          operation,
          difficulty,
          score: newScore,
          total: TOTAL_QUESTIONS,
          stars,
        });
      }
    }, 1500);
  };

  if (questions.length === 0) return null;

  if (isFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center pt-12"
      >
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full border border-sky-100">
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((star) => (
              <motion.div
                key={star}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: star * 0.2, type: "spring" }}
              >
                <Star
                  className={`w-12 h-12 ${
                    star <= earnedStars
                      ? "text-amber-400 fill-current"
                      : "text-slate-200"
                  }`}
                />
              </motion.div>
            ))}
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">{t("testFinished")}</h2>
          <p className="text-lg text-slate-600 mb-8">
            {t("testResult", { score, total: TOTAL_QUESTIONS })}
          </p>

          <div className="w-full bg-slate-100 rounded-full h-4 mb-8 overflow-hidden" dir="ltr">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(score / TOTAL_QUESTIONS) * 100}%` }}
              className={`h-full ${
                score > 7 ? "bg-emerald-500" : score > 4 ? "bg-yellow-400" : "bg-red-400"
              }`}
            />
          </div>

          <p className="text-xl font-medium mb-8">
            {score === TOTAL_QUESTIONS
              ? t("perfect")
              : score > 7
              ? t("great")
              : score > 4
              ? t("good")
              : t("tryAgain")}
          </p>

          <button
            onClick={startNewGame}
            className="flex items-center justify-center w-full gap-2 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-lg font-bold transition-colors"
          >
            <RotateCcw className={`w-6 h-6 ${language === "ar" ? "rotate-180" : ""}`} />
            {t("playAgain")}
          </button>
        </div>
      </motion.div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto w-full"
    >
      <div className="flex justify-between items-center mb-8">
        <span className="text-lg font-bold text-slate-500">
          {t("questionOf", { current: currentIndex + 1, total: TOTAL_QUESTIONS })}
        </span>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="font-bold text-slate-700">{t("points", { score })}</span>
        </div>
      </div>

      <div className="w-full bg-white rounded-full h-3 mb-10 shadow-inner overflow-hidden" dir="ltr">
        <div
          className="bg-blue-500 h-full transition-all duration-500 ease-out"
          style={{ width: `${(currentIndex / TOTAL_QUESTIONS) * 100}%` }}
        />
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center mb-8 border border-sky-100">
        <h3 className="text-5xl md:text-7xl font-black text-slate-800 mb-2 tracking-tight" dir="ltr">
          {currentQ.num1} {getOperationSymbol()} {currentQ.num2}
        </h3>
        <p className="text-slate-400 text-lg mt-4">{t("howMuchIs")}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6">
        {currentQ.options.map((option, index) => {
          let btnClass = "bg-white hover:bg-blue-50 text-slate-700 border-2 border-transparent shadow-md";
          
          if (selectedAnswer !== null) {
            if (option === currentQ.answer) {
              btnClass = "bg-emerald-500 text-white border-emerald-600 shadow-lg scale-105";
            } else if (option === selectedAnswer) {
              btnClass = "bg-red-500 text-white border-red-600 shadow-lg scale-95";
            } else {
              btnClass = "bg-slate-100 text-slate-400 opacity-50";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
              className={`relative py-6 md:py-8 rounded-2xl text-3xl md:text-4xl font-bold transition-all duration-300 ${btnClass}`}
            >
              {option}
              {selectedAnswer !== null && option === currentQ.answer && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute -top-3 ${language === "ar" ? "-left-3" : "-right-3"} bg-white rounded-full text-emerald-500`}
                >
                  <CheckCircle2 className="w-8 h-8" />
                </motion.div>
              )}
              {selectedAnswer === option && option !== currentQ.answer && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute -top-3 ${language === "ar" ? "-left-3" : "-right-3"} bg-white rounded-full text-red-500`}
                >
                  <XCircle className="w-8 h-8" />
                </motion.div>
              )}
            </button>
          );
        })}
      </div>

    </motion.div>
  );
}

function PrintMode({
  operation,
  difficulty,
  language,
}: {
  operation: Operation;
  difficulty: Difficulty;
  language: Language;
}) {
  const [questions, setQuestions] = useState<{ num1: number; num2: number; symbol: string }[]>([]);
  const { t } = useTranslation(language);

  const getOperationSymbol = () => {
    switch (operation) {
      case "multiply": return "×";
      case "divide": return "÷";
      case "add": return "+";
      case "subtract": return "-";
    }
  };

  const getOperationTitle = () => {
    switch (operation) {
      case "multiply": return t("multiply");
      case "divide": return t("divide");
      case "add": return t("add");
      case "subtract": return t("subtract");
    }
  };

  const generateWorksheet = () => {
    const newQuestions = [];
    let maxNum = 10;
    if (difficulty === "easy") maxNum = 5;
    if (difficulty === "hard") maxNum = 20;

    for (let i = 0; i < 30; i++) {
      let num1 = Math.floor(Math.random() * maxNum) + 1;
      let num2 = Math.floor(Math.random() * maxNum) + 1;

      if (operation === "divide") {
        num1 = num1 * num2; // dividend
      } else if (operation === "subtract") {
        num1 = num1 + num2; // minuend
      }

      newQuestions.push({
        num1,
        num2,
        symbol: getOperationSymbol(),
      });
    }
    setQuestions(newQuestions);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generateWorksheet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operation, difficulty]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white p-8 rounded-3xl shadow-xl print:shadow-none print:p-0 print:bg-transparent max-w-3xl mx-auto w-full"
    >
      <div className="print:hidden flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{t("createWorksheet")}</h2>
          <p className="text-slate-600">{t("printRandom")}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={generateWorksheet}
            className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
            title="Neue Aufgaben generieren"
          >
            <RotateCcw className={`w-6 h-6 ${language === "ar" ? "rotate-180" : ""}`} />
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-xl flex items-center gap-2 font-bold transition-colors"
          >
            <Printer className="w-6 h-6" />
            <span>{t("printPdf")}</span>
          </button>
        </div>
      </div>

      {/* Printable Area */}
      <div className="print:block text-black">
        <div className="flex flex-col sm:flex-row justify-between mb-10 border-b-2 border-slate-800 pb-6">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0">{t("worksheetTitle", { operation: getOperationTitle() })}</h1>
          <div className="text-lg flex flex-col gap-2">
            <div className="flex items-end gap-2">
              <span>{t("name")}</span>
              <div className="w-48 border-b border-slate-400"></div>
            </div>
            <div className="flex items-end gap-2">
              <span>{t("date")}</span>
              <div className="w-48 border-b border-slate-400"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-8 gap-x-12 text-2xl" dir="ltr">
          {questions.map((q, i) => (
            <div key={i} className="flex items-center">
              <span className="w-24 text-right">
                {q.num1} {q.symbol} {q.num2}
              </span>
              <span className="mx-4">=</span>
              <span className="flex-1 border-b-2 border-slate-400"></span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function StatsMode({ stats, clearStats, setMode, language }: { stats: any; clearStats: () => void; setMode: (m: Mode) => void; language: Language }) {
  const { t } = useTranslation(language);

  const getOperationTitle = (op: Operation) => {
    switch (op) {
      case "multiply": return t("multiply");
      case "divide": return t("divide");
      case "add": return t("add");
      case "subtract": return t("subtract");
    }
  };

  const getDifficultyTitle = (diff: Difficulty) => {
    switch (diff) {
      case "easy": return t("easy");
      case "medium": return t("medium");
      case "hard": return t("hard");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto w-full"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">{t("yourStats")}</h2>
          <p className="text-slate-600">{t("statsDesc")}</p>
        </div>
        <div className="flex gap-3">
          {stats.totalStars > 0 && (
            <button
              onClick={() => setMode("certificate")}
              className="p-3 bg-amber-100 text-amber-600 hover:bg-amber-200 rounded-xl transition-colors"
              title={t("certificate")}
            >
              <Trophy className="w-6 h-6" />
            </button>
          )}
          <button
            onClick={() => {
              // We should use a custom modal instead of window.confirm, but for now we'll keep it simple
              // or just clear directly since it's a kids app
              clearStats();
            }}
            className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            title={t("clearStats")}
          >
            <Trash2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-md border border-sky-100 flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
            <Play className={`w-8 h-8 ${language === "ar" ? "mr-1 rotate-180" : "ml-1"}`} />
          </div>
          <div>
            <p className="text-slate-500 font-medium">{t("totalGames")}</p>
            <p className="text-4xl font-black text-slate-800">{stats.totalGames}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-md border border-sky-100 flex items-center gap-6">
          <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center">
            <Star className="w-8 h-8 fill-current" />
          </div>
          <div>
            <p className="text-slate-500 font-medium">{t("totalStars")}</p>
            <p className="text-4xl font-black text-slate-800">{stats.totalStars}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-md border border-sky-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-800">{t("history")}</h3>
        </div>
        {stats.history.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            {t("noGamesYet")}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {stats.history.map((result: GameResult) => (
              <div key={result.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold" dir="ltr">
                    {result.score}/{result.total}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">
                      {getOperationTitle(result.operation)}
                    </p>
                    <p className="text-sm text-slate-500">
                      {getDifficultyTitle(result.difficulty)} • {new Date(result.date).toLocaleDateString(language === "ar" ? "ar-EG" : "de-DE")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1" dir="ltr">
                  {[1, 2, 3].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= result.stars
                          ? "text-amber-400 fill-current"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function CertificateMode({ profile, stats, language }: { profile: UserProfile; stats: any; language: Language }) {
  const { t } = useTranslation(language);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="max-w-4xl mx-auto w-full"
    >
      <div className="flex justify-between items-center mb-8 print:hidden">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">{t("certificate")}</h2>
        </div>
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl flex items-center gap-2 font-bold transition-colors shadow-md"
        >
          <Printer className="w-6 h-6" />
          <span>{t("downloadPdf")}</span>
        </button>
      </div>

      <div className="bg-white p-2 rounded-3xl shadow-2xl print:shadow-none print:p-0">
        <div className="border-8 border-double border-amber-200 p-8 md:p-16 rounded-2xl relative overflow-hidden bg-amber-50/30">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-amber-100 rounded-br-full opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-100 rounded-tl-full opacity-50"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mb-8 shadow-inner">
              <Trophy className="w-12 h-12" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-amber-600 mb-4 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              {t("certificateTitle")}
            </h1>
            
            <p className="text-xl text-slate-600 mb-12 italic">
              {t("certificateSubtitle")}
            </p>
            
            <p className="text-lg text-slate-500 mb-2 uppercase tracking-widest font-bold">
              {t("awardedTo")}
            </p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-12 border-b-2 border-amber-300 pb-4 px-12 inline-block">
              {profile.name}
            </h2>
            
            <p className="text-xl text-slate-700 mb-8 max-w-2xl leading-relaxed">
              {t("forCollecting")} <span className="font-bold text-amber-500 text-2xl">{stats.totalStars}</span> {t("starsIn")} <span className="font-bold text-blue-500 text-2xl">{stats.totalGames}</span> {t("games")}.
            </p>
            
            <div className="inline-block bg-gradient-to-r from-amber-400 to-amber-500 text-white px-8 py-3 rounded-full text-2xl font-black shadow-lg mb-16 transform -rotate-2">
              {t("mathGenius")}
            </div>
            
            <div className="flex justify-between w-full mt-8 pt-8 border-t border-amber-200">
              <div className="text-center">
                <p className="text-lg font-bold text-slate-800">{new Date().toLocaleDateString(language === "ar" ? "ar-EG" : "de-DE")}</p>
                <p className="text-sm text-slate-500 uppercase tracking-wider">{t("date")}</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-slate-800" style={{ fontFamily: "cursive" }}>Aymen Bakkour</p>
                <p className="text-sm text-slate-500 uppercase tracking-wider">{t("devBy")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
