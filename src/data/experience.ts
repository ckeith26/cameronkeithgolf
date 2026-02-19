export interface Experience {
  role: string;
  org: string;
  dateRange: string;
  description: string;
  bullets: string[];
  current: boolean;
}

export const experiences: Experience[] = [
  {
    role: "AI and ML Intern",
    org: "Keyfactor",
    dateRange: "June 2025 – Present",
    description:
      "Advancing machine learning for public-key infrastructure and certificate lifecycle management.",
    bullets: [
      "Achieved state-of-the-art accuracy predicting X.509 certificate risk using custom ML models trained on large-scale telemetry data",
      "Co-authored research manuscript submitted to IEEE S&P 2026 on certificate risk prediction",
      "Built secure agentic systems and MCP servers to extend PKI product capabilities with AI-driven automation",
    ],
    current: true,
  },
  {
    role: "AI Engineer",
    org: "Stealth Startup",
    dateRange: "December 2025 – Present",
    description: "",
    bullets: [
      "Trained multi-modal AI models from scratch",
      "Deployed production model under strict compute and memory constraints",
    ],
    current: true,
  },
  {
    role: "AI Researcher",
    org: "SEE Lab, Dartmouth",
    dateRange: "January 2025 – Present",
    description:
      "Research under Professor SouYoung Jin on multimodal models for human-aligned video understanding.",
    bullets: [
      "Training multimodal models to align machine video understanding with human perception and judgment",
      "Preparing manuscript targeting NeurIPS Q2 2026 submission",
    ],
    current: true,
  },
  {
    role: "Founder",
    org: "Brama AI",
    dateRange: "November 2024 – Present",
    description:
      "Building AI-powered investment tools to democratize financial research.",
    bullets: [
      "Designed and built a team of autonomous buy-side AI agents — Portfolio Manager, Fundamentals Analyst, and Risk Manager — that collaborate to construct equity portfolios",
      "Architected RAG pipeline with MongoDB vector search for real-time ingestion of SEC filings and market data",
      "Deployed full-stack React application on AWS with CI/CD",
    ],
    current: true,
  },
  {
    role: "Quant Research / AI Intern",
    org: "Trivariate Research",
    dateRange: "June 2024 – August 2024",
    description:
      "Built data infrastructure for quantitative and fundamental equity research.",
    bullets: [
      "Built a fully-automated Python data pipeline for quant and fundamental research workflows",
      "Processed and cleaned large financial datasets to support systematic investment strategies",
    ],
    current: false,
  },
];

export const education = {
  school: "Dartmouth College",
  degree: "BA in Computer Science and Economics",
  gpa: "3.59 / 4.0",
  dateRange: "2022 – 2026",
  intendedGrad: "MS in Computer Science, 2027",
  citations: [
    {
      course: "COSC 70 — Foundations of Applied CS",
      term: "Fall 2023",
      professor: "Soroush Vosoughi, Assistant Professor of Computer Science",
      description:
        "Cameron demonstrated an impressive mastery of the course material, consistently showcasing a high level of expertise. He was also the winner of the Neural Network competition.",
    },
    {
      course: "COSC 52 — Full-Stack Web Development",
      term: "Spring 2024",
      professor: "Tim Tregubov, Lecturer in Computer Science",
      description:
        "Cameron did extra credit and was a primary contributor on his final team project.",
    },
    {
      course: "COSC 89.30 — Video Understanding",
      term: "Spring 2024",
      professor: "SouYoung Jin, Assistant Professor of Computer Science",
      description:
        "This course is a research-oriented class that requires students\u2019 participation in paper presentations, discussions, and a final project submitted to a mini-conference. Cameron gave an excellent presentation on a CVPR 2020 paper titled \u2018Oops! Predicting Unintentional Action in Video\u2019 and actively participated in class discussions with thoughtful insights. For the final project, Cameron\u2019s team proposed an approach to systematically analyze the impacts of outliers on video classification performance. Their GitHub repository and homepage were exceptionally well documented and praised by peer reviewers.",
    },
    {
      course: "COSC 55 — Security and Privacy",
      term: "Spring 2025",
      professor: "Omar S. Saydjari, Dartmouth Faculty",
      description:
        "Cameron distinguished himself in COSC 055 through principled analysis, technical depth, and real-world application. His capstone project\u2014a secure messaging system\u2014stood out for its intuitive, professional-quality interface and its seamless integration of layered security features. It reflected both strong theoretical understanding and thoughtful design execution. As the founder of a startup aimed at democratizing investment analysis, Cameron brought valuable entrepreneurial perspective to class discussions and office hours, applying course concepts directly to improve the security of his own system. His steady presence, insightful questions, and ability to translate ideas into deployable solutions exemplify the kind of learning we hope to inspire.",
    },
  ],
  highSchool: {
    name: "De La Salle High School",
    location: "Concord, CA",
    year: "2022",
  },
};
