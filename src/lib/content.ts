export const siteContent = {
  name: "Lucy Marie Schmidt",
  business: "Movement Labs",
  domain: "movement-labs.de",
  location: "Berlin, Germany",
  instagram: "@lucymarie.s",

  styles: [
    "Modern Dance",
    "Salsa On 1",
    "Salsa On 2",
  ],

  about: {
    title: "About Lucy",
    intro:
      "Berlin-based multidisciplinary dance instructor and licensed physiotherapist with 10+ years in dance studies and movement practice.",
    specialization:
      "Specializing in Modern Dance, Salsa On 1, and Salsa On 2 — a rare combination of niche expertise that positions her uniquely in Berlin's dance scene.",
    uniqueness:
      "Her wide breadth of expertise across Modern dance and different forms of Latin dance, learned from specialist instructors across the world, is what sets her apart. She sought out the best teachers globally and synthesized multiple traditions into her own methodology.",
    clinical:
      "She merges clinical understanding of the human body with artistic dance training — she doesn't just teach movement, she understands biomechanics, injury prevention, and physical rehabilitation.",
    highlights: [
      "Trained at the Martha Graham School in New York City (Summer Intensive 2024, Graham Teacher Workshop Jan 2025, Peridance intensive Nov 2025 focusing on Graham & Horton techniques)",
      "Completed a 5-month pre-professional program at Danceworks Berlin (Contemporary, Ballet, Modern, Improvisation, Jazz, Pilates)",
      "STOTT Pilates Reformer certified instructor",
      "Progressive Ballet Technique trained",
      "Bachelor of Science in Physiotherapy from IB-Hochschule University, Berlin (2020)",
      "Thesis: \"Short-term effects of dance on postural control and step length in Parkinson's disease\"",
      "Mentored by Sarah Balzat, internationally recognized dance educator",
      "Salsa instruction at the German Bundestag Open Day (Sept 2024)",
      "Currently teaches weekly at Cumbancha in Berlin (since Jan 2026)",
    ],
  },

  services: [
    {
      title: "Modern Dance",
      description:
        "Rooted in both Graham and Horton technique. Both emphasize moving from the core and connecting physicality with emotionality. While developing technique in class we will experiment with basic human movements formed into principles, such as Contraction and Release, and Spirals.",
      icon: "flame",
    },
    {
      title: "Salsa",
      description:
        "Two weekly classes: Salsa On 1 — Ladies Styling, focused on posture, lines, and feminine movement quality; and Salsa On 2 — Body Movement, working through isolation, body rolls, and the subtle weight shifts that make On 2 feel alive.",
      icon: "pulse",
    },
    {
      title: "Private 1-on-1 Lessons",
      description:
        "One-on-one sessions at her private studio in Berlin. Tailored to whatever you want to work on — technique, a specific piece, or building confidence in a style. All levels welcome.",
      icon: "user",
    },
  ],

  timeline: [
    { year: "2014", milestone: "Summer Intensive — Canadian Dance Company, Toronto" },
    { year: "2020", milestone: "B.Sc. Physiotherapy — IB-Hochschule, Berlin" },
    { year: "2022", milestone: "Began teaching Latin Dance Workout classes (weekly, ongoing)" },
    { year: "2023", milestone: "STOTT Pilates Reformer Certification" },
    { year: "2023", milestone: "5-month pre-professional program — Danceworks Berlin" },
    { year: "2024", milestone: "Progressive Ballet Technique training" },
    { year: "2024", milestone: "Summer Intensive — Martha Graham School, NYC" },
    { year: "2024", milestone: "Salsa instruction at the German Bundestag Open Day" },
    { year: "2025", milestone: "Graham Teacher Workshop — Martha Graham School, NYC" },
    { year: "2025", milestone: "1-month Peridance intensive (Graham & Horton), NYC" },
    { year: "2025", milestone: "Began teaching Modern Dance classes (weekly, ongoing)" },
    { year: "2026", milestone: "Began teaching Salsa at Cumbancha, Berlin (weekly, ongoing)" },
  ],

  contactFields: [
    { name: "name", label: "Name", type: "text" as const, required: true },
    { name: "email", label: "Email", type: "email" as const, required: true },
    {
      name: "lessonType",
      label: "Lesson Type",
      type: "select" as const,
      options: ["Private", "Group", "Online", "Workshop", "Other"],
      required: true,
    },
    { name: "schedule", label: "Preferred Schedule", type: "text" as const, required: false },
    { name: "message", label: "Message", type: "textarea" as const, required: true },
  ],

  navLinks: [
    { label: "About", href: "#about" },
    { label: "Lessons", href: "#lessons" },
    { label: "Credentials", href: "#credentials" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ],
};
