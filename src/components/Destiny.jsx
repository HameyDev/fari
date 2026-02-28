"use client";
import { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Destiny({ back }) {

  /* ✅ Features With Image + Text */
  const features = [
    {
      title: "Your Eyes 🤍",
      image: "/eye.jpeg",
      lines: [
        "They don’t just look beautiful…",
        "They feel deep and honest.",
        "When you look at something, it feels like you mean it."
      ]
    },
    {
      title: "Your Lips 🌸",
      image: "/lip.jpeg",
      lines: [
        "Soft, natural, and full of quiet charm.",
        "They speak emotions even when words are silent."
      ]
    },
    {
      title: "Your Smile 😊",
      image: "/smil.jpeg",
      lines: [
        "When you smile, your whole face changes.",
        "It’s not just a smile — it’s a moment that makes everything around feel lighter."
      ]
    },
    {
      title: "Your Hair ✨",
      image: "/hair.jpeg",
      lines: [
        "The way it falls naturally around your face…",
        "It adds to your charm without even trying."
      ]
    },
    {
      title: "Your Dressing Style 👗",
      image: "/dressin.jpeg",
      lines: [
        "You carry simplicity with confidence.",
        "It feels like you just own it."
      ]
    },
    {
      title: "Your Way of Talking 💬",
      image: "/tal.jpeg",
      lines: [
        "You speak casually but with meaning.",
        "Conversations with you feel comfortable and real."
      ]
    },
    {
      title: "Your Voice 🎙",
      image: "/voic.jpeg",
      lines: [
        "It has this soft energy that stays in my mind long after I hear it.",
        "It feels natural… not forced… just effortlessly cute."
      ]
    },
    
  ];

  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
  });

  /* ✅ Safe Screen Detection */
  useEffect(() => {
    const updateSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  /* ✅ Particles */
  const particles = useMemo(() => {
    if (!screenSize.width) return [];

    return Array.from({ length: 30 }).map(() => ({
      size: Math.random() * 4 + 2,
      startX: Math.random() * screenSize.width,
      drift: (Math.random() - 0.5) * 80,
      duration: Math.random() * 5 + 6,
      delay: Math.random() * 5,
    }));
  }, [screenSize.width]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden text-white px-4">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/laiba-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            initial={{ y: -50, x: p.startX, opacity: 0 }}
            animate={{
              y: screenSize.height + 50,
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
            className="absolute rounded-full bg-rose-300/60 blur-[1.5px]"
          />
        ))}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-[900px] h-[95vh] flex flex-col px-6 py-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(255,105,135,0.3)]"
      >

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-light text-center mb-6">
          What Makes You Rare
        </h1>

        {/* Scrollable Features */}
        <div className="flex-1 overflow-y-auto px-4">

          {features.map((feature, index) => (
            <div key={index} className="mb-20 text-center">

              {/* Image */}
              <motion.img
                src={feature.image}
                alt={feature.title}
                className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-3xl object-cover mb-6 shadow-xl border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              />

              {/* Title */}
              <h2 className="text-xl font-semibold mb-4">
                {feature.title}
              </h2>

              {/* Text */}
              {feature.lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-xs sm:text-base mb-2 text-rose-100"
                >
                  {line}
                </motion.p>
              ))}

            </div>
          ))}

          {/* Scrollbar Styling */}
          <style jsx>{`
            div::-webkit-scrollbar {
              width: 6px;
            }
            div::-webkit-scrollbar-thumb {
              background: rgba(255, 105, 135, 0.8);
              border-radius: 999px;
            }
          `}</style>

        </div>

        {/* Back Button */}
        <div className="mt-4 flex justify-center">
          <motion.button
            onClick={back}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-2 rounded-full bg-white/15 border border-white/20 backdrop-blur-md hover:bg-white/25 transition text-sm"
          >
            Back
          </motion.button>
        </div>

      </motion.div>
    </div>
  );
}