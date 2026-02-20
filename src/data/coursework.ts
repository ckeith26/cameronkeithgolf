export interface Course {
  code: string;
  title: string;
  term: string;
  slug: string;
  description: string;
  category: string;
  distributive?: string;
}

export interface CourseCategory {
  label: string;
  courses: Course[];
}

export const coursework: CourseCategory[] = [
  {
    label: "Computer Science",
    courses: [
      {
        code: "COSC 99.01",
        title: "Thesis Research I",
        term: "26W",
        slug: "cosc-99-01",
        category: "Computer Science",
        description:
          "Independent thesis research under faculty supervision, developing original contributions in computer science.",
      },
      {
        code: "COSC 89.30",
        title: "Video Understanding",
        term: "24S",
        slug: "cosc-89-30",
        category: "Computer Science",
        description:
          "Advanced topics course studying video understanding, covering computational methods for analyzing, interpreting, and generating video content using modern deep learning approaches.",
      },
      {
        code: "COSC 74",
        title: "Machine Learning & Statistical Analysis",
        term: "24W",
        slug: "cosc-74",
        category: "Computer Science",
        distributive: "QDS",
        description:
          "Introduction to statistical modeling and machine learning. Topics include learning theory, supervised and unsupervised machine learning, statistical inference and prediction, and data mining.",
      },
      {
        code: "COSC 72",
        title: "Accelerated Computational Linguistics",
        term: "25S",
        slug: "cosc-72",
        category: "Computer Science",
        description:
          "Examines human language through a computational lens, surveying formal models for representing linguistic objects and statistical approaches to learning from natural language data. Covers speech recognition and machine translation.",
      },
      {
        code: "COSC 70",
        title: "Foundations of Applied CS",
        term: "23F",
        slug: "cosc-70",
        category: "Computer Science",
        description:
          "Core computational and mathematical techniques for data analysis and physical modeling with applications in computational biology, computer vision, graphics, machine learning, and robotics.",
      },
      {
        code: "COSC 69.20",
        title: "Cybersecurity Bleeding Edge",
        term: "25F",
        slug: "cosc-69-20",
        category: "Computer Science",
        description:
          "Seminar featuring leading cybersecurity researchers presenting their latest work from across academia, government, and industry. Students read publications and engage with presenters on cutting-edge security research.",
      },
      {
        code: "COSC 55",
        title: "Security and Privacy",
        term: "25S",
        slug: "cosc-55",
        category: "Computer Science",
        description:
          "Examines security and privacy challenges from the migration of important social processes to distributed, electronic systems. Covers defining security/privacy, relevant techniques, and practical deployment methods.",
      },
      {
        code: "COSC 52",
        title: "Full-Stack Web Development",
        term: "24S",
        slug: "cosc-52",
        category: "Computer Science",
        description:
          "Full-stack web development covering static pages, Internet protocols, layout, markup, event-driven asynchronous programming, deployment, security, scalability, and user experience. Hands-on projects building real-time web apps.",
      },
      {
        code: "COSC 50",
        title: "Software Design & Implementation",
        term: "23W",
        slug: "cosc-50",
        category: "Computer Science",
        description:
          "Techniques for building large, reliable, maintainable, and understandable software systems. Covers UNIX tools, C programming, testing, debugging, and collaborative development through team projects.",
      },
      {
        code: "COSC 30",
        title: "Discrete Math for Computer Science",
        term: "25F",
        slug: "cosc-30",
        category: "Computer Science",
        distributive: "QDS",
        description:
          "Mathematical foundations of computer science: set theory, logic, proof techniques, combinatorics, probability, number theory, and graph theory with emphasis on CS applications.",
      },
      {
        code: "COSC 29.05",
        title: "Digital Fabrication",
        term: "24X",
        slug: "cosc-29-05",
        category: "Computer Science",
        description:
          "Explores digital fabrication tools and techniques including 3D printing, laser cutting, and CNC machining, combining computational design with physical prototyping.",
      },
      {
        code: "COSC 10",
        title: "Problem Solving via Object-Oriented Programming",
        term: "22F",
        slug: "cosc-10",
        category: "Computer Science",
        description:
          "Computational problem-solving driven by real-world applications, covering abstraction, modularity, data structures, and algorithms through object-oriented programming.",
      },
    ],
  },
  {
    label: "Economics",
    courses: [
      {
        code: "ECON 66",
        title: "Topics in Money and Finance",
        term: "26W",
        slug: "econ-66",
        category: "Economics",
        description:
          "Seminar on the theory of financial institutions, banking panics, asset price variability, capital market imperfections, monetary policy theory, inflation, and debt. Requires a substantial research paper.",
      },
      {
        code: "ECON 36",
        title: "Theory of Finance",
        term: "24F",
        slug: "econ-36",
        category: "Economics",
        distributive: "QDS",
        description:
          "Decision making under risk and uncertainty, capital budgeting, portfolio theory, valuation of risky assets, capital market efficiency, option pricing, and asymmetric information.",
      },
      {
        code: "ECON 28",
        title: "Public Finance and Policy",
        term: "25S",
        slug: "econ-28",
        category: "Economics",
        distributive: "SOC",
        description:
          "How government policies affect economic outcomes across environmental protection, social insurance, retirement, healthcare, and poverty reduction. Analyzes taxation, efficiency, and distributional tradeoffs.",
      },
      {
        code: "ECON 26",
        title: "Intermediaries and Markets",
        term: "23F",
        slug: "econ-26",
        category: "Economics",
        description:
          "The nature and function of financial intermediaries (banks, mutual funds, insurance) and securities markets (money/capital markets, derivatives). Focuses on liquidity, risk management, and financial regulation.",
      },
      {
        code: "ECON 25",
        title: "Competition & Strategy",
        term: "24F",
        slug: "econ-25",
        category: "Economics",
        description:
          "Strategies businesses use in pricing, advertising, R&D, and mergers to maximize profits. Examines market competition and antitrust policy through game theory, empirical analysis, and experiments.",
      },
      {
        code: "ECON 22",
        title: "Macroeconomics",
        term: "24S",
        slug: "econ-22",
        category: "Economics",
        description:
          "Behavior of the economy as a whole: GNP, unemployment, inflation, and output growth. Develops general equilibrium models with emphasis on expectations, monetary and fiscal policy evaluation.",
      },
      {
        code: "ECON 21",
        title: "Microeconomics",
        term: "24W",
        slug: "econ-21",
        category: "Economics",
        description:
          "Pricing and allocation in the private economy: demand theory, production theory, and price/quantity determination in competitive and noncompetitive markets.",
      },
      {
        code: "ECON 20",
        title: "Econometrics",
        term: "25F",
        slug: "econ-20",
        category: "Economics",
        distributive: "QDS",
        description:
          "Statistical analysis of economic data focusing on regression analysis, including specification, estimation, and hypothesis testing. Extensive use of STATA for empirical research.",
      },
      {
        code: "ECON 15",
        title: "Political Economy of China",
        term: "26W",
        slug: "econ-15",
        category: "Economics",
        distributive: "SOC",
        description:
          "How politics, economics, and culture shaped modern Chinese economic policy. Covers the Mao period, socialist central planning challenges, and post-Mao market reforms.",
      },
      {
        code: "ECON 10",
        title: "Introductory Statistical Methods",
        term: "23S",
        slug: "econ-10",
        category: "Economics",
        distributive: "QDS",
        description:
          "Basic concepts and methods of statistics: descriptive statistics and inference (estimation and hypothesis testing) for single and two-variable analysis, with probability theory.",
      },
      {
        code: "ECON 1",
        title: "The Price System",
        term: "23W",
        slug: "econ-1",
        category: "Economics",
        distributive: "SOC",
        description:
          "Problems and policies of current interest relating to resource use and distribution. Covers supply/demand, industrial competition, labor markets, international trade, and environmental sustainability.",
      },
    ],
  },
  {
    label: "Other",
    courses: [
      {
        code: "HIST 94.06",
        title: "History of the Roman Empire",
        term: "22F",
        slug: "hist-94-06",
        category: "Other",
        description:
          "Survey of the Roman Empire from its founding through its transformation, examining political, military, social, and cultural dimensions of Roman civilization.",
      },
      {
        code: "ASCL 62.03",
        title: "Chinese Painting",
        term: "23S",
        slug: "ascl-62-03",
        category: "Other",
        distributive: "ART",
        description:
          "Exploration of Chinese painting traditions, techniques, and aesthetics across historical periods, examining the cultural and philosophical contexts that shaped this art form.",
      },
      {
        code: "COLT 57.02",
        title: "From Dagos to Sopranos",
        term: "24W",
        slug: "colt-57-02",
        category: "Other",
        distributive: "SOC",
        description:
          "Traces Italian-American identity through film, literature, and music, from early immigration stereotypes to The Sopranos, The Godfather, and artists like Sinatra and Madonna.",
      },
      {
        code: "SPAN 9",
        title: "Culture and Conversation",
        term: "22F",
        slug: "span-9",
        category: "Other",
        description:
          "Advanced Spanish language course bridging introductory and intermediate levels. Develops grammar, vocabulary, and communication through documentaries, films, and broadcast programs.",
      },
      {
        code: "CHEM 7.05",
        title: "Science Communication & Context",
        term: "23S",
        slug: "chem-7-05",
        category: "Other",
        distributive: "SCI",
        description:
          "Explores how scientific knowledge is communicated to diverse audiences, examining the role of context, framing, and media in shaping public understanding of science.",
      },
      {
        code: "ANTH 6",
        title: "Intro to Biological Anthropology",
        term: "24F",
        slug: "anth-6",
        category: "Other",
        distributive: "SCI",
        description:
          "Major areas of biological anthropology: primate evolution, human species evolution, and modern human diversification. Emphasizes evolutionary theory and biology-culture-environment interactions.",
      },
      {
        code: "WRIT 5",
        title: "Expository Writing",
        term: "23W",
        slug: "writ-5",
        category: "Other",
        description:
          "Writing-intensive course developing critical thinking through reading and expository argument. Students write analytical papers engaging with challenging texts from multiple disciplines.",
      },
      {
        code: "ASTR 2",
        title: "Exploring the Universe",
        term: "23F",
        slug: "astr-2",
        category: "Other",
        distributive: "SCI",
        description:
          "Survey of contemporary knowledge of stars, galaxies, and the universe. Covers stellar evolution, nucleosynthesis, dark matter, cosmic expansion, and big bang cosmology.",
      },
      {
        code: "PHIL 1.09",
        title: "Science and Superstition",
        term: "24X",
        slug: "phil-1-09",
        category: "Other",
        description:
          "Introduction to philosophical inquiry through the lens of science and skepticism, examining what distinguishes scientific knowledge from superstition and pseudoscience.",
      },
    ],
  },
];
