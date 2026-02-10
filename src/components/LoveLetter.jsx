"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Memories({ next, back }) {
  // Sections
  const sections = [
    { id: "first", label: "First" },
    { id: "cute", label: "Cute" },
    { id: "funny", label: "Funny" },
    { id: "fav", label: "Fav" },
  ];

  // Image Data
  const data = {
    first: [
      { src: "/memories/first/1.jpg", caption: "Our beginning 🌸" },
      { src: "/memories/first/2.jpg", caption: "First smile" },
      { src: "/memories/first/3.jpg", caption: "Memorable day" },
      { src: "/memories/first/4.jpg", caption: "Together always" },
      { src: "/memories/first/5.jpg", caption: "Forever us" },
    ],
    cute: [
      { src: "/memories/cute/1.jpg", caption: "Cute moment 🤍" },
      { src: "/memories/cute/2.jpg", caption: "My favorite" },
      { src: "/memories/cute/3.jpg", caption: "Laughing together" },
      { src: "/memories/cute/4.jpg", caption: "Sweet smile" },
    ],
    funny: [
      { src: "/memories/funny/1.jpg", caption: "We laughed 😂" },
      { src: "/memories/funny/2.jpg", caption: "Silly faces" },
      { src: "/memories/funny/3.jpg", caption: "Crazy moments" },
      { src: "/memories/funny/4.jpg", caption: "Inside joke" },
    ],
    fav: [
      { src: "/memories/fav/1.jpg", caption: "My heart ❤️" },
      { src: "/memories/fav/2.jpg", caption: "Forever us" },
      { src: "/memories/fav/3.jpg", caption: "Soulmate" },
      { src: "/memories/fav/4.jpg", caption: "Eternal love" },
    ],
  };

  // Responsive Window Size
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Particle Setup
  const particles = useMemo(() => {
    if (!windowSize.width) return [];
    return Array.from({ length: windowSize.width < 400 ? 30 : 50 }).map(() => ({
      size: Math.random() * 4 + 2,
      startX: Math.random() * windowSize.width,
      drift: (Math.random() - 0.5) * 80,
      duration: Math.random() * 5 + 6,
      delay: Math.random() * 5,
      color: `rgba(255, ${Math.floor(100 + Math.random() * 155)}, ${Math.floor(100 + Math.random() * 155)}, ${
        0.6 + Math.random() * 0.4
      })`,
    }));
  }, [windowSize.width]);

  // Active Section & Slide
  const [activeSection, setActiveSection] = useState("first");
  const [startIndex, setStartIndex] = useState(0);

  const currentImages = data[activeSection];
  const visibleImages = currentImages.slice(startIndex, startIndex + 4);

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };
  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1 > currentImages.length - 4 ? currentImages.length - 4 : prev + 1));
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-start p-4 sm:p-6 overflow-hidden text-white">
      {/* Particles */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            initial={{ y: -50, x: p.startX, opacity: 0 }}
            animate={{ y: windowSize.height + 50, x: p.startX + p.drift, opacity: [0, 1, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
            style={{ width: p.size, height: p.size, backgroundColor: p.color }}
            className="absolute rounded-full blur-[1.5px] shadow-[0_0_10px_rgba(255,120,150,0.5)]"
          />
        ))}
      </div>

      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/laiba-bg.jpg')" }} />
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />

      {/* Transparent Card */}
      <div className="relative z-10 w-full max-w-[1000px] max-h-[85%] flex-1 flex flex-col items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(255,105,135,0.25)] p-6 sm:p-10 mt-8">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-light text-softpink drop-shadow-[0_0_15px_rgba(255,182,193,0.7)] text-center mb-6">
          Our Memories 🖼️
        </h1>

        {/* Sections */}
        <div className="flex justify-center gap-3 flex-wrap mb-6">
          {sections.map((sec) => (
            <motion.button
              key={sec.id}
              onClick={() => {
                setActiveSection(sec.id);
                setStartIndex(0);
              }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full font-medium capitalize transition-all ${
                activeSection === sec.id
                  ? "bg-gradient-to-r from-rose-500 to-pink-400 text-white shadow-[0_0_20px_rgba(255,105,135,0.6)]"
                  : "bg-gray-700 text-white/80 hover:bg-gray-600"
              }`}
            >
              {sec.label}
            </motion.button>
          ))}
        </div>

        {/* Gallery */}
        <div className="relative flex items-center justify-center w-full gap-4">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 rounded-full bg-black/40 backdrop-blur-sm shadow-lg z-10"
          >
            <FaArrowLeft />
          </button>

          {/* Images */}
          <div className="flex gap-4 overflow-hidden w-full justify-center">
            <AnimatePresence mode="wait">
              {visibleImages.map((img, i) => (
                <motion.div
                  key={img.src + startIndex}
                  className="flex-shrink-0 w-[22%] sm:w-[20%] rounded-xl overflow-hidden shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <img src={img.src} alt={img.caption} className="w-full h-full object-cover rounded-xl" />
                  <p className="text-center mt-1 text-xs sm:text-sm text-white/90">{img.caption}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 rounded-full bg-black/40 backdrop-blur-sm shadow-lg z-10"
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Back & Continue Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-[60%] mx-auto">
          <motion.button
            onClick={back}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-medium backdrop-blur-md hover:bg-white/20 transition text-sm sm:text-base"
          >
            Back
          </motion.button>
          <motion.button
            onClick={next}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-400 text-white font-medium shadow-[0_0_30px_rgba(255,105,135,0.8)] transition text-sm sm:text-base"
          >
            Continue ❤️
          </motion.button>
        </div>
      </div>
    </div>
  );
}
