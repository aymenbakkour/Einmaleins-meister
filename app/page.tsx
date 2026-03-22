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
} from "lucide-react";

type Mode = "home" | "learn" | "test" | "print";

export default function App() {
  const [mode, setMode] = useState<Mode>("home");

  return (
    <div className="min-h-screen bg-sky-50 print:bg-white font-sans text-slate-800 selection:bg-sky-200">
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-center relative print:hidden">
        {mode !== "home" && (
          <button
            onClick={() => setMode("home")}
            className="absolute left-4 md:left-8 p-2 text-sky-600 hover:bg-sky-50 rounded-full transition-colors flex items-center gap-2 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Zurück</span>
          </button>
        )}
        <div className="flex items-center gap-3 text-sky-600">
          <Calculator className="w-8 h-8" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Einmaleins Meister
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 md:p-12 print:p-0 print:max-w-none">
        <AnimatePresence mode="wait">
          {mode === "home" && <HomeMenu key="home" setMode={setMode} />}
          {mode === "learn" && <LearnMode key="learn" />}
          {mode === "test" && <TestMode key="test" />}
          {mode === "print" && <PrintMode key="print" />}
        </AnimatePresence>
      </main>
    </div>
  );
}

function HomeMenu({ setMode }: { setMode: (mode: Mode) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center pt-12"
    >
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center max-w-2xl w-full border border-sky-100">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 text-amber-500 rounded-full mb-6">
          <Star className="w-10 h-10 fill-current" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
          Willkommen in der 3. Klasse!
        </h2>
        <p className="text-lg text-slate-600 mb-10">
          Lass uns zusammen das kleine Einmaleins üben. Was möchtest du heute
          machen?
        </p>

        <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
          <button
            onClick={() => setMode("learn")}
            className="group relative flex flex-col items-center p-6 md:p-8 bg-gradient-to-b from-emerald-400 to-emerald-500 rounded-2xl text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="bg-white/20 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <span className="text-xl md:text-2xl font-bold">Lernen</span>
            <span className="text-emerald-50 mt-2 text-xs md:text-sm text-center">
              Schau dir die Reihen an
            </span>
          </button>

          <button
            onClick={() => setMode("test")}
            className="group relative flex flex-col items-center p-6 md:p-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-2xl text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="bg-white/20 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 md:w-10 md:h-10 ml-1" />
            </div>
            <span className="text-xl md:text-2xl font-bold">Testen</span>
            <span className="text-blue-50 mt-2 text-xs md:text-sm text-center">
              Zeig, was du kannst!
            </span>
          </button>

          <button
            onClick={() => setMode("print")}
            className="group relative flex flex-col items-center p-6 md:p-8 bg-gradient-to-b from-violet-500 to-violet-600 rounded-2xl text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="bg-white/20 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <Printer className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <span className="text-xl md:text-2xl font-bold">Drucken</span>
            <span className="text-violet-50 mt-2 text-xs md:text-sm text-center">
              Arbeitsblatt als PDF
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function LearnMode() {
  const [selectedNumber, setSelectedNumber] = useState<number>(1);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Die Einmaleins-Reihen
        </h2>
        <p className="text-slate-600">Wähle eine Zahl, um die Reihe zu lernen</p>
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
            Die {selectedNumber}er-Reihe
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-xl md:text-2xl">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((multiplier) => (
            <div
              key={multiplier}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <span className="font-medium text-slate-600">
                {multiplier} × {selectedNumber}
              </span>
              <span className="text-slate-300 mx-4">=</span>
              <span className="font-bold text-emerald-600 w-12 text-right">
                {multiplier * selectedNumber}
              </span>
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

function TestMode() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const TOTAL_QUESTIONS = 10;

  const generateOptions = (correctAnswer: number) => {
    const options = new Set<number>([correctAnswer]);
    while (options.size < 4) {
      // Generate plausible wrong answers
      const offset = Math.floor(Math.random() * 10) - 5;
      let wrongAnswer = correctAnswer + offset;
      
      // Sometimes generate answers based on common mistakes (wrong multiplier)
      if (Math.random() > 0.5) {
        const factor = Math.random() > 0.5 ? 1 : -1;
        // e.g., if it's 3x4=12, a common mistake is 3x5=15 or 3x3=9
        wrongAnswer = correctAnswer + (Math.floor(Math.random() * 5) + 1) * factor;
      }

      if (wrongAnswer > 0 && wrongAnswer !== correctAnswer) {
        options.add(wrongAnswer);
      }
    }
    return Array.from(options).sort(() => Math.random() - 0.5);
  };

  const startNewGame = () => {
    const newQuestions: Question[] = [];
    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const answer = num1 * num2;
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
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleAnswer = (answer: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks

    const currentQ = questions[currentIndex];
    const correct = answer === currentQ.answer;

    setSelectedAnswer(answer);
    setIsCorrect(correct);

    if (correct) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      if (currentIndex < TOTAL_QUESTIONS - 1) {
        setCurrentIndex((i) => i + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setIsFinished(true);
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
          <div className="inline-flex items-center justify-center w-24 h-24 bg-yellow-100 text-yellow-500 rounded-full mb-6">
            <Trophy className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Test beendet!</h2>
          <p className="text-lg text-slate-600 mb-8">
            Du hast {score} von {TOTAL_QUESTIONS} Fragen richtig beantwortet.
          </p>

          <div className="w-full bg-slate-100 rounded-full h-4 mb-8 overflow-hidden">
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
              ? "Perfekt! Du bist ein Mathe-Genie! 🌟"
              : score > 7
              ? "Super gemacht! Fast alles richtig! 👍"
              : score > 4
              ? "Gut gemacht! Übe noch ein bisschen weiter. 💪"
              : "Übung macht den Meister! Versuch es gleich nochmal. 📚"}
          </p>

          <button
            onClick={startNewGame}
            className="flex items-center justify-center w-full gap-2 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-lg font-bold transition-colors"
          >
            <RotateCcw className="w-6 h-6" />
            Nochmal spielen
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
          Frage {currentIndex + 1} / {TOTAL_QUESTIONS}
        </span>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="font-bold text-slate-700">{score} Punkte</span>
        </div>
      </div>

      <div className="w-full bg-white rounded-full h-3 mb-10 shadow-inner overflow-hidden">
        <div
          className="bg-blue-500 h-full transition-all duration-500 ease-out"
          style={{ width: `${(currentIndex / TOTAL_QUESTIONS) * 100}%` }}
        />
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center mb-8 border border-sky-100">
        <h3 className="text-5xl md:text-7xl font-black text-slate-800 mb-2 tracking-tight">
          {currentQ.num1} × {currentQ.num2}
        </h3>
        <p className="text-slate-400 text-lg mt-4">Wie viel ist das?</p>
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
                  className="absolute -top-3 -right-3 bg-white rounded-full text-emerald-500"
                >
                  <CheckCircle2 className="w-8 h-8" />
                </motion.div>
              )}
              {selectedAnswer === option && option !== currentQ.answer && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3 bg-white rounded-full text-red-500"
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

function PrintMode() {
  const [questions, setQuestions] = useState<{ num1: number; num2: number }[]>([]);

  const generateWorksheet = () => {
    const newQuestions = [];
    for (let i = 0; i < 30; i++) {
      newQuestions.push({
        num1: Math.floor(Math.random() * 10) + 1,
        num2: Math.floor(Math.random() * 10) + 1,
      });
    }
    setQuestions(newQuestions);
  };

  useEffect(() => {
    generateWorksheet();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white p-8 rounded-3xl shadow-xl print:shadow-none print:p-0 print:bg-transparent max-w-3xl mx-auto w-full"
    >
      <div className="print:hidden flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Arbeitsblatt erstellen</h2>
          <p className="text-slate-600">Drucke ein zufälliges Übungsblatt aus</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={generateWorksheet}
            className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
            title="Neue Aufgaben generieren"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-xl flex items-center gap-2 font-bold transition-colors"
          >
            <Printer className="w-6 h-6" />
            <span>Drucken / PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Area */}
      <div className="print:block text-black">
        <div className="flex flex-col sm:flex-row justify-between mb-10 border-b-2 border-slate-800 pb-6">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0">Einmaleins Übungsblatt</h1>
          <div className="text-lg flex flex-col gap-2">
            <div className="flex items-end gap-2">
              <span>Name:</span>
              <div className="w-48 border-b border-slate-400"></div>
            </div>
            <div className="flex items-end gap-2">
              <span>Datum:</span>
              <div className="w-48 border-b border-slate-400"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-8 gap-x-12 text-2xl">
          {questions.map((q, i) => (
            <div key={i} className="flex items-center">
              <span className="w-24 text-right">
                {q.num1} × {q.num2}
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
