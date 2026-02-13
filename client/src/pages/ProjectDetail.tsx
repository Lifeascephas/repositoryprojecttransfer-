import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, MapPin, Tag, Hash, Calendar, Users, Clock, Globe, Home, Utensils, Shield, Phone, BookOpen, Target, AlertTriangle, Briefcase, DollarSign } from "lucide-react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import type { Project } from "@shared/schema";

interface ProjectEnrichment {
  theme: string;
  motto?: string;
  dates: { orientation: string; travel: string; closure: string; returnTravel: string };
  overview: string[];
  objectives: string[];
  challenges: string[];
  activities: string[];
  workType: string;
  accommodation: string[];
  fees: { amount: string; covers: string[]; notCovered: string[] };
  whatToCarry: string;
  language: string;
  emergencyContact: string;
  fgmInfo?: string[];
}

const projectEnrichments: Record<string, ProjectEnrichment> = {
  "KVDA/STV/2026/08B": {
    theme: "Gender Sensitivity: Focus on Female Genital Mutilation (FGM)",
    motto: "Strive for Excellence",
    dates: {
      orientation: "1st August 2026 at Nairobi South YMCA Hostel",
      travel: "2nd August 2026",
      closure: "21st August 2026",
      returnTravel: "22nd August 2026",
    },
    overview: [
      "Nyamanche Primary School started in 1981 as a Government School. The School supports children from the neighbouring villages. It consists of 600 (six hundred) pupils, 350 girls and 250 boys. The school has 12 teachers, 1 female and 11 male. It has 10 classrooms, 2 offices and 1 kitchen. The school has a good academic record in the County.",
      "The school was started with the aim of having members of the community have access to education and more so the girl child. In this community, differences between man and woman dictate a difference in their social roles and this reinforces a notion that men are more superior to women. Capacity building will provide both men and women with political insight and moral support in confronting gender issues.",
    ],
    objectives: [
      "To mould future leaders",
      "Maintain high discipline",
      "To reduce illiteracy level in the Community",
      "Create platform for volunteerism",
    ],
    challenges: [
      "Cultural practice such as female genital mutilation",
      "Poor sanitation",
      "Lack of funds to facilitate proposed development projects",
      "Dependency on external assistance",
      "Poor utilization of available resources",
    ],
    activities: [
      "School construction",
      "Teaching primary school pupils",
      "Tree planting",
      "Stones collection and pathways clearing",
      "Sensitization of the community on the side effects of FGM",
      "Home visits and topical discussion with the local people",
    ],
    workType: "CHIL/EDUC/MANU — Volunteers will work for six hours daily from Monday to Friday",
    accommodation: [
      "Volunteers will stay in classrooms at the School with very basic living conditions.",
      "KVDA will provide foodstuffs and volunteers will cook their own meals in turns.",
      "Water is available from springs and it is recommended that drinking water should be boiled or medicated.",
      "The Government policy to install ICT in primary schools has seen connectivity to the national power grid, making it easy for volunteers to use electric appliances.",
      "Volunteers are invited to bring typical food, spices, drinks, games and music from their country for an intercultural evening.",
    ],
    fees: {
      amount: "Euro 300",
      covers: [
        "Project preparation cycle",
        "Return transfers from the airport",
        "KVDA administration",
        "Orientation",
        "Certificate of participation",
        "Project coordination, facilitation, evaluation and monitoring",
      ],
      notCovered: [
        "Excursion activities",
        "Transport to and from the project",
        "Local travel",
        "Personal effects, needs and wants",
      ],
    },
    whatToCarry: "Sleeping bag and mat, toiletries, torch/flashlight, sandals, mosquito net, national flag from your country",
    language: "English is the language of the work camp. There will be a possibility of learning Kiswahili and other international and local languages as cultural diversity is a major component in international service.",
    emergencyContact: "+254 721 650 357",
    fgmInfo: [
      "Female genital mutilation is a strong tradition in this community. It is illegal, but still more than one third of the women are circumcised and each young woman is subjected to the cut.",
      "FGM has nothing to do with religion; it is a so-called culture and tradition in certain groups. The practice is deeply rooted in views on chastity, transition to womanhood, 'purity' for marriage and a wish to control women sexually.",
      "Many brave young girls who refuse FGM are regarded as 'unmarriageable' and become outcasts. It is a brutal act, painful and has led to the spread of HIV/AIDS.",
      "Volunteers will be required to liaise with other Non-Governmental organizations like Red Cross in creation of awareness to the community.",
    ],
  },
  "KVDA/STV/2026/NMCD": {
    theme: "Entrepreneurship Skills Training",
    dates: {
      orientation: "4th July 2026 at Nairobi South YMCA Hostel",
      travel: "5th July 2026",
      closure: "24th July 2026",
      returnTravel: "25th July 2026",
    },
    overview: [
      "Nyamira Missionaries was founded and registered with Social Development in 2002 in Kenya. The organization is located at Nyaramba, Nyamira County in the South Nyanza Region of Kenya. The organization consists of 137 members including men, women, and youth who range from 18 years to 80 years old.",
      "The organization has its office at Nyaramba market in Nyamira County, about 10 km from Nyamira town on the way to Ikonge township center. It is managed by an executive committee consisting of a chairperson, vice chairperson, secretary, vice secretary, treasurer and 5 members.",
      "The Nyaramba Missionaries Center attracts local and international travellers who come to experience traditional Gusii cultural dances, view and purchase artifacts including soapstone carvings, clay and wooden artifacts, and African baskets. The organization also runs an orphanage home to cater for orphans and children from poor families.",
    ],
    objectives: [
      "To be the best cultural performers and handicraft makers in Kenya",
      "To establish a presence as a successful supplier of soapstone carvings, clay and wooden artifacts locally and internationally",
      "To gain a substantial market share of artifacts, cultural performance and tourist centre at local and international level",
      "To run an orphanage home for orphans and children from poor families",
      "To engage in community development for empowering women and youth to be self-reliant",
      "To train women on entrepreneurship skills and financial management",
      "To empower men, women and community leaders on leadership",
      "To build capacity of women on life skills and self-confidence",
    ],
    challenges: [
      "Limited market access for locally produced artifacts and handicrafts",
      "Need for partners and volunteers to expand outreach internationally",
      "Supporting orphans and vulnerable children requires sustained funding",
      "Women and youth empowerment programs need continued capacity building",
    ],
    activities: [
      "Weaving and African basket making",
      "Art work including soapstone carving and artifact making",
      "Women training on self-awareness and confidence building",
      "Women training on entrepreneurship skills and financial management",
      "Meetings and media campaign on women empowerment in leadership",
      "Home visits and topical discussion with the local people",
      "Traditional Gusii cultural dance performances",
      "Cultural exchange with international volunteers",
    ],
    workType: "CULT/MANU/SOCI/ART — Volunteers will work for six hours daily from Monday to Friday",
    accommodation: [
      "Self-contained volunteer rooms at the organization offices with warm water and all facilities including cooking areas for those who wish to prepare their own food.",
      "Rooms are allocated at organization offices in a conducive environment with security and friendly neighbourhood.",
      "KVDA will provide foodstuffs and volunteers will cook their own meals in turns.",
      "Water is available and it is recommended that drinking water should be boiled or medicated. Mineral water available at supermarkets is also recommended.",
      "There is electricity connection at the project and so the volunteers can use electric appliances.",
      "Volunteers are invited to bring typical food, spices, drinks, games and music from their country for an intercultural evening.",
    ],
    fees: {
      amount: "Euro 300",
      covers: [
        "Project preparation cycle",
        "Return transfers from the airport",
        "KVDA administration",
        "Orientation",
        "Certificate of participation",
        "Project coordination, facilitation, evaluation and monitoring",
      ],
      notCovered: [
        "Excursion activities",
        "Transport to and from the project",
        "Local travel",
        "Personal effects, needs and wants",
      ],
    },
    whatToCarry: "Sleeping bag and mat, toiletries, torch/flashlight, sandals, mosquito net, national flag from your country",
    language: "English is the language of the work camp. There will be a possibility of learning Kiswahili and other international and local languages as cultural diversity is a major component in international service.",
    emergencyContact: "+254 721 650 357",
  },
  "KVDA/STV/2026/STM": {
    theme: "Women Empowerment: Girl Child Education",
    dates: {
      orientation: "4th January 2026 at Nairobi South YMCA Hostel",
      travel: "5th January 2026",
      closure: "24th January 2026",
      returnTravel: "25th January 2026",
    },
    overview: [
      "St. Theresa Mabera Primary School was registered on 3rd September 2018. The school is situated in Mabera Township along the Migori to Isebania Road, Taraga location, Mabera Sub County of Migori County in South West Kenya. It is a mixed day school for boys and girls located predominantly among the Kuria community, one of Kenya's marginalized ethnic communities.",
      "The school has a population of 187 pupils; 96 boys and 91 girls. The School has 8 teachers and 4 non-teaching staff. The infrastructure remains a challenge as the school continues to grow and serve the local community.",
      "Girls' education goes beyond getting girls into school. It is also about ensuring that girls learn and feel safe while in school; complete all levels of education with the skills to effectively compete in the labor market; learn the socio-emotional and life skills necessary to navigate and adapt to a changing world; make decisions about their own lives; and contribute to their communities and the world.",
    ],
    objectives: [
      "Promote girl child education and women empowerment",
      "Sensitize the community on the effects of FGM",
      "Empower the vulnerable in society with focus on children",
      "Foster global cooperation through inter-cultural education",
      "Support orphans and vulnerable children through home visits",
    ],
    challenges: [
      "Cultural practices such as female genital mutilation affecting girls",
      "Child marriage causing girls to drop out of school",
      "Poverty as a barrier to accessing education",
      "Limited school infrastructure for a growing population",
      "Gender-based violence negatively impacting learning",
    ],
    activities: [
      "Teaching",
      "Playing with children",
      "Sand harvesting",
      "Sensitization on the effects of Female Genital Mutilation (FGM) to children, parents and the entire community",
      "Empowering the vulnerable in society with focus on children",
      "Promotion of safe male circumcision",
      "Home visits to the orphans and the vulnerable in society",
      "Inter-cultural education to foster global cooperation",
    ],
    workType: "SOCI/CONS/CHIL — Volunteers will work for six hours daily from Monday to Friday",
    accommodation: [
      "The host community will provide a house to accommodate the volunteers with basic living conditions.",
      "Volunteers have an obligation to climb down the level of the people with the aim of exposure to development challenges.",
      "KVDA will provide foodstuffs and volunteers will cook their own meals in turns.",
      "Water is available from springs and it is recommended that drinking water should be boiled or medicated. Mineral water available at supermarkets is also recommended.",
      "There is electricity connection at the project and solar energy in case of power outages. Volunteers can charge electric appliances at the project.",
      "Volunteers are invited to bring typical food, spices, drinks, games and music from their country for an intercultural evening.",
    ],
    fees: {
      amount: "Euro 300",
      covers: [
        "Project preparation cycle",
        "Return transfers from the airport",
        "KVDA administration",
        "Orientation",
        "Certificate of participation",
        "Project coordination, facilitation, evaluation and monitoring",
      ],
      notCovered: [
        "Excursion activities",
        "Transport to and from the project",
        "Local travel",
        "Personal effects, needs and wants",
      ],
    },
    whatToCarry: "Sleeping bag and mat, toiletries, torch/flashlight, sandals, mosquito net, national flag from your country",
    language: "English is the language of the work camp. There will be a possibility of learning Kiswahili and other international and local languages as cultural diversity is a major component in international service.",
    emergencyContact: "+254 721 650 357",
    fgmInfo: [
      "According to UNESCO estimates, 130 million girls between the age of 6 and 17 are out of school and 15 million girls of primary-school age — half of them in sub-Saharan Africa — will never enter a classroom.",
      "Poverty remains the most important factor for determining whether a girl can access an education. Studies consistently reinforce that girls who face multiple disadvantages — such as low family income, living in remote or underserved locations, disability or belonging to a minority ethno-linguistic group — are farthest behind in accessing education.",
      "Child marriage is a critical challenge. Child brides are much more likely to drop out of school and complete fewer years of education than their peers who marry later. According to estimates, ending child marriage could generate more than $500 billion in benefits annually each year.",
      "Better educated women tend to be healthier, participate more in the formal labor market, earn higher incomes, have fewer children, marry at a later age, and enable better health care and education for their children. All these factors combined can help lift households, communities, and nations out of poverty.",
    ],
  },
};

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:id");
  const id = params?.id;

  const { data: project, isLoading } = useQuery<Project>({
    queryKey: ['/api/projects', id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">Project Not Found</h2>
          <Link href="/projects">
            <Button variant="outline" className="border-primary text-primary">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const enrichment = project.code ? projectEnrichments[project.code] : null;

  return (
    <div className="min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={project.imageUrl || "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80"}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="container px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Link href="/projects" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6" data-testid="link-back-projects">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Projects</span>
            </Link>
            <div className="flex items-center gap-3 text-primary font-medium tracking-wide uppercase text-xs mb-4">
              <Tag className="h-4 w-4" />
              <span>{project.sector}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-light text-white mb-6" data-testid="text-project-title">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-zinc-300 text-sm">
              {project.code && (
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-primary" />
                  <span>{project.code}</span>
                </div>
              )}
              {project.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{project.location}</span>
                </div>
              )}
            </div>
            {enrichment?.theme && (
              <div className="mt-4 inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-md px-3 py-1.5 text-sm text-white">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>Theme: {enrichment.theme}</span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-display font-semibold text-gray-900 mb-8" data-testid="text-about-heading">
                  About This Project
                </h2>
                {enrichment?.motto && (
                  <div className="mb-6 p-4 bg-primary/5 border-l-4 border-primary rounded-r-md">
                    <p className="text-gray-700 italic font-medium">Motto: "{enrichment.motto}"</p>
                  </div>
                )}
                {enrichment ? (
                  <div className="space-y-5">
                    {enrichment.overview.map((paragraph, i) => (
                      <p key={i} className="text-gray-600 leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 leading-relaxed text-lg">{project.description}</p>
                )}

                {enrichment?.objectives && enrichment.objectives.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" /> Objectives
                    </h3>
                    <ul className="space-y-2">
                      {enrichment.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600">
                          <ArrowRight className="h-4 w-4 text-primary mt-1 shrink-0" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {enrichment?.challenges && enrichment.challenges.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-primary" /> Challenges
                    </h3>
                    <ul className="space-y-2">
                      {enrichment.challenges.map((ch, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600">
                          <ArrowRight className="h-4 w-4 text-primary mt-1 shrink-0" />
                          <span>{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {enrichment?.activities && enrichment.activities.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" /> Project Activities
                    </h3>
                    {enrichment.workType && (
                      <p className="text-gray-500 text-sm mb-4 italic">{enrichment.workType}</p>
                    )}
                    <ul className="space-y-2">
                      {enrichment.activities.map((act, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600">
                          <ArrowRight className="h-4 w-4 text-primary mt-1 shrink-0" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {enrichment?.fgmInfo && enrichment.fgmInfo.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" /> Theme: {enrichment.theme}
                    </h3>
                    <div className="space-y-4">
                      {enrichment.fgmInfo.map((info, i) => (
                        <p key={i} className="text-gray-600 leading-relaxed">{info}</p>
                      ))}
                    </div>
                  </div>
                )}

                {enrichment?.accommodation && enrichment.accommodation.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Home className="h-5 w-5 text-primary" /> Accommodation & Meals
                    </h3>
                    <ul className="space-y-3">
                      {enrichment.accommodation.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600">
                          <ArrowRight className="h-4 w-4 text-primary mt-1 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {enrichment?.fees && (
                  <div className="mt-10">
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" /> Participation Fees
                    </h3>
                    <p className="text-gray-900 font-semibold text-lg mb-4">
                      {enrichment.fees.amount} <span className="text-gray-500 text-sm font-normal">(all-inclusive for 3-week workcamp)</span>
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">What is covered:</p>
                        <ul className="space-y-1.5">
                          {enrichment.fees.covers.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                              <ArrowRight className="h-3 w-3 text-green-600 mt-1 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">What is not covered:</p>
                        <ul className="space-y-1.5">
                          {enrichment.fees.notCovered.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                              <ArrowRight className="h-3 w-3 text-red-500 mt-1 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 mt-10">
                  <Link href="/apply">
                    <Button className="bg-primary text-white" data-testid="button-apply">
                      Apply Now <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="border-primary text-primary" data-testid="button-inquire">
                      Make Inquiry
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border border-gray-100 shadow-sm sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-5">Project Details</h3>
                    <div className="space-y-4">
                      {project.code && (
                        <div className="flex items-start gap-3">
                          <Hash className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Project Code</p>
                            <p className="text-gray-900 font-medium text-sm" data-testid="text-project-code">{project.code}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Location</p>
                          <p className="text-gray-900 font-medium text-sm" data-testid="text-project-location">{project.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Tag className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Sector</p>
                          <p className="text-gray-900 font-medium text-sm" data-testid="text-project-sector">{project.sector}</p>
                        </div>
                      </div>
                      {enrichment?.dates ? (
                        <>
                          <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Dates</p>
                              <p className="text-gray-900 font-medium text-sm">1st - 22nd August 2026</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Duration</p>
                              <p className="text-gray-900 font-medium text-sm">3 Weeks</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Participants</p>
                              <p className="text-gray-900 font-medium text-sm">Max 20 Volunteers (Kenya & International)</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Globe className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Language</p>
                              <p className="text-gray-900 font-medium text-sm">English (Kiswahili optional)</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <DollarSign className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Participation Fee</p>
                              <p className="text-gray-900 font-medium text-sm">{enrichment.fees.amount}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Utensils className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Accommodation</p>
                              <p className="text-gray-900 font-medium text-sm">School classrooms (basic)</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Emergency Contact</p>
                              <p className="text-gray-900 font-medium text-sm">{enrichment.emergencyContact}</p>
                            </div>
                          </div>
                        </>
                      ) : project.programType === "short_term" ? (
                        <>
                          <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Duration</p>
                              <p className="text-gray-900 font-medium text-sm">3 Weeks</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Participants</p>
                              <p className="text-gray-900 font-medium text-sm">15-20 International Volunteers</p>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                      <Link href="/apply" className="block">
                        <Button className="w-full bg-primary text-white" data-testid="button-sidebar-apply">
                          Apply Now <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                      <Link href="/contact" className="block">
                        <Button variant="outline" className="w-full border-primary text-primary" data-testid="button-sidebar-inquire">
                          Make Inquiry
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {enrichment?.dates && (
                  <Card className="border border-gray-100 shadow-sm mt-6">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Dates</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Orientation</p>
                          <p className="text-gray-900 text-sm">{enrichment.dates.orientation}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Travel to Project</p>
                          <p className="text-gray-900 text-sm">{enrichment.dates.travel}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Project Closure</p>
                          <p className="text-gray-900 text-sm">{enrichment.dates.closure}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Return Travel</p>
                          <p className="text-gray-900 text-sm">{enrichment.dates.returnTravel}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {enrichment?.whatToCarry && (
                  <Card className="border border-gray-100 shadow-sm mt-6">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">What to Carry</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{enrichment.whatToCarry}</p>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
              Explore More Projects
            </h2>
            <p className="text-gray-600 mb-6">
              Discover other volunteer projects across Kenya.
            </p>
            <Link href="/projects">
              <Button variant="outline" className="border-primary text-primary" data-testid="link-all-projects">
                View All Projects <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
