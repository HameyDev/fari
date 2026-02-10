"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";

export default function Promises({ next, back }) {
  const promises = [
    "I promise to always respect you",
    "I promise to stand beside you in every storm",
    "I promise to protect your heart",
    "I promise to make you smile even on hard days",
    "I promise to grow with you, not without you",
    "I promise to love you — always, forever",
  ];

  // Falling particles
  const particles = useMemo(() => {
    const arr = Array.from({ length: 50 }).map(() => ({
      size: Math.random() * 4 + 2,
      startX: Math.random() * window.innerWidth,
      drift: (Math.random() - 0.5) * 80,
      duration: Math.random() * 5 + 6,
      delay: Math.random() * 5,
      color: `rgba(255, ${Math.floor(100 + Math.random() * 155)}, ${Math.floor(
        100 + Math.random() * 155
      )}, ${0.6 + Math.random() * 0.4})`,
    }));
    return arr;
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden text-white px-4 sm:px-6">

      {/* 🌌 Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/laiba-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />

      {/* ✨ Falling Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            initial={{ y: -50, x: p.startX, opacity: 0 }}
            animate={{ y: window.innerHeight + 50, x: p.startX + p.drift, opacity: [0, 1, 0] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
            }}
            className="absolute rounded-full blur-[1.5px] shadow-[0_0_10px_rgba(255,120,150,0.5)]"
          />
        ))}
      </div>

      {/* 💌 Promises Card */}
      <motion.div
        key="promises"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[900px] h-[85vh] flex flex-col px-6 sm:px-10 py-6 sm:py-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(255,105,135,0.3)]"
      >
        {/* Title */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-2xl sm:text-4xl font-light text-softpink drop-shadow-[0_0_15px_rgba(255,182,193,0.7)] text-center mb-6"
        >
          My Promises To You 
        </motion.h1>

        {/* Promises List */}
        <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center text-center p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm  shadow-[0_0_50px_rgba(255,105,135,0.25)] text-left text-rose-100">
          {promises.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.35, duration: 0.6, ease: "easeOut" }}
              className="mb-4 text-xs sm:text-base md:text-lg leading-relaxed tracking-wide"
            >
               {text}
            </motion.p>
          ))}

          {/* Scrollbar Styling */}
          <style jsx>{`
            div::-webkit-scrollbar {
              width: 8px;
            }
            div::-webkit-scrollbar-track {
              background: transparent;
            }
            div::-webkit-scrollbar-thumb {
              background: rgba(255, 105, 135, 0.8);
              border-radius: 9999px;
              box-shadow: 0 0 10px rgba(255, 105, 135, 0.5);
            }
            div::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 105, 135, 1);
            }
          `}</style>
        </div>

        {/* Buttons */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-[90%] mx-auto">
          {/* Back */}
          <motion.button
            onClick={back}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-full py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-medium backdrop-blur-md hover:bg-white/20 transition text-sm sm:text-base"
          >
            Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
