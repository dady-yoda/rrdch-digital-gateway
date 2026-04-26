import { Newspaper, GraduationCap, Activity, Star, AlertCircle } from "lucide-react";

export type Category = "General" | "CDE" | "Achievements" | "Circulars" | "Interdepartmental";

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;       // full article content (paragraphs separated by \n\n)
  category: Category;
  image?: string;     // optional hero image path
}

export const newsItems: NewsItem[] = [
  /* ── General / Events ── */
  {
    slug: "dental-camp-magadi-2026",
    title: "Dental Screening Camp at Govt Hospital, Magadi",
    date: "Apr 22, 2026",
    excerpt:
      "A Dental screening and treatment camp was organized by the Dept. of Public Health Dentistry at Govt Hospital, Magadi on 22/04/2026.",
    body: `The Department of Public Health Dentistry at Rajarajeswari Dental College & Hospital conducted a successful dental screening and treatment camp at the Government Hospital in Magadi on April 22, 2026.
    
The initiative aimed to bridge the gap in oral healthcare access for the rural population. A team of specialist doctors and post-graduate students provided free consultations, cleanings, and basic restorative treatments to over 120 patients throughout the day. 

Patients were also educated on preventive oral hygiene practices and the importance of early diagnosis in preventing complex dental issues. Those requiring specialized surgical or orthodontic care were referred to the main RRDCH campus in Bengaluru for subsidized treatment.`,
    category: "General",
  },
  {
    slug: "dental-camp-amruth-distilleries-2026",
    title: "Dental Screening Camp at Amruth Distilleries",
    date: "Apr 17, 2026",
    excerpt:
      "Dept. of Public Health Dentistry organized a comprehensive dental check-up camp for the employees of Amruth Distilleries on 17/04/2026.",
    body: `On April 17, 2026, the Department of Public Health Dentistry at RRDCH organized a specialized dental health camp for the industrial workforce at Amruth Distilleries.

The camp was part of RRDCH's corporate social responsibility (CSR) outreach, focusing on occupational oral health. Many industrial workers face unique dental challenges due to their work environments, and this camp provided a convenient way for them to receive professional check-ups.

Our team screened over 150 employees, offering personalized advice on tobacco cessation, oral cancer awareness, and routine maintenance. The management at Amruth Distilleries expressed deep appreciation for the professional conduct and quality of care provided by the RRDCH team.`,
    category: "General",
  },
  {
    slug: "world-health-day-2026",
    title: "World Health Day 2026",
    date: "Apr 10, 2026",
    excerpt:
      "A Dental screening and treatment camp was organized by the Dept. of Public Health Dentistry at Nirashrithara Parihara Kendra on 10/04/2026.",
    body: `On the occasion of World Health Day 2026 (April 7), the Department of Public Health Dentistry at Rajarajeswari Dental College & Hospital organized a comprehensive dental screening and treatment camp at Nirashrithara Parihara Kendra on 10/04/2026.

The camp was aimed at providing free dental check-ups to underprivileged individuals residing at the shelter home. Faculty members, post-graduate students, and final-year BDS students participated enthusiastically, offering services such as oral health examinations, scaling, fluoride application, and dental extractions where necessary.

Over 80 beneficiaries received dental care on the day. The event reaffirmed RRDCH's commitment to community health and social responsibility, serving as a practical learning platform for students while extending quality dental care to those in need.`,
    category: "General",
  },
  {
    slug: "workshop-zygomatic-pterygoid-implant",
    title: "Workshop on Zygomatic and Pterygoid Implant",
    date: "Apr 9, 2026",
    excerpt:
      "A Hands-on Workshop and Live Surgical Demonstration of Zygomatic and Pterygoid Implant conducted by the Dept. of Implantology in association with Norris Implants.",
    body: `The Department of Implantology at RRDCH, in association with Norris Implants, conducted a highly anticipated hands-on workshop and live surgical demonstration focused on Zygomatic and Pterygoid Implants on April 9, 2026.

Zygomatic and pterygoid implants are advanced solutions for patients with severe maxillary bone loss who are not candidates for conventional implants or extensive bone grafting. The workshop provided attendees with a rare opportunity to witness live surgery and engage with leading implantologists.

Expert faculty from across the country delivered lectures covering patient selection criteria, imaging protocols, surgical anatomy, step-by-step placement techniques, and complication management. Participants also engaged in hands-on simulation sessions using surgical models.

The workshop was attended by implantologists, prosthodontists, oral surgeons, and post-graduate dental students, making it a landmark continuing education event for RRDCH.`,
    category: "General",
  },
  {
    slug: "womens-day-2026",
    title: "Smt. Lalithalakshmi Stree Sampoorn Utsav – Women's Day",
    date: "Mar 26, 2026",
    excerpt:
      "RajaRajeswari Group of Institutions celebrated Women's Day at ACS Convention Centre, RRMCH.",
    body: `The RajaRajeswari Group of Institutions celebrated "Smt. Lalithalakshmi Stree Sampoorn Utsav" — a grand Women's Day celebration — at the ACS Convention Centre, RRMCH, on March 26, 2026.

The event was a tribute to the strength, achievements, and contributions of women in academia, healthcare, and society. The evening featured cultural programs, felicitation of distinguished women from various fields, and inspiring talks by prominent women leaders.

Faculty, staff, and students from all institutions under the RajaRajeswari Group attended in large numbers. The celebration highlighted the group's commitment to gender equality and empowering women in all spheres of professional and personal life.`,
    category: "General",
  },
  {
    slug: "national-dentist-day-2026",
    title: "National Dentist Day 2026",
    date: "Mar 7, 2026",
    excerpt:
      "On the occasion of National Dentist's Day, the Dept. of Public Health Dentistry organised a free dental check-up camp.",
    body: `To mark National Dentist's Day on March 6, 2026, the Department of Public Health Dentistry at RRDCH organised a free dental check-up camp on March 7, 2026, within the college campus and neighbouring community areas.

The camp offered free oral screenings, dental hygiene instructions, fluoride application, and basic dental treatments to students, staff, and community members. Dentists and students spread awareness about the importance of regular dental visits, proper brushing techniques, and a healthy diet for oral health.

National Dentist's Day is celebrated annually to recognize the vital role dentists play in public health and to encourage people to prioritise their oral hygiene. RRDCH has consistently used this occasion to connect with and serve the wider community.`,
    category: "General",
  },

  /* ── CDE Programmes ── */
  {
    slug: "cde-magnification-endodontics",
    title: "CDE Programme: Role of Magnification in Endodontics and Restorative Dentistry",
    date: "Mar 5, 2026",
    excerpt:
      'A CDE programme titled "Role of Magnification in Endodontics and Restorative Dentistry" was held at SLL Auditorium.',
    body: `The Department of Conservative Dentistry & Endodontics at RRDCH organized a Continuing Dental Education (CDE) programme on "Role of Magnification in Endodontics and Restorative Dentistry" at the SLL Auditorium on March 5, 2026.

The programme explored the transformative role of magnification devices — including dental loupes and dental operating microscopes — in improving precision, accuracy, and outcomes in endodontic and restorative procedures.

Renowned guest speakers discussed topics such as enhanced visualization of root canal anatomy, identification of calcified canals, crack detection, minimally invasive cavity preparation, and aesthetic composite restoration under magnification.

Live demonstrations were conducted using the dental operating microscope, allowing participants to observe clinical procedures in high detail. The programme was attended by practitioners, faculty, and post-graduate students from RRDCH and neighboring institutions.`,
    category: "CDE",
  },
  {
    slug: "cde-platelet-concentrates-stem-cells",
    title: "CDE Programme: Platelet Concentrates and Stem Cells in Dentistry",
    date: "Feb 25, 2026",
    excerpt:
      'Dept. of Periodontology organized a CDE titled "A Comprehensive Overview of Platelet Concentrates and Stem Cells in Dentistry".',
    body: `The Department of Periodontology at RRDCH organized a CDE programme titled "A Comprehensive Overview of Platelet Concentrates and Stem Cells in Dentistry" on February 25, 2026.

The event brought together experts in regenerative dentistry to explore the evolving science of platelet-rich fibrin (PRF), platelet-rich plasma (PRP), and stem cell applications in periodontal and dental treatments.

Sessions covered the biological basis of platelet concentrates, preparation protocols, clinical applications in socket preservation, ridge augmentation, gingival recession treatment, and furcation defect management. The stem cell segment addressed current research, regulatory frameworks, and future therapeutic possibilities in dental regeneration.

The programme was attended by periodontists, oral surgeons, and students who engaged actively in Q&A discussions and case presentation workshops.`,
    category: "CDE",
  },

  /* ── Interdepartmental ── */
  {
    slug: "interdepartmental-full-arch-implant",
    title: "Interdepartmental Clinical Meet – Modalities of Full Arch Implant Rehabilitation",
    date: "Mar 18, 2026",
    excerpt:
      "A clinical meet on full arch implant rehabilitation — covering surgical components that interface with jawbones to support prostheses.",
    body: `RRDCH hosted an Interdepartmental Clinical Meet on "Modalities of Full Arch Implant Rehabilitation" on March 18, 2026, bringing together faculty and clinicians from the Departments of Implantology, Prosthodontics, Oral & Maxillofacial Surgery, and Periodontology.

The meet focused on the diverse approaches to full arch rehabilitation in edentulous and severely compromised dentitions — including All-on-4, All-on-6, zygomatic implants, and pterygoid implant protocols. Discussions emphasized the multidisciplinary nature of treatment planning and the critical roles each specialty plays.

Case presentations from different departments were a highlight of the event, showcasing collaborative treatment in complex patient scenarios. The meet fostered inter-departmental communication and reinforced the importance of a team-based approach to implant dentistry.`,
    category: "Interdepartmental",
  },

  /* ── Achievements ── */
  {
    slug: "mds-rank-holders-2023",
    title: "University Rank Holders in MDS – 2023",
    date: "Mar 15, 2023",
    excerpt:
      "RRDCH congratulates P.G. RGUHS Rank Holders and the teachers who made this possible.",
    body: `Rajarajeswari Dental College & Hospital takes immense pride in congratulating the PG students who earned RGUHS University Ranks in MDS examinations for the year 2023.

The achievement reflects the dedication and academic excellence of our post-graduate community and the tireless efforts of our faculty who mentor and guide students toward excellence.

RRDCH consistently produces RGUHS rank holders across multiple MDS specialities, a testament to the institution's high academic standards, quality infrastructure, and commitment to producing competent dental professionals.

We congratulate all rank holders and their departments, and we remain committed to nurturing talent and fostering academic excellence in dental education.`,
    category: "Achievements",
  },
  {
    slug: "founder-chancellor-media",
    title: "Founder Chancellor in Media",
    date: "Aug 15, 2023",
    excerpt:
      'Our beloved Founder Chancellor Dr. A. C. Shanmugam has been documented by the prestigious "Times of India".',
    body: `We are proud to share that our beloved Founder Chancellor, Dr. A. C. Shanmugam, was featured in the prestigious "Times of India" — one of India's most widely circulated and respected newspapers.

The article highlighted Dr. Shanmugam's extraordinary vision, lifelong dedication to education, healthcare, and community service, and the remarkable institution he built — the RajaRajeswari Group of Institutions — from the ground up.

Under his leadership, RRDCH has grown into one of South India's premier dental colleges, combining academic excellence with compassionate patient care and community outreach. This feature is a recognition not just of a great leader, but of the generations of students, faculty, and staff who have been inspired by his vision.

RRDCH family congratulates Dr. Shanmugam on this well-deserved recognition.`,
    category: "Achievements",
  },

  /* ── Circulars ── */
  {
    slug: "fee-notification-bds-aug-2022",
    title: "Fee Notification and Exam Time Table of II, III & IV Year BDS – August 2022",
    date: "Jul 2, 2022",
    excerpt: "BDS Examination fee notification and Theory examination Time Table for August 2022.",
    body: `RRDCH Administration hereby notifies all II, III, and IV Year BDS students regarding the examination fee payment schedule and Theory Examination Time Table for the forthcoming RGUHS examinations scheduled in August 2022.

Students are advised to pay the examination fee on or before the stipulated deadline. The detailed timetable for the Theory Examinations is available at the college administration office and has been displayed on the official notice boards.

For any queries regarding fee payment, hall ticket collection, or examination schedules, students are requested to contact the Examination Cell during working hours (9:00 AM – 4:00 PM, Monday to Saturday).`,
    category: "Circulars",
  },
  {
    slug: "bds-timetable-2020-21",
    title: "I to IV BDS Timetable 2020-21",
    date: "Jul 15, 2021",
    excerpt: "Click to view the I to IV BDS Timetable for academic year 2020-21.",
    body: `The Administration of Rajarajeswari Dental College & Hospital releases the official Academic Timetable for I to IV Year BDS students for the academic year 2020-21.

Students are required to follow the timetable strictly. All department heads and faculty are instructed to ensure adherence to the schedule and to report any discrepancies to the Academic Office.

The timetable covers all theory lectures, clinical postings, practical sessions, and internal assessment schedules. Students who face any issues with scheduling conflicts are advised to approach their respective Department coordinators promptly.`,
    category: "Circulars",
  },
  {
    slug: "bds-theory-exams-march-2021",
    title: "I to IV BDS Theory Examinations – March 2021",
    date: "Jan 15, 2021",
    excerpt: "The BDS Theory Examinations will be held from 24th March 2021.",
    body: `Rajarajeswari Dental College & Hospital informs all BDS students that RGUHS Theory Examinations for I to IV Year BDS will commence from 24th March 2021.

Students are urged to collect their Hall Tickets from the Examination Cell well in advance and verify all personal details. Any discrepancies must be reported immediately to avoid issues at the examination centre.

The college will conduct special revision sessions and doubt clearing classes in the weeks leading up to the examinations. Students are encouraged to attend all preparatory sessions and make full use of library and digital resources available on campus.

We wish all our students the very best for their examinations!`,
    category: "Circulars",
  },
];

/* ─── Category config ─────────────────────────────────── */
export const categories: { label: string; value: Category | "All" }[] = [
  { label: "All", value: "All" },
  { label: "General", value: "General" },
  { label: "CDE", value: "CDE" },
  { label: "Achievements", value: "Achievements" },
  { label: "Circulars", value: "Circulars" },
  { label: "Interdepartmental", value: "Interdepartmental" },
];

export const categoryMeta: Record<Category, { color: string; icon: React.ReactNode }> = {
  General: {
    color: "bg-secondary/20 text-secondary-foreground border border-secondary/30",
    icon: <Newspaper className="w-3 h-3" />,
  },
  CDE: {
    color: "bg-accent/40 text-accent-foreground border border-accent/40",
    icon: <GraduationCap className="w-3 h-3" />,
  },
  Achievements: {
    color: "bg-primary/10 text-primary border border-primary/20",
    icon: <Star className="w-3 h-3" />,
  },
  Circulars: {
    color: "bg-muted text-muted-foreground border border-border",
    icon: <AlertCircle className="w-3 h-3" />,
  },
  Interdepartmental: {
    color:
      "bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
    icon: <Activity className="w-3 h-3" />,
  },
};
