import type {
  Affiliation,
  CareerVacancy,
  DonationMethod,
  FieldStory,
  LeadershipMember,
  NavItem,
  NewsItem,
  ProjectHighlight,
  ImpactChartItem,
  MediaVideo,
  PublicDocument,
  Stat,
  ThematicArea,
} from "@/types";
import { programImage, storyImage } from "@/lib/unsplashMedia";

export const site = {
  name: "Mobile Humanitarian Agency",
  acronym: "MHA",
  tagline: "Safeguarding Rights. Restoring Dignity.",
  description:
    "Registered under South Sudan’s NGOs Act (2016), Mobile Humanitarian Agency (MHA) is a nonprofit NGO established in 2017 to safeguard the rights and well-being of people forced to flee—including IDPs, returnees, refugees, and host communities—with principled, non-discriminatory humanitarian assistance alongside partners.",
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
  { value: 14, label: "Thematic Areas", suffix: "" },
];

/** Homepage / programs intro — aligned with agency thematic narrative (see org thematic brief). */
export const thematicSectionIntro =
  "MHA delivers assistance across fourteen interconnected thematic areas—from protection and GBV to community engagement, WASH, shelter and NFIs, livelihoods, education, and the logistics that keep teams present where road access ends.";

export const thematicCrossCutting =
  "Across all areas we work in a coordinated, community-based way: participatory needs assessments, implementation aligned with community priorities and safeguarding standards, and referral pathways strengthened with specialized partners. We use accountability mechanisms—including feedback and complaint handling—do-no-harm practice, and age-, gender-, and disability-inclusive approaches, with dedicated community engagement so affected people help shape decisions that affect their lives.";

export const thematicAreas: ThematicArea[] = [
  {
    slug: "protection",
    title: "Protection",
    shortDesc:
      "Minimizing harm and upholding rights through monitoring, risk assessment, case management, and community-based prevention.",
    fullDesc:
      "MHA’s protection work aims to minimize harm, enhance safety, and uphold individuals’ rights during displacement and crises. Teams conduct routine protection monitoring and risk assessment, support case management, and make referrals when specialized services sit outside MHA’s direct scope—so people still reach comprehensive support. Community-based protection networks underpin practical action to reduce vulnerability to violence and abuse. We train community members on fundamental human rights so they can advocate for their own protection needs, pair targeted assistance with monitoring insights for the most vulnerable, and facilitate documentation and access to legal aid, social support, and administrative procedures where appropriate.",
    icon: "shield",
    image: programImage("protection"),
    keyActivities: [
      "Protection monitoring, risk assessment, and reporting",
      "Case management and referrals to specialized services",
      "Community-based prevention, documentation, and access to services",
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
      "Survivor-focused GBV prevention and response—referral pathways, safe service delivery, and community awareness.",
    fullDesc:
      "MHA advances GBV prevention and response with survivor-focused services and community awareness. We coordinate with healthcare providers, authorities, and partners on protecting women and children from sexual and gender-based violence and wider protection risks—including school-related GBV through support to gender activists, school management committees, and PTAs to foster safer learning environments. Community sessions with parents, religious leaders, chiefs, and judicial staff address women’s rights and the consequences of GBV, with life-saving information on where to access services. Services mapping informs safe referral pathways; where possible we support survivors to access justice and work with specialized actors under confidentiality and informed consent.",
    icon: "heart",
    image: programImage("gbv"),
    keyActivities: [
      "School-related GBV prevention with SMCs, PTAs, and gender activists",
      "Community dialogues with leaders; safe referral pathways after services mapping",
      "Survivor-centered referrals, justice support, and coordination with specialized actors",
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
      "Keeping children safe and supported—monitoring, consultations, referrals, and stronger protective environments.",
    fullDesc:
      "Child protection programming keeps children safe, supported, and able to access essential services. At the onset of disasters MHA can provide safe spaces, psychological first aid, and emergency supplies alongside awareness on child rights, safeguarding, and protection from violence, exploitation, and abuse. We help establish systems to identify and report concerns, train local staff, leaders, and caregivers in best practices, and facilitate holistic access to health, education, and psychosocial support. Where systems allow, we support tracing and reunification with families—or appropriate alternative care when reunification is not possible.",
    icon: "baby",
    image: programImage("child-protection"),
    keyActivities: [
      "Monitoring, consultations, and case referral pathways",
      "Prevention: caregiving, safeguarding, and reporting awareness",
      "School-based protection and community response mechanisms where feasible",
    ],
    impactStats: [
      { value: "Rapid", label: "Emergency response activation" },
      { value: "Community", label: "Rights awareness sessions" },
    ],
  },
  {
    slug: "community-engagement",
    title: "Community Engagement",
    shortDesc:
      "Feedback mechanisms, participatory assessments, and transparent two-way communication so communities shape assistance.",
    fullDesc:
      "Community engagement strengthens trust and accountability by ensuring affected people participate in decisions that affect their lives. MHA uses feedback mechanisms—including hotlines and suggestion channels where available—community meetings, and feedback tracking, and adapts services based on priorities communities identify. Activities include participatory needs assessments, support to community committees and volunteers, and clear communication on assistance criteria, timelines, and safety. We promote complaint handling, responsive follow-up, and outreach that reaches vulnerable groups.",
    icon: "users",
    image: programImage("community-engagement"),
    keyActivities: [
      "Feedback channels, meetings, and tracking with follow-up",
      "Participatory needs assessments and community committees",
      "Transparent communication on criteria, timelines, and safety",
    ],
    impactStats: [
      { value: "Two-way", label: "Communication & accountability" },
      { value: "Inclusive", label: "Outreach to vulnerable groups" },
    ],
  },
  {
    slug: "hlp",
    title: "HLP & Justice",
    shortDesc:
      "Housing, land, and property rights plus legal awareness, documentation support, and access to remedies.",
    fullDesc:
      "HLP and justice work helps households resolve disputes and barriers linked to housing, land, and property. MHA conducts community sensitization and legal awareness on HLP rights within broader human rights and legal frameworks, assists with alternative dispute resolution—especially lost documents and land registration—and supports referrals to legal and administrative services. In return areas we document HLP contributing factors and engage local authorities and community leaders to pursue amicable solutions, with emphasis on access, confidentiality, and conflict sensitivity.",
    icon: "home",
    image: programImage("hlp"),
    keyActivities: [
      "Community sensitization on HLP and wider human rights frameworks",
      "ADR, documentation support, and return-area factor documentation",
      "Engagement with authorities and leaders toward amicable solutions",
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
      "Youth consultations, safe spaces, skills, mentorship, and positive engagement to build resilience.",
    fullDesc:
      "Youth engagement builds resilience through literacy and numeracy—including storytelling, interactive learning, and digital tools where feasible—plus budgeting, financial literacy, and practical math for daily decisions. Hands-on vocational training in agriculture, entrepreneurship, and technology, with workshops and mentorship, supports employability. Peer-led activities, community service, and psychosocial referrals help youth support one another and reduce harmful coping. MHA has implemented youth engagement activities with EDC, DRC, SFCG, and four other national NGOs across Leer, Mayiandit, Panyijiar, Duk, and Uror counties.",
    icon: "graduation-cap",
    image: programImage("youth-engagement"),
    keyActivities: [
      "Literacy, numeracy, financial literacy, and digital learning where feasible",
      "Vocational skills in agriculture, entrepreneurship, and technology",
      "Peer outreach, community service, and partnerships (EDC, DRC, SFCG + national NGOs)",
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
      "Safe water, sanitation, and hygiene—including water points, household sanitation support, and hygiene promotion.",
    fullDesc:
      "Water, sanitation, and hygiene interventions improve access to safe water and hygiene practices to reduce disease. Where appropriate this includes water trucking or rehabilitation, installing or repairing water points, supporting household sanitation items, and promoting safe water handling. MHA promotes hygiene through community volunteers and targeted messaging on handwashing, latrine use, and menstrual hygiene management. Where possible, WASH incorporates community-driven maintenance and feedback so services last beyond initial distribution.",
    icon: "droplets",
    image: programImage("wash"),
    keyActivities: [
      "Water point rehabilitation / water trucking where suitable",
      "Household sanitation support and safe water handling",
      "Hygiene promotion (MHM, handwashing, latrine use) with community volunteers",
    ],
    impactStats: [
      { value: "Settlement", label: "Focused WASH outreach" },
      { value: "Schools", label: "Hygiene behavior change" },
    ],
  },
  {
    slug: "shelter-nfis",
    title: "Shelter & NFIs",
    shortDesc:
      "Emergency shelter support and essential non-food items—prioritizing vulnerable households and safe, dignified distribution.",
    fullDesc:
      "Shelter and NFI assistance helps households meet immediate safety and dignity needs. Activities include distributing essential NFIs—blankets, hygiene items, cooking utensils, and weather-appropriate supplies—and supporting emergency shelter options suited to local context. MHA works with communities to identify shelter gaps, prioritize vulnerable households, and strengthen preparedness. Where relevant we coordinate referrals for specialized shelter support and apply safe distribution practices to protect affected people and reduce risks.",
    icon: "package",
    image: programImage("shelter-nfis"),
    keyActivities: [
      "NFI kits and weather-appropriate relief items",
      "Emergency shelter options and gap analysis with communities",
      "Safe distribution and referrals to specialized shelter actors",
    ],
    impactStats: [
      { value: "Vulnerability-led", label: "Prioritization with communities" },
      { value: "Protection-sensitive", label: "Safe distribution practice" },
    ],
  },
  {
    slug: "food-security-livelihoods",
    title: "Food Security & Livelihoods",
    shortDesc:
      "Food, cash, or vouchers where appropriate; livelihood inputs, market linkages, and feedback-informed targeting.",
    fullDesc:
      "Food security and livelihoods assistance strengthens household food security through short- and medium-term strategies. Activities can include food, cash, or vouchers where suitable; distribution of livelihood inputs such as agricultural tools or small-scale supplies; and connections to services that help households rebuild productive capacity. MHA supports community-based targeting where possible, offers guidance on livelihood practices, and monitors food security conditions and community feedback to adjust assistance and buffer seasonal shocks and longer-term vulnerability.",
    icon: "wheat",
    image: programImage("food-security-livelihoods"),
    keyActivities: [
      "Food, cash, or voucher modalities when appropriate",
      "Livelihood inputs and links to productive services",
      "Targeting, monitoring, and feedback to adapt FSL programming",
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
      "Screening, referrals, IYCF and complementary feeding messaging—coordinated with health, WASH, and protection.",
    fullDesc:
      "Nutrition programming supports nutritional health for children and caregivers and promotes appropriate infant and young child feeding. It typically includes screening for acute malnutrition, referrals, community engagement, and behavior-change communication on IYCF and complementary feeding. Where services exist, MHA facilitates referrals and follow-up. Activities are coordinated with health, WASH, and protection, with particular attention to children under five and pregnant or breastfeeding women.",
    icon: "apple",
    image: programImage("nutrition"),
    keyActivities: [
      "Acute malnutrition screening and referral",
      "IYCF and complementary feeding messaging",
      "Coordination with health, WASH, and protection actors",
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
      "Community mobilization, health awareness, and referral networks aligned with Ministry of Health and partners.",
    fullDesc:
      "Health support strengthens access to essential health information and referrals in hard-to-reach communities. MHA supports health outcomes through community mobilization, referral networks, and coordination with the Ministry of Health and partners where activities fit the organizational mandate—consistent with the cross-cutting emphasis on referrals, confidentiality, and integrated response alongside nutrition, WASH, and protection.",
    icon: "stethoscope",
    image: programImage("health"),
    keyActivities: [
      "Health awareness and community mobilization",
      "Referral pathway strengthening with health actors",
      "Coordinated outreach with cluster and Ministry partners",
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
      "Learning spaces, materials, safe access to education, teacher/community safeguarding, and inclusive referrals.",
    fullDesc:
      "Education programming promotes children’s learning and wellbeing in displacement or crisis settings. It often includes creating or restoring learning spaces, providing school supplies and materials, and supporting safe access to education. MHA may integrate psychosocial support through learning activities, train teachers and communities on safeguarding, and refer children with additional protection needs. Interventions aim to be inclusive, reduce barriers to attendance, and coordinate with local education authorities or partners.",
    icon: "book-open",
    image: programImage("education-in-emergencies"),
    keyActivities: [
      "Learning spaces and materials; safer access to education",
      "Teacher and community safeguarding orientation",
      "Inclusive approaches and coordination with education authorities",
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
      "Dialogue, conflict-sensitive engagement, and local mediation to reduce tensions and rebuild trust.",
    fullDesc:
      "Peacebuilding activities focus on reducing tensions and strengthening social cohesion where conflict, displacement, or insecurity affect communities. MHA facilitates dialogue and conflict-sensitive engagement—including moderated discussions, collaborative problem-solving, and support for local mediation. Programs may address drivers of violence such as rumors, grievances, or unequal access to aid through transparent communication and inclusive participation, advocating non-discrimination and community-led solutions to improve safety and trust across groups.",
    icon: "handshake",
    image: programImage("peacebuilding"),
    keyActivities: [
      "Facilitated dialogue and collaborative problem-solving",
      "Support to local mediation and conflict-sensitive engagement",
      "Transparent communication on aid access and inclusion",
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
      "Fleet, warehouse, and last-mile supply chain so teams and commodities reach remote locations safely and accountably.",
    fullDesc:
      "Operations and logistics keep MHA present where road access is limited—including islands reachable by canoe—while adhering to fleet, stock, and security policies. Teams coordinate dispatch, warehousing, and movement planning with program leads so shelter, NFI, WASH, and other inputs move on time; distributions in communities are implemented with the Shelter & NFI and thematic teams to uphold accountability and safe last-mile delivery.",
    icon: "truck",
    image: programImage("logistics"),
    keyActivities: [
      "Fleet, movement, and security-compliant field access",
      "Warehouse, stock control, and dispatch coordination",
      "Last-mile logistics aligned with Shelter/NFI and program teams",
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
    "As a South Sudanese organization, MHA brings deep knowledge of local challenges, cultures, experiences, and indigenous community strengths.",
    "Professional, experienced staff with strong field exposure—a comparative advantage in remote and volatile contexts across the country.",
    "Static and mobile delivery models, including hard-to-reach areas and islands accessible only by canoe.",
  ],
};

export const managementModel = {
  title: "Governance & management",
  paragraphs: [
    "The Board of Directors (five members) oversees strategy, policy formulation, and performance monitoring. The Executive Director serves as a board member—linking governance directly to day-to-day operations.",
    "Quarterly board visits enable thorough progress review and timely course correction.",
    "Programme implementation is led by Program Managers and technical staff, with support from Project Technical Managers as required.",
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

/** Public downloads — upload PDFs to `public/documents/` to enable direct download links. */
export const publicDocuments: PublicDocument[] = [
  {
    title: "NGO Registration Certificate",
    category: "registration",
    description: "Proof of registration under South Sudan NGOs Act 2016.",
    year: "2016",
    onRequest: true,
  },
  {
    title: "Organizational Profile",
    category: "governance",
    description: "Overview of mandate, thematic areas, geography, and governance.",
    onRequest: true,
  },
  {
    title: "Annual Report",
    category: "finance",
    description: "Summary of programmes, reach, and financial stewardship for the reporting year.",
    onRequest: true,
  },
  {
    title: "Audited Financial Statements",
    category: "finance",
    description: "Independent audit summary where available for partner due diligence.",
    onRequest: true,
  },
  {
    title: "Child Safeguarding Policy",
    category: "safeguarding",
    description: "Standards for working with children and reporting concerns.",
    onRequest: true,
  },
  {
    title: "PSEA Policy",
    category: "safeguarding",
    description: "Prevention of sexual exploitation, abuse, and harassment.",
    onRequest: true,
  },
  {
    title: "Anti-Fraud & Bribery Policy",
    category: "governance",
    description: "Financial integrity and reporting expectations for staff and partners.",
    onRequest: true,
  },
  {
    title: "Whistle-blowing Policy",
    category: "governance",
    description: "Confidential channels for reporting misconduct without retaliation.",
    onRequest: true,
  },
];

export const donationMethods: DonationMethod[] = [
  {
    title: "Bank transfer",
    description: "Preferred for institutional donors and larger gifts.",
    details: [
      "Contact finance@mha-ss.org or mobilehumanitarianagency@gmail.com for official account details and payment reference instructions.",
      "Include your name or organization in the transfer reference so we can acknowledge your gift.",
    ],
  },
  {
    title: "In-kind contributions",
    description: "Goods and services aligned to active programmes.",
    details: [
      "NFIs, WASH items, and programme inputs may be accepted when they match field needs and quality standards.",
      "Email us with item descriptions, quantities, and intended location before shipping.",
    ],
  },
  {
    title: "Partnership funding",
    description: "Grants and co-funding through UN agencies, NGOs, and institutional donors.",
    details: [
      "MHA works with USAID, UNHCR, UNICEF, SSHF, and other partners — use the partner pathway for formal proposals.",
    ],
  },
  {
    title: "Online giving (coming soon)",
    description: "Card and mobile-money options are being set up for smaller gifts.",
    details: [
      "Until live, start a conversation via the contact form — select “I want to donate” — and our team will guide you.",
    ],
  },
];

/** Org announcements only — field milestones live on /stories, not duplicated here. */
export const newsItems: NewsItem[] = [
  {
    slug: "website-transparency-resources",
    title: "Transparency resources now published online",
    date: "2026-05-01",
    category: "announcement",
    excerpt:
      "Governance documents and due-diligence materials are easier to find for partners and donors.",
    image: "/og-image.svg",
    body: [
      "The Resources page lists policies and financial documents available on request while direct PDF uploads are finalized.",
      "Partners seeking formal packs should contact the Juba headquarters or use the contact form with a due-diligence inquiry.",
    ],
  },
  {
    slug: "impact-dashboard-published",
    title: "Interactive impact dashboard added",
    date: "2026-05-01",
    category: "announcement",
    excerpt:
      "The Impact page now includes charts summarizing geography, programme portfolio, and public activity lines.",
    image: "/images/hero/home-hero.jpg",
    body: [
      "The dashboard is representative of published MHA data — not a live operational database.",
      "Detailed activity lines remain in the public project log on the Impact page.",
    ],
  },
  {
    slug: "film-media-hub-launched",
    title: "Film & media hub launched",
    date: "2026-05-01",
    category: "announcement",
    excerpt:
      "A dedicated space for documentary and programme video is live — footage will be added as it is cleared for publication.",
    image: "/images/stories/capacity-building-cbp-leaders.jpg",
    body: [
      "Visit the Media page for featured films and field clips.",
      "Full written narratives from the same programmes remain on Field stories.",
    ],
  },
];

export const leadershipTeam: LeadershipMember[] = [
  {
    name: "John Gatyiel Chuol",
    role: "Executive Director · Board Member",
    group: "management",
    bio: "Leads day-to-day operations and programme delivery, linking field teams with governance oversight and partner coordination.",
  },
  {
    name: "Board of Directors",
    role: "5 members · Quarterly oversight",
    group: "board",
    bio: "Sets strategy, approves policies, and reviews performance. The Executive Director serves on the board to connect governance with operations.",
  },
  {
    name: "Programme Management",
    role: "Programme & Technical Managers",
    group: "technical",
    bio: "Leads thematic implementation across protection, GBV, child protection, WASH, shelter/NFI, livelihoods, and logistics — with Project Technical Managers as required.",
  },
  {
    name: "Finance & Compliance",
    role: "Financial Controller & accounting team",
    group: "technical",
    bio: "Maintains books, internal controls, and reporting aligned with MHA financial, anti-fraud, and whistle-blowing policies.",
  },
];

export const careerVacancies: CareerVacancy[] = [
  {
    id: "prog-manager-protection",
    title: "Programme Manager — Protection",
    location: "Juba, South Sudan (with field travel)",
    type: "full-time",
    closingLabel: "Open until filled",
    summary:
      "Lead protection programming across Unity and Jonglei, including monitoring, community-based networks, and safe referrals.",
    responsibilities: [
      "Oversee protection assessments, monitoring tools, and reporting to clusters and donors.",
      "Supervise field coordinators and community-based protection focal points.",
      "Ensure safeguarding and PSEA standards are applied in all activities.",
    ],
    requirements: [
      "5+ years humanitarian protection experience, preferably in South Sudan.",
      "Strong coordination skills with UN/clusters and local authorities.",
      "Fluent English; Arabic or local languages an asset.",
    ],
  },
];

export const careersIntro = {
  title: "Careers at MHA",
  paragraphs: [
    "MHA recruits South Sudanese professionals and specialists who can work in remote, volatile contexts with integrity and community respect.",
    "When no roles are listed below, we still welcome expressions of interest — especially for protection, GBV, child protection, logistics, and MEAL profiles.",
  ],
  applyEmail: "mobilehumanitarianagency@gmail.com",
};

/** Footer & site — replace with live profiles when available */
export const socialLinks = {
  website: "https://mha-ss.org",
  email: "mobilehumanitarianagency@gmail.com",
} as const;

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about#story" },
      { label: "Transparency", href: "/about#transparency" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Resources", href: "/resources" },
      { label: "Mission & Vision", href: "/about#mission" },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "Protection", href: "/programs/protection" },
      { label: "Gender-Based Violence", href: "/programs/gbv" },
      { label: "Child Protection", href: "/programs/child-protection" },
      { label: "Community Engagement", href: "/programs/community-engagement" },
      { label: "HLP & Justice", href: "/programs/hlp" },
      { label: "Youth Engagement", href: "/programs/youth-engagement" },
      { label: "Shelter & NFIs", href: "/programs/shelter-nfis" },
    ],
  },
  { label: "Impact", href: "/impact" },
  {
    label: "Stories",
    href: "/stories",
    children: [
      { label: "Field narratives", href: "/stories" },
      { label: "Insights (blog)", href: "/blog" },
      { label: "Film & media", href: "/media" },
    ],
  },
  { label: "News", href: "/news" },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      { label: "Donate", href: "/donate" },
      { label: "Partner", href: "/contact" },
      { label: "Volunteer", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
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
    "Mobile Humanitarian Agency (MHA) is a South Sudanese NGO established in 2017 to safeguard rights and restore dignity for people affected by conflict and displacement—including IDPs, returnees, refugees, and host communities, with particular attention to the most vulnerable.",
    "Registered under the NGOs Act 2016, we work with humanitarian partners to uphold non-discrimination in service delivery. We combine rapid emergency response with longer-term resilience—deploying a predominantly field-based team to reach remote areas, including islands accessible only by canoe.",
  ],
  checklist: [
    "Registered under NGOs Act 2016",
    "85% workforce deployed in the field",
    "Operating in hard-to-reach areas including islands reachable only by canoe",
    "Dual focus: emergency response + community-based protection & resilience",
  ],
};

export const strategicPurpose = {
  title: "Strategic purpose",
  body: "MHA’s dual focus combines emergency response with strengthening existing community-based protection mechanisms—so communities can weather shocks today while building resilience, local ownership, and capacity for the long term.",
};

export const impactPageStats: Stat[] = [
  { value: 8, label: "Counties", suffix: "" },
  { value: 82, label: "Staff", suffix: "+" },
  { value: 7, label: "Years of service", suffix: "+" },
  { value: 14, label: "Thematic areas", suffix: "" },
];

/** Data for interactive impact dashboard charts on /impact */
export const impactDashboardCharts = {
  headlineMetrics: [
    { label: "Field-based workforce", value: 85, hint: "% of staff deployed outside Juba" },
    { label: "Counties with active programming", value: 8, hint: "Unity & Jonglei core footprint" },
    { label: "Documented activity log entries", value: 9, hint: "Representative public milestones" },
    { label: "Field narratives published", value: 10, hint: "Consent-led stories on this site" },
  ] satisfies ImpactChartItem[],
  countiesByState: [
    { label: "Unity State", value: 3, hint: "Leer, Mayiandit, Panyijiar" },
    { label: "Jonglei State", value: 5, hint: "Akobo, Uror, Duk, Pigi/Canal" },
  ] satisfies ImpactChartItem[],
  activityByRegion: [
    { label: "Unity State", value: 5 },
    { label: "Jonglei State", value: 3 },
    { label: "Partner-funded (other states)", value: 1 },
  ] satisfies ImpactChartItem[],
  programmePortfolio: [
    { label: "Protection, GBV & child protection", value: 3 },
    { label: "Community engagement & HLP", value: 2 },
    { label: "WASH, shelter & NFIs", value: 2 },
    { label: "Livelihoods, food & nutrition", value: 3 },
    { label: "Health, education & peacebuilding", value: 2 },
    { label: "Logistics & field operations", value: 2 },
  ] satisfies ImpactChartItem[],
};

export const mediaHubIntro = {
  title: "Film & field media",
  subtitle:
    "Documentary-style footage and programme clips from MHA teams — add YouTube IDs in content.ts when videos are ready.",
};

/** Documentary / video hub — set `youtubeId` when uploads are public */
export const mediaVideos: MediaVideo[] = [
  {
    slug: "field-presence-reel",
    title: "MHA field presence — South Sudan",
    description:
      "Overview of how teams reach remote counties, coordinate with clusters, and deliver principled assistance.",
    posterImage: "/images/hero/home-hero.jpg",
    durationLabel: "Coming soon",
    featured: true,
    location: "Unity & Jonglei states",
  },
  {
    slug: "youth-engagement-leer",
    title: "Youth engagement training — Leer",
    description: "Launch activities under the USAID Youth Engagement Project.",
    posterImage: "/images/stories/youth-launch-leer-june-2023.jpg",
    durationLabel: "Coming soon",
    location: "Leer County, Unity State",
  },
  {
    slug: "community-protection-networks",
    title: "Community-based protection networks",
    description: "How listening posts and safe spaces connect communities to response.",
    posterImage: "/images/stories/listening-posts-leer.jpg",
    durationLabel: "Coming soon",
    location: "Unity & Jonglei",
  },
  {
    slug: "nfi-distribution-behind-scenes",
    title: "Last-mile NFI delivery",
    description: "Coordination with UNHCR and local authorities during distributions.",
    posterImage: "/images/stories/nfi-torit-eastern-equatoria-unhcr.jpg",
    durationLabel: "Coming soon",
    location: "Torit, Eastern Equatoria",
  },
];

export const fieldStories: FieldStory[] = [
  {
    slug: "listening-posts-leer",
    title: "Listening posts changed how families report risk",
    excerpt:
      "Community volunteers in Leer County supported weekly listening posts so concerns could be escalated quickly—reducing dangerous gaps between incidents and response.",
    outcome: "Community-owned reporting shortened the path from risk to coordinated response.",
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
    outcome: "Young people accessed structured support and referrals while households regained stability.",
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
    outcome: "Participants left with stronger literacy, numeracy, and practical livelihood options to explore.",
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
    outcome: "County leaders and youth publicly committed to an expanded training and mentorship pathway.",
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
    outcome: "A dedicated hub now anchors local protection monitoring and safer referral dialogue.",
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
    outcome: "Volunteers gained clearer tools and escalation routes to act safely within their mandate.",
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
    outcome: "Protection dialogue and follow-up now has a consistent, community-accessible venue.",
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
    outcome: "Influential leaders aligned on rights-sensitive messaging alongside programme staff.",
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
    outcome: "Households received agreed NFI kits with verification steps coordinated with UNHCR and authorities.",
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
    outcome: "Networks across counties share a more consistent baseline for safe reporting and referrals.",
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
