export const siteContent = {
  name: "Lucy Marie Schmidt",
  business: "Movement Labs",
  domain: "movement-labs.de",
  location: "Berlin, Germany",
  instagram: "@lucymarie.s",

  styles: [
    "Salsa On 1",
    "Salsa On 2",
    "Modern Dance",
  ],

  about: {
    title: "About Lucy",
    intro:
      "Berlin-based multidisciplinary dance instructor and licensed physiotherapist with 10+ years in dance studies and movement practice.",
    specialization:
      "Specializing in Salsa On 1, Salsa On 2, and Modern Dance — a rare combination of niche expertise that positions her uniquely in Berlin's dance scene.",
    uniqueness:
      "Her wide breadth of expertise across different forms of Latin dance and Modern dance, learned from specialist instructors across the world, is what sets her apart. She sought out the best teachers globally and synthesized multiple traditions into her own methodology.",
    clinical:
      "She merges clinical understanding of the human body with artistic dance training — she doesn't just teach movement, she understands biomechanics, injury prevention, and physical rehabilitation.",
    highlights: [
      "Trained at the Martha Graham School in New York City (Summer Intensive 2024, Graham Teacher Workshop Jan 2025, Peridance intensive Nov 2025 focusing on Graham & Horton techniques)",
      "Completed a 5-month pre-professional program at Danceworks Berlin (Contemporary, Ballet, Modern, Improvisation, Jazz, Pilates)",
      "STOTT Pilates Reformer certified instructor",
      "Progressive Ballet Technique trained",
      "Bachelor of Science in Physiotherapy from IB-Hochschule University, Berlin (2020)",
      "Thesis: \"Short-term effects of dance on postural control and step length in Parkinson's disease\"",
      "Trained internationally — New York City, Toronto (Canadian Dance Company, 2014), Buenos Aires, Bilbao",
      "Mentored by Sarah Balzat, internationally recognized dance educator",
      "Performed at the German Bundestag Open Day (Sept 2024) — salsa instruction",
      "Currently teaches weekly at Cumbancha in Berlin (since Jan 2026)",
    ],
  },

  services: [
    {
      title: "Private 1-on-1 Lessons",
      description:
        "Personalized instruction at her private studio in Berlin (Moabit area). Tailored to individual goals, all levels welcome.",
      icon: "user",
    },
    {
      title: "Group Classes",
      description:
        "Small group sessions (5–9 students). Currently teaching Salsa Ladies Styling (On1), Salsa Body Movement (On2), Modern Dance (Graham & Horton), and Latin Dance Workout.",
      icon: "users",
    },
    {
      title: "Studio Rental / On-Site Instruction",
      description:
        "Lucy has her own studio space in Berlin. She also accepts invitations to teach at other studios and events.",
      icon: "building",
    },
    {
      title: "Online / Zoom Lessons",
      description:
        "Virtual instruction available worldwide. Both private 1-on-1 and group formats.",
      icon: "globe",
    },
    {
      title: "Workshops & Seminars",
      description:
        "Intensive masterclasses and multi-day workshops. Available for booking at events, dance festivals, and studios.",
      icon: "calendar",
    },
    {
      title: "Custom Arrangements",
      description:
        "Anything else can be discussed. Reach out via the contact form.",
      icon: "sparkles",
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
    { label: "Services", href: "#services" },
    { label: "Credentials", href: "#credentials" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ],
};
