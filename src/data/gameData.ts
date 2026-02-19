// Mock data for the application
export interface Student {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  maxXp: number;
  subjects: SubjectProgress[];
}

export interface SubjectProgress {
  subject: string;
  score: number;
  levelsCompleted: number;
  totalLevels: number;
  quizScores: number[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  level: number;
}

export const mathLevels = [
  { id: 1, name: "Numbers", icon: "🔢", description: "Master whole numbers, place value, and operations" },
  { id: 2, name: "Fractions", icon: "🍕", description: "Learn to work with fractions and mixed numbers" },
  { id: 3, name: "Decimals", icon: "📐", description: "Understand decimal numbers and operations" },
  { id: 4, name: "Linear Equations", icon: "⚖️", description: "Solve equations with one variable" },
];

export const mathQuestions: QuizQuestion[] = [
  // Level 1 - Numbers
  { id: "n1", question: "What is 347 + 568?", options: ["815", "915", "905", "825"], correctAnswer: 1, level: 1 },
  { id: "n2", question: "What is the place value of 7 in 4,721?", options: ["Ones", "Tens", "Hundreds", "Thousands"], correctAnswer: 2, level: 1 },
  { id: "n3", question: "Which number is divisible by both 3 and 4?", options: ["8", "9", "12", "10"], correctAnswer: 2, level: 1 },
  { id: "n4", question: "What is 144 ÷ 12?", options: ["11", "12", "13", "14"], correctAnswer: 1, level: 1 },
  { id: "n5", question: "Round 4,567 to the nearest hundred.", options: ["4,500", "4,600", "4,570", "5,000"], correctAnswer: 1, level: 1 },
  // Level 2 - Fractions
  { id: "f1", question: "What is 1/3 + 1/6?", options: ["1/2", "2/9", "1/4", "2/6"], correctAnswer: 0, level: 2 },
  { id: "f2", question: "Simplify 8/12", options: ["4/6", "2/3", "3/4", "1/2"], correctAnswer: 1, level: 2 },
  { id: "f3", question: "What is 3/4 × 2/5?", options: ["6/20", "3/10", "5/9", "6/9"], correctAnswer: 1, level: 2 },
  { id: "f4", question: "Convert 7/4 to a mixed number.", options: ["1 1/4", "1 3/4", "2 1/4", "1 2/4"], correctAnswer: 1, level: 2 },
  { id: "f5", question: "Which fraction is larger: 3/5 or 2/3?", options: ["3/5", "2/3", "They are equal", "Cannot compare"], correctAnswer: 1, level: 2 },
  // Level 3 - Decimals
  { id: "d1", question: "What is 3.45 + 2.7?", options: ["5.15", "6.15", "6.52", "5.72"], correctAnswer: 1, level: 3 },
  { id: "d2", question: "Convert 3/8 to a decimal.", options: ["0.375", "0.38", "0.35", "0.325"], correctAnswer: 0, level: 3 },
  { id: "d3", question: "What is 4.2 × 0.3?", options: ["1.26", "12.6", "0.126", "1.6"], correctAnswer: 0, level: 3 },
  { id: "d4", question: "Round 7.856 to the nearest tenth.", options: ["7.8", "7.9", "7.85", "8.0"], correctAnswer: 1, level: 3 },
  { id: "d5", question: "What is 10.5 ÷ 0.5?", options: ["5.25", "21", "20", "2.1"], correctAnswer: 1, level: 3 },
  // Level 4 - Linear Equations
  { id: "e1", question: "Solve: x + 7 = 15", options: ["x = 7", "x = 8", "x = 22", "x = 9"], correctAnswer: 1, level: 4 },
  { id: "e2", question: "Solve: 3x = 24", options: ["x = 6", "x = 7", "x = 8", "x = 21"], correctAnswer: 2, level: 4 },
  { id: "e3", question: "Solve: 2x + 5 = 17", options: ["x = 5", "x = 6", "x = 11", "x = 7"], correctAnswer: 1, level: 4 },
  { id: "e4", question: "Solve: x/4 = 9", options: ["x = 36", "x = 13", "x = 5", "x = 2.25"], correctAnswer: 0, level: 4 },
  { id: "e5", question: "Solve: 5x - 3 = 22", options: ["x = 3", "x = 4", "x = 5", "x = 25"], correctAnswer: 2, level: 4 },
];

export const mathResources = [
  { level: 1, title: "Understanding Place Value", description: "Learn how digits get their value based on position", type: "lesson" },
  { level: 1, title: "Addition & Subtraction Strategies", description: "Master mental math tricks for faster calculations", type: "video" },
  { level: 1, title: "Multiplication Tables Practice", description: "Interactive tables from 1 to 12", type: "practice" },
  { level: 2, title: "Introduction to Fractions", description: "What fractions are and how to visualize them", type: "lesson" },
  { level: 2, title: "Adding & Subtracting Fractions", description: "Finding common denominators made easy", type: "video" },
  { level: 2, title: "Fraction Word Problems", description: "Apply fractions to real-world scenarios", type: "practice" },
  { level: 3, title: "Decimals and Place Value", description: "Understanding tenths, hundredths, and beyond", type: "lesson" },
  { level: 3, title: "Converting Fractions to Decimals", description: "Bridge the gap between fractions and decimals", type: "video" },
  { level: 3, title: "Decimal Operations Workshop", description: "Practice adding, subtracting, multiplying decimals", type: "practice" },
  { level: 4, title: "What is a Variable?", description: "Introduction to algebraic thinking", type: "lesson" },
  { level: 4, title: "Solving One-Step Equations", description: "Using inverse operations to find unknowns", type: "video" },
  { level: 4, title: "Equation Challenge Problems", description: "Test your algebra skills with word problems", type: "practice" },
];

export const mockStudents: Student[] = [
  {
    id: "s1", name: "Aria Starwhisper", avatar: "🧝‍♀️", level: 8, xp: 720, maxXp: 1000,
    subjects: [{ subject: "Math", score: 85, levelsCompleted: 3, totalLevels: 4, quizScores: [90, 85, 80] }],
  },
  {
    id: "s2", name: "Finn Ironshield", avatar: "🧑‍🦱", level: 6, xp: 450, maxXp: 800,
    subjects: [{ subject: "Math", score: 72, levelsCompleted: 2, totalLevels: 4, quizScores: [75, 70, 68] }],
  },
  {
    id: "s3", name: "Luna Brightmoon", avatar: "👧", level: 10, xp: 950, maxXp: 1200,
    subjects: [{ subject: "Math", score: 95, levelsCompleted: 4, totalLevels: 4, quizScores: [98, 92, 95] }],
  },
  {
    id: "s4", name: "Rex Thunderstone", avatar: "👦", level: 5, xp: 300, maxXp: 700,
    subjects: [{ subject: "Math", score: 60, levelsCompleted: 1, totalLevels: 4, quizScores: [65, 58, 55] }],
  },
  {
    id: "s5", name: "Sage Willowbrook", avatar: "🧑", level: 7, xp: 600, maxXp: 900,
    subjects: [{ subject: "Math", score: 78, levelsCompleted: 2, totalLevels: 4, quizScores: [80, 76, 78] }],
  },
  {
    id: "s6", name: "Ember Firethorn", avatar: "👩‍🦰", level: 9, xp: 880, maxXp: 1100,
    subjects: [{ subject: "Math", score: 88, levelsCompleted: 3, totalLevels: 4, quizScores: [92, 85, 88] }],
  },
];
