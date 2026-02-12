"use client";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { useMemo, useEffect, useState } from "react";



export default function HeartDashboard({ openSection, exit }) {
    const sections = [
        { name: "My Words For You", id: "loveLetter" },
        { name: "Our Beautiful Memories", id: "memories" },
        { name: "Promises I Made To You", id: "promises" },
        { name: "Our Written Destiny", id: "destiny" },
    ];
    const [isMobile, setIsMobile] = useState(false);

    // create particles
    const particles = useMemo(() => {
        return Array.from({ length: 40 }).map(() => ({
            size: Math.random() * 4 + 2,
            startX: Math.random() * window.innerWidth,
            drift: (Math.random() - 0.5) * 80, // side movement
            duration: Math.random() * 5 + 6,
            delay: Math.random() * 5,
        }));
    }, []);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640); // mobile < 640px
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full h-screen flex items-center justify-center overflow-hidden text-white"
        >

            {/* 🌌 Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/laiba-bg.jpg')" }}
            />
            <div
                className="absolute sm:ml-12 mb-16 inset-0 z-20 bg-no-repeat"
                style={{
                    backgroundImage: "url('/pic.png')",
                    backgroundSize: isMobile ? "180px 270px" : "270px 400px", // 📱 vs 💻
                    backgroundPosition: "bottom left",
                    filter:
                        "brightness(0.82) drop-shadow(0 15px 15px rgba(244, 114, 182, 0.1))",
                    borderRadius: "8px",
                }}
            />
            <div
                className="absolute  ml-8 inset-0 z-19 bg-no-repeat"
                style={{
                    backgroundImage: "url('/floor.png')",
                    backgroundSize: "450px 220px",
                    backgroundPosition: "bottom left",
                    borderRadius: "8px",
                    filter: "brightness(0.95) drop-shadow(0 30px 10px rgba(244, 114, 182, 0.6))",
                }}
            />

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to top, rgba(244,114,182,0.30), transparent 30%)",
                    mixBlendMode: "screen", // try: overlay / soft-light / color
                }}
            />


            <div
                className="absolute sm:mr-12 mb-4 sm:mb-0 inset-0 z-20 bg-no-repeat"
                style={{
                    backgroundImage: "url('/pic-2.png')",
                    backgroundSize: isMobile ? "197px 350px" : "300px 500px",
                    backgroundPosition: "bottom right",

                    filter: "brightness(0.82) drop-shadow(0 20px 15px rgba(244, 114, 182, 0.1))", // subtle glow
                    borderRadius: "8px",
                }}
            />
            <div
                className="absolute  ml-8 inset-0 z-19 bg-no-repeat"
                style={{
                    backgroundImage: "url('/floor.png')",
                    backgroundSize: "600px 280px",
                    backgroundPosition: "bottom right",
                    borderRadius: "8px",
                    filter: "brightness(0.95) drop-shadow(0 30px 10px rgba(244, 114, 182, 0.6))",
                }}
            />




            <div className="absolute inset-0  bg-black/65 backdrop-blur-[2px]" />

            {/* ✨ RAINING PARTICLES */}
            <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
                {particles.map((p, i) => (
                    <motion.span
                        key={i}
                        initial={{
                            y: -100,
                            x: p.startX,
                            opacity: 0,
                        }}
                        animate={{
                            y: window.innerHeight + 100,
                            x: p.startX + p.drift,
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: p.duration,
                            delay: p.delay,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            width: p.size,
                            height: p.size,
                        }}
                        className="absolute rounded-full bg-rose-300/70 blur-[1px] shadow-[0_0_10px_rgba(255,120,150,0.6)]"
                    />
                ))}
            </div>


            {/* 💖 HEART CONTAINER */}
            <motion.div
                animate={{ scale: [1, 1.01, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="relative  z-50 mb-[180px] md:mb-0 flex items-center justify-center"
            >
                <div className="relative w-[450px] sm:w-[400px] h-[420px] sm:h-[420px]  flex items-center justify-center">

                    {/* 💗 Big Transparent Heart Glow */}
                    <FaHeart className="absolute text-[500px]  sm:text-[700px] text-rose-400/20 drop-shadow-[0_0_120px_rgba(255,120,150,0.25)]" />

                    {/* 💎 Glass Inner Area */}
                    <div className="relative w-[50%] h-[65%] sm:w-[78%] sm:h-[82%] sm:mb-20 mb-8 rounded-3xl backdrop-blur-sm bg-white/5 border border-white/10 shadow-[0_0_80px_rgba(255,105,135,0.25)] flex flex-col items-center justify-center px-6 py-5">

                        <h1 className="text-xs sm:text-xl mb-5 text-center font-light tracking-wide">
                            Welcome to My Heart
                        </h1>

                        <div className="flex flex-col gap-3 w-full">
                            {sections.map((sec) => (
                                <motion.button
                                    key={sec.id}
                                    onClick={() => openSection(sec.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 shadow-[0_0_18px_rgba(255,105,135,0.25)] text-[10px] sm:text-base md:text-sm backdrop-blur-md transition"
                                >
                                    {sec.name}
                                </motion.button>
                            ))}
                        </div>

                        <motion.button
                            onClick={exit}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-5 text-sm text-white/70 hover:text-white border-b border-white/30"
                        >
                            Exit My Heart
                        </motion.button>

                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
