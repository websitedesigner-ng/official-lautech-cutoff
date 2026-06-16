import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface CourseMismatchScreenProps {
  courseName: string;
  utmeCutoff: number;
  jambScore: number;
  onBack: () => void;
  seconds?: number;
}

export function CourseMismatchScreen({
  courseName,
  utmeCutoff,
  jambScore,
  onBack,
  seconds = 8,
}: CourseMismatchScreenProps) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) {
      onBack();
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, onBack]);

  const progress = (remaining / seconds) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center mb-4"
        >
          <AlertTriangle size={28} className="text-[#CC1B1B]" />
        </motion.div>

        <h2 className="text-base font-bold text-gray-800">
          JAMB Score Too Low for This Course
        </h2>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          Your JAMB score of{" "}
          <span className="font-bold text-gray-700">{jambScore}</span> does
          not meet the{" "}
          <span className="font-bold text-[#CC1B1B]">{utmeCutoff}</span>{" "}
          UTME cut-off required for
        </p>
        <p className="text-sm font-bold text-gray-800 mt-1">{courseName}</p>

        <div className="w-full bg-red-50 border border-red-200 rounded-xl px-4 py-3 mt-5">
          <p className="text-xs text-red-700 leading-relaxed">
            Please go back and select a different course that matches your
            JAMB score.
          </p>
        </div>

        {/* Countdown */}
        <div className="w-full mt-6 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
            <span>Returning to course selection</span>
            <span className="font-bold text-gray-600">{remaining}s</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#CC1B1B] rounded-full"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}