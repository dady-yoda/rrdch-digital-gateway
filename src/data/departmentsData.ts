import { 
  Stethoscope, 
  Scissors, 
<<<<<<< HEAD
  Smile, 
  Settings, 
  Activity, 
  ShieldAlert, 
  Baby, 
  Microscope, 
  Users2,
  LucideIcon
} from "lucide-react";

export interface FacultyMember {
  name: string;
  designation: string;
  image?: string;
}

export interface Department {
  id: string;
  name: string;
  icon: LucideIcon;
  overview: string;
  hodMessage?: string;
  objectives: string[];
  faculty: FacultyMember[];
  facilities: string[];
  color: string;
}

export const departmentsData: Department[] = [
  {
    id: "oral-medicine-radiology",
    name: "Oral Medicine & Radiology",
    icon: Stethoscope,
    color: "hsl(100, 24%, 34%)",
    overview: "The department of oral medicine and radiology is the threshold to dentistry for all patients. This department is responsible for the preliminary investigation and diagnosis of dental issues, lesions and systemic diseases through oral manifestations. The department also takes responsibility for the dental management of medically compromised patients.",
    objectives: [
      "Expertise in clinical examination and diagnosis of oral diseases.",
      "Proficiency in radiographic techniques and interpretation.",
      "Comprehensive dental management of medically compromised patients.",
      "Early detection and screening of oral cancer.",
      "Management of orofacial pain and TMJ disorders."
    ],
    faculty: [
      { name: "Dr. Poornima C.", designation: "Professor & HOD" },
      { name: "Dr. Balaji P.", designation: "Professor" },
      { name: "Dr. M. B. Sowbhagya", designation: "Professor" },
      { name: "Dr. Poornima G.", designation: "Associate Professor" },
      { name: "Dr. Mahesh Kumar T. S.", designation: "Reader" }
    ],
    facilities: [
      "Centralized Diagnostic Clinic",
      "Advanced Digital Radiology (OPG, Cephalostat)",
      "RVG (RadioVisioGraphy) Units",
      "T-Scan for Occlusal Analysis",
      "Biopack for Orofacial Pain Diagnosis",
      "Intra-oral Cameras"
    ]
  },
  {
    id: "oral-maxillofacial-surgery",
    name: "Oral & Maxillofacial Surgery",
    icon: Scissors,
    color: "hsl(95, 25%, 58%)",
    overview: "The department of maxillofacial surgery is responsible for the surgical treatment of acquired, congenital and traumatic issues related to the jaws and facial regions as well developmental diseases of the oral cavity.",
    objectives: [
      "Surgical management of impacted teeth.",
      "Treatment of maxillofacial trauma and fractures.",
      "Management of benign and malignant tumors of the oral cavity.",
      "Orthognathic surgery for facial deformity correction.",
      "Placement of dental implants and bone grafting."
    ],
    faculty: [
      { name: "Dr. Lokesh V. R.", designation: "Professor & HOD" },
      { name: "Dr. Madhumati Singh", designation: "Professor" },
      { name: "Dr. Mamatha N. S.", designation: "Professor" },
      { name: "Dr. Girish B. Giraddi", designation: "Professor" }
    ],
    facilities: [
      "Major Operation Theatre with 10 beds",
      "Minor OS Clinics (Undergraduate & Postgraduate)",
      "Advanced Implant Center",
      "Intensive Care Unit (ICU)",
      "Laser Surgery Unit",
      "General Anesthesia Facility"
    ]
  },
  {
    id: "orthodontics",
    name: "Orthodontics & Dentofacial Orthopedics",
    icon: Smile,
    color: "hsl(100, 24%, 34%)",
    overview: "The Department of Orthodontics and dentofacial orthopedics specializes in the correction of defects in the jaws and teeth through the use of various removable and fixed appliances, aimed at improving both function and aesthetic appearance.",
    objectives: [
      "Management of malocclusions in children and adults.",
      "Preventive and interceptive orthodontics.",
      "Management of cleft lip and palate patients.",
      "Surgical orthodontics and dentofacial orthopedics.",
      "Expertise in latest bracket systems and aligners."
    ],
    faculty: [
      { name: "Dr. Akshai Shetty", designation: "Professor & HOD" },
      { name: "Dr. Rajesh H.", designation: "Professor" },
      { name: "Dr. Dinesh M. R.", designation: "Professor" },
      { name: "Dr. Shivalinga B. M.", designation: "Professor" }
    ],
    facilities: [
      "Modern Orthodontic Clinics",
      "Cephalometric Analysis Software",
      "Dry and Wet Labs",
      "Aligner Fabrication Tools",
      "Advanced Sterilization Room"
    ]
  },
  {
    id: "prosthodontics",
    name: "Prosthodontics and Crown & Bridge",
    icon: Settings,
    color: "hsl(95, 25%, 58%)",
    overview: "The replacement of missing teeth and associated structures due to congenital reasons or due to disease, surgery, aging or accident is the responsibility of the department of prosthodontics. We restore function and aesthetics through prosthetic solutions.",
    objectives: [
      "Fabrication of complete and partial dentures.",
      "Fixed prosthodontics (Crowns and Bridges).",
      "Implant-supported prostheses.",
      "Maxillofacial prosthetics for craniofacial defects.",
      "Full mouth rehabilitation."
    ],
    faculty: [
      { name: "Dr. Shwetha Poovani", designation: "Professor & HOD" },
      { name: "Dr. S. Vijayanand", designation: "Professor" },
      { name: "Dr. Mallikarjun S. Ragher", designation: "Professor" }
    ],
    facilities: [
      "Ceramic Lab with CAD/CAM facilities",
      "Pre-clinical Prosthodontic Lab",
      "Casting and Finishing Lab",
      "Dedicated Implant Clinic",
      "Phantom Head Simulation Lab"
    ]
  },
  {
    id: "periodontics",
    name: "Periodontology",
    icon: Activity,
    color: "hsl(100, 24%, 34%)",
    overview: "The department of periodontology is engaged in the treatment of diseases associated with the gums and supporting structures of the teeth. We emphasize both non-surgical and surgical interventions to ensure optimal oral hygiene and periodontal health.",
    objectives: [
      "Diagnosis and management of periodontal diseases.",
      "Advanced periodontal plastic surgeries.",
      "Regenerative procedures and bone grafting.",
      "Dental implant placement and maintenance.",
      "Laser-assisted periodontal therapy."
    ],
    faculty: [
      { name: "Dr. Savita S.", designation: "Professor & HOD" },
      { name: "Dr. Dharmendra J.", designation: "Professor" },
      { name: "Dr. Anish Shetty", designation: "Professor" }
    ],
    facilities: [
      "Periodontal Surgical Suite",
      "Soft Tissue Laser Unit",
      "Piezosurgery Unit",
      "Centrifuge for PRF preparation",
      "Digital Patient Database"
    ]
  },
  {
    id: "conservative-dentistry",
    name: "Conservative Dentistry & Endodontics",
    icon: ShieldAlert,
    color: "hsl(95, 25%, 58%)",
    overview: "One of the busiest departments, Conservative Dentistry and Endodontics aims at 'Increasing the life span of teeth' by treating dental caries and pulpal diseases through restorative and root canal procedures.",
    objectives: [
      "Aesthetic and composite restorations.",
      "Non-surgical and surgical endodontics.",
      "Micro-endodontics using dental microscopes.",
      "Management of traumatic dental injuries.",
      "Bleaching and smile design."
    ],
    faculty: [
      { name: "Dr. Mithra N. Hegde", designation: "Director of Post Graduate Studies" },
      { name: "Dr. Geeta I. B.", designation: "Professor & HOD" },
      { name: "Dr. Girish S.", designation: "Professor" }
    ],
    facilities: [
      "Dental Operating Microscopes",
      "Thermoplasticized Gutta Percha Units",
      "Endodontic Rotary Systems",
      "Vitality Testers",
      "Advanced Ceramic Studio"
    ]
  },
  {
    id: "pedodontics",
    name: "Pedodontics & Preventive Dentistry",
    icon: Baby,
    color: "hsl(100, 24%, 34%)",
    overview: "Focused on dental care for children, the Department of Pedodontics aims to provide comprehensive oral healthcare for infants, children, and adolescents, including those with special healthcare needs.",
    objectives: [
      "Preventive dental care for children.",
      "Management of early childhood caries.",
      "Interceptive orthodontics for primary dentition.",
      "Behavior management techniques.",
      "Treatment under Nitrous Oxide sedation."
    ],
    faculty: [
      { name: "Dr. Navin Hadadi", designation: "Professor & HOD" },
      { name: "Dr. Prasanna Kumar", designation: "Professor" }
    ],
    facilities: [
      "Child-friendly Dental Clinics",
      "Nitrous Oxide - Oxygen Sedation Unit",
      "Special Care Dentistry Unit",
      "Pre-clinical Pedodontic Lab",
      "Audiovisual Education Corner"
    ]
  },
  {
    id: "oral-pathology",
    name: "Oral & Maxillofacial Pathology",
    icon: Microscope,
    color: "hsl(95, 25%, 58%)",
    overview: "The department focuses on the nature, identification, and management of diseases affecting the oral and maxillofacial regions. We provide diagnostic services through histopathological examination of biopsy specimens.",
    objectives: [
      "Diagnostic oral histopathology.",
      "Cytopathology and hematological investigations.",
      "Forensic odontology procedures.",
      "Research in oral cancer and precancer.",
      "Immunohistochemistry services."
    ],
    faculty: [
      { name: "Dr. Girish H. C.", designation: "Professor & HOD" },
      { name: "Dr. Sanjay Murgod", designation: "Professor" },
      { name: "Dr. Shyamala K.", designation: "Professor" }
    ],
    facilities: [
      "Advanced Histopathology Lab",
      "Penta-head Microscope",
      "Fluorescence Microscope",
      "Digital Imaging System",
      "Tissue Processing Unit",
      "Museum of Oral Pathologies"
    ]
  },
  {
    id: "public-health-dentistry",
    name: "Public Health Dentistry",
    icon: Users2,
    color: "hsl(100, 24%, 34%)",
    overview: "Orientation towards meeting the oral health needs of communities. We focus on dental public health, preventive strategies, and taking dental care to the doorsteps of those who lack access to facilities.",
    objectives: [
      "Conducting community dental health camps.",
      "Epidemiological surveys of oral diseases.",
      "Tobacco cessation counseling.",
      "Promotion of school dental health programs.",
      "Providing mobile dental clinic services."
    ],
    faculty: [
      { name: "Dr. Padma K. Bhat", designation: "Professor & HOD" },
      { name: "Dr. Aruna C. N.", designation: "Professor" }
    ],
    facilities: [
      "Sophisticated Mobile Dental Van",
      "Satellite Dental Clinics",
      "Epidemiological Kit",
      "Oral Health Education Museum",
      "Community Outreach Infrastructure"
    ]
=======
  Activity, 
  Smile, 
  Baby, 
  Microscope, 
  Users, 
  Radiation, 
  Tablets 
} from "lucide-react";

export interface Department {
  id: string;
  name: string;
  slug: string;
  icon: any;
  description: string;
  specialties: string[];
  hod: string;
  researchFocus: string;
}

export const departments: Department[] = [
  {
    id: "omr",
    name: "Oral Medicine & Radiology",
    slug: "oral-medicine",
    icon: Radiation,
    description: "The primary diagnostic hub focused on identifying oral diseases through clinical examination and advanced imaging.",
    specialties: ["Digital Radiography (RVG)", "CBCT Scanning", "Oral Cancer Screening", "TMD Management"],
    hod: "Dr. Girish H C",
    researchFocus: "Advanced molecular diagnostics for oral premalignant lesions."
  },
  {
    id: "oms",
    name: "Oral & Maxillofacial Surgery",
    slug: "oral-surgery",
    icon: Scissors,
    description: "Specializing in surgical management of oral and facial conditions, from simple extractions to complex reconstructive surgeries.",
    specialties: ["Dental Implants", "Orthognathic Surgery", "Trauma Management", "Facial Aesthetics"],
    hod: "Dr. Edwin Devadoss",
    researchFocus: "Bone regeneration techniques and minimally invasive facial surgery."
  },
  {
    id: "ortho",
    name: "Orthodontics",
    slug: "orthodontics",
    icon: Activity,
    description: "Correction of malaligned teeth and jaws to achieve functional harmony and aesthetic balance.",
    specialties: ["Invisalign/Clear Aligners", "Lingual Orthodontics", "Myofunctional Therapy", "Surgical Orthodontics"],
    hod: "Dr. Rajkumar S. Alle",
    researchFocus: "Accelerated tooth movement and digital orthodontic planning."
  },
  {
    id: "prostho",
    name: "Prosthodontics",
    slug: "prosthodontics",
    icon: Smile,
    description: "Restoration of oral function and aesthetics through the replacement of missing teeth and oral structures.",
    specialties: ["Complete Dentures", "Fixed Partial Dentures", "Dental Implants", "Maxillofacial Prosthetics"],
    hod: "Dr. Krishna Kumar U",
    researchFocus: "CAD/CAM in prosthodontics and biocompatible restorative materials."
  },
  {
    id: "perio",
    name: "Periodontics",
    slug: "periodontics",
    icon: Stethoscope,
    description: "Focusing on the health of supporting structures (gums and bone) and management of periodontal diseases.",
    specialties: ["Laser Periodontics", "Gum Grafting", "Flap Surgeries", "Regenerative Procedures"],
    hod: "Dr. Savita S P",
    researchFocus: "Relationship between periodontal health and systemic diseases."
  },
  {
    id: "cons",
    name: "Conservative Dentistry",
    slug: "conservative-dentistry",
    icon: Tablets,
    description: "Preservation of teeth through restorative procedures and advanced root canal treatments.",
    specialties: ["Root Canal Treatment", "Cosmetic Dentistry", "Endodontic Microsurgery", "Post & Core"],
    hod: "Dr. B. S. Keshava Prasad",
    researchFocus: "Latest innovations in endodontic file systems and irrigation."
  },
  {
    id: "pedo",
    name: "Pedodontics",
    slug: "pedodontics",
    icon: Baby,
    description: "Dedicated oral healthcare for children and adolescents in a child-friendly environment.",
    specialties: ["Preventive Dentistry", "Behavior Management", "Pediatric Root Canals", "Fluoride Therapy"],
    hod: "Dr. Navin Hadadi",
    researchFocus: "Minimal intervention dentistry in children."
  },
  {
    id: "path",
    name: "Oral Pathology",
    slug: "oral-pathology",
    icon: Microscope,
    description: "The bridge between clinical practice and basic science, identifying oral diseases at the microscopic level.",
    specialties: ["Histopathology", "Cytopathology", "Hematology", "Forensic Odontology"],
    hod: "Dr. Shyamala K",
    researchFocus: "Immuno-histochemical markers in oral cancer."
  },
  {
    id: "phd",
    name: "Public Health Dentistry",
    slug: "public-health",
    icon: Users,
    description: "Focused on community-wide prevention of oral diseases and dental health education.",
    specialties: ["Community Outreach", "Dental Camps", "Epidemiological Surveys", "Tobacco Cessation"],
    hod: "Dr. Aruna C. N.",
    researchFocus: "Oral health status among various socio-economic groups in rural Bangalore."
>>>>>>> 9e863b9c595b0d41720b00a3824c271b5154965f
  }
];
