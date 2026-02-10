import { motion } from "framer-motion";

export default function FloatingHearts() {
  const hearts = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "100vh", x: Math.random() * 100 + "%", opacity: 0 }}
          animate={{ y: "-10vh", opacity: 0.6 }}
          transition={{
            duration: 6 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute text-3xl"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
