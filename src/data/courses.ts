export type Field = "science" | "commercial" | "art";

export interface Course {
  name: string;
  field: Field;
  cutoff: {
    indigene: number;
    nonIndigene: number;
  };
}

export const courses: Course[] = [
  // SCIENCE
  { name: "Medicine & Surgery", field: "science", cutoff: { indigene: 70, nonIndigene: 75 } },
  { name: "Pharmacy", field: "science", cutoff: { indigene: 65, nonIndigene: 70 } },
  { name: "Nursing Science", field: "science", cutoff: { indigene: 60, nonIndigene: 65 } },
  { name: "Medical Laboratory Science", field: "science", cutoff: { indigene: 60, nonIndigene: 65 } },
  { name: "Physiotherapy", field: "science", cutoff: { indigene: 60, nonIndigene: 65 } },
  { name: "Computer Science", field: "science", cutoff: { indigene: 55, nonIndigene: 60 } },
  { name: "Computer Engineering", field: "science", cutoff: { indigene: 55, nonIndigene: 60 } },
  { name: "Electrical & Electronics Engineering", field: "science", cutoff: { indigene: 55, nonIndigene: 60 } },
  { name: "Mechanical Engineering", field: "science", cutoff: { indigene: 55, nonIndigene: 60 } },
  { name: "Civil Engineering", field: "science", cutoff: { indigene: 55, nonIndigene: 60 } },
  { name: "Chemical Engineering", field: "science", cutoff: { indigene: 55, nonIndigene: 60 } },
  { name: "Petroleum Engineering", field: "science", cutoff: { indigene: 55, nonIndigene: 60 } },
  { name: "Architecture", field: "science", cutoff: { indigene: 55, nonIndigene: 60 } },
  { name: "Information Technology", field: "science", cutoff: { indigene: 55, nonIndigene: 60 } },
  { name: "Software Engineering", field: "science", cutoff: { indigene: 55, nonIndigene: 60 } },
  { name: "Cybersecurity", field: "science", cutoff: { indigene: 55, nonIndigene: 60 } },
  { name: "Biochemistry", field: "science", cutoff: { indigene: 55, nonIndigene: 60 } },
  { name: "Agricultural Engineering", field: "science", cutoff: { indigene: 50, nonIndigene: 55 } },
  { name: "Food Science & Engineering", field: "science", cutoff: { indigene: 50, nonIndigene: 55 } },
  { name: "Microbiology", field: "science", cutoff: { indigene: 50, nonIndigene: 55 } },
  { name: "Nutrition & Dietetics", field: "science", cutoff: { indigene: 50, nonIndigene: 55 } },
  { name: "Materials & Metallurgical Engineering", field: "science", cutoff: { indigene: 50, nonIndigene: 55 } },
  { name: "Industrial & Production Engineering", field: "science", cutoff: { indigene: 50, nonIndigene: 55 } },
  { name: "Urban & Regional Planning", field: "science", cutoff: { indigene: 50, nonIndigene: 55 } },
  { name: "Building Technology", field: "science", cutoff: { indigene: 50, nonIndigene: 55 } },
  { name: "Quantity Surveying", field: "science", cutoff: { indigene: 50, nonIndigene: 55 } },
  { name: "Estate Management", field: "science", cutoff: { indigene: 50, nonIndigene: 55 } },
  { name: "Surveying & Geoinformatics", field: "science", cutoff: { indigene: 50, nonIndigene: 55 } },
  { name: "Biology", field: "science", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "Chemistry", field: "science", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "Physics", field: "science", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "Mathematics", field: "science", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "Statistics", field: "science", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "Crop Science & Technology", field: "science", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "Animal Production & Health", field: "science", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "Soil Science & Land Management", field: "science", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "Forestry & Wood Technology", field: "science", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "Environmental Management", field: "science", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "Pure & Applied Biology", field: "science", cutoff: { indigene: 45, nonIndigene: 50 } },

  // COMMERCIAL
  { name: "Accounting", field: "commercial", cutoff: { indigene: 50, nonIndigene: 55 } },
  { name: "Banking & Finance", field: "commercial", cutoff: { indigene: 50, nonIndigene: 55 } },
  { name: "Business Administration", field: "commercial", cutoff: { indigene: 50, nonIndigene: 55 } },
  { name: "Economics", field: "commercial", cutoff: { indigene: 50, nonIndigene: 55 } },
  { name: "Marketing", field: "commercial", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "Public Administration", field: "commercial", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "Industrial Relations & Personnel Management", field: "commercial", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "Transport Management", field: "commercial", cutoff: { indigene: 45, nonIndigene: 50 } },

  // ART
  { name: "Law", field: "art", cutoff: { indigene: 60, nonIndigene: 65 } },
  { name: "Mass Communication", field: "art", cutoff: { indigene: 50, nonIndigene: 55 } },
  { name: "Psychology", field: "art", cutoff: { indigene: 50, nonIndigene: 55 } },
  { name: "English Language", field: "art", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "History & International Studies", field: "art", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "Philosophy", field: "art", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "Religious Studies", field: "art", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "Linguistics & African Languages", field: "art", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "Political Science", field: "art", cutoff: { indigene: 45, nonIndigene: 50 } },
  { name: "Sociology", field: "art", cutoff: { indigene: 45, nonIndigene: 50 } },
];

export const gradePoints: Record<string, number> = {
  A1: 6, B2: 5, B3: 4, C4: 3, C5: 2, C6: 1, D7: 0, E8: 0, F9: 0,
};

export const gradeOptions = ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"];

export const fieldLabels: Record<Field, string> = {
  science: "Science",
  commercial: "Commercial",
  art: "Art",
};

// Subject names per field (matches what the original shows)
export const fieldSubjects: Record<Field, string[]> = {
  science: [
    "English Language (Compulsory)",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology / Agric Science",
  ],
  commercial: [
    "English Language (Compulsory)",
    "Mathematics",
    "Economics",
    "Accounting / Commerce",
    "Government / Geography",
  ],
  art: [
    "English Language (Compulsory)",
    "Literature-in-English",
    "Government / History",
    "CRK / IRK / Yoruba",
    "Mathematics / 5th Subject",
  ],
};
