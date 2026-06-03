import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onDone: () => void;
}

export function SplashScreen({ onDone }: SplashScreenProps) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    // in → hold after 600ms
    const t1 = setTimeout(() => setPhase("hold"), 600);
    // hold → out after 2200ms
    const t2 = setTimeout(() => setPhase("out"), 2200);
    // unmount after out animation (400ms)
    const t3 = setTimeout(() => onDone(), 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== "out" ? (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
        >
          {/* Logo */}
          <motion.img
            src="/lautech-logo.png"
            alt="LAUTECH"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-24 h-24 object-contain mb-6"
          />

          {/* BJ OF LAUTECH */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-3xl font-black tracking-widest text-[#CC1B1B] uppercase">
              BJ OF LAUTECH
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              className="h-0.5 bg-[#C8A84B] rounded-full mt-3 mx-auto w-32 origin-left"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-5 text-xs text-gray-400 tracking-wide"
          >
            LAUTECH Cut-off Calculator · 2025/2026
          </motion.p>

          {/* Loader dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex gap-1.5 mt-8"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#CC1B1B]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
