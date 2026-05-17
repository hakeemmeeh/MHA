import type {
  Affiliation,
  FieldStory,
  NavItem,
  ProjectHighlight,
  Stat,
  ThematicArea,
} from "@/types";
import { programImage, storyImage } from "@/lib/unsplashMedia";

export const site = {
  name: "Mobile Humanitarian Agency",
  acronym: "MHA",
  tagline: "Safeguarding Rights. Restoring Dignity.",
  description:
    "A nonprofit, non-governmental organization established in 2017 with the mission of safeguarding the rights and well-being of individuals forced to flee their homes in South Sudan.",
  phone: "+211 911828150",
  phone2: "+211 920 680 775",
  email: "mobilehumanitarianagency@gmail.com",
  email2: "chuol@mha-ss.org",
  address:
    "Hai Magateen Residential area, left turn after Ezentus heading Bilpam Road/Hai Referendum Road, Juba, South Sudan",
  website: "https://mha-ss.org",
  established: 2017,
  contactPerson: "John Gatyiel Chuol, Executive Director",
};

export const vision =
  "To be a trusted humanitarian service provider across South Sudan";

export const mission =
  "To provide timely assistance to conflict-affected communities by empowering them to identify and address their own needs through sustainable initiatives and collaborative support.";

export const coreValues = [
  {
    title: "Integrity & Transparency",
    desc: "We operate with the highest ethical standards, ensuring accountability in every action.",
  },
  {
    title: "Partnership & Collaboration",
    desc: "We work hand-in-hand with communities, partners, and stakeholders for lasting impact.",
  },
  {
    title: "Commitment & Excellence",
    desc: "We deliver quality services with dedication and professionalism in every context.",
  },
];

export const stats: Stat[] = [
  { value: 82, label: "Full-Time Staff", suffix: "" },
  { value: 85, label: "Field-Based Workforce", suffix: "%" },
  { value: 8, label: "Counties Covered", suffix: "" },
  { value: 7, label: "Years of Service", suffix: "+" },
  { value: 5, label: "Major Donors & Partners", suffix: "" },
  { value: 12, label: "Thematic Areas", suffix: "" },
];

export const thematicAreas: ThematicArea[] = [
  {
    slug: "protection",
    title: "Protection",
    shortDesc:
      "Enhancing civilian safety through monitoring, risk mitigation, and community-based protection networks.",
    fullDesc:
      "MHA's protection work focuses on enhancing the safety of civilians at risk from violence, coercion, and lack of access to essential services. Our team conducts routine protection monitoring to pinpoint key risks and devise strategies to prevent and mitigate them.",
    icon: "shield",
    image: programImage("protection"),
    keyActivities: [
      "Community-based protection networks",
      "Protection monitoring and reporting",
      "Risk mitigation planning with communities",
    ],
    impactStats: [
      { value: "8", label: "Counties with active monitoring" },
      { value: "82+", label: "Staff contributing to protection outcomes" },
    ],
  },
  {
    slug: "gbv",
    title: "Gender-Based Violence",
    shortDesc:
      "Protecting women and children from sexual and gender-based violence through advocacy, justice, and prevention.",
    fullDesc:
      "We engage with organizations, healthcare providers, and local authorities to protect women and children from sexual and gender-based violence. We assist women in bringing perpetrators to justice and train gender activists to be change agents.",
    icon: "heart",
    image: programImage("gbv"),
    keyActivities: [
      "Survivor-centered case support pathways",
      "Community prevention and awareness",
      "Coordination with health and justice actors",
    ],
    impactStats: [
      { value: "Multi-county", label: "GBV response coverage" },
      { value: "Field-led", label: "Community activist networks" },
    ],
  },
  {
    slug: "child-protection",
    title: "Child Protection",
    shortDesc:
      "Immediate support for children affected by disasters — safe spaces, psychological first aid, and family reunification.",
    fullDesc:
      "MHA provides immediate support to children affected by disasters, including safe spaces, psychological first aid, and emergency supplies. We conduct community awareness about child rights and safeguarding practices.",
    icon: "baby",
    image: programImage("child-protection"),
    keyActivities: [
      "Child-friendly safe spaces",
      "Psychological first aid",
      "Family reunification support",
    ],
    impactStats: [
      { value: "Rapid", label: "Emergency response activation" },
      { value: "Community", label: "Rights awareness sessions" },
    ],
  },
  {
    slug: "hlp",
    title: "Housing, Land & Property",
    shortDesc:
      "Legal awareness, dispute resolution, and documentation for HLP rights of displaced communities.",
    fullDesc:
      "MHA conducts community sensitization and raises legal awareness of HLP rights. We assist beneficiaries in exploring alternative dispute resolution options, especially for lost documents and land registration claims.",
    icon: "home",
    image: programImage("hlp"),
    keyActivities: [
      "Legal awareness campaigns",
      "Alternative dispute resolution support",
      "Documentation guidance",
    ],
    impactStats: [
      { value: "ADR", label: "Structured dispute pathways" },
      { value: "Field", label: "Community legal literacy" },
    ],
  },
  {
    slug: "youth-engagement",
    title: "Youth Engagement",
    shortDesc:
      "Literacy, numeracy, vocational training, and peer-led activities empowering South Sudanese youth.",
    fullDesc:
      "MHA offers workshops to improve reading and writing skills, financial literacy, and vocational training in agriculture, entrepreneurship, and technology. We partner with EDC, DRC, SFCG, and national NGOs across multiple counties.",
    icon: "graduation-cap",
    image: programImage("youth-engagement"),
    keyActivities: [
      "Literacy and numeracy workshops",
      "Vocational skills training",
      "Peer-led community activities",
    ],
    impactStats: [
      { value: "Multi-partner", label: "Youth program collaborations" },
      { value: "County-wide", label: "Reach across operational areas" },
    ],
  },
  {
    slug: "wash",
    title: "WASH",
    shortDesc:
      "Clean water, sanitation, and hygiene promotion to reduce disease and protect dignity in displacement settings.",
    fullDesc:
      "MHA supports communities with WASH interventions aligned to humanitarian standards, emphasizing safe water access, sanitation improvements, and hygiene behavior change in schools and settlements.",
    icon: "droplets",
    image: programImage("wash"),
    keyActivities: [
      "Hygiene promotion sessions",
      "Water point rehabilitation support",
      "Community-led sanitation planning",
    ],
    impactStats: [
      { value: "Settlement", label: "Focused WASH outreach" },
      { value: "Schools", label: "Hygiene behavior change" },
    ],
  },
  {
    slug: "food-security-livelihoods",
    title: "Food Security & Livelihoods",
    shortDesc:
      "Supporting households to stabilize food access and rebuild livelihoods after shocks.",
    fullDesc:
      "We work with communities on livelihoods recovery, agricultural seasons planning, and market access where feasible—always alongside protection and accountability priorities.",
    icon: "wheat",
    image: programImage("food-security-livelihoods"),
    keyActivities: [
      "Seasonal livelihoods assessments",
      "Agricultural skills support",
      "Market linkage orientation",
    ],
    impactStats: [
      { value: "Household", label: "Centered recovery planning" },
      { value: "Field", label: "County-based delivery" },
    ],
  },
  {
    slug: "nutrition",
    title: "Nutrition",
    shortDesc:
      "Screening, referral pathways, and community messaging to address malnutrition risks among vulnerable groups.",
    fullDesc:
      "Nutrition activities complement wider health and protection services, focusing on early identification, referral, and community education for caregivers.",
    icon: "apple",
    image: programImage("nutrition"),
    keyActivities: [
      "Nutrition screening support",
      "Referral coordination",
      "Caregiver education",
    ],
    impactStats: [
      { value: "Integrated", label: "Referral with health actors" },
      { value: "Community", label: "Messaging at outreach sites" },
    ],
  },
  {
    slug: "health",
    title: "Health Support",
    shortDesc:
      "Strengthening access to essential health information and referrals in hard-to-reach communities.",
    fullDesc:
      "MHA supports health outcomes through community mobilization, referral networks, and coordination with Ministry of Health and partners where programs align with organizational mandate.",
    icon: "stethoscope",
    image: programImage("health"),
    keyActivities: [
      "Health awareness sessions",
      "Referral pathway strengthening",
      "Outreach coordination",
    ],
    impactStats: [
      { value: "Remote", label: "Hard-to-reach outreach" },
      { value: "Coordinated", label: "With health partners" },
    ],
  },
  {
    slug: "education-in-emergencies",
    title: "Education in Emergencies",
    shortDesc:
      "Keeping learning alive for children and youth when crises disrupt schools and community structures.",
    fullDesc:
      "Education in emergencies approaches include temporary learning spaces support, learning materials orientation, and collaboration with education cluster actors where applicable.",
    icon: "book-open",
    image: programImage("education-in-emergencies"),
    keyActivities: [
      "TLS support coordination",
      "Learning continuity planning",
      "Community education committees",
    ],
    impactStats: [
      { value: "Crisis-ready", label: "Rapid education orientation" },
      { value: "Youth-linked", label: "Aligned with youth engagement" },
    ],
  },
  {
    slug: "peacebuilding",
    title: "Peacebuilding & Social Cohesion",
    shortDesc:
      "Dialogue, conflict sensitivity, and community-led initiatives that reduce tensions and protect civilians.",
    fullDesc:
      "Peacebuilding work supports social cohesion through facilitated dialogue, conflict-sensitive programming, and partnerships that reinforce non-violent dispute resolution at community level.",
    icon: "handshake",
    image: programImage("peacebuilding"),
    keyActivities: [
      "Community dialogue forums",
      "Conflict sensitivity training",
      "Cohesion monitoring with leaders",
    ],
    impactStats: [
      { value: "Local", label: "Leader-led dialogue" },
      { value: "Integrated", label: "Across thematic teams" },
    ],
  },
  {
    slug: "logistics",
    title: "Logistics & Operations",
    shortDesc:
      "Reliable movement of supplies and teams so assistance reaches islands, riversides, and remote settlements.",
    fullDesc:
      "Operations and logistics capacity enable MHA to maintain presence where road access is limited—including areas reachable by canoe—while adhering to fleet, stock, and security policies.",
    icon: "truck",
    image: programImage("logistics"),
    keyActivities: [
      "Last-mile distribution planning",
      "Fleet and movement compliance",
      "Warehouse and stock coordination",
    ],
    impactStats: [
      { value: "Remote", label: "Last-mile reach" },
      { value: "Policy-led", label: "Fleet & stock standards" },
    ],
  },
];

export const partners = [
  { name: "USAID", logo: "/images/partners/usaid.svg" },
  /** South Sudan Humanitarian Fund is managed under OCHA; mark is the UN OCHA logo (Wikimedia Commons). */
  { name: "SSHF", logo: "/images/partners/sshf.svg" },
  { name: "UNHCR", logo: "/images/partners/unhcr.svg" },
  { name: "UNICEF", logo: "/images/partners/unicef.svg" },
  /** Japan International Volunteer Center — PNG from https://www.ngo-jvc.net/ (header). */
  { name: "JVC", logo: "/images/partners/jvc.png" },
];

export const coverage = {
  states: [
    {
      name: "Unity State",
      counties: ["Leer", "Mayiandit", "Panyijiar"],
    },
    {
      name: "Jonglei State",
      counties: ["Akobo", "Uror", "Duk", "Pigi/Canal"],
    },
  ],
  offices: [
    { name: "Juba Head Office", type: "headquarters" as const },
    { name: "Leer Field Office", type: "field" as const, state: "Unity" },
    { name: "Duk Field Office", type: "field" as const, state: "Jonglei" },
    { name: "Bentiu Field Office", type: "field" as const, state: "Unity" },
  ],
};

export const boardInfo = {
  size: 5,
  meetingFrequency: "Quarterly visits",
  executiveDirector: "John Gatyiel Chuol",
};

export const policies = [
  "Procurement Guidelines",
  "Child Safeguarding Policy",
  "PSEA Policy",
  "HR Policy",
  "Security Policy",
  "Financial Policy",
  "Fleet Management Guidelines",
  "Stock Management Guidelines",
  "Assets Management Guidelines",
  "Staff Code of Conduct",
  "Anti-Fraud and Bribery Policy",
  "Whistle-blowing Policy",
];

export const affiliations: Affiliation[] = [
  {
    name: "International Humanitarian Charter on Inclusion of Persons with Disabilities in Humanitarian Action",
    href: "https://humanitariandisabilitycharter.org/",
    since: "February 2019",
  },
  {
    name: "Global Legal Empowerment Network (Namati)",
    href: "https://namati.org/network/",
    since: "February 2019",
  },
  {
    name: "National Protection Cluster (Full Member)",
  },
  {
    name: "National GBV Sub-Cluster (Full Member)",
  },
  {
    name: "National FSL Cluster (Full Member)",
  },
  {
    name: "NGO Forum",
  },
  {
    name: "INSO",
  },
];

/** Why and how MHA publishes information for partners and the public */
export const partnershipTransparency = {
  title: "Partnership & transparency",
  paragraphs: [
    "MHA is accountable first to the communities we serve, and transparent with the donors, UN agencies, and national NGOs who make our work possible.",
    "We publish representative field activities and governance information so partners can see what has been delivered, where it happened, and how oversight works — including policies, board practice, and financial controls.",
    "This site is a summary, not a full audit trail. For formal due diligence, procurement packs, or donor-specific reports, contact us directly and we will route your request to the right focal point.",
  ],
};

export const capabilities = {
  title: "What makes MHA effective",
  bullets: [
    "Deep local knowledge of South Sudan’s challenges, cultures, and indigenous community strengths.",
    "Professional, experienced staff with strong field exposure — a comparative advantage in remote and volatile contexts.",
    "Static and mobile delivery models, including hard-to-reach areas and islands accessible only by canoe.",
  ],
};

export const managementModel = {
  title: "Governance & management",
  paragraphs: [
    "The Board of Directors (five members) oversees strategy, policy formulation, and performance monitoring. The Executive Director is a board member, keeping governance connected to day-to-day operations.",
    "Quarterly board visits support thorough progress review and timely course correction.",
    "Programme implementation is led by Program Managers and technical teams, with support from Project Technical Managers as required.",
  ],
};

export const financialAccountability = {
  title: "Finance & accountability",
  paragraphs: [
    "MHA maintains a documented financial control system. A Financial Controller leads the finance function, with qualified accounting staff managing day-to-day books and compliance.",
    "The Board uses tracking procedures and internal audits to strengthen accountability and identify improvements — aligned with our Financial Policy, Anti-Fraud and Bribery Policy, and Whistle-blowing Policy.",
  ],
};

/** Representative activities — public-facing log for partner transparency (from MHA organizational profile & field reporting). */
export const projectHighlights: ProjectHighlight[] = [
  {
    dateLabel: "16 Jun 2023",
    title: "Youth training launch (Leer)",
    summary:
      "Launch of youth engagement training in Leer County; volunteer trainers supported under the USAID Youth Engagement Project.",
    location: "Leer County, Unity State",
    partner: "USAID",
    storySlug: "youth-launch-leer-june-2023",
  },
  {
    dateLabel: "—",
    title: "Community-based protection centre",
    summary:
      "Community-based protection infrastructure in Pigi/Canal supporting local protection networks.",
    location: "Pigi/Canal, Jonglei State",
    storySlug: "cbp-centre-pigi-canal-jonglei",
  },
  {
    dateLabel: "—",
    title: "CBP network training",
    summary:
      "Training for community-based protection members in Dablual / Mayiandit County.",
    location: "Dablual, Mayiandit County, Unity State",
    storySlug: "cbp-training-dablual-mayiandit",
  },
  {
    dateLabel: "—",
    title: "Community-based protection centre (Dablual)",
    summary:
      "Established / supported community-based protection centre in Dablual, Mayiandit.",
    location: "Mayiandit County, Unity State",
    storySlug: "cbp-centre-dablual-mayiandit",
  },
  {
    dateLabel: "—",
    title: "Sensitization with community leaders",
    summary:
      "Engagement with community leaders in Mayiandit on harmful cultural norms and protection-sensitive messaging.",
    location: "Mayiandit County, Unity State",
    storySlug: "mayiandit-leaders-cultural-norms",
  },
  {
    dateLabel: "—",
    title: "NFI distribution",
    summary:
      "Distribution of non-food items in Torit as part of UNHCR-supported response activities.",
    location: "Torit, Eastern Equatoria",
    partner: "UNHCR",
    storySlug: "nfi-torit-eastern-equatoria-unhcr",
  },
  {
    dateLabel: "—",
    title: "Capacity-building for CBP actors",
    summary:
      "Capacity-building for community leaders and members of community-based protection networks.",
    location: "Unity / Jonglei (field rotations)",
    storySlug: "capacity-building-cbp-leaders",
  },
  {
    dateLabel: "—",
    title: "Field presence — Panyijiar",
    summary: "MHA team operations documented in Panyijiar County.",
    location: "Panyijiar County, Unity State",
  },
  {
    dateLabel: "—",
    title: "Field presence — Akobo & Uror",
    summary: "MHA team operations documented in Akobo and Uror counties.",
    location: "Akobo & Uror counties, Jonglei State",
  },
];

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about#story" },
      { label: "Transparency", href: "/about#transparency" },
      { label: "Mission & Vision", href: "/about#mission" },
      { label: "Leadership", href: "/about#leadership" },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "Protection", href: "/programs/protection" },
      { label: "Gender-Based Violence", href: "/programs/gbv" },
      { label: "Child Protection", href: "/programs/child-protection" },
      { label: "Housing, Land & Property", href: "/programs/hlp" },
      { label: "Youth Engagement", href: "/programs/youth-engagement" },
    ],
  },
  { label: "Impact", href: "/impact" },
  { label: "Stories", href: "/stories" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

export const inquiryTypes = [
  "I want to donate",
  "I want to partner with MHA",
  "I want to volunteer",
  "Media inquiry",
  "General inquiry",
] as const;

export const aboutPreview = {
  headline: "Delivering Life-Saving Assistance to Displaced Communities",
  paragraphs: [
    "Mobile Humanitarian Agency (MHA) is a South Sudanese NGO established in 2017 to safeguard rights and restore dignity for people affected by conflict and displacement.",
    "We combine rapid emergency response with longer-term community resilience—deploying a predominantly field-based team to reach remote areas, including islands accessible only by canoe.",
  ],
  checklist: [
    "Registered under NGOs Act 2016",
    "85% workforce deployed in the field",
    "Operating in hard-to-reach areas including islands reachable only by canoe",
    "Dual focus: emergency response + community resilience",
  ],
};

export const strategicPurpose = {
  title: "Strategic purpose",
  body: "MHA maintains a dual mandate: deliver timely life-saving assistance during shocks while strengthening community capacity to identify priorities, manage risks, and sustain gains over time.",
};

export const impactPageStats: Stat[] = [
  { value: 8, label: "Counties", suffix: "" },
  { value: 82, label: "Staff", suffix: "+" },
  { value: 7, label: "Years of service", suffix: "+" },
  { value: 12, label: "Thematic areas", suffix: "" },
];

export const fieldStories: FieldStory[] = [
  {
    slug: "listening-posts-leer",
    title: "Listening posts changed how families report risk",
    excerpt:
      "Community volunteers in Leer County supported weekly listening posts so concerns could be escalated quickly—reducing dangerous gaps between incidents and response.",
    location: "Leer County, Unity State",
    image: storyImage("listening-posts-leer", "protection"),
    thematicSlug: "protection",
    body: [
      "Volunteers trained alongside MHA protection teams documented risks using simple, community-owned tools.",
      "Escalation pathways were agreed with local leaders so sensitive cases could move to appropriate services.",
    ],
  },
  {
    slug: "safe-space-mayiandit",
    title: "A safe space for adolescents after displacement",
    excerpt:
      "A temporary safe space gave young people structured activities, psychosocial support, and referral options while families stabilized shelter and food.",
    location: "Mayiandit County, Unity State",
    image: storyImage("safe-space-mayiandit", "child-protection"),
    thematicSlug: "child-protection",
    body: [
      "Facilitators used child-friendly approaches aligned to safeguarding standards.",
      "Referrals were coordinated with health and protection actors where needed.",
    ],
  },
  {
    slug: "youth-skills-dukor",
    title: "Youth skills sessions built confidence—and income ideas",
    excerpt:
      "Peer mentors supported literacy refreshers and practical vocational orientation so participants could explore small enterprise options safely.",
    location: "Duk County, Jonglei State",
    image: storyImage("youth-skills-dukor", "youth-engagement"),
    thematicSlug: "youth-engagement",
    body: [
      "Workshops combined numeracy refreshers with business basics relevant to local markets.",
      "Partnerships extended reach through trusted community structures.",
    ],
  },
  {
    slug: "youth-launch-leer-june-2023",
    title: "Youth engagement training launched in Leer",
    excerpt:
      "Public launch of youth training in Leer County, with volunteer trainers supported through the USAID Youth Engagement Project.",
    location: "Leer County, Unity State",
    image: storyImage("youth-launch-leer-june-2023", "youth-engagement"),
    thematicSlug: "youth-engagement",
    body: [
      "The event marked a visible milestone for youth programming in the county, with community leaders and participants present.",
      "MHA continues youth engagement in partnership with EDC, DRC, SFCG, and national NGOs across Leer, Mayiandit, Panyijiar, Duk, and Uror.",
    ],
  },
  {
    slug: "cbp-centre-pigi-canal-jonglei",
    title: "Community-based protection centre in Pigi/Canal",
    excerpt:
      "Infrastructure and community structures supporting protection monitoring and response in a Jonglei corridor community.",
    location: "Pigi/Canal, Jonglei State",
    image: storyImage("cbp-centre-pigi-canal-jonglei", "protection"),
    thematicSlug: "protection",
    body: [
      "The centre supports community-based protection networks to document risks and coordinate with wider protection actors where needed.",
    ],
  },
  {
    slug: "cbp-training-dablual-mayiandit",
    title: "CBP members trained in Dablual, Mayiandit",
    excerpt:
      "Hands-on training for community-based protection members to strengthen local monitoring and referral awareness.",
    location: "Dablual, Mayiandit County, Unity State",
    image: storyImage("cbp-training-dablual-mayiandit", "protection"),
    thematicSlug: "protection",
    body: [
      "Training combined practical tools with clear escalation routes so volunteers can act safely within their mandate.",
    ],
  },
  {
    slug: "cbp-centre-dablual-mayiandit",
    title: "Protection centre in Dablual, Mayiandit",
    excerpt:
      "A dedicated space for community-based protection activities, complementing outreach and training in the county.",
    location: "Mayiandit County, Unity State",
    image: storyImage("cbp-centre-dablual-mayiandit", "protection"),
    thematicSlug: "protection",
    body: [
      "Centres are part of MHA’s approach to keep protection dialogue and support close to affected populations.",
    ],
  },
  {
    slug: "mayiandit-leaders-cultural-norms",
    title: "Leaders sensitized on harmful cultural norms",
    excerpt:
      "Structured engagement with community leaders in Mayiandit on adverse effects of harmful norms and on rights-sensitive community dialogue.",
    location: "Mayiandit County, Unity State",
    image: storyImage("mayiandit-leaders-cultural-norms", "gbv"),
    thematicSlug: "gbv",
    body: [
      "Sessions involved chiefs, religious leaders, and other influencers alongside programme staff to align messaging with local structures.",
    ],
  },
  {
    slug: "nfi-torit-eastern-equatoria-unhcr",
    title: "NFI distribution in Torit (UNHCR project)",
    excerpt:
      "Distribution of non-food items in Torit, Eastern Equatoria, implemented under the UNHCR project framework.",
    location: "Torit, Eastern Equatoria",
    image: storyImage("nfi-torit-eastern-equatoria-unhcr", "logistics"),
    thematicSlug: "logistics",
    body: [
      "Distributions followed agreed beneficiary communication and verification approaches with UNHCR and local authorities.",
    ],
  },
  {
    slug: "capacity-building-cbp-leaders",
    title: "Capacity-building for protection network leaders",
    excerpt:
      "Training for community leaders and community-based protection network members on roles, reporting, and safe referral practice.",
    location: "Unity & Jonglei states",
    image: storyImage("capacity-building-cbp-leaders", "protection"),
    thematicSlug: "protection",
    body: [
      "Building consistent skills across counties helps networks support each other and stay aligned to national cluster standards.",
    ],
  },
];

export const hero = {
  eyebrow: "Humanitarian Response · South Sudan",
  titleLines: ["Safeguarding Rights.", "Restoring Dignity."],
  subtext:
    "Since 2017, MHA has delivered life-saving assistance to displaced communities across South Sudan — reaching remote areas others can't.",
  image: "/images/hero/home-hero.jpg",
};

export const ctaQuote =
  "We reach communities others can't — including islands accessible only by canoe.";
