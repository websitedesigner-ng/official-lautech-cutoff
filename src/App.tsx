import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight, ChevronLeft, GraduationCap,
  BookOpen, Users, ClipboardList, FileText,
} from "lucide-react";
import {
  courses, gradeOptions, fieldLabels, fieldSubjects,
  MIN_JAMB, type Field,
} from "@/data/courses";
import { useCalculator } from "@/hooks/useCalculator";
import { Loader } from "@/components/Loader";
import { ResultCard } from "@/components/ResultCard";

const STEPS = [
  { label: "Field & Status", icon: <Users size={14} /> },
  { label: "Course",         icon: <BookOpen size={14} /> },
  { label: "JAMB Score",     icon: <ClipboardList size={14} /> },
  { label: "O'Level",        icon: <FileText size={14} /> },
];

export default function App() {
  const [step, setStep]                     = useState(0);
  const [field, setField]                   = useState<Field | "">("");
  const [indigene, setIndigene]             = useState<"indigene" | "nonIndigene" | "">("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [isCalculating, setIsCalculating]   = useState(false);
  const [showResult, setShowResult]         = useState(false);

  const calc = useCalculator();

  const filteredCourses = field ? courses.filter((c) => c.field === field) : [];
  const courseObj       = courses.find((c) => c.name === selectedCourse) ?? null;
  const subjects        = field
    ? fieldSubjects[field as Field]
    : ["Subject 1", "Subject 2", "Subject 3", "Subject 4", "Subject 5"];

  const jambVal = parseFloat(calc.jambScore);
  const jambValid = !isNaN(jambVal) && jambVal >= MIN_JAMB && jambVal <= 400;

  const canProceed = [
    field !== "" && indigene !== "",
    selectedCourse !== "",
    jambValid,
    calc.grades.every((g) => g !== ""),
    true,
  ][step];

  const handleNext = () => {
    if (step === 3) {
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setShowResult(true);
        setStep(4);
      }, 2800);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step === 4) setShowResult(false);
    setStep((s) => Math.max(0, s - 1));
  };

  const handleReset = () => {
    setStep(0); setField(""); setIndigene("");
    setSelectedCourse(""); setShowResult(false);
    calc.resetAll();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <img src="/lautech-logo.png" alt="LAUTECH" className="h-11 w-11 object-contain" />
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold text-gray-900 leading-tight truncate">
              LAUTECH Cut-off Calculator
            </h1>
            <p className="text-xs text-gray-400">2025/2026 Admission</p>
          </div>
          <Badge className="bg-[#CC1B1B]/10 text-[#CC1B1B] border-0 text-xs font-semibold shrink-0">
            2025/2026
          </Badge>
        </div>
      </header>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 pt-5 pb-4 space-y-4">

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-2">
            <span className="text-amber-500 shrink-0 mt-0.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
              </svg>
            </span>
            <p className="text-xs text-amber-800 leading-relaxed">
              <span className="font-bold">PROTECT YOURSELF:</span> LAUTECH admission cannot be
              bought. Do not give money to anyone promising you admission.
            </p>
          </div>

          {/* Step progress */}
          {step < 4 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400 font-medium">
                <span>Step {step + 1} of 4</span>
                <span>{STEPS[step].label}</span>
              </div>
              <div className="flex gap-1.5">
                {[0,1,2,3].map((i) => (
                  <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-500"
                    style={{ backgroundColor: i <= step ? "#CC1B1B" : "#e5e7eb" }} />
                ))}
              </div>
            </div>
          )}

          {/* ── Animated content ── */}
          <AnimatePresence mode="wait">
            {isCalculating ? (
              <motion.div key="loader"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <Loader />
              </motion.div>
            ) : (
              <motion.div key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28, ease: "easeOut" }}>

                {/* STEP 0 */}
                {step === 0 && (
                  <div className="space-y-4">
                    <StepCard icon={<GraduationCap size={18} />} title="Field of Study"
                      subtitle="Select the category that matches your course">
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {(["science","commercial","art"] as Field[]).map((f) => (
                          <button key={f}
                            onClick={() => { setField(f); setSelectedCourse(""); calc.resetAll(); }}
                            className={`py-3.5 px-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                              field === f
                                ? "border-[#CC1B1B] bg-[#CC1B1B] text-white shadow-md"
                                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                            }`}>
                            {fieldLabels[f]}
                          </button>
                        ))}
                      </div>
                    </StepCard>

                    <StepCard icon={<Users size={18} />} title="Indigene Status"
                      subtitle="Are you an Oyo State indigene?">
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {[
                          { value: "indigene",    label: "Oyo Indigene" },
                          { value: "nonIndigene", label: "Non-Indigene" },
                        ].map((opt) => (
                          <button key={opt.value}
                            onClick={() => setIndigene(opt.value as "indigene"|"nonIndigene")}
                            className={`py-3.5 px-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                              indigene === opt.value
                                ? "border-[#CC1B1B] bg-[#CC1B1B] text-white shadow-md"
                                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                            }`}>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </StepCard>
                  </div>
                )}

                {/* STEP 1 */}
                {step === 1 && (
                  <StepCard icon={<BookOpen size={18} />} title="Select Your Course"
                    subtitle={`${filteredCourses.length} courses in ${fieldLabels[field as Field]}`}>
                    <div className="mt-4 max-h-[52vh] overflow-y-auto space-y-1.5 pr-0.5">
                      {filteredCourses.map((c) => (
                        <button key={c.name} onClick={() => setSelectedCourse(c.name)}
                          className={`w-full text-left px-4 py-3.5 rounded-xl text-sm border-2 transition-all duration-200 ${
                            selectedCourse === c.name
                              ? "border-[#CC1B1B] bg-[#CC1B1B]/5 text-[#CC1B1B] font-semibold"
                              : "border-gray-100 bg-white text-gray-600 hover:border-gray-200 font-medium"
                          }`}>
                          <div className="flex justify-between items-center gap-2">
                            <span>{c.name}</span>
                            <span className={`text-xs font-bold shrink-0 px-2 py-0.5 rounded-full ${
                              selectedCourse === c.name
                                ? "bg-[#CC1B1B]/10 text-[#CC1B1B]"
                                : "bg-gray-100 text-gray-400"
                            }`}>
                              {c.utmeCutoff}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </StepCard>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <StepCard icon={<ClipboardList size={18} />} title="JAMB Score"
                    subtitle={`Minimum score for LAUTECH screening is ${MIN_JAMB}`}>
                    <div className="mt-6 space-y-3">
                      <input
                        type="number" min={MIN_JAMB} max={400}
                        value={calc.jambScore}
                        onChange={(e) => calc.setJambScore(e.target.value)}
                        placeholder="e.g. 220"
                        className="w-full text-center text-5xl font-bold text-gray-800 border-2 border-gray-200 rounded-2xl py-7 focus:outline-none focus:border-[#CC1B1B] transition-colors bg-white placeholder:text-gray-200"
                      />
                      {calc.jambScore && !jambValid && (
                        <p className="text-center text-xs text-red-500 font-medium">
                          {jambVal < MIN_JAMB
                            ? `Score must be at least ${MIN_JAMB} to qualify for LAUTECH screening`
                            : "Score cannot exceed 400"}
                        </p>
                      )}
                      {!calc.jambScore && (
                        <p className="text-center text-xs text-gray-400">
                          Enter a score between {MIN_JAMB} and 400
                        </p>
                      )}
                    </div>
                  </StepCard>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <StepCard icon={<FileText size={18} />} title="O'Level Grades"
                    subtitle="Select your credit grade for each subject (C6 minimum)">
                    <div className="mt-4 space-y-4">
                      {subjects.map((subject, i) => (
                        <div key={i}>
                          <p className="text-xs font-semibold text-gray-500 mb-2">{subject}</p>
                          <div className="grid grid-cols-6 gap-1.5">
                            {gradeOptions.map((grade) => (
                              <button key={grade}
                                onClick={() => calc.setGrade(i, grade)}
                                className={`py-3 rounded-xl text-xs font-bold border-2 transition-all duration-150 ${
                                  calc.grades[i] === grade
                                    ? "bg-[#CC1B1B] border-[#CC1B1B] text-white shadow-sm"
                                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                                }`}>
                                {grade}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </StepCard>
                )}

                {/* STEP 4 */}
                {step === 4 && showResult && (
                  <ResultCard
                    aggregate={calc.aggregate}
                    jambPoints={calc.jambPoints}
                    olevelPoints={calc.olevelPoints}
                    jambScore={calc.jambScore}
                    olevelSum={calc.olevelSum}
                    course={courseObj}
                    field={field as Field}
                    allCourses={courses}
                    onReset={handleReset}
                  />
                )}

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Sticky bottom — nav + BJ credit in one seamless block ── */}
      {step < 4 && !isCalculating && (
        <div className="sticky bottom-0 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="max-w-lg mx-auto px-4 pt-4 pb-2 flex gap-3">
            {step > 0 && (
              <Button variant="outline" onClick={handleBack}
                className="gap-2 border-gray-200 text-gray-500 py-6 px-5 rounded-xl text-sm font-semibold">
                <ChevronLeft size={17} /> Back
              </Button>
            )}
            <Button onClick={handleNext} disabled={!canProceed}
              className="flex-1 gap-2 bg-[#CC1B1B] hover:bg-[#b01717] text-white font-semibold py-6 rounded-xl text-sm shadow-sm disabled:opacity-40 transition-all">
              {step === 3 ? "Calculate My Score" : "Continue"}
              <ChevronRight size={17} />
            </Button>
          </div>
          <div className="max-w-lg mx-auto px-4 pb-3 text-center mt-4">
            <p className="text-[11px] text-gray-400">
              <a href="tel:+2349063901272"
                className="font-semibold text-[#CC1B1B] hover:underline">
                BJ OF LAUTECH
              </a>
              {" · "}
              <a href="tel:+2349063901272"
                className="text-gray-400 hover:text-[#CC1B1B] transition-colors">
                +234 906 390 1272
              </a>
            </p>
          </div>
        </div>
      )}

      {/* On result page, BJ credit lives inside the scrollable content — handled in ResultCard */}
    </div>
  );
}

function StepCard({ icon, title, subtitle, children }: {
  icon: React.ReactNode; title: string; subtitle: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start gap-3 mb-1">
        <span className="text-[#CC1B1B] mt-0.5">{icon}</span>
        <div>
          <h2 className="text-base font-bold text-gray-800">{title}</h2>
          <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
