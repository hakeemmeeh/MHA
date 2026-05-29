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
    title: "General Protection",
    shortDesc:
      "Safety, dignity, and rights for refugees, returnees, IDPs, and host communities through monitoring, case management, and community-based protection.",
    fullDesc:
      "Our General Protection program promotes the safety, dignity, and rights of vulnerable populations affected by conflict, displacement, and humanitarian crises. We provide protection monitoring, case management, referrals, awareness sessions, and community-based protection services to individuals at risk, including refugees, returnees, IDPs, and host communities. The program also strengthens community resilience by supporting safe reporting mechanisms, legal documentation support, and advocacy for the protection of human rights. Through collaboration with local authorities and humanitarian partners, we work to ensure inclusive and accountable protection services for all affected populations.",
    icon: "shield",
    image: programImage("protection"),
    keyActivities: [
      "Mobile protection monitoring, focus group discussions, and monthly reporting to the cluster",
      "Community-based protection network (CBPN) training on PSN identification and referral pathways",
      "Individual protection assistance (IPA), case management, and coordinated referrals to specialized actors",
    ],
    impactStats: [
      { value: "15,600+", label: "People reached through scaled Leer protection programming (2023)" },
      { value: "1,900+", label: "Referrals facilitated to health, shelter, food, and other services" },
    ],
  },
  {
    slug: "gbv",
    title: "Gender-Based Violence (GBV)",
    shortDesc:
      "Preventing and responding to gender-based violence with survivor-centered services, safe spaces, and community prevention.",
    fullDesc:
      "Our GBV program focuses on preventing and responding to all forms of gender-based violence affecting women, girls, men, and boys. We provide survivor-centered services including psychosocial support, referrals, awareness campaigns, and safe spaces that promote dignity, healing, and protection. The program also engages communities, leaders, youth groups, and service providers in GBV prevention and risk mitigation activities. Through training, advocacy, and community dialogue, we aim to challenge harmful social norms and strengthen protection systems for vulnerable individuals.",
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
      "Safeguarding children from abuse, neglect, and exploitation through case management, reunification, and child-friendly spaces.",
    fullDesc:
      "Our Child Protection program works to safeguard children from abuse, neglect, exploitation, violence, and harmful practices. We support vulnerable children through case management, family tracing and reunification, psychosocial support, child-friendly spaces, and awareness campaigns that promote child rights and wellbeing. We also collaborate with caregivers, schools, community leaders, and local authorities to strengthen child protection systems and improve community-based care mechanisms. The program emphasizes safe learning environments and increased protection for children affected by emergencies and displacement.",
    icon: "baby",
    image: programImage("child-protection"),
    keyActivities: [
      "Child-friendly spaces (CFS) with structured play, MHPSS, and age-group activities",
      "Caregiver and community sessions on child rights, abuse, neglect, and safe referral pathways",
      "Family tracing and reunification, case management, and coordination with UNICEF and partners",
    ],
    impactStats: [
      { value: "2,600+", label: "Children reached through CFS activities in one month (Leer, 2023)" },
      { value: "4", label: "Core payams with active child protection outreach" },
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
    title: "HLP and Access to Justice",
    shortDesc:
      "Housing, land, and property rights support with legal awareness, mediation, referrals, and community dialogue for peaceful resolution.",
    fullDesc:
      "Our Housing, Land, and Property (HLP) and Access to Justice program supports vulnerable populations in addressing land disputes, property rights issues, and legal challenges. We provide legal awareness, mediation support, legal referrals, and community dialogue initiatives to promote peaceful conflict resolution and justice. The program works closely with traditional leaders, legal actors, and local authorities to strengthen fair and inclusive justice systems. Through advocacy and legal empowerment, we help individuals and communities secure their rights and improve access to justice services.",
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
    title: "Community and Youth Empowerment",
    shortDesc:
      "Leadership, skills development, and social inclusion for youth and communities through peacebuilding, sports, and entrepreneurship.",
    fullDesc:
      "Our Community and Youth Empowerment program promotes active participation, leadership, and social inclusion among youth and community members. As a USAID Youth Empowerment Activity (YEA) anchor organization with EDC, MHA runs pathway 1 and pathway 2 classes across Leer and Mayiandit counties—covering basic education literacy and numeracy, Work Ready Now, soft skills, and wellbeing—with youth corps leaders, local authorities, and community venues verified for safety and access. We support skills development, peacebuilding initiatives, sports activities, entrepreneurship, and community engagement that strengthen resilience and self-reliance, while creating opportunities for youth to participate in decision-making and community development. By empowering young people and local groups, we contribute to social cohesion, conflict prevention, and sustainable community transformation.",
    icon: "graduation-cap",
    image: programImage("youth-engagement"),
    keyActivities: [
      "USAID YEA classes: literacy, numeracy, Work Ready Now, and soft-skills pathways (Leer & Mayiandit)",
      "Training of trainers, classroom monitoring, and youth corps mobilization with YCLs and YLSOs",
      "Partnerships with EDC, DRC, SFCG, and national NGOs; peer outreach and community service",
    ],
    impactStats: [
      { value: "1,626+", label: "Youth enrolled across active YEA centers (Sep 2023)" },
      { value: "50", label: "Active training classes in Leer and Mayiandit" },
    ],
  },
  {
    slug: "wash",
    title: "WASH",
    shortDesc:
      "Safe water, sanitation, and hygiene through water points, hygiene materials, and community water and hygiene committees.",
    fullDesc:
      "Our Water, Sanitation, and Hygiene (WASH) program improves access to safe drinking water, sanitation facilities, and hygiene services for vulnerable communities. We support the rehabilitation and construction of water points, distribution of hygiene materials, and promotion of safe hygiene practices to reduce waterborne diseases. The program also strengthens community participation through the formation and training of water management committees and hygiene promoters. By improving sanitation and encouraging healthy practices, we contribute to better public health and community wellbeing.",
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
    title: "NFIs/Shelter",
    shortDesc:
      "Emergency and recovery assistance with essential household items and temporary or durable shelter for displaced families.",
    fullDesc:
      "Our Non-Food Items (NFIs) and Shelter program provides emergency and recovery assistance to displaced and vulnerable households. We distribute essential household items such as blankets, mosquito nets, kitchen sets, sleeping mats, and dignity kits to support families affected by crises. The program also supports the construction and rehabilitation of temporary and durable shelters to improve safety and living conditions. Through coordinated humanitarian response efforts, we help communities regain stability and dignity during emergencies and recovery periods.",
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
    title: "Food Security and Livelihoods",
    shortDesc:
      "Reducing hunger and building household resilience through agriculture, vocational training, and income-generating activities.",
    fullDesc:
      "Our Food Security and Livelihoods program aims to reduce hunger and improve household resilience through sustainable livelihood opportunities. We support vulnerable households with agricultural inputs, vocational skills training, small business support, and income-generating activities to enhance food production and economic stability. The program also promotes climate-smart agriculture, financial literacy, and community-based livelihood initiatives that strengthen self-reliance. By improving access to food and economic opportunities, we help communities recover from shocks and build sustainable futures.",
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
    title: "Health",
    shortDesc:
      "Essential healthcare, disease prevention, and maternal and child health for vulnerable and underserved populations.",
    fullDesc:
      "Our Health program improves access to essential healthcare services for vulnerable and underserved populations. We support primary healthcare services, health awareness campaigns, disease prevention activities, maternal and child health interventions, and referrals to specialized care when needed. The program also strengthens community health systems through training of healthcare workers, support to health facilities, and promotion of preventive health practices. By enhancing healthcare access and awareness, we contribute to healthier and more resilient communities.",
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
    title: "Education",
    shortDesc:
      "Inclusive, safe, and quality learning for children and youth affected by emergencies and displacement.",
    fullDesc:
      "Our Education program promotes inclusive, safe, and quality learning opportunities for children and youth affected by emergencies and displacement. We support school enrollment, distribution of learning materials, teacher capacity building, and rehabilitation of learning spaces to improve access to education. The program also prioritizes education for vulnerable groups including girls and children with disabilities. Through community engagement and child-centered approaches, we aim to create supportive learning environments that enhance academic performance and personal development.",
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
    dateLabel: "Jun–Sep 2023",
    title: "USAID Youth Empowerment Activity (Leer & Mayiandit)",
    summary:
      "Pathway 1 and 2 classes launched with EDC—50 active centers, 1,626+ youth enrolled, and ongoing trainer support across Unity State.",
    location: "Leer & Mayiandit counties, Unity State",
    partner: "USAID / EDC",
    storySlug: "youth-launch-leer-june-2023",
  },
  {
    dateLabel: "Jun 2023",
    title: "Child-friendly space activities (Leer)",
    summary:
      "MHPSS through CFS reached 2,694 children with structured play, drawing, and games—including rising returnee attendance from Sudan.",
    location: "Leer County, Unity State",
    storySlug: "safe-space-mayiandit",
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
    title: "Community-based protection centre",
    summary:
      "Community-based protection infrastructure in Pigi/Canal supporting local protection networks.",
    location: "Pigi/Canal, Jonglei State",
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
    title: "NFI distribution in Torit",
    summary:
      "Distribution of core relief items and NFIs in Torit, Eastern Equatoria State, under a UNHCR-funded protection monitoring project.",
    location: "Torit, Eastern Equatoria State",
    partner: "UNHCR",
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
      { label: "General Protection", href: "/programs/protection" },
      { label: "Gender-Based Violence (GBV)", href: "/programs/gbv" },
      { label: "Child Protection", href: "/programs/child-protection" },
      { label: "Community Engagement", href: "/programs/community-engagement" },
      { label: "HLP and Access to Justice", href: "/programs/hlp" },
      { label: "Community and Youth Empowerment", href: "/programs/youth-engagement" },
      { label: "NFIs/Shelter", href: "/programs/shelter-nfis" },
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
    { label: "Documented activity log entries", value: 10, hint: "Representative public milestones" },
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
      "Community volunteers in Dablual, Mayiandit County supported listening posts and protection monitoring so concerns could be escalated quickly—with findings shared with the protection cluster and partners.",
    outcome:
      "Community-owned reporting and monthly monitoring reports informed wider humanitarian responses in the area.",
    location: "Dablual, Mayiandit County, Unity State",
    image: storyImage("listening-posts-leer", "protection"),
    thematicSlug: "protection",
    body: [
      "Volunteers trained alongside MHA protection teams documented risks using simple, community-owned tools and focus group discussions with women, men, and community leaders.",
      "Escalation pathways were agreed with local leaders so sensitive cases could move to individual protection assistance, referrals, or specialized services where needed.",
      "Protection monitoring data was shared with the cluster and partners to inform health, WASH, education, nutrition, and wider responses.",
    ],
  },
  {
    slug: "safe-space-mayiandit",
    title: "A child-friendly space when families needed it most",
    excerpt:
      "In Leer County, a child-friendly space gave children aged 3–18 structured play, psychosocial support, and referral options—including many returnees arriving from Sudan.",
    outcome:
      "More than 2,600 children accessed MHPSS activities in one month, with inclusive participation for children with vulnerabilities.",
    location: "Leer County, Unity State",
    image: "/images/stories/youth-launch-leer-june-2023.jpg",
    thematicSlug: "child-protection",
    body: [
      "Animators led indoor and outdoor activities—drawing, games, sports, and group sessions—so children could express feelings and rebuild resilience in a protected environment.",
      "CFS teams identified protection concerns at the centre and coordinated referrals with health and protection actors where needed.",
      "Attendance grew as returnee children arrived from Sudan; teams continued mobilizing vulnerable children and adapting activities during the rainy season.",
    ],
  },
  {
    slug: "youth-skills-dukor",
    title: "Youth skills sessions built confidence—and income ideas",
    excerpt:
      "Peer mentors supported literacy refreshers and practical vocational orientation so participants could explore small enterprise options safely.",
    outcome: "Participants left with stronger literacy, numeracy, and practical livelihood options to explore.",
    location: "Duk County, Jonglei State",
    image: "/images/stories/youth-skills-dukor.jpg",
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
      "MHA opened USAID Youth Empowerment Activity classes across Leer and Mayiandit—with pathway 1 literacy and Work Ready Now training, pathway 2 cohorts, and trainers supported by EDC.",
    outcome:
      "By September 2023, 50 active classes enrolled 1,626+ youth (846 in Leer, 780 in Mayiandit), with ongoing monitoring and community-led mobilization.",
    location: "Leer & Mayiandit counties, Unity State",
    image: "/images/stories/youth-launch-leer-june-2023.jpg",
    thematicSlug: "youth-engagement",
    body: [
      "Cohort 1 training began in June 2023; pathway 2 classes followed in August, with training-of-trainers, venue verification, and pairing of youth corps leaders across payams.",
      "Classes covered basic education literacy and numeracy, audio Work Ready Now lessons, soft skills, and wellbeing—with supervisors visiting centers on foot when roads were impassable.",
      "MHA implements YEA with EDC as prime partner, alongside DRC, SFCG, and national NGOs, with local chiefs and payam administrators supporting recruitment.",
    ],
  },
  {
    slug: "cbp-training-dablual-mayiandit",
    title: "CBP members trained in Dablual, Mayiandit",
    excerpt:
      "Community-based protection network volunteers learned to identify persons with specific needs, document concerns safely, and refer cases through agreed pathways.",
    outcome:
      "CBPN members and community stakeholders gained shared tools for PSN identification, child protection concepts, and referral practice.",
    location: "Dablual, Mayiandit County, Unity State",
    image: storyImage("cbp-training-dablual-mayiandit", "protection"),
    thematicSlug: "protection",
    body: [
      "One-day capacity-building sessions covered vulnerability criteria, case identification, and referral pathways for community-based protection volunteers.",
      "Parallel trainings with chiefs, religious leaders, and stakeholders addressed child rights, neglect, exploitation, and when to escalate cases.",
      "Training complemented mobile protection monitoring and individual protection assistance delivered in nearby payams.",
    ],
  },
  {
    slug: "cbp-centre-dablual-mayiandit",
    title: "Protection centre in Pigi/Canal",
    excerpt:
      "Infrastructure and community structures supporting protection monitoring and response in Pigi/Canal, Jonglei State.",
    outcome: "A dedicated hub now anchors local protection monitoring and safer referral dialogue.",
    location: "Pigi/Canal, Jonglei State",
    image: storyImage("cbp-centre-pigi-canal-jonglei", "protection"),
    thematicSlug: "protection",
    body: [
      "The centre in Pigi/Canal supports community-based protection networks to document risks and coordinate with wider protection actors where needed.",
      "Centres are part of MHA’s approach to keep protection dialogue and support close to affected populations.",
    ],
  },
  {
    slug: "mayiandit-leaders-cultural-norms",
    title: "Leaders sensitized on harmful cultural norms",
    excerpt:
      "MHA engaged caregivers, parents, and community leaders on child labour, exploitation, neglect, early marriage, and protection-sensitive messaging in Unity State payams.",
    outcome:
      "Influential leaders and parents aligned on child rights messaging, including during school-based awareness days with local administrators.",
    location: "Mayiandit County, Unity State",
    image: storyImage("mayiandit-leaders-cultural-norms", "gbv"),
    thematicSlug: "gbv",
    body: [
      "Facilitated sessions with caregivers and parents described core concepts of child abuse, neglect, exploitation, and harmful practices affecting children in emergencies.",
      "Parents’ day ceremonies at primary schools brought together chiefs, religious leaders, and staff to discuss forced marriage, street children, and lack of parental care.",
      "Awareness at child-friendly spaces complemented wider GBV and child protection prevention, linking communities to services where available.",
    ],
  },
  {
    slug: "capacity-building-cbp-leaders",
    title: "Core relief item and NFI distribution in Torit",
    excerpt:
      "Distribution of core relief items and NFIs in Torit, Eastern Equatoria State, under a UNHCR-funded protection monitoring project.",
    outcome:
      "Households received essential NFIs with verification and coordination through the UNHCR-funded protection monitoring project.",
    location: "Torit, Eastern Equatoria State",
    image: storyImage("nfi-torit-eastern-equatoria-unhcr", "shelter-nfis"),
    thematicSlug: "shelter-nfis",
    body: [
      "MHA supported distributions of core relief items and non-food items to affected households in Torit, Eastern Equatoria State.",
      "The activity was implemented as part of a protection monitoring project funded by UNHCR, with beneficiary communication and verification coordinated with UNHCR and local authorities.",
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
