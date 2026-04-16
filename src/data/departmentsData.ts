import { 
  Stethoscope, 
  Scissors, 
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
  }
];
