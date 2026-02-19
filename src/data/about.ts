export interface AboutSection {
  heading: string;
  body: string;
}

export interface AboutContent {
  headline: string;
  intro: string;
  sections: AboutSection[];
  interests: string[];
}

export const aboutContent: AboutContent = {
  headline: "Builder. Competitor. Researcher.",

  intro:
    "I am Cameron Keith — a computer science and economics student at Dartmouth College, a Division I golfer, and someone who has spent most of his life figuring out how to get a little better every single day.",

  sections: [
    {
      heading: "Growing Up in the Bay Area",
      body: `I grew up in Concord, California, a short drive from Silicon Valley but a world away from the tech scene that would eventually pull me in. My childhood revolved around golf. By middle school I was traveling the state for AJGA tournaments, waking up before dawn to squeeze in range sessions before class, and learning — sometimes painfully — what it means to compete against people who want the same thing you do. The junior golf circuit is unforgiving: there are no participation trophies, no grade curves, and no one to blame when your three-footer lips out. That environment taught me to be honest about my weaknesses and relentless about fixing them.`,
    },
    {
      heading: "Competing at the Highest Level",
      body: `By the time I graduated from De La Salle High School, golf had given me far more than a swing. Earning the AJGA Rolex Scholastic All-American honor and being named the 2021 Male Junior Olympian of the Year proved to me that discipline at the practice range and discipline in the classroom were the same skill applied in different arenas. Captaining the varsity team cemented something else: I loved leading people as much as I loved competing individually. That combination — personal accountability paired with team responsibility — became the foundation for everything I have done since.`,
    },
    {
      heading: "Dartmouth: Golf Meets Computer Science",
      body: `I chose Dartmouth because it was one of the only places in the country where I could compete in NCAA Division I golf while studying computer science and economics at a world-class level. Freshman year, I split my days between morning lifts, afternoon practices, and evening problem sets. It was hard. It was supposed to be. Somewhere in my second year, a machine learning elective changed the trajectory of my academic life. The idea that you could teach a computer to find patterns invisible to the human eye — that you could write software that gets smarter the more data it sees — felt like the intellectual equivalent of the feeling I chase on the golf course: constant, measurable improvement.`,
    },
    {
      heading: "The Discovery of AI",
      body: `That spark led me to Professor SouYoung Jin's SEE Lab, where I now research multimodal models for human-aligned video understanding. It led me to Keyfactor, where I achieved state-of-the-art accuracy predicting X.509 certificate risk and co-authored a paper submitted to IEEE S&P. And it led me to found Brama AI, where I am building a team of autonomous AI agents that can conduct investment research at a level previously reserved for institutional trading desks. Each of these experiences reinforced the same lesson golf taught me years ago: mastery is not a destination, it is a direction.`,
    },
    {
      heading: "The Throughline",
      body: `Whether I am grinding through a 36-hole tournament day, debugging a training loop at 2 AM, or iterating on agent architectures for Brama AI, the underlying drive is identical: figure out what is not working, fix it, measure the improvement, and do it again. Golf gave me that framework long before I ever wrote a line of code. Computer science gave me an arena where the iteration cycles are faster and the ceiling is limitless. I am at my best when those two worlds collide — when the patience of a golfer meets the velocity of a builder.`,
    },
  ],

  interests: [
    "Golf",
    "Downhill Skiing",
    "Chess",
    "Table Tennis",
    "AI & LLMs",
    "Spanish",
    "Tennis",
    "Drone Photography",
  ],
};
