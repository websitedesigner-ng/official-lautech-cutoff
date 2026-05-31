import { useState } from "react";
import { gradePoints } from "@/data/courses";

export function useCalculator() {
  const [jambScore, setJambScore] = useState<string>("");
  const [grades, setGrades] = useState<string[]>(["", "", "", "", ""]);

  const setGrade = (index: number, value: string) => {
    const updated = [...grades];
    updated[index] = value;
    setGrades(updated);
  };

  // JAMB: (score / 400) * 75
  const jambPoints = (() => {
    const score = parseFloat(jambScore);
    if (!score || score < 0 || score > 400) return 0;
    return (score / 400) * 75;
  })();

  // OLevel: (sum of 5 grades / 30) * 25
  const olevelSum = grades.reduce((acc, g) => acc + (gradePoints[g] ?? 0), 0);
  const olevelPoints = (olevelSum / 30) * 25;

  const aggregate = jambPoints + olevelPoints;

  const isComplete =
    jambScore !== "" &&
    parseFloat(jambScore) >= 100 &&
    parseFloat(jambScore) <= 400 &&
    grades.every((g) => g !== "");

  const resetAll = () => {
    setJambScore("");
    setGrades(["", "", "", "", ""]);
  };

  return {
    jambScore,
    setJambScore,
    grades,
    setGrade,
    resetAll,
    jambPoints,
    olevelPoints,
    olevelSum,
    aggregate,
    isComplete,
  };
}
