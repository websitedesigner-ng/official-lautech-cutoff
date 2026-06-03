export type Field = "science" | "commercial" | "art";

export interface Course {
  name: string;
  field: Field;
  utmeCutoff: number;
  olevelSubjects: string[];   // exact subjects shown in grade picker
  olevelNote?: string;        // e.g. "ONE SITTING ONLY"
  utmeSubjects: string;
}

export const courses: Course[] = [
  // ── COMMERCIAL ──
  {
    name: "Accounting",
    field: "commercial",
    utmeCutoff: 200,
    olevelSubjects: ["English Language", "Mathematics", "Financial Accounting", "Economics / Commerce / Marketing", "Government / Geography"],
    utmeSubjects: "English, Mathematics, Financial Accounting + 1 from Geography/Commerce/Economics/Government",
  },
  {
    name: "Business Administration",
    field: "commercial",
    utmeCutoff: 180,
    olevelSubjects: ["English Language", "Mathematics", "Economics", "Accounting / Commerce / Marketing", "Government / Geography / Science"],
    utmeSubjects: "English, Mathematics, Economics + 1 from Geography/Accounting/Marketing/Commerce/Government",
  },
  {
    name: "Economics",
    field: "commercial",
    utmeCutoff: 180,
    olevelSubjects: ["English Language", "Mathematics", "Economics", "Government / Geography / Commerce", "Accounting / Marketing / Business Method"],
    utmeSubjects: "English, Mathematics, Economics + 1 from Geography/Accounting/Marketing/Commerce",
  },
  {
    name: "Estate Management",
    field: "commercial",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Economics", "Physics / Chemistry / Biology / Geography", "Technical Drawing / Fine Arts"],
    utmeSubjects: "English, Mathematics, Economics + 1 from Physics/Chemistry/Biology",
  },
  {
    name: "Hospitality and Tourism Management",
    field: "commercial",
    utmeCutoff: 180,
    olevelSubjects: ["English Language", "Mathematics", "Biology / Chemistry / Physics / Agric Science", "Economics / Geography / Home Economics", "Tourism / Food & Nutrition"],
    utmeSubjects: "English + 3 from Science or Social Science subjects",
  },
  {
    name: "Marketing",
    field: "commercial",
    utmeCutoff: 180,
    olevelSubjects: ["English Language", "Mathematics", "Economics", "Marketing / Commerce / Geography", "Government / Financial Accounting / Business Management"],
    utmeSubjects: "English, Mathematics, Economics + 1 from Geography/Commerce/Marketing/Government/Financial Accounting",
  },
  {
    name: "Transport Management",
    field: "commercial",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Physics / Chemistry / Biology / Agric Science", "Economics / Geography / Accounting", "Marketing / Commerce / Government"],
    utmeSubjects: "English, Mathematics + 2 from Physics/Chemistry/Biology/Agric/Economics/Geography/Accounting/Marketing/Commerce/Government",
  },

  // ── SCIENCE ──
  {
    name: "Agricultural Economics",
    field: "science",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry", "Physics / Economics / Geography", "Agricultural Science / Biology"],
    utmeSubjects: "English, Chemistry, Physics, Biology or Agric Science/Animal Husbandry",
  },
  {
    name: "Agricultural Engineering",
    field: "science",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry", "Physics", "Biology / Agric Science / Animal Husbandry / Geography / Technical Drawing"],
    utmeSubjects: "English, Physics, Mathematics, Chemistry",
  },
  {
    name: "Agricultural Extension & Rural Development",
    field: "science",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Physics / Economics / Geography", "Chemistry", "Biology / Agricultural Science"],
    utmeSubjects: "English, Physics, Chemistry, Biology or Agric Science",
  },
  {
    name: "Anatomy",
    field: "science",
    utmeCutoff: 180,
    olevelSubjects: ["English Language", "Mathematics", "Physics", "Chemistry", "Biology"],
    utmeSubjects: "English, Physics, Chemistry, Biology",
  },
  {
    name: "Animal Nutrition and Biotechnology",
    field: "science",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry", "Agricultural Science / Biology", "Physics / Geography / Economics"],
    utmeSubjects: "English, Chemistry, Physics, Biology or Agric Science",
  },
  {
    name: "Animal Production and Health",
    field: "science",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Physics", "Chemistry", "Agricultural Science / Biology / Animal Husbandry"],
    utmeSubjects: "English, Physics, Chemistry, Agric Science or Biology, Mathematics",
  },
  {
    name: "Architecture",
    field: "science",
    utmeCutoff: 220,
    olevelSubjects: ["English Language", "Mathematics", "Physics", "Chemistry / Biology / Geography / Economics", "Technical Drawing / Building Construction / Fine Art / Land Surveying"],
    utmeSubjects: "English, Physics, Mathematics + 1 from Chemistry/Biology/Technical Drawing/Fine Art/Geography",
  },
  {
    name: "Biochemistry",
    field: "science",
    utmeCutoff: 210,
    olevelSubjects: ["English Language", "Mathematics", "Physics", "Chemistry", "Biology"],
    utmeSubjects: "English, Physics, Chemistry, Biology",
  },
  {
    name: "Building",
    field: "science",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Physics", "Chemistry", "Technical Drawing / Building Construction / Biology / Geography / Economics / Fine Arts"],
    utmeSubjects: "English, Mathematics, Physics + 1 from Chemistry/Technical Drawing/Building Construction",
  },
  {
    name: "Chemical Engineering",
    field: "science",
    utmeCutoff: 180,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry", "Physics", "Biology / Agricultural Science / Technical Drawing"],
    utmeSubjects: "English, Mathematics, Physics, Chemistry",
  },
  {
    name: "Civil Engineering",
    field: "science",
    utmeCutoff: 220,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry", "Physics", "Biology / Agric Science / Technical Drawing / Further Mathematics"],
    utmeSubjects: "English, Physics, Mathematics, Chemistry",
  },
  {
    name: "Computer Engineering",
    field: "science",
    utmeCutoff: 200,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry", "Physics", "Biology / Agric Science / Computer Studies / Data Processing / Further Mathematics"],
    utmeSubjects: "English, Mathematics, Physics, Chemistry",
  },
  {
    name: "Computer Science",
    field: "science",
    utmeCutoff: 230,
    olevelSubjects: ["English Language", "Mathematics", "Physics", "Chemistry / Biology / Agric Science / Economics", "Geography / Computer Science"],
    utmeSubjects: "English, Mathematics, Physics + 1 from Chemistry/Biology/Economics/Computer Science/Geography",
  },
  {
    name: "Consumer and Home Economics",
    field: "science",
    utmeCutoff: 180,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry / Biology / Physics", "Economics / Agricultural Science / Geography", "Home Economics / Nutrition / Textiles / Catering"],
    utmeSubjects: "English, Chemistry, Biology, Agric Science, Mathematics or Physics",
  },
  {
    name: "Crop and Environmental Protection",
    field: "science",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry", "Physics", "Biology / Agricultural Science / Geography"],
    utmeSubjects: "English, Physics or Mathematics, Chemistry, Biology or Agric or Geography",
  },
  {
    name: "Crop Production and Soil Science",
    field: "science",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry", "Physics", "Agricultural Science / Biology"],
    utmeSubjects: "English, Chemistry, Physics, Biology or Agric Science",
  },
  {
    name: "Cyber Security Science",
    field: "science",
    utmeCutoff: 210,
    olevelSubjects: ["English Language", "Mathematics", "Physics", "Chemistry / Biology / Agric Science / Economics", "Geography / Computer Science"],
    utmeSubjects: "English, Mathematics, Physics + 1 from Chemistry/Biology/Agric/Economics/Geography",
  },
  {
    name: "Earth Science",
    field: "science",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Physics", "Chemistry", "Biology / Technical Drawing / Geography"],
    utmeSubjects: "English + 3 from Physics/Chemistry/Biology/Mathematics/Geography",
  },
  {
    name: "Electrical & Electronic Engineering",
    field: "science",
    utmeCutoff: 220,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry", "Physics", "Biology / Agric Science / Technical Drawing / Further Mathematics"],
    utmeSubjects: "English, Physics, Mathematics, Chemistry",
  },
  {
    name: "Fisheries and Aquaculture",
    field: "science",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry", "Physics", "Biology / Agricultural Sciences"],
    utmeSubjects: "English, Biology or Agric Science, Chemistry, Physics or Mathematics",
  },
  {
    name: "Food Engineering",
    field: "science",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry", "Physics", "Biology / Agricultural Science"],
    utmeSubjects: "English, Mathematics + 2 from Physics/Chemistry/Biology/Agric Science",
  },
  {
    name: "Food Science",
    field: "science",
    utmeCutoff: 200,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry", "Physics", "Biology / Agricultural Science"],
    utmeSubjects: "English, Physics, Chemistry, Biology or Agric Science",
  },
  {
    name: "Forest Resources Management",
    field: "science",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry", "Physics", "Biology / Agricultural Science"],
    utmeSubjects: "English, Biology or Agric Science, Chemistry, Physics or Mathematics",
  },
  {
    name: "Information System",
    field: "science",
    utmeCutoff: 200,
    olevelSubjects: ["English Language", "Mathematics", "Physics", "Chemistry / Biology / Agric Science / Economics", "Geography / Computer Studies"],
    utmeSubjects: "English, Mathematics, Physics + 1 from Chemistry/Biology/Agric/Economics/Geography/Computer Studies",
  },
  {
    name: "Mechanical Engineering",
    field: "science",
    utmeCutoff: 220,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry", "Physics", "Biology / Agricultural Science / Technical Drawing"],
    utmeSubjects: "English, Physics, Mathematics, Chemistry",
  },
  {
    name: "Medical Laboratory Science",
    field: "science",
    utmeCutoff: 240,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry", "Biology", "Physics"],
    olevelNote: "ONE SITTING ONLY",
    utmeSubjects: "English, Physics, Chemistry, Biology",
  },
  {
    name: "Medicine and Surgery",
    field: "science",
    utmeCutoff: 280,
    olevelSubjects: ["English Language", "Mathematics", "Physics", "Chemistry", "Biology"],
    olevelNote: "ONE SITTING ONLY",
    utmeSubjects: "English, Physics, Chemistry, Biology",
  },
  {
    name: "Nursing",
    field: "science",
    utmeCutoff: 260,
    olevelSubjects: ["English Language", "Mathematics", "Physics", "Chemistry", "Biology"],
    olevelNote: "ONE SITTING ONLY",
    utmeSubjects: "English, Biology, Chemistry, Physics",
  },
  {
    name: "Nutrition and Dietetics",
    field: "science",
    utmeCutoff: 220,
    olevelSubjects: ["English Language", "Mathematics", "Physics", "Chemistry", "Biology"],
    utmeSubjects: "English, Chemistry, Physics, Biology",
  },
  {
    name: "Petroleum Engineering",
    field: "science",
    utmeCutoff: 200,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry", "Physics", "Biology / Technical Drawing / Further Mathematics"],
    utmeSubjects: "English, Mathematics, Physics, Chemistry",
  },
  {
    name: "Physiology",
    field: "science",
    utmeCutoff: 200,
    olevelSubjects: ["English Language", "Mathematics", "Physics", "Chemistry", "Biology"],
    utmeSubjects: "English, Physics, Chemistry, Biology",
  },
  {
    name: "Pure and Applied Biology",
    field: "science",
    utmeCutoff: 180,
    olevelSubjects: ["English Language", "Mathematics", "Biology", "Physics", "Chemistry"],
    utmeSubjects: "English, Biology, Chemistry, Physics or Mathematics",
  },
  {
    name: "Pure and Applied Chemistry",
    field: "science",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Biology", "Physics", "Chemistry"],
    utmeSubjects: "English, Physics or Mathematics, Chemistry, Biology",
  },
  {
    name: "Pure and Applied Mathematics",
    field: "science",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Biology", "Physics", "Chemistry"],
    utmeSubjects: "English, Mathematics, Physics + 1 from Chemistry/Biology/Economics",
  },
  {
    name: "Pure and Applied Physics",
    field: "science",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Biology", "Physics", "Chemistry"],
    utmeSubjects: "English, Physics, Chemistry, Mathematics or Biology",
  },
  {
    name: "Science Laboratory Technology",
    field: "science",
    utmeCutoff: 200,
    olevelSubjects: ["English Language", "Mathematics", "Biology", "Physics", "Chemistry"],
    utmeSubjects: "English, Biology, Chemistry, Physics or Mathematics",
  },
  {
    name: "Statistics",
    field: "science",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry", "Physics", "Biology"],
    utmeSubjects: "English, Mathematics + 2 from Physics/Chemistry/Biology",
  },
  {
    name: "Surveying and Geoinformatics",
    field: "science",
    utmeCutoff: 200,
    olevelSubjects: ["English Language", "Mathematics", "Physics", "Geography", "Chemistry / Technical Drawing / Fine Arts / Biology / Agric / Economics"],
    utmeSubjects: "English, Mathematics, Physics + 1 from Geography/Technical Drawing/Fine Arts/Chemistry/Biology/Economics",
  },
  {
    name: "Urban and Regional Planning",
    field: "science",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Geography / Economics", "Physics / Chemistry / Biology", "Government / History / Computer Science / Technical Drawing / Fine Arts"],
    utmeSubjects: "English, Mathematics + 2 from Geography/Biology/Chemistry/Physics/Government or History/Economics",
  },
  {
    name: "Wildlife and Ecotourism Management",
    field: "science",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Chemistry", "Physics", "Biology / Agricultural Science / Animal Husbandry"],
    utmeSubjects: "English, Biology or Agric Science + 2 from Chemistry/Physics/Mathematics",
  },

  // ── ART ──
  {
    name: "English and Literary Studies",
    field: "art",
    utmeCutoff: 200,
    olevelSubjects: ["English Language", "Literature in English", "CRK / IRK / History", "Government / Fine Arts / Music", "French / Yoruba / Igbo / Hausa"],
    utmeSubjects: "English, Literature in English + 2 other Arts subjects",
  },
  {
    name: "Fine and Applied Arts",
    field: "art",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Fine Arts", "Any Arts Subject", "Any Subject", "Any Subject"],
    utmeSubjects: "English Language + 3 other subjects",
  },
  {
    name: "History",
    field: "art",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "History / Government", "CRK / IRK / Literature", "Economics / Geography", "Yoruba / Igbo / Hausa"],
    utmeSubjects: "English + 3 Arts subjects (CRK/IRK, Literature, Economics, Yoruba/Igbo/Hausa)",
  },
  {
    name: "Library and Information Science",
    field: "art",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Economics / Geography / Accounting", "Literature / History / Government", "Fine Arts / Music / French / Yoruba / Igbo / Hausa"],
    utmeSubjects: "English + 3 from Science/Social Sciences/Arts",
  },
  {
    name: "Linguistics and Nigerian Languages",
    field: "art",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Yoruba / Igbo / Hausa", "Literature in English", "History / Government / Fine Arts", "Music / French / CRK / IRK"],
    utmeSubjects: "English + 3 Arts subjects",
  },
  {
    name: "Mass Communication",
    field: "art",
    utmeCutoff: 220,
    olevelSubjects: ["English Language", "Mathematics", "Literature in English", "History / Government / CRK / IRK", "Economics / Geography / Commerce / Fine Arts / Yoruba / Igbo / Hausa"],
    utmeSubjects: "English + 3 Arts or Social Science subjects",
  },
  {
    name: "Philosophy",
    field: "art",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "CRK / IRK / History", "Government / Economics / Commerce", "Geography / Literature in English", "Yoruba / Hausa / Igbo"],
    utmeSubjects: "English + 3 from Arts and/or Social Sciences",
  },
  {
    name: "Political Science",
    field: "art",
    utmeCutoff: 180,
    olevelSubjects: ["English Language", "Mathematics", "Government / History", "CRK / IRK / Literature in English / Yoruba / Igbo / Hausa", "Economics / Geography / Commerce / Accounting / Marketing"],
    utmeSubjects: "English, Government + 2 from Arts or Social Sciences",
  },
  {
    name: "Psychology",
    field: "art",
    utmeCutoff: 170,
    olevelSubjects: ["English Language", "Mathematics", "Biology", "Literature / History / CRS / IRS / Government / Economics", "Accounting / Commerce / Geography / Marketing / Physics / Chemistry"],
    utmeSubjects: "English, Biology + 2 Arts/Social Science/Science subjects",
  },
  {
    name: "Sociology",
    field: "art",
    utmeCutoff: 180,
    olevelSubjects: ["English Language", "Mathematics", "Government / Literature / History", "Yoruba / Igbo / Hausa / CRS / IRS", "Geography / Economics / Commerce / Accounting / Marketing"],
    utmeSubjects: "English + 3 from Arts or Social Sciences",
  },
  {
    name: "Theatre Arts",
    field: "art",
    utmeCutoff: 190,
    olevelSubjects: ["English Language", "Literature in English", "Fine Arts / History / Yoruba / Igbo / Hausa", "CRK / IRK / Music / Government", "Economics / Any Arts Subject"],
    utmeSubjects: "English, Literature-in-English + 2 Arts subjects",
  },
];

// Valid O'Level grades — credits only (C6 minimum)
export const gradeOptions = ["A1", "B2", "B3", "C4", "C5", "C6"];

export const gradePoints: Record<string, number> = {
  A1: 6, B2: 5, B3: 4, C4: 3, C5: 2, C6: 1,
};

export const fieldLabels: Record<Field, string> = {
  science: "Science",
  commercial: "Commercial",
  art: "Art",
};

// Min JAMB score for LAUTECH screening
export const MIN_JAMB = 170;
