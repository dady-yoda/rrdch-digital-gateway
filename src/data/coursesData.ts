import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  FileCheck2,
  Microscope,
  LucideIcon
} from "lucide-react";

export interface Course {
  id: string;
  name: string;
  degree: string;
  duration: string;
  icon: LucideIcon;
  overview: string;
  eligibility: string[];
  features: string[];
  color: string;
}

export const coursesData: Course[] = [
  {
    id: "bds",
    name: "Bachelor of Dental Surgery (BDS)",
    degree: "Undergraduate Degree",
    duration: "5 Years (4 years + 1 year Compulsory Rotatory Internship)",
    icon: GraduationCap,
    color: "hsl(100, 24%, 34%)",
    overview: "The BDS course is a five-year program designed to produce competent dental professionals. The curriculum is comprehensive, covering basic medical sciences, dental sciences, and extensive clinical training. RRDCH is recognized by the Dental Council of India (DCI) and affiliated with Rajiv Gandhi University of Health Sciences (RGUHS).",
    eligibility: [
      "Must have passed 10+2 or equivalent with Physics, Chemistry, Biology and English.",
      "A minimum of 50% aggregate marks in PCB (40% for SC/ST/OBC category).",
      "Must have qualified in NEET-UG (National Eligibility cum Entrance Test) as per current government norms.",
      "Must be at least 17 years old as of December 31st of the admission year."
    ],
    features: [
      "Rigorous pre-clinical and clinical training.",
      "Exposure to advanced dental technology and equipment.",
      "Active research participation opportunities.",
      "Community dental health and outreach programs.",
      "Dedicated placement and career guidance."
    ]
  },
  {
    id: "mds",
    name: "Master of Dental Surgery (MDS)",
    degree: "Postgraduate Degree",
    duration: "3 Years",
    icon: Award,
    color: "hsl(95, 25%, 58%)",
    overview: "The MDS course provides advanced training in various dental specialties. RRDCH offers MDS in 9 specialized areas, focusing on high-level clinical skills, research methodology, and evidence-based practice.",
    eligibility: [
      "Candidates must possess a BDS degree from a DCI recognized university/institution.",
      "Must have completed or be completing the compulsory rotatory internship.",
      "Must have qualified in NEET-MDS for the current academic year.",
      "Permanent registration with DCI or State Dental Council is mandatory."
    ],
    features: [
      "Specialization-focused clinical and surgical training.",
      "Advanced research projects and dissertation work.",
      "Participation in national and international conferences.",
      "Interdisciplinary case management.",
      "Hands-on experience with modern tools like dental microscopes and lasers."
    ]
  },
  {
    id: "phd",
    name: "Ph.D. Program",
    degree: "Doctoral Degree",
    duration: "3 to 5 Years",
    icon: Microscope,
    color: "hsl(35, 40%, 76%)",
    overview: "The Ph.D. program at RRDCH is intended for dental professionals seeking to contribute to the field through original research. We offer doctoral programs in various dental specialties under the guidance of experienced research supervisors.",
    eligibility: [
      "Candidate must possess a Master of Dental Surgery (MDS) degree in the relevant specialty.",
      "Must have a valid registration with DCI/State Dental Council.",
      "Must clear the Ph.D. Entrance Examination conducted by RGUHS/University.",
      "Submission and approval of a research proposal (Protocol)."
    ],
    features: [
      "Access to advanced research laboratories.",
      "Support for scientific publications and grants.",
      "Interdisciplinary research atmosphere.",
      "Mentorship from highly experienced academic guides.",
      "Focus on clinical and translational research."
    ]
  },
  {
    id: "implantology",
    name: "Certificate in Implantology",
    degree: "Certificate Course",
    duration: "1 Year",
    icon: FileCheck2,
    color: "hsl(100, 24%, 34%)",
    overview: "This intensive certificate course is designed to provide comprehensive training in dental implantology, from basic diagnosis to complex surgical and prosthetic phases.",
    eligibility: [
      "Candidates must have a BDS or MDS degree from a DCI recognized institution.",
      "Interest in advancing clinical skills in oral rehabilitative procedures.",
      "Willingness to participate in hands-on surgical workshops."
    ],
    features: [
      "Step-by-step surgical and prosthetic training.",
      "Live patient demonstrations and hands-on sessions.",
      "Training in various implant systems.",
      "Radiographic diagnosis and treatment planning (CBCT integration).",
      "Focus on complications and their management."
    ]
  }
];
