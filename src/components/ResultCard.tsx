import { motion } from "framer-motion";
import { ScoreRing } from "./ScoreRing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Copy, RotateCcw, MessageCircle, TrendingUp, CheckCircle2, XCircle } from "lucide-react";
import type { Course } from "@/data/courses";

interface ResultCardProps {
  aggregate: number;
  jambPoints: number;
  olevelPoints: number;
  jambScore: string;
  olevelSum: number;
  course: Course | null;
  indigene: "indigene" | "nonIndigene";
  allCourses: Course[];
  onReset: () => void;
}

export function ResultCard({
  aggregate,
  jambPoints,
  olevelPoints,
  jambScore,
  olevelSum,
  course,
  indigene,
  allCourses,
  onReset,
}: ResultCardProps) {
  const cutoff   = course ? course.cutoff[indigene] : null;
  const passed   = cutoff !== null ? aggregate >= cutoff : null;

  // Courses the user can qualify for (score >= cutoff), sorted closest first
  const eligibleCourses = allCourses
    .filter((c) => aggregate >= c.cutoff[indigene])
    .sort((a, b) => b.cutoff[indigene] - a.cutoff[indigene])
    .slice(0, 5);

  // Next 5 courses just above their score (what they can reach)
  const nearMissCourses = allCourses
    .filter((c) => aggregate < c.cutoff[indigene])
    .sort((a, b) => a.cutoff[indigene] - b.cutoff[indigene])
    .slice(0, 5);

  const resultText =
    `🎓 LAUTECH Aggregate Score Calculator\n\n` +
    `My Score: ${aggregate.toFixed(2)}%\n` +
    `JAMB: ${jambScore} → ${jambPoints.toFixed(2)} pts\n` +
    `O'Level: ${olevelSum}/30 → ${olevelPoints.toFixed(2)} pts\n` +
    (course
      ? `\nCourse: ${course.name}\nCut-off: ${cutoff}%\nStatus: ${passed ? "✅ ELIGIBLE" : "❌ BELOW CUT-OFF"}\n`
      : "") +
    `\nCalculate your own score here:\nhttps://lautech-cutoff-calculator.vercel.app\n\n` +
    `Join LAUTECH Aspirants WhatsApp Group:\nhttps://chat.whatsapp.com/LfoeJyV93pg35zWCwCfEi1`;

  const handleCopy  = () => navigator.clipboard.writeText(resultText);
  const handleShare = () => window.open(`https://wa.me/?text=${encodeURIComponent(resultText)}`, "_blank");
  const handleGroup = () => window.open("https://chat.whatsapp.com/LfoeJyV93pg35zWCwCfEi1", "_blank");

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }} className="space-y-5">

      {/* Score ring */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
          Your Aggregate Score
        </p>
        <ScoreRing score={aggregate} jambPoints={jambPoints} olevelPoints={olevelPoints} />
      </div>

      {/* Eligibility for chosen course */}
      {course && cutoff !== null && (
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className={`rounded-2xl border-2 p-5 ${passed ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                Your Chosen Course
              </p>
              <p className="text-sm font-bold text-gray-800 truncate">{course.name}</p>
              <p className="text-xs text-gray-500 mt-1">
                Cut-off: <span className="font-bold text-gray-700">{cutoff}%</span>
                {!passed && (
                  <span className="text-red-500 ml-2 font-semibold">
                    ({(cutoff - aggregate).toFixed(2)} pts short)
                  </span>
                )}
              </p>
            </div>
            <div className={`flex items-center gap-1.5 shrink-0 px-3 py-2 rounded-xl font-bold text-sm ${
              passed ? "bg-green-600 text-white" : "bg-red-600 text-white"
            }`}>
              {passed
                ? <><CheckCircle2 size={15} /> Eligible</>
                : <><XCircle size={15} /> Below Cut-off</>}
            </div>
          </div>
        </motion.div>
      )}

      {/* Courses you qualify for */}
      {eligibleCourses.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={16} className="text-green-600" />
            <h3 className="text-sm font-bold text-gray-800">Courses You Qualify For</h3>
            <Badge className="ml-auto bg-green-100 text-green-700 border-0 text-xs">
              {eligibleCourses.length} courses
            </Badge>
          </div>
          <div className="space-y-2">
            {eligibleCourses.map((c, idx) => (
              <motion.div key={c.name}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.07 }}
                className="flex items-center justify-between px-3 py-2.5 bg-green-50 rounded-xl border border-green-100">
                <span className="text-sm font-medium text-gray-700">{c.name}</span>
                <span className="text-xs font-bold text-green-700 shrink-0 ml-2">
                  {c.cutoff[indigene]}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Courses just out of reach */}
      {nearMissCourses.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-[#C8A84B]" />
            <h3 className="text-sm font-bold text-gray-800">Almost There • Next 5 Courses</h3>
          </div>
          <div className="space-y-2">
            {nearMissCourses.map((c, idx) => (
              <motion.div key={c.name}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.07 }}
                className="flex items-center justify-between px-3 py-2.5 bg-amber-50 rounded-xl border border-amber-100">
                <span className="text-sm font-medium text-gray-700">{c.name}</span>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-xs text-red-500 font-semibold">
                    +{(c.cutoff[indigene] - aggregate).toFixed(1)} needed
                  </span>
                  <span className="text-xs font-bold text-amber-700">{c.cutoff[indigene]}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-xs text-amber-800 leading-relaxed">
          <span className="font-bold">Important:</span> Meeting the cut-off does{" "}
          <span className="font-bold">NOT</span> guarantee admission if your subject
          combinations are incorrect. Verify with the department.
        </p>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={handleCopy}
          className="gap-2 border-gray-200 text-gray-600 hover:bg-gray-50 py-6 rounded-xl font-semibold text-sm">
          <Copy size={15} /> Copy Result
        </Button>
        <Button onClick={handleShare}
          className="gap-2 bg-green-600 hover:bg-green-700 text-white py-6 rounded-xl font-semibold text-sm">
          <Share2 size={15} /> Share
        </Button>
      </div>

      {/* WhatsApp group */}
      <button onClick={handleGroup}
        className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] transition-colors text-white font-bold py-5 rounded-2xl shadow-md text-sm">
        <MessageCircle size={19} />
        Join LAUTECH Aspirants WhatsApp Group
      </button>

      {/* Reset */}
      <button onClick={onReset}
        className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors py-3">
        <RotateCcw size={14} /> Start Over
      </button>
    </motion.div>
  );
}
