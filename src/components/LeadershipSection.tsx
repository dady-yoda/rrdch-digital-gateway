import chairmanImg from "@/assets/chairman.jpg";
import FadeInSection from "./FadeInSection";
import SpotlightCard from "./SpotlightCard";
import { Building2, Users } from "lucide-react";

const LeadershipSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Chairman's Message */}
        <FadeInSection>
          <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
            <div className="md:w-1/3 flex-shrink-0">
              <img
                src={chairmanImg}
                alt="Dr. A.C. Shanmugam, Chairman"
                className="rounded-lg shadow-lg w-full max-w-[300px] mx-auto border-4 border-accent"
                loading="lazy"
                width={512}
                height={640}
              />
              <p className="text-center mt-3 font-heading font-semibold text-primary text-sm">
                Dr. A.C. Shanmugam
              </p>
              <p className="text-center text-xs text-muted-foreground">Founder Chairman</p>
            </div>
            <div className="md:w-2/3">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
                Chairman's Message
              </h2>
              <blockquote className="border-l-4 border-accent pl-6 text-muted-foreground leading-relaxed italic">
                "It is my pleasure to congratulate you on your enrolling yourself as a student in our group of institutions, 
                which are well known for the discipline,quality education and personality development. Our Students have excelled
                not only in academic activities by obtaining many university ranks, but also have proved their mettle by taking part 
                in circular, co-curricular and extra curricular activities. Presently, a knowledge explosion is being ushered in to present era 
                especially information technology domain. We are working with a progressive & futuristic vision of India, to bring about paradigm 
                shift in arts,science, engineering & technology which will bring progress and prosperity to our country. We are convinced that 
                “character is the crown and glory of life”. We believe in quality education, progress through discipline, knowledge through devotion
                and satisfaction through services to the student community.<br/>
                We are dedicated to meet the challenges of the new millennium, in the field of medical and technical higher education so as to make 
                our country a highly industrialized and healthy modern nation."
              </blockquote>
            </div>
          </div>
        </FadeInSection>

        {/* College & Hospital Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <FadeInSection>
            <SpotlightCard className="bg-card rounded-lg p-8 border border-border shadow-sm hover:shadow-md transition-shadow" spotlightColor="rgba(84, 107, 65, 0.18)">
              <Building2 className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-heading text-xl font-bold text-primary mb-3">The College</h3>
              <p className="text-muted-foreground leading-relaxed">
                RajaRajeswari Dental College & Hospital was established in the year 1992 with just 40 admissions in BDS course. It was housed in a rented building measuring 40,000 Sq. Feet. Now it has progressed to 
                a full- fledged Postgraduate Dental Institution with 100 BDS admissions and MDS courses in all specialties of Dental Surgery. In addition, PhD in Orthodontics, Periodontology and certificate course in 
                Implantology are also offered in RRDCH. The college is recognized by DCI, Government of Karnataka and Government of India and is affiliated to Rajiv Gandhi University of Health Sciences, Karnataka. 
                It is accredited by NAAC (National Assessment Accreditation Council)<br />
                RajaRajeswari Dental College & Hospital is situated at a sprawling 5 acre campus on the Bangalore-Mysore Highway at 19 kms from Vidhana Soudha. The Lush green campus has 4 lakh Sq. feet of modern 
                building which houses the Dental Institute, its 10 speciality dental clinics, supporting labs and class rooms and residential accommodation for staff and students.
              </p>
            </SpotlightCard>
          </FadeInSection>
          <FadeInSection>
            <SpotlightCard className="bg-card rounded-lg p-8 border border-border shadow-sm hover:shadow-md transition-shadow" spotlightColor="rgba(84, 107, 65, 0.18)">
              <Users className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-heading text-xl font-bold text-primary mb-3">The Hospital</h3>
              <p className="text-muted-foreground leading-relaxed">
                Dental Hospital and Training Dental clinics in all departments have 250 modern dental units / chairs. An average 450 to 500 patients are treated in these clinics daily. Each department is staffed with more than required number of full time and dedicated teachers who are well qualified and experienced in their fields of speciality. Medical College and Hospital and Training RajaRajeswari Medical College and Hospital is a 1000 bedded Medical College Hospital, recognized for undergraduate and postgraduate training by Medical Council of India. All medical subjects are taught at the Medical College for the Dental students and students attend Medical and Surgical clinics at the Medical College & Hospital.
              </p>
            </SpotlightCard>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
