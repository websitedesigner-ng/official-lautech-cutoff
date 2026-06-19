import { useState } from "react";
import { motion } from "framer-motion";
import { ScoreRing } from "./ScoreRing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Share2,
  Copy,
  RotateCcw,
  MessageCircle,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Info,
  GraduationCap,
  BarChart3,
  ChevronDown,
  Banknote,
} from "lucide-react";
import type { Course, Field } from "@/data/courses";

// ── School fees by faculty (2025/2026 session) ──────────────────────────────
type FeeEntry = { indigene: number; nonIndigene: number };

const FACULTY_FEES: Record<string, FeeEntry> = {
  "Faculty of Agricultural Sciences":               { indigene: 372_400, nonIndigene: 459_900 },
  "Faculty of Renewable and Natural Resources":     { indigene: 372_400, nonIndigene: 459_900 },
  "Faculty of Arts and Social Sciences":            { indigene: 316_700, nonIndigene: 404_200 },
  "Faculty of Engineering Technology":              { indigene: 372_400, nonIndigene: 459_900 },
  "Faculty of Computing and Informatics Sciences":  { indigene: 330_700, nonIndigene: 418_200 },
  "Faculty of Environmental Sciences":              { indigene: 316_700, nonIndigene: 404_200 },
  "Faculty of Pure and Applied Sciences":           { indigene: 344_700, nonIndigene: 432_200 },
  "Faculty of Food and Consumer Sciences":          { indigene: 344_700, nonIndigene: 432_200 },
  "Faculty of Management Sciences":                 { indigene: 316_700, nonIndigene: 404_200 },
  "College of Health Sciences – Medicine & Surgery":{ indigene: 694_700, nonIndigene: 782_200 },
  "College of Health Sciences – Nursing":           { indigene: 642_200, nonIndigene: 729_700 },
  "College of Health Sciences – MLS":               { indigene: 642_200, nonIndigene: 729_700 },
  "College of Health Sciences – Others":            { indigene: 519_800, nonIndigene: 607_200 },
};

const fmt = (n: number) => "₦" + n.toLocaleString("en-NG");

interface ResultCardProps {
  aggregate: number;
  jambPoints: number;
  olevelPoints: number;
  jambScore: string;
  olevelSum: number;
  course: Course | null;
  field: Field;
  indigene: "indigene" | "nonIndigene";
  allCourses: Course[];
  onReset: () => void;
}

const WA_GROUP = "https://chat.whatsapp.com/LRQvKF8yzfz2flbXpDP4tS?mode=gi_t";

export function ResultCard({
  aggregate,
  jambPoints,
  olevelPoints,
  jambScore,
  olevelSum,
  course,
  field,
  indigene,
  allCourses,
  onReset,
}: ResultCardProps) {
  const isIndigene = indigene === "indigene";
  const [showMeritComparison, setShowMeritComparison] = useState(false);

  // ── School fee lookup ────────────────────────────────────────────────────
  const facultyKey = course ? (course as any).faculty as string | undefined : undefined;
  const feeEntry = facultyKey ? FACULTY_FEES[facultyKey] ?? null : null;
  const expectedFee = feeEntry
    ? isIndigene ? feeEntry.indigene : feeEntry.nonIndigene
    : null;

  // Use catchment cutoff for Oyo indigenes, merit for others (2025/2026 data)
  const getRelevantCutoff = (c: Course) =>
    isIndigene ? c.catchmentCutoff : c.meritCutoff;

  const cutoff = course ? getRelevantCutoff(course) : null;
  const jambVal = parseFloat(jambScore);

  // Primary eligibility is JAMB score vs course UTME cut-off only.
  // 2026/2027 merit/catchment cut-offs are not released yet, so aggregate
  // is calculated and shown, but eligibility no longer depends on it by default.
  const jambOk = course ? jambVal >= course.utmeCutoff : false;
  const aggregateOk = cutoff !== null ? aggregate >= cutoff : false;
  const fullyEligible = jambOk;

  // Filter same field only
  const sameField = allCourses.filter((c) => c.field === field);

  const eligibleCourses = sameField
    .filter((c) => jambVal >= c.utmeCutoff)
    .sort((a, b) => b.utmeCutoff - a.utmeCutoff)
    .slice(0, 5);

  const nearMissCourses = sameField
    .filter((c) => jambVal < c.utmeCutoff)
    .sort((a, b) => a.utmeCutoff - b.utmeCutoff)
    .slice(0, 5);

  const statusLabel = isIndigene
    ? "Catchment (Oyo Indigene)"
    : "Merit (Non-Indigene)";

  const resultText =
    `🎓 My LAUTECH Screening Score\n\n` +
    `Aggregate: ${aggregate.toFixed(2)}%\n` +
    `JAMB (${jambScore}): ${jambPoints.toFixed(2)} pts\n` +
    `O'Level (${olevelSum}/30): ${olevelPoints.toFixed(2)} pts\n` +
    (course
      ? `\nCourse: ${course.name}\nJAMB Cut-off: ${course.utmeCutoff}\nStatus: ${fullyEligible ? "✅ ELIGIBLE" : "❌ NOT ELIGIBLE"}\n`
      : "") +
    `\nCalculate yours 👇\nhttps://lautech.bolu.fun\n\n` +
    `Join LAUTECH Aspirants Group:\n${WA_GROUP}\n\n` +
    `— BJ OF LAUTECH · +234 906 390 1272`;

  const handleCopy = () => navigator.clipboard.writeText(resultText);
  const handleShare = () =>
    window.open(
      `https://wa.me/?text=${encodeURIComponent(resultText)}`,
      "_blank",
    );
  const handleGroup = () => window.open(WA_GROUP, "_blank");

  const PHONE = "2349063901272";

  const postUtmeMessage = encodeURIComponent(
    `Hello BJ OF LAUTECH 👋

I want to register for the LAUTECH Post UTME Screening.

My Details:
• JAMB Score: ${jambScore}
• Aggregate Score: ${aggregate.toFixed(2)}%
${course ? `• Intended Course: ${course.name}` : ""}

Please assist me with the registration process.`,
  );

  const directEntryMessage = encodeURIComponent(
    `Hello BJ OF LAUTECH 👋

I want to register for the LAUTECH Direct Entry Admission.

My Details:
• JAMB Score: ${jambScore}
• Aggregate Score: ${aggregate.toFixed(2)}%
${course ? `• Intended Course: ${course.name}` : ""}

Please assist me with the registration process.`,
  );

  const handlePostUtmeRegistration = () =>
    window.open(`https://wa.me/${PHONE}?text=${postUtmeMessage}`, "_blank");

  const handleDirectEntryRegistration = () =>
    window.open(`https://wa.me/${PHONE}?text=${directEntryMessage}`, "_blank");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="space-y-5"
    >
      {/* Score ring */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
          Your Screening Aggregate
        </p>
        <ScoreRing
          score={aggregate}
          jambPoints={jambPoints}
          olevelPoints={olevelPoints}
        />
        <div className="mt-5 bg-gray-50 rounded-xl p-3 flex gap-2">
          <Info size={13} className="text-gray-400 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-400 leading-relaxed">
            Formula:{" "}
            <span className="font-mono font-semibold text-gray-600">
              ({jambScore} ÷ 400 × 80) + ({olevelSum} ÷ 30 × 20)
            </span>{" "}
            ={" "}
            <span className="font-bold text-[#CC1B1B]">
              {aggregate.toFixed(2)}%
            </span>
          </p>
        </div>
      </div>

      {/* Chosen course eligibility */}
      {course && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className={`rounded-2xl border-2 p-5 ${fullyEligible ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                Your Chosen Course
              </p>
              <p className="text-sm font-bold text-gray-800 leading-snug">
                {course.name}
              </p>

              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-500">
                  JAMB Cut-off:{" "}
                  <span className="font-bold text-gray-700">
                    {course.utmeCutoff}
                  </span>
                  {" · "}Yours:{" "}
                  <span
                    className={`font-bold ${jambOk ? "text-green-700" : "text-red-600"}`}
                  >
                    {jambVal}
                  </span>{" "}
                  {jambOk ? (
                    <span className="text-green-600 text-xs">✓</span>
                  ) : (
                    <span className="text-red-500 text-xs">
                      ✗ Need {(course.utmeCutoff - jambVal).toFixed(0)} more
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div
              className={`flex items-center gap-1.5 shrink-0 px-3 py-2 rounded-xl font-bold text-xs ${
                fullyEligible
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {fullyEligible ? (
                <>
                  <CheckCircle2 size={13} /> Eligible
                </>
              ) : (
                <>
                  <XCircle size={13} /> Not Eligible
                </>
              )}
            </div>
          </div>

          {/* UTME subjects reminder */}
          <div className="mt-3 pt-3 border-t border-gray-200/60">
            <p className="text-xs text-gray-400 leading-relaxed">
              <span className="font-semibold text-gray-500">
                UTME Subjects:
              </span>{" "}
              {course.utmeSubjects}
            </p>
          </div>

          {/* Toggle: compare with 2025/2026 merit cut-off */}
          <button
            onClick={() => setShowMeritComparison((v) => !v)}
            className="w-full mt-3 pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs font-semibold text-gray-500 hover:text-gray-700 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <BarChart3 size={13} />
              Compare with 2025/2026 Cut-off
            </span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${showMeritComparison ? "rotate-180" : ""}`}
            />
          </button>

          {showMeritComparison && cutoff !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-3 pt-3 border-t border-gray-200/60 overflow-hidden"
            >
              <p className="text-[11px] text-gray-400 mb-2">
                Based on{" "}
                <span className="font-semibold text-gray-500">
                  2025/2026
                </span>{" "}
                admission session data — 2026/2027 figures are not yet
                released.
              </p>
              <p className="text-xs text-gray-500">
                Aggregate Cut-off{" "}
                <span className="text-gray-400">({statusLabel})</span>:{" "}
                <span className="font-bold text-gray-700">{cutoff}%</span>
                {" · "}Yours:{" "}
                <span
                  className={`font-bold ${aggregateOk ? "text-green-700" : "text-red-600"}`}
                >
                  {aggregate.toFixed(2)}%
                </span>{" "}
                {aggregateOk ? (
                  <span className="text-green-600 text-xs">✓</span>
                ) : (
                  <span className="text-red-500 text-xs">
                    ✗ Need {(cutoff - aggregate).toFixed(2)} more
                  </span>
                )}
              </p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Courses you qualify for */}
      {eligibleCourses.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={15} className="text-green-600" />
            <h3 className="text-sm font-bold text-gray-800">
              Courses You Qualify For
            </h3>
            <Badge className="ml-auto bg-green-100 text-green-700 border-0 text-xs font-bold">
              {eligibleCourses.length}
            </Badge>
          </div>
          <div className="space-y-2">
            {eligibleCourses.map((c, idx) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.07 }}
                className="flex items-center justify-between px-3 py-3 bg-green-50 rounded-xl border border-green-100"
              >
                <p className="text-sm font-semibold text-gray-700 truncate flex-1">
                  {c.name}
                </p>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className="text-xs text-gray-400">JAMB cutoff</span>
                  <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                    {c.utmeCutoff}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Near-miss courses */}
      {nearMissCourses.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={15} className="text-[#C8A84B]" />
            <h3 className="text-sm font-bold text-gray-800">
              Almost There — Next Courses
            </h3>
          </div>
          <div className="space-y-2">
            {nearMissCourses.map((c, idx) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.07 }}
                className="px-3 py-3 bg-amber-50 rounded-xl border border-amber-100"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-gray-700 truncate flex-1">
                    {c.name}
                  </p>
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">
                    {c.utmeCutoff}
                  </span>
                </div>
                <p className="text-xs text-red-500 font-medium mt-1">
                  JAMB too low — need {c.utmeCutoff} (yours: {jambVal})
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-xs text-amber-800 leading-relaxed">
          <span className="font-bold">Note:</span> Meeting cut-offs does{" "}
          <span className="font-bold">NOT</span> guarantee admission — O'Level
          subject combinations must also match. Verify on JAMB CAPS.
        </p>
      </div>

      {/* Expected school fee */}
      {course && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Banknote size={15} className="text-[#C8A84B]" />
            <h3 className="text-sm font-bold text-gray-800">
              Expected School Fee
            </h3>
            <span className="ml-auto text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              2025/2026
            </span>
          </div>

          {expectedFee !== null ? (
            <>
              <div className="flex items-center justify-between bg-[#FDF3DC] border border-[#C8A84B]/30 rounded-xl px-4 py-4">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">
                    {isIndigene ? "Oyo Indigene" : "Non-Indigene"} · {facultyKey}
                  </p>
                  <p className="text-2xl font-black text-gray-800">
                    {fmt(expectedFee)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#C8A84B]/15 flex items-center justify-center shrink-0">
                  <Banknote size={22} className="text-[#C8A84B]" />
                </div>
              </div>

              {/* Show both for comparison */}
              {feeEntry && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className={`rounded-xl px-3 py-2.5 border ${isIndigene ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-100"}`}>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Indigene</p>
                    <p className={`text-sm font-bold ${isIndigene ? "text-green-700" : "text-gray-500"}`}>
                      {fmt(feeEntry.indigene)}
                    </p>
                  </div>
                  <div className={`rounded-xl px-3 py-2.5 border ${!isIndigene ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-100"}`}>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Non-Indigene</p>
                    <p className={`text-sm font-bold ${!isIndigene ? "text-[#CC1B1B]" : "text-gray-500"}`}>
                      {fmt(feeEntry.nonIndigene)}
                    </p>
                  </div>
                </div>
              )}

              <p className="text-[10px] text-gray-400 mt-3 text-center leading-relaxed">
                Fees are subject to change. Confirm with LAUTECH Bursary before payment.
              </p>
            </>
          ) : (
            <div className="bg-gray-50 rounded-xl px-4 py-4 text-center">
              <p className="text-xs text-gray-400">
                Fee data not available for this course yet.
              </p>
              <p className="text-[10px] text-gray-300 mt-1">
                Contact BJ OF LAUTECH for accurate figures.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={handleCopy}
          className="gap-2 border-gray-200 text-gray-600 hover:bg-gray-50 py-6 rounded-xl font-semibold text-sm"
        >
          <Copy size={15} /> Copy Result
        </Button>
        <Button
          onClick={handleShare}
          className="gap-2 bg-green-600 hover:bg-green-700 text-white py-6 rounded-xl font-semibold text-sm"
        >
          <Share2 size={15} /> Share
        </Button>
      </div>

      {/* Registration links */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap size={15} className="text-[#CC1B1B]" />
          <h3 className="text-sm font-bold text-gray-800">
            Register for Screening
          </h3>
        </div>
        <div className="space-y-2.5">
          <button
            onClick={handlePostUtmeRegistration}
            className="w-full flex items-center justify-between gap-3 bg-[#FDF3DC] hover:bg-[#fbe9bf] transition-colors border border-[#C8A84B]/30 rounded-xl px-4 py-3.5"
          >
            <div className="text-left">
              <p className="text-sm font-bold text-gray-800">
                Post UTME Screening
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Register via WhatsApp
              </p>
            </div>
            <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-[#C8A84B] text-white">
              <MessageCircle size={16} />
            </div>
          </button>

          <button
            onClick={handleDirectEntryRegistration}
            className="w-full flex items-center justify-between gap-3 bg-red-50 hover:bg-red-100 transition-colors border border-[#CC1B1B]/20 rounded-xl px-4 py-3.5"
          >
            <div className="text-left">
              <p className="text-sm font-bold text-gray-800">
                Direct Entry Admission
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Register via WhatsApp
              </p>
            </div>
            <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-[#CC1B1B] text-white">
              <MessageCircle size={16} />
            </div>
          </button>
        </div>
      </div>

      {/* WhatsApp group */}
      <button
        onClick={handleGroup}
        className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] transition-colors text-white font-bold py-5 rounded-2xl shadow-md text-sm"
      >
        <MessageCircle size={19} />
        Join LAUTECH Aspirants WhatsApp Group
      </button>

      {/* Reset */}
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors py-3"
      >
        <RotateCcw size={14} /> Start Over
      </button>

      

      {/* BJ Credit */}
      <div className="text-center pb-2 pt-1 space-y-0.5">
        <p className="text-[11px] text-gray-400">
          <a
            href="tel:+2349063901272"
            className="font-semibold text-[#CC1B1B] hover:underline tracking-wide"
          >
            BJ OF LAUTECH
          </a>
          {" · "}
          <a
            href="tel:+2349063901272"
            className="text-gray-400 hover:text-[#CC1B1B] transition-colors"
          >
            +234 906 390 1272
          </a>
        </p>
        <p className="text-[10px] text-gray-300">
          Ladoke Akintola University of Technology · Excellence · Integrity ·
          Service
        </p>
      </div>
    </motion.div>
  );
}