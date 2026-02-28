"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import confetti from "canvas-confetti";

export default function Welcome({ next }) {
    const heartRef = useRef(null);
    const audioRef = useRef(null);

    /* 🎵 Mobile-safe background music */
    useEffect(() => {
        const audio = new Audio("/love-music.mp3");
        audio.loop = true;
        audio.volume = 0.2;
        audioRef.current = audio;

        const playAudio = () => {
            audio.play().catch(() => { });
            window.removeEventListener("click", playAudio);
        };

        window.addEventListener("click", playAudio);
        return () => audio.pause();
    }, []);

    /* 💖 Confetti */
    const handleHeartClick = () => {
        confetti({
            particleCount: window.innerWidth < 500 ? 120 : 260,
            spread: 110,
            colors: ["#ff6b87", "#ffb6c1", "#ff4d6d"],
        });
    };

    useEffect(() => {
        setTimeout(handleHeartClick, 500);
    }, []);

    return (
        <div className="relative w-full min-h-[100svh] overflow-hidden flex items-center justify-center text-white px-4">

            {/* 🌌 Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/laiba-bg.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* ✨ Stars */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 35 }).map((_, i) => (
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

            {/* 💎 Main Card */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-2xl backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl shadow-[0_0_80px_rgba(255,105,135,0.3)] 
        px-5 py-10 sm:px-10 sm:py-14 flex flex-col items-center text-center"
            >
                {/* ❤️ Heart */}
                <motion.div
                    ref={heartRef}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.3 }}
                    onClick={handleHeartClick}
                    className="relative cursor-pointer mb-6"
                >
                    <FaHeart className="text-[64px] sm:text-[78px] text-rose-400 drop-shadow-[0_0_25px_rgba(255,105,135,0.9)]" />

                    <span className="absolute inset-0 flex items-center justify-center text-[7px] sm:text-[10px] font-semibold text-white pointer-events-none pb-1">
                        Touch My <br /> Heart
                    </span>
                </motion.div>

                {/* 🌹 Title */}
                {/* 🌹 Name */}
                <h1 className="text-4xl sm:text-4xl font-heading text-4xl font-light tracking-widest text-rose-200 drop-shadow-[0_0_25px_rgba(255,182,193,0.7)] mb-6">
                    Welcome To My Life, Fariha
                </h1>

                {/* ✨ Typewriter */}
                <TypeAnimation
                    sequence={[
                        "From the first moment…",
                        1500,
                        "My heart recognized you…",
                        1500,
                        "Forever starts with you…",
                        1500,
                    ]}
                    speed={25}
                    repeat={Infinity}
                    className="text-sm sm:text-base opacity-90 mb-8 leading-relaxed"
                />

                {/* 💫 Button */}
                <motion.button
                    onClick={next}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-10 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-400 text-white font-semibold shadow-[0_0_35px_rgba(255,105,135,0.8)]"
                >
                    Enter My Heart
                </motion.button>

                {/* 💌 Footer */}
                <p className="mt-8 text-[11px] opacity-60 tracking-wide">
                    Made with eternal love by Hamey
                </p>
            </motion.div>
        </div>
    );
}
