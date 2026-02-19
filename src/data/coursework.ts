export interface Course {
  code: string;
  title: string;
  term: string;
}

export interface CourseCategory {
  label: string;
  courses: Course[];
}

export const coursework: CourseCategory[] = [
  {
    label: "Computer Science",
    courses: [
      { code: "COSC 99.01", title: "Thesis Research I", term: "26W" },
      { code: "COSC 89.30", title: "Video Understanding", term: "24S" },
      { code: "COSC 74", title: "Machine Learning & Statistical Analysis", term: "24W" },
      { code: "COSC 72", title: "Accelerated Computational Linguistics", term: "25S" },
      { code: "COSC 70", title: "Foundations of Applied CS", term: "23F" },
      { code: "COSC 69.20", title: "Cybersecurity Bleeding Edge", term: "25F" },
      { code: "COSC 55", title: "Security and Privacy", term: "25S" },
      { code: "COSC 52", title: "Full-Stack Web Development", term: "24S" },
      { code: "COSC 50", title: "Software Design & Implementation", term: "23W" },
      { code: "COSC 30", title: "Discrete Math for Computer Science", term: "25F" },
      { code: "COSC 29.05", title: "Digital Fabrication", term: "24X" },
      { code: "COSC 10", title: "Problem Solving via Object-Oriented Programming", term: "22F" },
    ],
  },
  {
    label: "Economics",
    courses: [
      { code: "ECON 66", title: "Topics in Money and Finance", term: "26W" },
      { code: "ECON 36", title: "Theory of Finance", term: "24F" },
      { code: "ECON 28", title: "Public Finance and Policy", term: "25S" },
      { code: "ECON 26", title: "Intermediaries and Markets", term: "23F" },
      { code: "ECON 25", title: "Competition & Strategy", term: "24F" },
      { code: "ECON 22", title: "Macroeconomics", term: "24S" },
      { code: "ECON 21", title: "Microeconomics", term: "24W" },
      { code: "ECON 20", title: "Econometrics", term: "25F" },
      { code: "ECON 15", title: "Political Economy of China", term: "26W" },
      { code: "ECON 10", title: "Introductory Statistical Methods", term: "23S" },
      { code: "ECON 1", title: "The Price System", term: "23W" },
    ],
  },
  {
    label: "Other",
    courses: [
      { code: "HIST 94.06", title: "History of the Roman Empire", term: "22F" },
      { code: "ASCL 62.03", title: "Chinese Painting", term: "23S" },
      { code: "COLT 57.02", title: "From Dagos to Sopranos", term: "24W" },
      { code: "SPAN 9", title: "Culture and Conversation", term: "22F" },
      { code: "CHEM 7.05", title: "Science Communication & Context", term: "23S" },
      { code: "ANTH 6", title: "Intro to Biological Anthropology", term: "24F" },
      { code: "WRIT 5", title: "Expository Writing", term: "23W" },
      { code: "ASTR 2", title: "Exploring the Universe", term: "23F" },
      { code: "PHIL 1.09", title: "Science and Superstition", term: "24X" },
    ],
  },
];
