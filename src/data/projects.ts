export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  featured: boolean;
  links: { github?: string; live?: string; paper?: string };
  date: string;
  category: "ai-ml" | "full-stack" | "research" | "systems" | "other";
  image?: string;
}

export const projects: Project[] = [
  // ── Featured Projects ──────────────────────────────────────────────
  {
    slug: "brama-ai",
    title: "Brama AI",
    description:
      "AI-powered investment tools that democratize financial research through a team of autonomous buy-side agents.",
    longDescription:
      "Brama AI was born from a simple question: why should sophisticated investment research be locked behind six-figure Bloomberg terminals and hedge-fund paywalls? The platform assembles a team of specialized buy-side AI agents — a Portfolio Manager, a Fundamentals Analyst, and a Risk Manager — that collaborate through a LangGraph orchestration layer to construct equity portfolios grounded in real data. Each agent retrieves live market data, SEC filings, and macroeconomic indicators via a RAG pipeline backed by MongoDB vector search, then reasons over the evidence before making allocation recommendations. The PM agent synthesizes competing views, enforces portfolio constraints, and outputs a final position set. The React front-end gives users a transparent window into every agent's reasoning chain, so they can audit decisions rather than blindly trust a black box. Deployed on AWS with CI/CD, Brama AI has processed thousands of research queries and demonstrated that multi-agent architectures can meaningfully augment — not replace — human investment judgment.",
    techStack: ["Python", "LangGraph", "RAG", "React", "MongoDB", "AWS"],
    featured: true,
    links: { github: "#", live: "#" },
    date: "November 2024 – Present",
    category: "ai-ml",
  },
  {
    slug: "guard-ai",
    title: "GUARD-AI",
    description:
      "A model-agnostic framework for protecting agentic AI systems from adversarial attacks, prompt injection, and unsafe tool use.",
    longDescription:
      "As agentic systems gain real-world autonomy — browsing the web, executing code, managing files — the attack surface expands dramatically. GUARD-AI addresses this with a layered defense framework that wraps any LLM-powered agent in a safety envelope without modifying the underlying model. The architecture introduces three checkpoints: an input sentinel that detects prompt-injection and jailbreak attempts using lightweight classifier heads, a tool-call auditor that validates every proposed action against a configurable policy before execution, and an output verifier that scans responses for data leakage and harmful content. Each layer is model-agnostic, meaning it can protect GPT, Claude, or open-source agents equally. The framework was evaluated against a custom red-team benchmark of over 500 adversarial prompts spanning direct injection, indirect injection via retrieved documents, and multi-turn social engineering. GUARD-AI reduced successful attacks by over 90 percent while adding less than 200 ms of latency per turn. Written up as a technical paper, the work demonstrates that safety and capability are not a zero-sum trade-off.",
    techStack: ["Python", "LLM/VLMs", "Security", "PyTorch"],
    featured: true,
    links: { paper: "#" },
    date: "2025",
    category: "research",
  },
  {
    slug: "coffee-chats",
    title: "Coffee Chats",
    description:
      "AI-powered networking platform that intelligently matches college students with alumni for mentorship conversations.",
    longDescription:
      "Networking in college often feels random — a cold LinkedIn message here, an awkward career fair handshake there. Coffee Chats replaces that friction with an intelligent matching engine that pairs students with alumni based on shared interests, career goals, and conversational compatibility. Users create profiles enriched with embeddings generated from their bios, interests, and professional experience. A matching algorithm scores potential pairings on multiple dimensions and surfaces the highest-quality connections each week. The platform handles the entire lifecycle: profile creation, match notifications, calendar scheduling, and post-chat feedback that refines future matches. Built with React on the front-end and a Node.js API layer, the application is deployed on AWS with auto-scaling groups behind an ALB. The feedback loop proved critical — after the first round of chats, match acceptance rates climbed as the system learned which factors actually predicted a good conversation versus which looked good on paper.",
    techStack: ["React", "Node.js", "AWS", "Full Stack"],
    featured: true,
    links: { github: "#", live: "#" },
    date: "2024",
    category: "full-stack",
  },
  {
    slug: "realtime-earnings-pipeline",
    title: "Real-time Earnings Calls Pipeline",
    description:
      "End-to-end system that transcribes live earnings calls, extracts sentiment, and executes trades in real time.",
    longDescription:
      "Earnings calls move markets, but by the time a human analyst finishes listening, the alpha is gone. This pipeline closes that gap by processing audio streams in near real-time. A fine-tuned Whisper ASR model — trained on over 5,000 hours of financial audio to handle jargon like 'EBITDA,' 'guidance,' and ticker symbols — transcribes speech with sub-second latency. The transcript feeds into a sentiment extraction module built on a fine-tuned FinBERT variant that scores utterances on bullish-to-bearish scales while tagging named entities (companies, metrics, forward guidance). A downstream trading module maps sentiment deltas to position-sizing logic and can route orders via a brokerage API. The system was backtested on two quarters of S&P 500 earnings calls, and the sentiment signal showed statistically significant predictive power for the 30-minute post-call price move. The project demonstrated how chaining ASR, NLP, and quantitative finance into a single streaming pipeline can surface tradable insights faster than any human workflow.",
    techStack: ["Python", "PyTorch", "NLP", "ASR", "Whisper", "FinBERT"],
    featured: true,
    links: { github: "#" },
    date: "2024",
    category: "ai-ml",
  },
  {
    slug: "whisperchain-plus",
    title: "WhisperChain+",
    description:
      "End-to-end encrypted messaging platform built with RSA-OAEP and SHA-256, featuring multi-role authentication.",
    longDescription:
      "WhisperChain+ is a secure messaging platform designed from the ground up with cryptographic rigor. Every message is encrypted client-side using RSA-OAEP before it ever leaves the browser, meaning even the server operator cannot read message content. Message integrity is verified with SHA-256 digests, and a key-exchange protocol ensures that new devices can join a conversation without exposing plaintext keys. The authentication layer supports multiple roles — admin, moderator, and member — each with granular permissions enforced server-side. Admins can manage channels and revoke access; moderators can pin messages and mute users; members can read and write within their assigned channels. The React front-end provides a real-time chat experience powered by WebSockets, while the Node.js backend persists encrypted blobs to a database that is useless without the corresponding private keys. The project was an exercise in building security-first software where usability does not come at the expense of privacy.",
    techStack: ["React.js", "Node.js", "Cryptography", "WebSockets"],
    featured: true,
    links: { github: "#" },
    image: "/images/projects/whisperchain-plus.png",
    date: "2024",
    category: "full-stack",
  },

  // ── Other Projects ─────────────────────────────────────────────────
  {
    slug: "moves-ai-app",
    title: "Moves AI App",
    description:
      "Mobile application leveraging AI for movement analysis and feedback.",
    longDescription: "",
    techStack: ["React Native", "AI/ML", "Mobile"],
    featured: false,
    links: { github: "#" },
    date: "2024",
    category: "ai-ml",
  },
  {
    slug: "video-action-ml-competition",
    title: "Video Action ML Competition",
    description:
      "Won both tracks: binary classification (100% accuracy) and multi-class classification (96.6% accuracy).",
    longDescription: "",
    techStack: ["Python", "PyTorch", "Computer Vision"],
    featured: false,
    links: { github: "#" },
    image: "/images/projects/video-action-ml.jpg",
    date: "2025",
    category: "ai-ml",
  },
  {
    slug: "perfect-strike",
    title: "Perfect Strike",
    description:
      "Golf training aid combining hardware and software to improve swing mechanics.",
    longDescription: "",
    techStack: ["Hardware", "Software", "Golf"],
    featured: false,
    links: { github: "#" },
    image: "/images/projects/perfect-strike.png",
    date: "2024",
    category: "other",
  },
  {
    slug: "mongodb-collaborative-notes",
    title: "MongoDB Collaborative Notes",
    description:
      "Real-time collaborative note-taking application backed by MongoDB.",
    longDescription: "",
    techStack: ["MongoDB", "React", "Node.js"],
    featured: false,
    links: { github: "#" },
    date: "2024",
    category: "full-stack",
  },
  {
    slug: "firebase-collaborative-notes",
    title: "Firebase Collaborative Notes",
    description:
      "Real-time collaborative notes app built on Firebase with live syncing.",
    longDescription: "",
    techStack: ["Firebase", "React", "Real-time"],
    featured: false,
    links: { github: "#" },
    date: "2024",
    category: "full-stack",
  },
  {
    slug: "youtube-clone",
    title: "YouTube Clone",
    description:
      "Full-stack video sharing platform replicating core YouTube functionality.",
    longDescription: "",
    techStack: ["React", "Node.js", "Full Stack"],
    featured: false,
    links: { github: "#" },
    date: "2023",
    category: "full-stack",
  },
  {
    slug: "digit-classifiers-knn-nb-svm",
    title: "k-NN / Naive Bayes / SVM Digit Classifiers",
    description:
      "Implemented and compared classical ML classifiers on handwritten digit recognition.",
    longDescription: "",
    techStack: ["Python", "scikit-learn", "ML"],
    featured: false,
    links: { github: "#" },
    date: "2024",
    category: "ai-ml",
  },
  {
    slug: "logistic-regression-perceptron",
    title: "Logistic Regression & Perceptron Classifiers",
    description:
      "Built logistic regression and perceptron models from scratch for binary classification.",
    longDescription: "",
    techStack: ["Python", "NumPy", "ML"],
    featured: false,
    links: { github: "#" },
    date: "2024",
    category: "ai-ml",
  },
  {
    slug: "gradient-descent-regression",
    title: "Regression with Gradient Descent",
    description:
      "Implemented linear and polynomial regression using gradient descent optimization.",
    longDescription: "",
    techStack: ["Python", "NumPy", "Optimization"],
    featured: false,
    links: { github: "#" },
    date: "2024",
    category: "ai-ml",
  },
  {
    slug: "neural-network-digit-classifier",
    title: "Neural Network Digit Classifier",
    description:
      "Built a neural network from scratch that won the class-wide digit classification competition.",
    longDescription: "",
    techStack: ["Python", "NumPy", "Deep Learning"],
    featured: false,
    links: { github: "#" },
    date: "2024",
    category: "ai-ml",
  },
  {
    slug: "poisson-image-blending",
    title: "Poisson Image Blending",
    description:
      "Seamless image compositing using Poisson equation solvers for gradient-domain editing.",
    longDescription: "",
    techStack: ["Python", "NumPy", "Computer Vision"],
    featured: false,
    links: { github: "#" },
    image: "/images/projects/poisson-blending.png",
    date: "2024",
    category: "ai-ml",
  },
  {
    slug: "forensic-license-plate-recognition",
    title: "Forensic License Plate Recognition",
    description:
      "Computer vision pipeline for extracting and reading license plates from surveillance footage.",
    longDescription: "",
    techStack: ["Python", "OpenCV", "Computer Vision"],
    featured: false,
    links: { github: "#" },
    date: "2024",
    category: "ai-ml",
  },
  {
    slug: "tiny-search-engine",
    title: "Tiny Search Engine",
    description:
      "A complete search engine written in C: web crawler, indexer, and query engine.",
    longDescription: "",
    techStack: ["C", "Data Structures", "Systems"],
    featured: false,
    links: { github: "#" },
    image: "/images/projects/tiny-search-engine.png",
    date: "2023",
    category: "systems",
  },
  {
    slug: "parts-of-speech-predictor",
    title: "Parts of Speech Predictor",
    description:
      "HMM-based part-of-speech tagger using the Viterbi algorithm.",
    longDescription: "",
    techStack: ["Python", "HMM", "NLP"],
    featured: false,
    links: { github: "#" },
    image: "/images/projects/parts-of-speech.png",
    date: "2024",
    category: "ai-ml",
  },
  {
    slug: "co2-race-car",
    title: "CO2 Race Car Project",
    description:
      "Designed and built a CO2-powered race car, optimizing aerodynamics and weight.",
    longDescription: "",
    techStack: ["Engineering", "CAD", "Physics"],
    featured: false,
    links: {},
    image: "/images/projects/co2-race-car.jpeg",
    date: "2021",
    category: "other",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
