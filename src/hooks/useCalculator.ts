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

  const resetAll = () => {
    setJambScore("");
    setGrades(["", "", "", "", ""]);
  };

  // 80/20 formula (official LAUTECH — Additional Notes point 3)
  // JAMB: (score / 400) * 80
  const jambPoints = (() => {
    const score = parseFloat(jambScore);
    if (!score || score < 0 || score > 400) return 0;
    return (score / 400) * 80;
  })();

  // OLevel: (sum / 30) * 20
  const olevelSum = grades.reduce((acc, g) => acc + (gradePoints[g] ?? 0), 0);
  const olevelPoints = (olevelSum / 30) * 20;

  const aggregate = jambPoints + olevelPoints;

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
  };
}
