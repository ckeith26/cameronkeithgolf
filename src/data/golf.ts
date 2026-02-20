export interface GolfAchievement {
  title: string;
  description: string;
  year: string;
}

export interface JuniorGolfResult {
  date: string;
  tournament: string;
  course: string;
  yardage: string;
  par: number;
  rating: string;
  score: string;
  finish: string;
}

export interface GolfData {
  athleticBio: string;
  achievements: GolfAchievement[];
  juniorResults: Record<string, JuniorGolfResult[]>;
  swingVideoPath: string;
}

export const golfData: GolfData = {
  athleticBio: `Golf has been the constant thread running through my life since I first picked up a club as a kid in the Bay Area. What started as weekend rounds with my dad quickly turned into something more serious: early mornings at the range, junior tournaments across California, and eventually a competitive trajectory that would shape how I approach everything else.

By high school, golf had become both my proving ground and my classroom. Captaining the varsity team at De La Salle, earning AJGA Rolex Scholastic All-American honors, and being named the 2021 Male Junior Olympian of the Year taught me lessons no textbook could: how to perform under pressure, how to stay patient when nothing is going right, and how to find the next marginal gain when you are already near your ceiling.

When it came time to choose a college, I wanted a place where I could compete at the highest level in both golf and academics. Dartmouth was that place. As a member of the NCAA Division I varsity golf team, I have had the chance to compete against the best collegiate players in the country, leading the team at the Alister Mackenzie Invitational at Cal Berkeley and winning the individual title at the Cornell vs. Dartmouth Stroke Play Match. The discipline that four-hour practice sessions and 36-hole tournament days demand is the same discipline that fuels late-night coding sessions and research deadlines. Golf taught me how to compete; Dartmouth taught me what to compete for.`,

  achievements: [
    {
      title: "NCAA D1 Varsity Golf",
      description:
        "Competing on the Dartmouth College varsity golf team in NCAA Division I since freshman year.",
      year: "2022 – Present",
    },
    {
      title: "Alister Mackenzie Invitational: Team Leader",
      description:
        "Led the Dartmouth team at the prestigious Alister Mackenzie Invitational hosted at Cal Berkeley.",
      year: "2024",
    },
    {
      title: "Cornell vs. Dartmouth Stroke Play: Individual Winner",
      description:
        "Won the individual title in the Cornell vs. Dartmouth stroke play match.",
      year: "2024",
    },
    {
      title: "AJGA Rolex Scholastic All-American",
      description:
        "Recognized by the American Junior Golf Association for excellence in both academics and competitive golf.",
      year: "2022",
    },
    {
      title: "2021 Male Junior Olympian of the Year",
      description:
        "Named the top male Junior Olympian golfer of the year.",
      year: "2021",
    },
    {
      title: "Captain, Varsity Golf: De La Salle High School",
      description:
        "Led the varsity golf program at De La Salle High School in Concord, California.",
      year: "2021 – 2022",
    },
  ],

  juniorResults: {
    "2021": [
      { date: "6/7–10/21", tournament: "AJGA Tucson Junior", course: "Tucson CC, Tucson, AZ", yardage: "6,983", par: 72, rating: "72.9/128", score: "73 - 71 - 69", finish: "T13 of 48" },
      { date: "5/29/21", tournament: "JGANC Junior World Qualifier", course: "Haggin Oaks GC (Mackenzie), Sacramento, CA", yardage: "6,921", par: 71, rating: "72.7/126", score: "70", finish: "T6 of 80" },
      { date: "4/10–11/21", tournament: "JGAA Bryce Molder Ping Junior Masters Invitational", course: "McDowell Mountain, Scottsdale, AZ", yardage: "6,959", par: 72, rating: "71.4/134", score: "68 - 68", finish: "1 of 45" },
      { date: "3/20–21/21", tournament: "JGANC Corica Park Junior Championship", course: "Corica Park (South), Alameda, CA", yardage: "6,874", par: 72, rating: "73.2/129", score: "72 - 69", finish: "2 of 44" },
      { date: "3/7/21", tournament: "Notah Begay III San Jose Qualifier", course: "Coyote Creek GC (Valley), Morgan Hill, CA", yardage: "6,558", par: 72, rating: "71.9/130", score: "72", finish: "1 of 28" },
      { date: "2/20–21/21", tournament: "Amateurgolf.com Pacific Grove City Championship", course: "Pacific Grove Golf Links, Pacific Grove, CA", yardage: "5,727", par: 70, rating: "67.9/113", score: "78 - 67", finish: "T7 of 35" },
      { date: "2/13–14/21", tournament: "JGAA Fisher-Bryan Invitational - Ping Jr Masters", course: "Longbow GC, Mesa, AZ", yardage: "6,994", par: 71, rating: "72.9/134", score: "75 - 72", finish: "T11 of 46" },
      { date: "1/9–10/21", tournament: "Amateurgolf.com Silicon Valley Amateur at Baylands Golf Links", course: "Baylands Golf Links, Palo Alto, CA", yardage: "6,670", par: 72, rating: "72.2/125", score: "74 - 71", finish: "T21 of 54" },
      { date: "1/2–3/21", tournament: "HJGT Phoenix Winter Open", course: "Arizona Biltmore GC (Adobe), Phoenix, AZ", yardage: "6,446", par: 71, rating: "70.4/124", score: "69 - 64", finish: "1 of 20" },
    ],
    "2020": [
      { date: "12/19–20/20", tournament: "Amateurgolf.com Winter Invitational at Corica Park", course: "Corica Park (South), Alameda, CA", yardage: "6,874", par: 72, rating: "73.0/128", score: "78 - 76", finish: "T41 of 61" },
      { date: "10/2–4/20", tournament: "AJGA Se Ri Pak Desert Junior", course: "Mission Hills CC (Dinah Shore), Rancho Mirage, CA", yardage: "7,109", par: 72, rating: "74.7/141", score: "75 - 76", finish: "T32 of 41" },
      { date: "9/25–27/20", tournament: "AJGA Longbow GC Open", course: "Longbow GC, Mesa, AZ", yardage: "7,027", par: 71, rating: "72.8/134", score: "72 - 70", finish: "T10 of 51" },
      { date: "9/17/20", tournament: "AJGA Ping Heather Farr Classic Qualifier", course: "Longbow GC, Mesa, AZ", yardage: "7,027", par: 71, rating: "72.8/134", score: "72", finish: "T11 of 51" },
      { date: "9/3–6/20", tournament: "AJGA Junior at Longleaf", course: "Longleaf Golf and Family Club, Pinehurst, NC", yardage: "6,684", par: 72, rating: "72.4/132", score: "74 - 78 - 73", finish: "T23 of 51" },
      { date: "8/30/20", tournament: "US Kids Sandhills Tour", course: "Longleaf Golf and Family Club, Pinehurst, NC", yardage: "6,540", par: 72, rating: "71.0/126", score: "66", finish: "1 of 23" },
      { date: "7/28–30/20", tournament: "AJGA Junior at Knollwood presented by Yoder Oil", course: "Knollwood CC, South Bend, IN", yardage: "6,577", par: 71, rating: "72.1/127", score: "74 - 73 - 69", finish: "T9 of 51" },
      { date: "7/23–25/20", tournament: "US Kids Teen World Championship 2020", course: "Pinehurst No. 4 / No. 2, Pinehurst, NC", yardage: "6,810 / 6,943", par: 72, rating: "72.8/128, 73.7/134", score: "75 - 73 - 82", finish: "T26 of 114" },
      { date: "7/13–14/20", tournament: "91st NCGA Junior Championship", course: "Lake Merced GC, Daly City, CA", yardage: "6,689", par: 72, rating: "72.4/131", score: "79 - 70 - 68", finish: "1 of 51" },
      { date: "7/10–11/20", tournament: "40th NCGA Amateur Stroke Play Championship", course: "Poppy Hills GC, Pebble Beach, CA", yardage: "7,002", par: 71, rating: "73.1/140", score: "73 - 79", finish: "MC" },
      { date: "7/8–9/20", tournament: "JGANC Peggy Dodds Sacramento Jr Championship", course: "Haggin Oaks GC (Mackenzie), Sacramento, CA", yardage: "6,561", par: 72, rating: "70.9/123", score: "72 - 69", finish: "5 of 66" },
      { date: "6/28–7/1/20", tournament: "AJGA GreatLIFE Junior Challenge by Sanford Health", course: "Willow Run GC, Sioux Falls, SD", yardage: "6,519", par: 70, rating: "72.2/132", score: "77 - 79 - 78", finish: "T48 of 51" },
      { date: "6/22–24/20", tournament: "2020 Sizzler Amateur", course: "Troon North, Scottsdale, AZ", yardage: "7,039", par: 72, rating: "72.9/145", score: "69 - 72 - 71", finish: "T15 of 90" },
      { date: "6/19/20", tournament: "NCGA Junior Championship Qualifier (Qualified)", course: "Baylands Golf Links, Palo Alto, CA", yardage: "6,680", par: 72, rating: "72.4/129", score: "72", finish: "6 of 40" },
      { date: "6/16/20", tournament: "Haggin Oaks Junior Championship", course: "Haggin Oaks GC (Arcade), Sacramento, CA", yardage: "6,708", par: 72, rating: "71.8/118", score: "74", finish: "7 of 18" },
      { date: "6/6/20", tournament: "NCGA Stroke Play Championship Qualifier (Qualified)", course: "Monarch Bay Golf Club, San Leandro, CA", yardage: "6,909", par: 71, rating: "73.8/130", score: "77", finish: "T13 of 75" },
      { date: "1/11–13/20", tournament: "Amateurgolf.com Silicon Valley Amateur at Coyote Creek GC", course: "Coyote Creek GC, Morgan Hill, CA", yardage: "7,066 / 7,027", par: 72, rating: "74.4/135, 74.8/143", score: "73 - 72", finish: "T15 of 70" },
    ],
    "2019": [
      { date: "12/21–22/19", tournament: "Amateurgolf.com Winter Invitational at Corica Park GC", course: "Corica Park (South), Alameda, CA", yardage: "6,874", par: 72, rating: "73.0/128", score: "71 - 74", finish: "T7 of 65" },
      { date: "11/9–10/19", tournament: "FCWT Junior Golf Classic at Coyote Creek", course: "Coyote Creek GC, Morgan Hill, CA", yardage: "6,846", par: 72, rating: "74.2/131", score: "77 - 72", finish: "T11 of 54" },
      { date: "10/27/19", tournament: "JGANC Tournament of Champions", course: "Quail Lodge Resort and Golf Club, Carmel, CA", yardage: "6,304", par: 71, rating: "71.4/128", score: "73", finish: "3 of 32" },
      { date: "10/19–20/19", tournament: "JTNC Fall Series IX", course: "Poppy Ridge Golf Course, Livermore, CA", yardage: "6,719", par: 72, rating: "72.7/133", score: "76 - 74", finish: "T17 of 49" },
      { date: "8/12/19", tournament: "Silicon Valley Junior Classic", course: "San Jose Country Club, San Jose, CA", yardage: "6,204", par: 70, rating: "70.5/127", score: "69", finish: "1 of 16" },
      { date: "8/5–8/19", tournament: "AJGA Imperial Headwear Junior Classic", course: "Dupont Country Club, Wilmington, DE", yardage: "7,001", par: 71, rating: "73.9/138", score: "77 - 72 - 73", finish: "T23 of 60" },
      { date: "7/25–27/19", tournament: "US Kids World Teen Championship 2019", course: "Pinehurst No. 4 / No. 2, Pinehurst, NC", yardage: "6,810 / 6,943", par: 72, rating: "72.8/128, 73.7/134", score: "77 - 74 - 79", finish: "T13 of 143" },
      { date: "7/15/19", tournament: "2019 US Amateur Qualifying", course: "Castlewood Country Club, Pleasanton, CA", yardage: "6,657", par: 72, rating: "73.1/132", score: "73 - 77", finish: "T31 of 72" },
      { date: "7/9–10/19", tournament: "AJGA Junior at San Jose", course: "San Jose Country Club, San Jose, CA", yardage: "6,215", par: 70, rating: "70.5/127", score: "72 - 76 - 70", finish: "T17 of 48" },
      { date: "7/1–2/19", tournament: "JGANC/NCGA Nor-Cal Players Championship", course: "Quail Lodge Resort and Golf Club, Carmel, CA", yardage: "6,444", par: 72, rating: "71.4/128", score: "75 - 78", finish: "T7 of 26" },
      { date: "6/17/19", tournament: "2019 US Junior Amateur Qualifying", course: "Yolo Fliers Golf Club, Woodland, CA", yardage: "6,742", par: 72, rating: "72.2/123", score: "74", finish: "T23 of 77" },
      { date: "6/1/19", tournament: "JGANC Qualifying for Junior World #2", course: "Haggin Oaks GC (Alister Mackenzie), Sacramento, CA", yardage: "6,921", par: 71, rating: "72.7/126", score: "70", finish: "T4 of 73" },
      { date: "5/13/19", tournament: "2019 NCS Division I Golf Championship", course: "Monarch Bay Golf Club, San Leandro, CA", yardage: "6,061", par: 71, rating: "69.1/118", score: "74", finish: "T11 of 144" },
      { date: "5/6/19", tournament: "2019 NCS Division 2 Golf Championship", course: "Peacock Gap Golf Club, San Rafael, CA", yardage: "6,261", par: 71, rating: "70.4/126", score: "75", finish: "T9 of 89" },
      { date: "3/21/19", tournament: "2019 Bay Links Challenge", course: "Metropolitan Golf Links, Oakland, CA", yardage: "6,069", par: 72, rating: "69.8/122", score: "71", finish: "1 of 23" },
    ],
    "2018": [
      { date: "8/21–23/18", tournament: "AJGA Junior All-Star at Butte Creek", course: "Butte Creek Country Club, Chico, CA", yardage: "6,698", par: 72, rating: "71.9/129", score: "83 - 76 - 72", finish: "T26 of 47" },
      { date: "7/26–28/18", tournament: "US Kids Teen World Championship", course: "Pinehurst No. 8 / No. 2, Pinehurst, NC", yardage: "6,916 / 6,943", par: 72, rating: "73.4/135, 73.7/133", score: "71 - 77 - 72", finish: "T3 of 151" },
      { date: "7/23/18", tournament: "USGA Amateur Qualifier", course: "Castlewood Country Club, Pleasanton, CA", yardage: "6,657", par: 72, rating: "73.1/132", score: "72 - 75", finish: "T29 of 76" },
      { date: "7/16–17/18", tournament: "East Bay Junior Golf Championship", course: "Corica Park (South), Alameda, CA", yardage: "6,874", par: 72, rating: "71.6/119", score: "80 - 82", finish: "T27 of 63" },
      { date: "7/10–12/18", tournament: "AJGA Junior All-Star at Hunter Ranch", course: "Hunter Ranch Golf Course, Paso Robles, CA", yardage: "6,653", par: 72, rating: "71.7/135", score: "77 - 81 - 74", finish: "33 of 43" },
      { date: "7/5–6/18", tournament: "JGANC Stroke Play Championship", course: "Poppy Ridge Golf Course, Livermore, CA", yardage: "6,613", par: 72, rating: "72.8/136", score: "77 - 75", finish: "4 of 37" },
      { date: "6/18/18", tournament: "USGA Jr. Amateur Qualifier", course: "Yolo Fliers Club, Woodland, CA", yardage: "6,742", par: 72, rating: "72.2/123", score: "77", finish: "T38 of 74" },
      { date: "4/21–22/18", tournament: "AJGA Preview at River Ridge", course: "River Ridge Golf Club (Victoria Lakes), Oxnard, CA", yardage: "6,586", par: 72, rating: "71.6/128", score: "73 - 73", finish: "T5 of 51" },
      { date: "4/14–15/18", tournament: "Las Vegas World Series Championship (JWQ)", course: "Primm Valley Golf Club (Desert), Primm, NV", yardage: "6,540", par: 72, rating: "71.1/128", score: "74 - 71", finish: "T9 of 49" },
      { date: "3/4/18", tournament: "US Kids Bay Area Tour", course: "Santa Clara Golf and Tennis Club, Santa Clara, CA", yardage: "6,015", par: 72, rating: "69.8/115", score: "75", finish: "T3 of 22" },
      { date: "2/25/18", tournament: "US Kids Bay Area Tour", course: "Lake Chabot GC, Oakland, CA", yardage: "6,006", par: 72, rating: "69.4/123", score: "66", finish: "1 of 23" },
      { date: "2/17–18/18", tournament: "US Kids Desert Shootout Invitational", course: "Wigwam Resort (Gold), Litchfield Park, AZ", yardage: "6,215", par: 72, rating: "70.0/125", score: "71 - 77", finish: "4 of 33" },
      { date: "2/11–12/18", tournament: "FCWT Junior Golf Tour", course: "Silverado Resort (South and North), Napa, CA", yardage: "6,246 / 6,347", par: 72, rating: "70.6/127, 70.2/128", score: "73 - 73", finish: "1 of 6" },
      { date: "1/27–28/18", tournament: "FCWT Junior Golf Tour", course: "Half Moon Bay GL (The Old Course), Half Moon Bay, CA", yardage: "6,399", par: 72, rating: "72.3/131", score: "71 - 74", finish: "1 of 6" },
    ],
    "2017": [
      { date: "12/17/17", tournament: "US Kids Bay Area Tour Championship", course: "Monarch Bay Golf Club, San Leandro, CA", yardage: "6,024", par: 72, rating: "69.1/118", score: "75", finish: "1 of 22" },
      { date: "12/3/17", tournament: "US Kids Bay Area Tour", course: "Franklin Canyon Golf Club, Hercules, CA", yardage: "6,074", par: 72, rating: "69.6/127", score: "73", finish: "2 of 26" },
      { date: "11/18–19/17", tournament: "HJGT", course: "Haggin Oaks (Mackenzie), Sacramento, CA", yardage: "6,621", par: 72, rating: "70.9/123", score: "80 - 73", finish: "5 of 11" },
      { date: "11/4–5/17", tournament: "US Kids Regional Monterey Challenge", course: "Del Monte Golf Course, Monterey, CA", yardage: "6,151", par: 72, rating: "71.6/125", score: "77 - 75", finish: "6 of 41" },
      { date: "10/29/17", tournament: "US Kids Local Tour Event", course: "Poppy Ridge Golf Course (Merlot and Zinfandel), Livermore, CA", yardage: "6,007", par: 72, rating: "70.7/127", score: "73", finish: "1 of 21" },
      { date: "10/14–15/17", tournament: "JTNC Fall Series IV Championship Flite", course: "Poppy Ridge Golf Course (Merlot and Zinfandel), Livermore, CA", yardage: "6,719", par: 72, rating: "72.7/133", score: "82 - 78", finish: "T45 of 68" },
      { date: "10/1/17", tournament: "US Kids Reno Tour", course: "Gray's Crossing, Truckee, CA", yardage: "6,158", par: 72, rating: "71.3/135", score: "74", finish: "1 of 11" },
      { date: "8/26/17", tournament: "JGANC CA State Fair", course: "Mather Golf Course, Mather, CA", yardage: "6,767", par: 72, rating: "72.2/121", score: "77", finish: "T4 of 21" },
      { date: "8/10/17", tournament: "JGANC San Leandro City Championship", course: "Monarch Bay Golf Club, San Leandro, CA", yardage: "6,061", par: 71, rating: "68.6/115", score: "76", finish: "T5 of 23" },
      { date: "7/27–29/17", tournament: "US Kids Teen World Championship", course: "Pinehurst No. 9, Pinehurst, NC", yardage: "6,492", par: 72, rating: "70.9/130", score: "77 - 72 - 73", finish: "8 of 136" },
      { date: "7/17–18/17", tournament: "East Bay Junior Golf Championship", course: "Chuck Corica GC (Earl Fry), Alameda, CA", yardage: "6,339", par: 71, rating: "70.4/121", score: "72 - 74", finish: "2 of 26" },
      { date: "7/5/17", tournament: "Diablo Valley Junior Championship", course: "Boundary Oak Golf Course, Walnut Creek, CA", yardage: "6,739", par: 72, rating: "72.7/126", score: "75", finish: "T1 of 10" },
      { date: "6/28/17", tournament: "The Olympic Club Junior Member Qualifier", course: "The Olympic Club (Ocean), San Francisco, CA", yardage: "6,390", par: 71, rating: "71.5/131", score: "77", finish: "1 of 14" },
      { date: "6/19–20/17", tournament: "California State Invitational", course: "The Reserve at Spanos Park", yardage: "6,202", par: 72, rating: "70.2/128", score: "71 - 74", finish: "1 of 24" },
      { date: "6/12/17", tournament: "USGA Jr. Amateur Qualifier", course: "Yolo Fliers Club", yardage: "6,742", par: 72, rating: "72.9/125", score: "73", finish: "T10 of 74" },
      { date: "5/30–6/1/17", tournament: "US Kids European Junior Championship", course: "Luffness New GC, East Lothian, Scotland", yardage: "6,049", par: 72, rating: "69.0/118", score: "71 - 78 - 79", finish: "T12 of 37" },
      { date: "5/6/17", tournament: "JGANC IMG Qualifier", course: "Haggin Oaks GC (Arcade Creek), Sacramento, CA", yardage: "6,495", par: 72, rating: "70.4/116", score: "71", finish: "3 of 47" },
      { date: "4/30/17", tournament: "1st Tee Tri-Pleasanton Junior Open", course: "Pleasanton Golf Center, Pleasanton, CA", yardage: "3,362", par: 60, rating: "58.0/84", score: "61", finish: "T1 of 15" },
      { date: "4/22–23/17", tournament: "JTNC Spring Series IV", course: "Franklin Canyon Golf Club, Hercules, CA", yardage: "6,140", par: 72, rating: "74.9/132", score: "75 - 76", finish: "2 of 24" },
      { date: "4/15–16/17", tournament: "World Series Event - FCG Las Vegas", course: "Primm Valley Golf Club (Desert), Primm, NV", yardage: "6,540", par: 72, rating: "71.7/128", score: "74 - 71", finish: "T8 of 36" },
      { date: "3/25–26/17", tournament: "FCWT Junior Golf Tour", course: "The Bridges, San Ramon, CA", yardage: "6,182", par: 72, rating: "71.9/142", score: "87 - 71", finish: "3 of 3" },
      { date: "3/18–19/17", tournament: "Junior Tour of Northern California", course: "Stockton GCC & Elkhorn GC, Stockton, CA", yardage: "6,123 / 6,097", par: 71, rating: "69.8/123, 70.1/126", score: "77 - 78", finish: "2 of 41" },
      { date: "3/5/17", tournament: "US Kids Bay Area Tour", course: "Chuck Corica GC (Earl Fry), Alameda, CA", yardage: "5,963", par: 72, rating: "68.8/117", score: "75", finish: "1 of 17" },
      { date: "2/18–19/17", tournament: "US Kids Desert Shootout Invitational", course: "Wigwam Resort (Gold), Litchfield Park, AZ", yardage: "6,215", par: 72, rating: "70.0/125", score: "83 - 76", finish: "9 of 28" },
    ],
    "2016": [
      { date: "12/19/16", tournament: "US Kids Bay Area Tour Championship", course: "Crow Canyon Country Club, San Ramon, CA", yardage: "5,731", par: 72, rating: "68.0/124", score: "76", finish: "1 of 11" },
      { date: "11/28/16", tournament: "JGANC Sally Pini Memorial Junior Invitational", course: "Pasatiempo Golf Club, Santa Cruz, CA", yardage: "6,125", par: 72, rating: "70.8/135", score: "82", finish: "4 of 10" },
      { date: "11/5–6/16", tournament: "US Kids Monterey Challenge Invitational", course: "Del Monte Golf Course, Monterey, CA", yardage: "6,193", par: 72, rating: "71.6/130", score: "83 - 78", finish: "12 of 31" },
      { date: "10/23/16", tournament: "US Kids Bay Area Tour", course: "Diablo Creek Golf Course, Concord, CA", yardage: "6,017", par: 72, rating: "69.0/115", score: "75", finish: "1 of 29" },
      { date: "10/8–9/16", tournament: "Junior Tour of Northern California", course: "Rancho Murieta GC, Rancho Murieta, CA", yardage: "6,299 / 6,335", par: 72, rating: "70.3/129, 70.8/132", score: "72 - 80", finish: "3 of 22" },
      { date: "9/18/16", tournament: "JGANC All Stars Invitational", course: "Santa Teresa Golf Course, San Jose, CA", yardage: "6,430", par: 72, rating: "70.9/125", score: "73", finish: "2 of 12" },
      { date: "8/27/16", tournament: "JGANC California State Junior", course: "Mather Golf Course, Mather, CA", yardage: "6,406", par: 72, rating: "70.6/117", score: "73", finish: "T3 of 24" },
      { date: "8/10/16", tournament: "JGANC John Ike Iaconis Memorial", course: "Buchanan Fields GC, Concord, CA", yardage: "3,822", par: 62, rating: "59.2/93", score: "62", finish: "3 of 16" },
      { date: "7/28–30/16", tournament: "US Kids Teen World Championship", course: "Pinehurst No. 8, Pinehurst, NC", yardage: "6,190", par: 72, rating: "70.2/130", score: "86 - 81 - 77", finish: "T31 of 104" },
      { date: "7/24/16", tournament: "US Kids Bay Area Tour", course: "Roddy Ranch Golf Course, Antioch, CA", yardage: "6,043", par: 72, rating: "70.4/131", score: "76", finish: "3 of 12" },
      { date: "7/18–19/16", tournament: "JGANC 80th East Bay Junior Golf Championship", course: "Chuck Corica GC (Earl Fry), Alameda, CA", yardage: "5,708", par: 72, rating: "70.4/121", score: "75 - 82", finish: "7 of 27" },
      { date: "7/12/16", tournament: "US Kids Bay Area Tour", course: "Blackhawk Country Club (Falls), Danville, CA", yardage: "6,018", par: 72, rating: "68.6/120", score: "78", finish: "1 of 18" },
      { date: "7/6/16", tournament: "JGANC Diablo Valley Junior Championship", course: "Boundary Oak Golf Course, Walnut Creek, CA", yardage: "6,372", par: 72, rating: "71.0/126", score: "76", finish: "2 of 17" },
      { date: "7/5/16", tournament: "US Kids Bay Area Tour", course: "TPC Stonebrae, Hayward, CA", yardage: "5,803", par: 72, rating: "69.8/126", score: "73", finish: "1 of 13" },
      { date: "6/27/16", tournament: "JGANC Ruby Hill Junior Championship", course: "Ruby Hill CC, Livermore, CA", yardage: "6,541", par: 72, rating: "72.4/130", score: "82", finish: "5 of 15" },
      { date: "6/15–16/16", tournament: "Junior Tour of Northern California", course: "Poppy Ridge Golf Course, Livermore, CA", yardage: "5,830", par: 72, rating: "70.2/128", score: "76 - 74", finish: "2 of 32" },
      { date: "5/31–6/2/16", tournament: "US Kids European Junior Championship", course: "Luffness New GC, East Lothian, Scotland", yardage: "5,967", par: 72, rating: "69.2/128", score: "81 - 77 - 81", finish: "T19 of 57" },
      { date: "5/22/16", tournament: "US Kids Bay Area Tour", course: "San Ramon GC, San Ramon, CA", yardage: "6,043", par: 72, rating: "70.1/119", score: "79", finish: "3 of 23" },
      { date: "5/13/16", tournament: "JGANC Junior World Qualifier", course: "Haggin Oaks GC (Mackenzie), Sacramento, CA", yardage: "6,495", par: 72, rating: "70.9/123", score: "76", finish: "11 of 40" },
      { date: "5/1/16", tournament: "US Kids Bay Area Tour", course: "Diablo Creek GC, Concord, CA", yardage: "6,017", par: 72, rating: "69.0/115", score: "77", finish: "1 of 19" },
      { date: "4/24/16", tournament: "The First Tee Tri-Valley Pleasanton JR Open", course: "The Pleasanton Golf Center, Pleasanton, CA", yardage: "3,021", par: 60, rating: "58.0/85", score: "63", finish: "3 of 15" },
      { date: "3/24/16", tournament: "JGANC Joe Brophy - Bill Loudon JR Classic", course: "Blue Rock Springs (East), Vallejo, CA", yardage: "5,776", par: 72, rating: "68.4/121", score: "80", finish: "1 of 9" },
      { date: "3/20/16", tournament: "US Kids Bay Area Tour", course: "Half Moon Bay GL (The Old Course), Half Moon Bay, CA", yardage: "5,692", par: 72, rating: "71.6/126", score: "81", finish: "2 of 15" },
      { date: "2/28/16", tournament: "US Kids Bay Area Tour", course: "San Ramon GC, San Ramon, CA", yardage: "5,611", par: 72, rating: "70.1/119", score: "73", finish: "1 of 19" },
      { date: "2/21/16", tournament: "US Kids Bay Area Tour", course: "Lake Chabot GC, Oakland, CA", yardage: "5,601", par: 72, rating: "67.4/116", score: "81", finish: "3 of 16" },
      { date: "2/13–14/16", tournament: "US Kids Desert Shootout Invitational", course: "Wigwam Resort (Gold), Litchfield Park, AZ", yardage: "5,850", par: 72, rating: "73.7/128", score: "82 - 83", finish: "10 of 29" },
      { date: "1/31/16", tournament: "US Kids Bay Area Tour", course: "Tilden Park GC, Berkeley, CA", yardage: "5,632", par: 72, rating: "68.3/120", score: "76", finish: "1 of 14" },
      { date: "1/10/16", tournament: "US Kids Bay Area Tour", course: "Diablo Creek GC, Concord, CA", yardage: "5,648", par: 72, rating: "67.7/113", score: "79", finish: "T2 of 18" },
    ],
  },

  swingVideoPath: "/frames/swing",
};
