"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaLock,
  FaQuestionCircle,
  FaKey,
  FaArrowLeft,
  FaHeart,
} from "react-icons/fa";
import confetti from "canvas-confetti";

export default function HeartLock({ back, unlock }) {
  const [mode, setMode] = useState("menu");
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");

  const correct = { q1: "laiba", q2: "black", q3: "novembver" };
  const correctKey = "laiba";

  const triggerConfetti = () => {
    confetti({
      particleCount: window.innerWidth < 500 ? 90 : 140,
      spread: 120,
      origin: { y: 0.6 },
      colors: ["#ff6b87", "#ffb6c1", "#ff4d6d"],
    });
  };

  useEffect(() => {
    setTimeout(triggerConfetti, 500);
  }, []);

  const checkAnswers = () => {
    if (
      answers.q1.toLowerCase() === correct.q1 &&
      answers.q2.toLowerCase() === correct.q2 &&
      answers.q3.toLowerCase() === correct.q3
    ) {
      unlock();
      triggerConfetti();
    } else setError("Hmm… Not correct 💔 Try again");
  };

  const checkKey = () => {
    if (secretKey.toLowerCase() === correctKey) {
      unlock();
      triggerConfetti();
    } else setError("Wrong Key 🔒");
  };

  const PremiumButton = ({ icon, children, onClick }) => (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-full 
      bg-gradient-to-r from-rose-500 to-pink-400 text-white font-medium 
      shadow-[0_0_20px_rgba(255,105,135,0.7)] text-sm sm:text-base"
    >
      {icon}
      {children}
    </motion.button>
  );

  const TransparentButton = ({ icon, children, onClick }) => (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 
      rounded-full border border-white/30 text-white text-sm sm:text-base"
    >
      {icon}
      {children}
    </motion.button>
  );

  return (
    <div className="relative w-full min-h-[100svh] flex items-center justify-center px-4 overflow-hidden text-white">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/laiba-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${1.5 + Math.random() * 2}px`,
              height: `${1.5 + Math.random() * 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md sm:max-w-2xl 
        px-5 sm:px-8 py-8 sm:py-10 rounded-3xl text-center
        backdrop-blur-md bg-white/10 border border-white/20 
        shadow-[0_0_80px_rgba(255,105,135,0.35)]"
      >
        {/* Lock */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 6, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={triggerConfetti}
          className="flex justify-center mb-4 cursor-pointer"
        >
          <FaLock className="text-5xl sm:text-6xl text-rose-400 drop-shadow-[0_0_25px_rgba(255,105,135,0.9)]" />
        </motion.div>

        <h1 className="text-xl sm:text-2xl mb-5">My Heart is Locked</h1>

        {/* MENU */}
        {mode === "menu" && (
          <div className="space-y-3">
            <PremiumButton icon={<FaKey />} onClick={() => setMode("key")}>
              Enter Secret Key
            </PremiumButton>

            <TransparentButton icon={<FaArrowLeft />} onClick={back}>
              Go Back
            </TransparentButton>

            <button
              onClick={() => setMode("questions")}
              className="text-xs sm:text-sm pt-2 opacity-80 hover:text-pink-400 transition"
            >
              <FaQuestionCircle className="inline mr-1" />
              Forgot key? Answer my favourites
            </button>
          </div>
        )}

        {/* QUESTIONS */}
        {mode === "questions" && (
          <div className="space-y-3 mt-3 text-left">
            <p className="text-center text-sm flex justify-center gap-1">
              Answer from your heart <FaHeart className="text-rose-400" />
            </p>

            {["Who's my future wife?", "My favourite color?", "My Birth Month?"].map((ph, i) => (
              <input
                key={i}
                placeholder={ph}
                className="w-full p-2.5 text-sm rounded-md bg-gray-900/50 border border-white/20 text-white focus:ring-2 focus:ring-pink-400 outline-none"
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    [`q${i + 1}`]: e.target.value,
                  })
                }
              />
            ))}

            <PremiumButton icon={<FaKey />} onClick={checkAnswers}>
              Unlock
            </PremiumButton>

            <TransparentButton
              icon={<FaArrowLeft />}
              onClick={() => {
                setError("");
                setMode("menu");
              }}
            >
              Back
            </TransparentButton>
          </div>
        )}

        {/* KEY */}
        {mode === "key" && (
          <div className="space-y-3 mt-3">
            <p className="text-sm">Enter the secret key</p>

            <input
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full p-2.5 text-sm rounded-md text-center bg-gray-900/50 border border-white/20 text-white focus:ring-2 focus:ring-pink-400 outline-none"
              placeholder="Enter Key"
            />

            <PremiumButton icon={<FaKey />} onClick={checkKey}>
              Unlock
            </PremiumButton>

            <TransparentButton
              icon={<FaArrowLeft />}
              onClick={() => {
                setError("");
                setMode("menu");
              }}
            >
              Back
            </TransparentButton>
          </div>
        )}

        {error && <p className="mt-3 text-red-400 text-xs">{error}</p>}
      </motion.div>
    </div>
  );
}
