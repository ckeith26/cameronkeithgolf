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
      "AI-powered investment platform that delivers institutional-grade financial insights to every investor.",
    longDescription:
      "Brama AI redefines how individuals invest by leveraging cutting-edge AI to deliver institutional-grade financial insights, empowering everyone — from newcomers to seasoned investors — to make smarter, data-driven decisions.\n\nThe platform assembles a team of specialized buy-side AI agents — a Portfolio Manager, a Fundamentals Analyst, and a Risk Manager — that collaborate to construct public equity portfolios based on user preferences, risk profile, comps, what-if scenarios, and more. Each agent retrieves live market data, SEC filings, and macroeconomic indicators via a RAG pipeline backed by MongoDB vector search, then reasons over the evidence before making allocation recommendations.\n\nThe PM agent synthesizes competing views, enforces portfolio constraints, and outputs a final position set. The React front-end gives users a transparent window into every agent's reasoning chain, so they can audit decisions rather than blindly trust a black box.",
    techStack: ["Python", "LangGraph", "RAG", "React", "MongoDB", "AWS"],
    featured: true,
    links: { github: "#", live: "https://bramaai.com/" },
    date: "November 2024 – Present",
    category: "ai-ml",
  },
  {
    slug: "guard-ai",
    title: "GUARD-AI",
    description:
      "A model-agnostic framework for governance and runtime defense of AI agents.",
    longDescription:
      "As agentic systems gain real-world autonomy — browsing the web, executing code, managing files — the attack surface expands dramatically. GUARD-AI addresses this with a model-agnostic framework designed to protect agentic systems from adversarial attacks, prompt injection, and unsafe tool use.\n\nThe architecture introduces layered defense checkpoints: an input sentinel that detects prompt-injection and jailbreak attempts, a tool-call auditor that validates every proposed action against a configurable policy before execution, and an output verifier that scans responses for data leakage and harmful content. Each layer is model-agnostic, meaning it can protect GPT, Claude, or open-source agents equally.\n\nA technical paper was written to detail the GUARD-AI framework, its implementation, and evaluation results demonstrating that safety and capability are not a zero-sum trade-off.",
    techStack: ["Python", "LLM/VLMs", "Security", "PyTorch"],
    featured: true,
    links: { paper: "#" },
    date: "October 2025 – November 2025",
    category: "research",
  },
  {
    slug: "coffee-chats",
    title: "Coffee Chats",
    description:
      "AI-powered networking app that matches students and professionals with the right alumni and mentors.",
    longDescription:
      "Coffee Chats is a networking app that helps students and early-career professionals connect with the right alumni and mentors. It matches users to relevant people and streamlines outreach and scheduling so conversations get booked without back-and-forth. The result is more high-quality coffee chats and faster career learning and opportunities.\n\nThe platform handles the entire lifecycle: profile creation, intelligent matching, calendar scheduling, and post-chat feedback that refines future matches. Deployed on scalable AWS infrastructure with auto-scaling behind a load balancer.",
    techStack: ["React", "Node.js", "AWS", "AI/ML"],
    featured: true,
    links: { github: "#", live: "https://coffeechats.me/" },
    date: "October 2025 – November 2025",
    category: "full-stack",
  },
  {
    slug: "realtime-earnings-pipeline",
    title: "Real-time Earnings Calls Pipeline",
    description:
      "End-to-end pipeline that transcribes earnings calls, extracts sentiment, and executes trades based on hard and soft drivers.",
    longDescription:
      "A real-time pipeline that transcribes earnings calls to text and makes trades based on hard and soft drivers extracted from the audio. An ASR model was fine-tuned on 5,000 hours of earnings call audio to handle financial jargon like EBITDA, guidance, and ticker symbols with high accuracy.\n\nThe transcript feeds into a custom sentiment LLM trained to extract both hard drivers (revenue figures, guidance numbers) and soft drivers (management tone, confidence signals). A downstream trading module maps these signals to position-sizing logic and can route orders via a brokerage API.\n\nThe project demonstrates how chaining ASR, NLP, and quantitative finance into a single streaming pipeline can surface tradable insights faster than any human workflow.",
    techStack: ["Python", "PyTorch", "NLP", "ASR", "Whisper", "LLM"],
    featured: true,
    links: { github: "#" },
    date: "March 2025 – June 2025",
    category: "ai-ml",
  },
  {
    slug: "whisperchain-plus",
    title: "WhisperChain+",
    description:
      "End-to-end encrypted messaging platform with role-based access control and multi-factor authentication.",
    longDescription:
      "WhisperChain+ is a secure, anonymous messaging platform designed for learning communities where users can send encrypted compliments and encouragement while maintaining strict privacy and accountability standards. The system implements role-based access control (RBAC) with user, moderator, and admin roles, comprehensive audit logging, and advanced cryptographic security measures.\n\nEvery message is encrypted client-side using RSA-OAEP before it ever leaves the browser, meaning even the server operator cannot read message content. Message integrity is verified with SHA-256 digests. The authentication layer includes multi-factor one-time email verification codes for additional security.\n\nBuilt as a full-stack React.js application with a real-time chat experience powered by WebSockets.",
    techStack: ["React.js", "Node.js", "Cryptography", "WebSockets"],
    featured: true,
    links: { github: "#", live: "#" },
    image: "/images/projects/whisperchain-plus.png",
    date: "April 2025 – May 2025",
    category: "full-stack",
  },

  // ── Other Projects ─────────────────────────────────────────────────
  {
    slug: "do-outliers-matter",
    title: "Do Outliers Matter?",
    description:
      "Research analyzing the impact of in-distribution outliers on video classification model performance.",
    longDescription:
      "Training sample quality impacts deep learning model performance. While studies in the literature explored the association of outlier samples to model performance in modalities like text or images in the NLP and computer vision domains, it is relatively underexplored in the domain of video classification. Researchers focused on anomaly detection or theoretical bounding of outliers towards video classification, but explicit, systematic empirical studies of the impacts of these outliers on video classification modeling are still yet to be explored.\n\nTo bridge this gap, this work systematically analyzes the impacts of outliers, specifically in-distribution outliers, on video classification performance and shows that reducing outliers from training can improve video classification results.",
    techStack: ["Python", "PyTorch", "Deep Learning", "Computer Vision"],
    featured: false,
    links: { live: "https://video-outlier-optimization-web.onrender.com/" },
    date: "2025",
    category: "research",
  },
  {
    slug: "gt2rs-rc-car",
    title: "1/16 GT2RS RC Car",
    description:
      "Custom-designed and 3D-printed 1/16 scale Porsche 911 GT2RS RC car with Arduino-controlled steering and drive.",
    longDescription:
      "A 1/16 scale Porsche 911 GT2RS RC car and controller designed, built, and programmed from scratch in about a month for the CS 29 Digital Fabrication class. Every component was designed in Autodesk Fusion 360 with electronics integrated directly into the design. All parts were 3D printed except for the electronics and a laser-cut acrylic backplate for the controller.\n\nThe car features a direct rear wheel drive with two 12V motors and a custom mounting system. Steering uses a linear actuator driven by a servo for responsive control. The wheels use a two-piece design — rims printed in rigid PLA and tires in TPU 95A rubber filament for grip on slick surfaces and faster acceleration.\n\nControl is handled by a pair of Arduino Pro Minis with 1000m NRF24 transceivers. A 12V battery powers the car with a step-down controller providing 5V to the Arduino, servo, and speed controller.",
    techStack: ["Arduino", "Fusion 360", "3D Printing", "Electronics"],
    featured: false,
    links: {},
    date: "Summer 2024",
    category: "other",
  },
  {
    slug: "moves-ai-app",
    title: "Moves AI App",
    description:
      "Social app that helps friend groups plan their perfect night out using AI-powered itinerary generation.",
    longDescription:
      "Moves AI helps friends plan their perfect night out. Built as the final project for the full-stack web development class, groups can create \"moves,\" invite their friends, and swipe on simple yes/no questions to determine preferences.\n\nAfter collecting the entire group's preferences, the app uses Llama 3 on the backend to generate a personalized itinerary for the night — dinner, bar, club — all within the group's location preferences. The app combines social coordination with AI-powered recommendation to eliminate the endless \"where should we go?\" debate.",
    techStack: ["React", "Node.js", "Llama 3", "Full Stack"],
    featured: false,
    links: { github: "#" },
    date: "May 2024 – June 2024",
    category: "ai-ml",
  },
  {
    slug: "video-action-ml-competition",
    title: "Video Action Classifier",
    description:
      "Won both ML competition tracks: 100% binary accuracy and 96.6% multi-class accuracy, outperforming 200 students.",
    longDescription:
      "Binary and multi-class models built to classify video actions for CS 74, Machine Learning. The approach leveraged precomputed features to run time series and SVM models over 20 frames for each video to train the classifiers. A Bayesian hyperparameter optimizer was designed to tune the models.\n\nAchieved the highest test accuracy in the class — 100% for the binary classifier and 96.6% for the 30-class multi-class classifier — outperforming 200 CS students in both competitions and beating the next best scores by 10%.",
    techStack: ["Python", "PyTorch", "SVM", "Computer Vision"],
    featured: false,
    links: { github: "#" },
    image: "/images/projects/video-action-ml.jpg",
    date: "March 2024",
    category: "ai-ml",
  },
  {
    slug: "perfect-strike",
    title: "Perfect Strike",
    description:
      "Custom-designed and 3D-printed golf training aid to help golfers at all levels improve putting.",
    longDescription:
      "A custom golf training aid designed, 3D printed, and tested to help improve putting. The putting clip works for all putters and helps golfers at all levels putt better by promoting consistent stroke mechanics.",
    techStack: ["Fusion 360", "3D Printing", "Product Design"],
    featured: false,
    links: { github: "#" },
    image: "/images/projects/perfect-strike.png",
    date: "June 2024",
    category: "other",
  },
  {
    slug: "mongodb-collaborative-notes",
    title: "MongoDB Collaborative Notes",
    description:
      "Golf-themed social media app with custom authentication and full CRUD functionality.",
    longDescription:
      "A collaborative social media app where users can post their favorite golf courses or golf content. Features custom authentication and full CRUD functionality backed by MongoDB. Users can create, read, update, and delete posts in a clean, responsive interface.",
    techStack: ["MongoDB", "React", "Node.js", "Auth"],
    featured: false,
    links: { github: "#", live: "#" },
    date: "May 2024",
    category: "full-stack",
  },
  {
    slug: "firebase-collaborative-notes",
    title: "Firebase Collaborative Notes",
    description:
      "Real-time collaborative notes app with Firebase backend and live syncing.",
    longDescription:
      "A collaborative notes application that allows users to create, edit, and delete notes in real time. Notes are stored in Firebase and update instantly across all connected clients. Built with React using JavaScript and HTML.",
    techStack: ["Firebase", "React", "JavaScript"],
    featured: false,
    links: { github: "#" },
    date: "April 2024",
    category: "full-stack",
  },
  {
    slug: "youtube-clone",
    title: "YouTube Clone",
    description:
      "React-based YouTube clone powered by the Google YouTube API.",
    longDescription:
      "A YouTube app clone developed from scratch in React. The application utilizes the Google YouTube API to power search, video playback, and content browsing — replicating core YouTube functionality in a clean, responsive interface.",
    techStack: ["React", "YouTube API", "JavaScript"],
    featured: false,
    links: { github: "#", live: "#" },
    date: "April 2024",
    category: "full-stack",
  },
  {
    slug: "digit-classifiers-knn-nb-svm",
    title: "k-NN / Naive Bayes / SVM Digit Classifiers",
    description:
      "Implemented and compared classical ML classifiers achieving up to 94.7% accuracy on digit recognition.",
    longDescription:
      "A comparative study of classical machine learning classifiers for handwritten digit recognition. Designed a k-NN classifier achieving 94.7% accuracy, a multinomial Naive Bayes classifier with Laplace smoothing at 82.3% accuracy, a Gaussian Naive Bayes classifier at 73.8% accuracy, and a one-vs-all SVM classifier at 82% accuracy.",
    techStack: ["Python", "NumPy", "ML"],
    featured: false,
    links: { github: "#" },
    date: "March 2024",
    category: "ai-ml",
  },
  {
    slug: "logistic-regression-perceptron",
    title: "Logistic Regression & Perceptron Classifiers",
    description:
      "Built logistic regression and perceptron models from scratch using cross-entropy loss and smooth ReLU.",
    longDescription:
      "Original logistic regression and perceptron classifiers built from scratch. The logistic regression classifier leverages cross-entropy loss for optimization, while the perceptron classifier uses smooth ReLU activation. Both models were implemented without ML libraries to build deep understanding of the underlying mathematics.",
    techStack: ["Python", "NumPy", "ML"],
    featured: false,
    links: { github: "#" },
    date: "February 2024",
    category: "ai-ml",
  },
  {
    slug: "gradient-descent-regression",
    title: "Regression with Gradient Descent",
    description:
      "Linear and non-linear regression models with gradient descent, ridge, and lasso regularization.",
    longDescription:
      "Linear and non-linear regression models implemented with gradient descent optimization from scratch. Model performance was boosted with ridge and lasso regularization techniques to prevent overfitting and improve generalization.",
    techStack: ["Python", "NumPy", "Optimization"],
    featured: false,
    links: { github: "#" },
    date: "January 2024",
    category: "ai-ml",
  },
  {
    slug: "neural-network-digit-classifier",
    title: "Neural Network Digit Classifier",
    description:
      "Built a neural network from scratch achieving 92.5% accuracy and winning the class-wide competition.",
    longDescription:
      "A neural network built from scratch in Python to classify handwritten digits for CS 70, Foundations of Applied Computer Science and Machine Learning. The implementation includes forward computation and backward propagation for linear and non-linear ReLU layers, as well as dropout regularization. The model was trained using gradient descent with least squares loss.\n\nA Bayesian hyperparameter optimizer was designed to tune the model's architecture and training parameters. Achieved the highest test accuracy of 92.5% in the class, winning a citation of merit among 150 CS majors at Dartmouth.",
    techStack: ["Python", "NumPy", "Deep Learning"],
    featured: false,
    links: { github: "#" },
    date: "November 2023",
    category: "ai-ml",
  },
  {
    slug: "poisson-image-blending",
    title: "Poisson Image Blending",
    description:
      "Gradient-domain image processing for seamless image compositing using Poisson equation solvers.",
    longDescription:
      "An implementation of Poisson Image Blending for CS 70, Foundations of Applied Computer Science and Machine Learning. The project explores gradient-domain image processing, a technique with broad applications including blending, tone-mapping, and non-photorealistic rendering.\n\nThe primary goal is to seamlessly blend an object or texture from a source image into a target image. Rather than copying pixel values directly (which creates visible seams), the approach leverages the insight that human vision is more sensitive to image gradients than overall intensity. The algorithm finds values for pasted target pixels that maximally preserve the gradient of the source region without changing background pixels — so a green hat could turn red, but it still looks like a hat.",
    techStack: ["Python", "NumPy", "Computer Vision"],
    featured: false,
    links: { github: "#" },
    image: "/images/projects/poisson-blending.png",
    date: "October 2023",
    category: "ai-ml",
  },
  {
    slug: "forensic-license-plate-recognition",
    title: "Forensic License Plate Recognition",
    description:
      "Homography-based algorithm to remove perspective distortion and read license plates from surveillance images.",
    longDescription:
      "A forensic license plate recognition algorithm implemented for CS 70, Foundations of Applied Computer Science and Machine Learning. The algorithm removes perspective distortion from images of planar surfaces, transforming the view so the license plate appears face-on.\n\nThe approach deduces the entries of a homography matrix that maps four clicked corner points to the four corners of an undistorted rectangular license plate. Each pair of corresponding points provides two constraints, and with four pairs, the system solves 8 constraints on 8 unknowns. After mapping the points from the original image to the corrected image, the license plate becomes fully readable.",
    techStack: ["Python", "NumPy", "Computer Vision"],
    featured: false,
    links: { github: "#" },
    date: "September 2023",
    category: "ai-ml",
  },
  {
    slug: "ai-ml-uchicago",
    title: "AI and Machine Learning — UChicago",
    description:
      "Developed a quantitative REIT trading strategy using ML, sentiment analysis, and time series analysis.",
    longDescription:
      "An eight-week Artificial Intelligence and Machine Learning course at the University of Chicago covering the mathematical and theoretical background for machine learning in today's business world — from data investigation and exploration to supervised and unsupervised learning.\n\nThe final project developed a quantitative trading strategy for Real Estate Investment Trusts (REITs) that leverages machine learning, sentiment analysis, and time series analysis to identify undervalued REITs within specific sectors and sub-sectors. The strategy uses market data from FactSet, sentiment analysis on REITs, and historical price data to make informed investment decisions, achieving superior risk-adjusted returns.",
    techStack: ["Python", "ML", "Sentiment Analysis", "Time Series"],
    featured: false,
    links: {},
    date: "June 2023 – August 2023",
    category: "ai-ml",
  },
  {
    slug: "tiny-search-engine",
    title: "Tiny Search Engine",
    description:
      "A complete search engine written in C with crawler, indexer, and querier modules.",
    longDescription:
      "A Tiny Search Engine created for CS 50, Software Design and Implementation at Dartmouth. The project is composed of three modules: crawler, indexer, and querier.\n\nThe crawler module crawls the web and retrieves webpages starting from a seed URL. It parses the seed webpage, extracts embedded URLs, then retrieves each of those pages recursively, limiting exploration to a given depth and only crawling pages under the seed domain. The indexer reads document files produced by the crawler, builds an inverted index, and writes it to a file. The querier reads the index file and page files to answer search queries submitted via stdin. Efficiency was optimized with a hashtable-to-counter data structure.",
    techStack: ["C", "Data Structures", "Systems"],
    featured: false,
    links: { github: "#" },
    image: "/images/projects/tiny-search-engine.png",
    date: "February 2023 – March 2023",
    category: "systems",
  },
  {
    slug: "parts-of-speech-predictor",
    title: "Parts of Speech Predictor",
    description:
      "HMM-based part-of-speech tagger achieving over 93% accuracy using the Viterbi algorithm.",
    longDescription:
      "A Parts of Speech prediction model developed for CS 10, Object Oriented Programming at Dartmouth. The model uses a Hidden Markov Model trained on files containing sentences and tagged sentences.\n\nTwo hash maps — observations and transitions — track part-of-speech frequencies. Observations records how often a word appears as a certain part of speech, while transitions records how often one part of speech follows another. These occurrence counts are converted to log probabilities, and the Viterbi algorithm backtraces from the state with the best score for the last observation to determine the most probable sequence of parts of speech. Achieved over 93% accuracy.",
    techStack: ["Java", "HMM", "NLP"],
    featured: false,
    links: { github: "#" },
    image: "/images/projects/parts-of-speech.png",
    date: "September 2022 – November 2022",
    category: "ai-ml",
  },
  {
    slug: "co2-race-car",
    title: "CO2 Race Car Project",
    description:
      "Won a CO2 car drag race by designing the most aerodynamic and lightest car using CFD and CAD.",
    longDescription:
      "A CO2-powered race car designed and built during senior year of high school. The car was designed in Autodesk Fusion 360 to be as light and aerodynamic as possible, with aerodynamics optimized using a virtual wind tunnel in Autodesk CFD.\n\nThe race uses an official CO2 starting block where a firing pin punctures the CO2 canister to release force over a short period. The car reached speeds over 70 mph and won first place in the competition. The project combined CAD design, computational fluid dynamics, 3D printing, and CNC machining to optimize every aspect of the car's performance.",
    techStack: ["Fusion 360", "CFD", "3D Printing", "CNC"],
    featured: false,
    links: {},
    image: "/images/projects/co2-race-car.jpeg",
    date: "March 2022",
    category: "other",
  },
  {
    slug: "texas-holdem-app",
    title: "Texas Hold-Em App",
    description:
      "Four-player Texas Hold-Em poker app built in Swift for iOS.",
    longDescription:
      "A four-player Texas Hold-Em app created as a school project in sophomore year of high school. Built by researching Swift and Xcode and developing the app from scratch within two weeks. The project provided foundational mobile development skills that continue to inform current work.",
    techStack: ["Swift", "Xcode", "iOS"],
    featured: false,
    links: {},
    date: "2020",
    category: "other",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
