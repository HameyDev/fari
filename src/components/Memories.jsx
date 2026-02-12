"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Memories({ next, back }) {
  const sections = [
    { id: "first", label: "First" },
    { id: "cute", label: "Cute" },
    { id: "dream", label: "Dream" },
    { id: "fav", label: "Fav" },
  ];
  const containerRef = useRef(null);

  const data = {
    first: [
      { src: "/memories/first/1.jpg", caption: "Our beginning 🌸" },
      { src: "/memories/first/2.jpg", caption: "First smile" },
      { src: "/memories/first/1.jpg", caption: "Memorable day" },
      { src: "/memories/first/2.jpg", caption: "Together always" },
      { src: "/memories/first/1.jpg", caption: "Our journey" },
    ],
    cute: [
      { src: "/memories/cute/1.jpg", caption: "Cute moment 🤍" },
      { src: "/memories/cute/2.jpg", caption: "My favorite" },
      { src: "/memories/cute/1.jpg", caption: "Laughing together" },
      { src: "/memories/cute/2.jpg", caption: "Sweet smile" },
    ],
    dream: [
      { src: "/memories/dreams/1.png", caption: "Kissing Hand" },
      { src: "/memories/dreams/2.png", caption: "Holding hand" },
      { src: "/memories/dreams/9.png", caption: "Putting in Hands" },
      { src: "/memories/dreams/10.png", caption: "Loving" },
      { src: "/memories/dreams/8.png", caption: "Giving Flowers" },
      { src: "/memories/dreams/3.png", caption: "Giving Flowers" },
      { src: "/memories/dreams/4.png", caption: "Caring" },
      { src: "/memories/dreams/5.png", caption: "Promise" },
      { src: "/memories/dreams/6.png", caption: "My Love" },
      { src: "/memories/dreams/7.png", caption: "Giving Love Letter" },
      
      
    ],
    fav: [
      { src: "/memories/fav/1.jpg", caption: "My heart ❤️" },
      { src: "/memories/fav/2.jpg", caption: "Forever us" },
      { src: "/memories/fav/3.jpg", caption: "Soulmate" },
      { src: "/memories/fav/4.jpg", caption: "Eternal love" },
    ],
  };

  const [activeSection, setActiveSection] = useState("first");
  const [startIndex, setStartIndex] = useState(0);
  const [selectedImg, setSelectedImg] = useState(null);

  const currentImages = data[activeSection];
  const [visibleCount, setVisibleCount] = useState(4);
  const canSlidePrev = startIndex > 0;
  const canSlideNext = startIndex + visibleCount < currentImages.length;


  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisibleCount(1);     // mobile → 1 image
      else if (window.innerWidth < 1024) setVisibleCount(2); // tablet → 2
      else setVisibleCount(4); // desktop → 4
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);




  const prevSlide = () => {
    if (!canSlidePrev) return;
    setStartIndex((prev) => prev - 1);
  };

  const nextSlide = () => {
    if (!canSlideNext) return;
    setStartIndex((prev) => prev + 1);
  };

  // Particles
  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map(() => ({
      size: Math.random() * 4 + 2,
      startX: Math.random() * window.innerWidth,
      drift: (Math.random() - 0.5) * 80,
      duration: Math.random() * 5 + 6,
      delay: Math.random() * 5,
      color: `rgba(255, ${Math.floor(100 + Math.random() * 155)}, ${Math.floor(
        100 + Math.random() * 155
      )}, ${0.6 + Math.random() * 0.4})`,
    }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.03, filter: "blur(6px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative w-full h-screen flex flex-col items-center justify-start p-4 sm:p-6 overflow-hidden text-white"
    >


      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/laiba-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />

      {/* Particles */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            initial={{ y: -50, x: p.startX, opacity: 0 }}
            animate={{ y: window.innerHeight + 50, x: p.startX + p.drift, opacity: [0, 1, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
            style={{ width: p.size, height: p.size, backgroundColor: p.color }}
            className="absolute rounded-full blur-[1.5px] shadow-[0_0_10px_rgba(255,120,150,0.5)]"
          />
        ))}
      </div>

      {/* Transparent Card */}
      <div className="relative z-10 w-full max-w-[1000px] h-[85%] flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(255,105,135,0.25)] p-6 sm:p-12 mt-8">

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-light text-softpink drop-shadow-[0_0_15px_rgba(255,182,193,0.7)] text-center mb-6">
          Our Memories
        </h1>

        {/* Sections */}
        <div className="flex justify-center gap-3 flex-wrap mb-6">
          {sections.map((sec) => (
            <motion.button
              key={sec.id}
              onClick={() => { setActiveSection(sec.id); setStartIndex(0); }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 sm:px-8 sm:py-3 rounded-full font-medium capitalize text-[10px] sm:text-base transition-all duration-300
                border border-white/20 backdrop-blur-md
                ${activeSection === sec.id
                  ? "bg-gradient-to-r from-rose-500 to-pink-400 text-white shadow-[0_0_20px_rgba(255,105,135,0.6)] hover:shadow-[0_0_30px_rgba(255,105,135,0.8)]"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white shadow-sm"
                }`}
            >
              {sec.label}
            </motion.button>
          ))}
        </div>

        {/* Gallery */}
        <div className="relative flex items-center justify-center w-full gap-4 mt-4">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            disabled={!canSlidePrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-sm shadow-lg z-10 transition-colors
      ${canSlidePrev ? "text-white/80 hover:text-white bg-black/40" : "text-white/30 bg-black/20 cursor-not-allowed"}`}
          >
            <FaArrowLeft />
          </button>

          {/* Images Container */}
          <div
            ref={containerRef}
            className="
    overflow-hidden w-[90%] px-3 py-3
    rounded-2xl
    bg-white/[0.03]
    border border-pink-300/20
    backdrop-blur-md
    shadow-[0_0_35px_rgba(255,105,135,0.25),inset_0_0_25px_rgba(255,105,135,0.08)]
  "
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                className="flex gap-4"
                initial={{ opacity: 0 }}
                animate={{
                  x: `-${startIndex * (106.5 / visibleCount)}%`,
                  opacity: 1,
                }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween", ease: "easeInOut", duration: 0.45 }}
              >
                {currentImages.map((img) => (
                  <div
                    key={img.src}
                    className="
            flex-shrink-0 w-full sm:w-[48%] md:w-[31%] lg:w-[23.5%]
            rounded-xl bg-white overflow-hidden cursor-pointer relative
            group
          "
                    onClick={() => setSelectedImg(img)}
                  >
                    {/* Image */}
                    <img
                      src={img.src}
                      alt={img.caption}
                      className="
              w-full h-70 object-cover rounded-xl
              transition-all duration-400
              group-hover:scale-[1.05]
            "
                    />

                    {/* Soft Pink Glow Overlay */}
                    <div className="
            absolute inset-0 rounded-xl
            opacity-0 group-hover:opacity-100
            transition duration-400
            bg-gradient-to-t from-pink-500/20 via-transparent to-transparent
          " />

                    {/* Caption */}
                    <div className="absolute bottom-0 w-full bg-black/25 backdrop-blur-md py-2 text-center rounded-b-xl">
                      <p className="text-xs sm:text-sm text-white/90 font-medium">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>


          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            disabled={!canSlideNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-sm shadow-lg z-10 transition-colors
      ${canSlideNext ? "text-white/80 hover:text-white bg-black/40" : "text-white/30 bg-black/20 cursor-not-allowed"}`}
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
        </div>

      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <motion.img
              src={selectedImg.src}
              alt={selectedImg.caption}
              className="max-h-[85%] max-w-[90%] rounded-2xl shadow-[0_0_50px_rgba(255,105,135,0.5)]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
