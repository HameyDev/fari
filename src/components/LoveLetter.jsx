"use client";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

export default function LoveLetter({ next, exit }) {
  const fullText = `Laiba…

From the moment you came into my life, everything changed.

You became my peace in chaos,
my smile in sadness,
my strength in weakness.

I don’t just love you…
I choose you — every day, every moment, every lifetime.

You are not just my love,
you are my home,
my dua,
my forever.

Hamey ❤️`;

  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640); // mobile < 640px
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ✅ Falling particles configuration
  const particles = useMemo(() => {
    const arr = Array.from({ length: 50 }).map(() => ({
      size: Math.random() * 4 + 2,
      startX: Math.random() * window.innerWidth,
      drift: (Math.random() - 0.5) * 80,
      duration: Math.random() * 5 + 6,
      delay: Math.random() * 5,
      color: `rgba(255, ${Math.floor(100 + Math.random() * 155)}, ${Math.floor(100 + Math.random() * 155)}, ${0.6 + Math.random() * 0.4})`
    }));
    return arr;
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden text-white p-4 sm:p-6">

      {/* 🌌 Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/laiba-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />

      {/* ✨ Falling Particles */}
      <div className="absolute z-50 inset-0 z-0 overflow-hidden pointer-events-none">
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

      {/* 💌 Love Letter Card */}
      <motion.div
        key="loveletter"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-40 w-full max-w-[800px] h-[85vh] sm:h-[90vh] flex flex-col px-6 sm:px-10 py-6 sm:py-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(255,105,135,0.3)]"
      >
        {/* Header */}
        <div className="flex items-center justify-center mb-6 gap-3 flex-shrink-0">
          <h1 className="text-xl sm:text-2xl font-light text-softpink drop-shadow-[0_0_15px_rgba(255,182,193,0.7)] tracking-wide text-center">
            A Letter From My Heart
          </h1>
          <FaEnvelope className="text-2xl sm:text-3xl text-rose-400 drop-shadow-[0_0_15px_rgba(255,105,135,0.8)]" />
        </div>

        <div
          className="absolute sm:mr-24 mr-4 sm:mb-28 mb-16 inset-0 z-20 bg-no-repeat"
          style={{
            backgroundImage: "url('/pic-3.png')",
            backgroundSize: isMobile ? "180px 300px" : "250px 400px",
            backgroundPosition: "bottom right",

            filter: "brightness(0.82) drop-shadow(0 20px 15px rgba(244, 114, 182, 0.1))", // subtle glow
            borderRadius: "8px",
          }}
        />
        <div
          className="absolute  ml-20 inset-0 z-19 bg-no-repeat"
          style={{
            backgroundImage: "url('/floor.png')",
            backgroundSize: isMobile ? "230px 250px" : "490px 350px",
            backgroundPosition: "bottom right",
            borderRadius: "8px",
            filter: "brightness(0.80) drop-shadow(0 30px 10px rgba(244, 114, 182, 0.2))",
          }}
        />

        {/* Scrollable Typewriter Box */}
        <div
          className="flex-1 overflow-y-auto p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-md shadow-[0_0_50px_rgba(255,105,135,0.25)] text-left whitespace-pre-line leading-relaxed text-sm sm:text-base md:text-xs text-rose-100"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,105,135,0.8) transparent",
          }}
        >
          {displayedText}
          <span className="animate-pulse text-rose-300">|</span>

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
        <div className="mt-4 z-40 sm:mt-6 flex flex-col gap-2">


          {/* Exit My Heart */}
          <motion.button
            onClick={exit}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 rounded-full bg-transparent border border-white/30 text-white font-medium shadow-[0_0_10px_rgba(255,105,135,0.5)] overflow-hidden transition text-sm sm:text-base"
          >
            Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
