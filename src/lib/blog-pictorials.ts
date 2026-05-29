import type { BlogGalleryImage, BlogPost } from "@/types";

function gallery(base: string, items: { file: string; caption: string }[]): BlogGalleryImage[] {
  return items.map(({ file, caption }) => ({
    src: `${base}/${file}`,
    caption,
  }));
}

const youthBase = "/images/blog/youth-empowerment-may-2023";
const protectionBase = "/images/blog/protection-pictorial-may-2023";
const cfsBase = "/images/blog/cfs-june-2023";

/** Pictorial posts sourced from MHA field reports (May–June 2023). */
export const pictorialBlogPosts: BlogPost[] = [
  {
    slug: "youth-empowerment-pictorial-may-2023",
    title: "Youth Empowerment Activity — field photos (May 2023)",
    excerpt:
      "USAID YEA implementation in Mayiandit County: venue verification, placement tests, TOTs, and classroom sessions with youth corps members.",
    publishedAt: "2023-05-31",
    category: "programme",
    image: `${youthBase}/01.jpeg`,
    author: "MHA Programmes",
    storySlug: "youth-launch-leer-june-2023",
    body: [
      "These photos are taken from MHA’s integrated Youth Empowerment Activity (YEA) implementation report, May 2023, in partnership with EDC under USAID.",
      "Activities shown include training venue verification in flooded terrain, youth corps placement tests, training-of-trainers (TOTs), basic education sessions, and group work in Rubkuay and Mayiandit County.",
    ],
    gallery: gallery(youthBase, [
      {
        file: "01.jpeg",
        caption:
          "MHA/YEA team walking through muddy, flooded roads in Mirynal and on land in Leah, Mayiandit County during training venue verification for Youth Empowerment Activities (YEA).",
      },
      {
        file: "02.jpeg",
        caption:
          "MHA/YEA team during the training venue verification exercise — ensuring sites are safe and reachable for youth programming.",
      },
      {
        file: "03.jpeg",
        caption:
          "Youth corps members sit on the floor and wooden planks during placement tests at Rubkuay Secondary School, Rubkuay Payam, Mayiandit County (YEA, May 2023).",
      },
      {
        file: "04.jpeg",
        caption:
          "Placement testing continues at Rubkuay — part of mobilization and enrollment for pathway classes.",
      },
      {
        file: "05.png",
        caption:
          "Youth corps members during placement tests at Rubkuay Secondary School, Mayiandit County.",
      },
      {
        file: "06.jpeg",
        caption: "Lead facilitator supporting group work sessions during YEA training.",
      },
      {
        file: "07.png",
        caption:
          "Participants take part in an energizer during Youth Empowerment Activities / training-of-trainers (TOTs), April 2023.",
      },
      {
        file: "08.jpeg",
        caption: "Youth participants during TOT energizer activities, April 2023.",
      },
      {
        file: "09.jpeg",
        caption:
          "TOTs and master trainers after training closure, April 2023 — building the trainer pool for county-level classes.",
      },
      {
        file: "10.jpeg",
        caption: "Master trainers and facilitators at the close of a TOT session, April 2023.",
      },
      {
        file: "11.jpeg",
        caption: "Facilitation of a basic education literacy and numeracy session.",
      },
      {
        file: "12.jpeg",
        caption: "Facilitator leads a basic education session with youth corps members.",
      },
      {
        file: "13.jpeg",
        caption: "Participants in a group discussion session during Youth Empowerment Activities.",
      },
      {
        file: "14.jpeg",
        caption: "Group discussion and peer learning during YEA classroom activities.",
      },
    ]),
  },
  {
    slug: "protection-child-protection-pictorial-may-2023",
    title: "General & Child Protection — field photos (May 2023)",
    excerpt:
      "CFS activities in Leer, CBPN training, IPA in Adok, caregiver sessions, and protection monitoring — pictorial report from May 2023.",
    publishedAt: "2023-05-31",
    category: "programme",
    image: `${protectionBase}/01.jpeg`,
    author: "MHA Protection Team",
    storySlug: "safe-space-mayiandit",
    body: [
      "Photos from MHA’s child protection and general protection pictorial report, May 2023, covering Leer County and surrounding payams.",
      "Activities include child-friendly spaces, community-based protection network (CBPN) training, individual protection assistance (IPA), stakeholder sessions on child rights, and protection monitoring with focus group discussions.",
    ],
    gallery: gallery(protectionBase, [
      {
        file: "01.jpeg",
        caption:
          "Group photo after children’s indoor play activities at the child-friendly space (CFS) in Leer.",
      },
      {
        file: "02.jpeg",
        caption:
          "A CFS animator works with children aged five and above in separate age groups — non-formal education and structured free play to build teamwork, peer relationships, and cooperation.",
      },
      {
        file: "03.jpeg",
        caption:
          "CFS animators raise awareness on child protection and sexual exploitation-related issues at the CFS in Leer town, May 2023.",
      },
      {
        file: "04.jpeg",
        caption:
          "Child protection awareness session with children at the child-friendly space, Leer town, May 2023.",
      },
      {
        file: "05.jpeg",
        caption:
          "In Adok Payam: identification and registration of vulnerable persons for individual protection assistance (IPA). An elderly woman and a person living with disability sign in and receive cash-based protection assistance.",
      },
      {
        file: "07.jpeg",
        caption:
          "On 20 March 2023: one-day capacity-building for community stakeholders in Thonyor Payam on child protection concepts, child rights, case identification, and referral pathways.",
      },
      {
        file: "11.jpeg",
        caption:
          "On 2 March 2023: parents’ day awareness at Guat Primary School. MHA staff addressed child labour, exploitation, neglect, forced and early marriage, and children on the streets due to lack of parental care.",
      },
      {
        file: "12.jpeg",
        caption:
          "MHA team conducts community situation assessments in Pamdhor, Leer town, speaking with household members including those relying on water lily for survival.",
      },
      {
        file: "14.jpeg",
        caption:
          "Protection monitoring and community engagement in Leer County, May 2023.",
      },
      {
        file: "15.jpeg",
        caption:
          "Focus group discussions with women and men in Guat Payam to assess community protection concerns — findings shared with the protection cluster and partners in Leer County.",
      },
    ]),
  },
  {
    slug: "cfs-psychosocial-activities-june-2023",
    title: "Child-friendly space activities — field photos (June 2023)",
    excerpt:
      "MHPSS at the Leer CFS: drawing, games, and play for 2,694 children — including rising attendance from returnees from Sudan.",
    publishedAt: "2023-06-30",
    category: "programme",
    image: `${cfsBase}/04.jpeg`,
    author: "Daniel Kuet Riak, Child Protection Officer",
    storySlug: "safe-space-mayiandit",
    body: [
      "Monthly pictorial from MHA’s child-friendly space (CFS) psychosocial support activities in Leer County, 1–31 June 2023.",
      "During the month, 2,694 children (1,564 boys, 1,130 girls, and 25 children with vulnerabilities) took part in structured play, drawing, sports, and games. Attendance increased as returnee children arrived from Sudan.",
    ],
    gallery: gallery(cfsBase, [
      {
        file: "01.jpeg",
        caption:
          "Children take part in psychosocial support activities at the child-friendly space in Leer County, June 2023.",
      },
      {
        file: "02.jpeg",
        caption:
          "Structured play and group activities at the CFS — part of MHA’s emergency child protection response for displaced and returnee children.",
      },
      {
        file: "03.jpeg",
        caption:
          "CFS activities continue with inclusive participation for children of different ages and vulnerabilities, June 2023.",
      },
      {
        file: "04.jpeg",
        caption:
          "Children draw and paste pictures in groups, explaining meanings that included a school, church, and the South Sudan flag — helping children express feelings and build creativity.",
      },
    ]),
  },
];
