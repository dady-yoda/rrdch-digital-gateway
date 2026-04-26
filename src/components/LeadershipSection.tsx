import { useState } from "react";
import { Link } from "react-router-dom";
import chairmanImg from "@/assets/chairman.jpg";
import collegeImg from "@/assets/college-img.jpg";
import hospitalImg from "@/assets/hospital.jpg";
import FadeInSection from "./FadeInSection";

const LeadershipSection = () => {
  const [collegeExpanded, setCollegeExpanded] = useState(false);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Chairman, College & Hospital Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Chairman's Message Card */}
          <FadeInSection className="h-[450px]">
            <div className="group relative w-full h-full rounded-2xl overflow-hidden shadow-lg border border-border/50 cursor-pointer">
              <img
                src={chairmanImg}
                alt="Dr. A.C. Shanmugam, Chairman"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-500 xl:group-hover:bg-black/70 group-hover:bg-black/80" />
              
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                  <h3 className="font-heading text-2xl font-bold text-white mb-1 drop-shadow-md">CHAIRMAN'S MESSAGE</h3>
                  <p className="text-white/90 font-semibold mb-2 text-sm drop-shadow-md">Dr. A.C. Shanmugam</p>
                  
                  <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-white/90 leading-relaxed line-clamp-4 text-sm mb-5 mt-2 italic drop-shadow-sm">
                        "It is my pleasure to congratulate you on your enrolling yourself as a student in our group of institutions, 
                        which are well known for the discipline,quality education and personality development. Our Students have excelled
                        not only in academic activities by obtaining many university ranks, but also have proved their mettle by taking part 
                        in circular, co-curricular and extra curricular activities. Presently, a knowledge explosion is being ushered in to present era 
                        especially information technology domain. We are working with a progressive & futuristic vision of India, to bring about paradigm 
                        shift in arts,science, engineering & technology which will bring progress and prosperity to our country. We are convinced that 
                        “character is the crown and glory of life”. We believe in quality education, progress through discipline, knowledge through devotion
                        and satisfaction through services to the student community.
                        We are dedicated to meet the challenges of the new millennium, in the field of medical and technical higher education so as to make 
                        our country a highly industrialized and healthy modern nation."
                      </p>
                      <Link to="/about-us" className="group/btn relative overflow-hidden inline-flex items-center justify-center px-6 py-2.5 bg-[#FFF8EC] text-[#546B41] rounded-full font-bold text-sm uppercase tracking-[0.2px] w-max shadow-md pointer-events-auto">
                        <span className="absolute left-1/2 -ml-6 -bottom-4 w-12 h-12 bg-[#546B41] rounded-full scale-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:scale-[16]" />
                        <span className="relative flex items-center justify-center h-5 overflow-hidden">
                          <span className="flex items-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:-translate-y-[150%]">
                            Read More <span className="ml-1 relative top-[1px]">&rarr;</span>
                          </span>
                          <span className="absolute inset-0 flex items-center justify-center text-[#FFF8EC] translate-y-[150%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-y-0">
                            Read More <span className="ml-1 relative top-[1px]">&rarr;</span>
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* College Card */}
          <FadeInSection className="h-[450px]">
            <div className="group relative w-full h-full rounded-2xl overflow-hidden shadow-lg border border-border/50 cursor-pointer">
              <img
                src={collegeImg}
                alt="The College"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-500 xl:group-hover:bg-black/70 group-hover:bg-black/80" />
              
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                  <h3 className="font-heading text-2xl font-bold text-white mb-2 drop-shadow-md">THE COLLEGE</h3>
                  
                  <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-white/90 leading-relaxed line-clamp-4 text-sm mb-5 mt-2 drop-shadow-sm">
                        RajaRajeswari Dental College & Hospital was established in the year 1992 with just 40 admissions in BDS course. It was housed in a rented building measuring 40,000 Sq. Feet. Now it has progressed to 
                        a full- fledged Postgraduate Dental Institution with 100 BDS admissions and MDS courses in all specialties of Dental Surgery. In addition, PhD in Orthodontics, Periodontology and certificate course in 
                        Implantology are also offered in RRDCH. The college is recognized by DCI, Government of Karnataka and Government of India and is affiliated to Rajiv Gandhi University of Health Sciences, Karnataka. 
                        It is accredited by NAAC (National Assessment Accreditation Council)<br />
                        RajaRajeswari Dental College & Hospital is situated at a sprawling 5 acre campus on the Bangalore-Mysore Highway at 19 kms from Vidhana Soudha. The Lush green campus has 4 lakh Sq. feet of modern 
                        building which houses the Dental Institute, its 10 speciality dental clinics, supporting labs and class rooms and residential accommodation for staff and students.
                      </p>
                      <Link to="/about-us" className="group/btn relative overflow-hidden inline-flex items-center justify-center px-6 py-2.5 bg-[#FFF8EC] text-[#546B41] rounded-full font-bold text-sm uppercase tracking-[0.2px] w-max shadow-md pointer-events-auto">
                        <span className="absolute left-1/2 -ml-6 -bottom-4 w-12 h-12 bg-[#546B41] rounded-full scale-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:scale-[16]" />
                        <span className="relative flex items-center justify-center h-5 overflow-hidden">
                          <span className="flex items-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:-translate-y-[150%]">
                            Read More <span className="ml-1 relative top-[1px]">&rarr;</span>
                          </span>
                          <span className="absolute inset-0 flex items-center justify-center text-[#FFF8EC] translate-y-[150%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-y-0">
                            Read More <span className="ml-1 relative top-[1px]">&rarr;</span>
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Hospital Card */}
          <FadeInSection className="h-[450px]">
            <div className="group relative w-full h-full rounded-2xl overflow-hidden shadow-lg border border-border/50 cursor-pointer">
              <img
                src={hospitalImg}
                alt="The Hospital"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-500 xl:group-hover:bg-black/70 group-hover:bg-black/80" />
              
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                  <h3 className="font-heading text-2xl font-bold text-white mb-2 drop-shadow-md">THE HOSPITAL</h3>
                  
                  <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-white/90 leading-relaxed line-clamp-4 text-sm mb-5 mt-2 drop-shadow-sm">
                        Dental Hospital and Training Dental clinics in all departments have 250 modern dental units / chairs. An average 450 to 500 patients are treated in these clinics daily. Each department is staffed with more than required number of full time and dedicated teachers who are well qualified and experienced in their fields of speciality. Medical College and Hospital and Training RajaRajeswari Medical College and Hospital is a 1000 bedded Medical College Hospital, recognized for undergraduate and postgraduate training by Medical Council of India. All medical subjects are taught at the Medical College for the Dental students and students attend Medical and Surgical clinics at the Medical College & Hospital.
                      </p>
                      <Link to="/about-us" className="group/btn relative overflow-hidden inline-flex items-center justify-center px-6 py-2.5 bg-[#FFF8EC] text-[#546B41] rounded-full font-bold text-sm uppercase tracking-[0.2px] w-max shadow-md pointer-events-auto">
                        <span className="absolute left-1/2 -ml-6 -bottom-4 w-12 h-12 bg-[#546B41] rounded-full scale-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:scale-[16]" />
                        <span className="relative flex items-center justify-center h-5 overflow-hidden">
                          <span className="flex items-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:-translate-y-[150%]">
                            Read More <span className="ml-1 relative top-[1px]">&rarr;</span>
                          </span>
                          <span className="absolute inset-0 flex items-center justify-center text-[#FFF8EC] translate-y-[150%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-y-0">
                            Read More <span className="ml-1 relative top-[1px]">&rarr;</span>
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
