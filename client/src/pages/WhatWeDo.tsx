import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Globe, Clock, Flag, Sparkles, Plane, Map,
  HeartHandshake, Building2, Lightbulb, Languages,
  Theater, Hotel, ArrowRight, CheckCircle2
} from "lucide-react";

export const services = [
  {
    slug: "international-workcamps",
    icon: Globe,
    title: "International Work Camps",
    summary: "Recruiting volunteers worldwide through partner organizations to participate in community service projects at the grassroots in Kenya.",
    description: `It involves recruitment of volunteers worldwide through partner organizations in respective countries to participate in community service projects at the grassroots in Kenya.

The projects are identified by the local community who team up with volunteers from Kenya and overseas to support the community to implement actions to empower the local people.

Popular projects include tree planting, construction at schools, manual work, working with children, study work, world heritage volunteers, art, music and theatre, teaching, medical care among others.

More than 50 projects are organized nationwide where we deploy motivated volunteers who have incredibly made a big difference in society.`,
    duration: "2-4 weeks",
    requirements: ["Minimum age 18 years", "Valid passport", "Application through partner organization or directly", "Participation fee required", "Open to all nationalities"],
    projects: [
      { name: "Tree Planting & Reforestation", location: "Mt. Kenya Region", sector: "Environment" },
      { name: "School Construction & Renovation", location: "Narok County", sector: "Education" },
      { name: "Community Health Outreach", location: "Kilifi County", sector: "Health" },
      { name: "Children's Education Support", location: "Nairobi", sector: "Education" },
      { name: "World Heritage Site Conservation", location: "Lamu Island", sector: "Culture" },
      { name: "Art, Music & Theatre Workshops", location: "Kisumu", sector: "Arts" },
      { name: "Special Needs Education", location: "Machakos County", sector: "Education" },
      { name: "Water & Sanitation Projects", location: "Kitui County", sector: "Infrastructure" },
      { name: "Refugee Camp Support", location: "Kakuma", sector: "Humanitarian" },
      { name: "Agricultural Training", location: "Bungoma County", sector: "Agriculture" },
    ],
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-100",
  },
  {
    slug: "medium-long-term-placement",
    icon: Clock,
    title: "Medium and Long-term Volunteers' Placement",
    summary: "Over 40 projects nationwide open to volunteers for durations ranging from one month to one year in rural Kenya.",
    description: `KVDA has over 40 projects nationwide that are open to medium and long-term volunteers for a duration ranging from one month to one year.

Most of the projects are located in rural Kenya in various institutions that are community based.

We encourage professionals to take advantage of the available opportunities in order to continue to impact positively on society.

Volunteers are placed in schools, hospitals, children's homes, community organizations, and environmental conservation centers where they contribute their skills and expertise for sustained impact.`,
    duration: "1-12 months",
    requirements: ["Minimum age 20 years", "Professional qualifications preferred", "Background check required", "Health certificate", "Commitment to full placement duration"],
    projects: [
      { name: "Teaching English & French", location: "Various Schools Nationwide", sector: "Education" },
      { name: "Medical Volunteering", location: "Rural Health Centers", sector: "Health" },
      { name: "Orphanage & Children's Home Support", location: "Nairobi & Mombasa", sector: "Social Work" },
      { name: "Environmental Conservation", location: "Kakamega Forest", sector: "Environment" },
      { name: "Women Empowerment Centers", location: "Kisii County", sector: "Gender" },
      { name: "IT & Computer Training", location: "Community Centers", sector: "Technology" },
      { name: "Sports & Recreation Programs", location: "Eldoret", sector: "Youth" },
      { name: "Agricultural Extension", location: "Western Kenya", sector: "Agriculture" },
    ],
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
  },
  {
    slug: "national-workcamps",
    icon: Flag,
    title: "National Workcamps and Expeditions",
    summary: "Recruiting national volunteers from Kenya dedicated to supporting community development through partnerships with learning institutions.",
    description: `National workcamps focus on recruitment of national volunteers from Kenya who are dedicated to support community development.

KVDA has partnerships with learning institutions to make this program a reality and impacted positively on society. The majority of volunteers on this program are young people who have completed their primary and secondary school education.

We have students from institutions of high learning majoring in social sciences attached to this program.

We are open to new partnerships and welcome motivated volunteers to join the program.

The national workcamps provide Kenyan youth with hands-on experience in community development, leadership skills, and cross-cultural interaction with international volunteers working on the same projects.`,
    duration: "2-4 weeks",
    requirements: ["Kenyan citizen or resident", "Minimum age 16 years", "Student ID or national ID", "Parental consent for minors", "Team spirit and willingness to work"],
    projects: [
      { name: "School Renovation Projects", location: "Rift Valley", sector: "Education" },
      { name: "Community Clean-up Campaigns", location: "Nairobi Suburbs", sector: "Environment" },
      { name: "Youth Leadership Camps", location: "Nanyuki", sector: "Youth" },
      { name: "Rural Road Construction", location: "Baringo County", sector: "Infrastructure" },
      { name: "Peace Building Workshops", location: "Marsabit", sector: "Peace" },
      { name: "Cultural Exchange Festivals", location: "Malindi", sector: "Culture" },
    ],
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-100",
  },
  {
    slug: "erasmus-plus",
    icon: Sparkles,
    title: "Erasmus Plus Program",
    summary: "Funded by the European Commission, implementing projects in partnership with EU organizations since 2008.",
    description: `In partnership with organizations from EU, KVDA has been actively involved in the implementation of Erasmus plus projects and so far we have successfully implemented 25 projects since 2008 under the aegis of Youth in action program the precursor of Erasmus plus program.

We are open to new partnerships based on our track record on deliverables.

The Erasmus+ program enables youth exchanges, training courses, and capacity building projects that bring together young people and youth workers from Europe and Kenya for meaningful intercultural learning and community development.

Through this program, KVDA has facilitated seminars, training courses, and youth exchanges focusing on themes like environmental sustainability, social inclusion, and active citizenship.`,
    duration: "1-3 weeks (exchanges), up to 12 months (EVS)",
    requirements: ["Age 18-30 for youth exchanges", "EU partner organization sponsorship", "Selected through application process", "No participation fee for funded activities", "English language proficiency"],
    projects: [
      { name: "Youth Exchange: Climate Action", location: "Nairobi & EU Countries", sector: "Environment" },
      { name: "Training Course: Youth Leadership", location: "KVDA Residence, Karen", sector: "Training" },
      { name: "Capacity Building: NGO Management", location: "Various Locations", sector: "Development" },
      { name: "European Voluntary Service Hosting", location: "Community Projects Nationwide", sector: "Volunteering" },
      { name: "Intercultural Dialogue Seminars", location: "KVDA & Partner Countries", sector: "Culture" },
    ],
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-100",
  },
  {
    slug: "outbound-exchange",
    icon: Plane,
    title: "Outbound Voluntary Service Exchange Program",
    summary: "Affording young Kenyans opportunities to volunteer in projects across Africa, Asia, Europe and the Americas.",
    description: `Volunteering abroad. KVDA has launched the 2021 outbound volunteering program.

This program affords young people from Kenya an opportunity to volunteers in projects in Africa, Asia, Europe and Americas through partner organizations in those countries.

The projects range from 2 weeks to 1 year.

Motivated volunteers are encouraged to submit applications.

The outgoing volunteers are hosted in projects identified by our partners overseas.

Through this program, Kenyan volunteers gain international experience, develop cross-cultural skills, and bring back knowledge and best practices to strengthen community development in Kenya.`,
    duration: "2 weeks to 1 year",
    requirements: ["Kenyan citizen aged 18-35", "Valid passport", "Application and selection process", "Orientation and pre-departure training", "Cultural sensitivity and adaptability"],
    projects: [
      { name: "Workcamps in Germany & France", location: "Europe", sector: "Community" },
      { name: "Teaching in South Korea & Japan", location: "Asia", sector: "Education" },
      { name: "Environmental Projects in Iceland", location: "Europe", sector: "Environment" },
      { name: "Social Work in India & Nepal", location: "Asia", sector: "Social Work" },
      { name: "Community Projects in Mexico & Peru", location: "Americas", sector: "Development" },
      { name: "Cultural Exchange in Morocco & Tunisia", location: "Africa", sector: "Culture" },
    ],
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-100",
  },
  {
    slug: "educational-tours",
    icon: Map,
    title: "Educational Tours",
    summary: "Organizing tours to spectacular sites including the renowned Maasai Mara Game Reserve, Nairobi National Park and Lake Nakuru.",
    description: `KVDA organizes educational tours to spectacular sites of interest in Kenya more so the renowned Maasai Mara Game Reserve, Nairobi National Park and Lake Nakuru National Park.

We have different tailor-made packages that are suitable to volunteers motivated to experience that circumstance bestowed by the beauty of Kenya, wildlife and national heritage.

Our tours combine wildlife safari experiences with cultural immersion, community visits, and educational components that give visitors a deeper understanding of Kenya's biodiversity, conservation challenges, and indigenous communities.`,
    duration: "1-7 days per tour",
    requirements: ["Open to all ages and nationalities", "Booking in advance recommended", "Transport and accommodation arranged", "Tour guide provided", "Travel insurance recommended"],
    projects: [
      { name: "Maasai Mara Game Reserve Safari", location: "Narok County", sector: "Wildlife" },
      { name: "Nairobi National Park Tour", location: "Nairobi", sector: "Wildlife" },
      { name: "Lake Nakuru Flamingo Safari", location: "Nakuru County", sector: "Wildlife" },
      { name: "Amboseli & Mt. Kilimanjaro Views", location: "Kajiado County", sector: "Wildlife" },
      { name: "Lamu Old Town Heritage Tour", location: "Lamu Island", sector: "Culture" },
      { name: "Maasai Village Cultural Visit", location: "Kajiado", sector: "Culture" },
      { name: "David Sheldrick Elephant Orphanage", location: "Nairobi", sector: "Conservation" },
    ],
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
  },
  {
    slug: "development-education",
    icon: HeartHandshake,
    title: "Development Education and Empowerment of Communities",
    summary: "Poverty eradication through linkages on income generation and sustenance of livelihoods at the grassroots.",
    description: `Poverty eradication is a key plank in our intervention strategies at the grassroots. The majority of the people in communities recipient to our volunteer projects live in abject poverty and we have a deliberate strategy to support them through linkages on income generation and sustenance of livelihoods.

Through the maxim "Development Against Dependence", we are cognizant of the fact that true development must be people-centered and driven for sustainable development.

KVDA empowers communities through training in income-generating activities, microfinance support, and capacity building that enables local communities to become self-reliant and sustainable.`,
    duration: "Ongoing community programs",
    requirements: ["Community-based approach", "Partnership with local organizations", "Focus on sustainable impact", "Participatory development methods"],
    projects: [
      { name: "Women's Microfinance Groups", location: "Siaya County", sector: "Economic" },
      { name: "Youth Income Generation", location: "Mombasa", sector: "Economic" },
      { name: "Community Savings & Loans", location: "Busia County", sector: "Financial" },
      { name: "Sustainable Agriculture Training", location: "Trans Nzoia", sector: "Agriculture" },
      { name: "Clean Water Access Projects", location: "Makueni County", sector: "Infrastructure" },
    ],
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-100",
  },
  {
    slug: "corporate-social-responsibility",
    icon: Building2,
    title: "Corporate Social Responsibility (CSR)",
    summary: "Enhancing capacities of community-based organizations through the corporate sector to spur sustainable development.",
    description: `In response to emerging needs on structural reforms at the grassroots the corporate sector is keen to enhance the capacities of community-based organizations to enable them to effectively respond to emerging challenges.

This program has the capacity to transform communities in dire straits through enhanced infrastructure to spur sustainable development.

KVDA partners with corporations to channel their CSR initiatives into meaningful community projects that create lasting impact through infrastructure development, skill transfer, and sustainable community programs.`,
    duration: "Project-based (1 week to 6 months)",
    requirements: ["Corporate partnership agreement", "Aligned CSR objectives", "Community impact assessment", "Reporting and accountability framework"],
    projects: [
      { name: "School Infrastructure Development", location: "Nationwide", sector: "Education" },
      { name: "Hospital & Clinic Renovations", location: "Rural Areas", sector: "Health" },
      { name: "Community Center Construction", location: "Various Counties", sector: "Infrastructure" },
      { name: "Environmental Clean-up Campaigns", location: "Urban Centers", sector: "Environment" },
    ],
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-100",
  },
  {
    slug: "enterprise-development-training",
    icon: Lightbulb,
    title: "Enterprise Development Training",
    summary: "Youth Entrepreneurship and Leadership Development program (YELD) responding to the unemployment crisis among Kenyan youths.",
    description: `Youth Entrepreneurship and Leadership Development program (YELD) was initiated to respond to the unemployment crisis among the youths in Kenya.

KVDA has devised training course to respond to this challenge with the capacity to enable the youths to translate the program skills into economic opportunities.

The YELD program equips young people with practical business skills, financial literacy, and leadership capabilities that enable them to create sustainable livelihoods and become job creators rather than job seekers.`,
    duration: "2-6 weeks training programs",
    requirements: ["Kenyan youth aged 18-35", "Basic literacy skills", "Entrepreneurial mindset", "Commitment to complete training", "Business idea or interest"],
    projects: [
      { name: "Business Plan Development Workshop", location: "KVDA Residence, Karen", sector: "Training" },
      { name: "Digital Skills & ICT Training", location: "Nairobi", sector: "Technology" },
      { name: "Agribusiness Entrepreneurship", location: "Nakuru", sector: "Agriculture" },
      { name: "Financial Literacy Programs", location: "Various Counties", sector: "Finance" },
      { name: "Leadership & Mentorship Camps", location: "Nanyuki", sector: "Leadership" },
    ],
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100",
  },
  {
    slug: "languages-teaching",
    icon: Languages,
    title: "Languages Teaching (Kiswahili and English)",
    summary: "Designed to fill language gaps for volunteers arriving in Kenya interested in learning Kiswahili or English.",
    description: `This is designed specifically to fill gaps for volunteers arriving in Kenya and are interested to learn either Kiswahili or English as these are the languages of choice for effective communication in Kenya.

The program is tailor-made to suit the needs of the potential volunteers organized at the grassroots.

Classes are conducted by experienced local teachers and combine classroom learning with practical immersion through community interaction, market visits, and cultural activities that accelerate language acquisition.`,
    duration: "1-8 weeks",
    requirements: ["Open to international volunteers", "No prior knowledge required", "Materials provided", "Homestay accommodation available"],
    projects: [
      { name: "Kiswahili Beginner Course", location: "KVDA Residence, Karen", sector: "Education" },
      { name: "Kiswahili Intermediate Course", location: "Mombasa", sector: "Education" },
      { name: "English Language Support", location: "Various Locations", sector: "Education" },
      { name: "Cultural Immersion & Language Practice", location: "Rural Communities", sector: "Culture" },
    ],
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-100",
  },
  {
    slug: "intercultural-education",
    icon: Theater,
    title: "Inter-cultural Education and Forum Theatre",
    summary: "Using forum theatre and non-formal education to enhance cultural diversity and effective communication at the grassroots.",
    description: `Forum theater and other non-formal education methodologies are critical at the grassroots for effective communication.

KVDA works with budding artistes and theater groups on a program that has profoundly translated thematic issues through drama, music, storytelling and dance.

Through interactive performances and workshops, communities explore social issues, challenge stereotypes, and develop collective solutions to challenges affecting their daily lives.`,
    duration: "1-4 weeks",
    requirements: ["Interest in performing arts", "Open-minded and creative", "No prior experience needed", "Willingness to engage with communities"],
    projects: [
      { name: "Forum Theatre on Gender Equality", location: "Nairobi Informal Settlements", sector: "Social" },
      { name: "HIV/AIDS Awareness Through Drama", location: "Homa Bay County", sector: "Health" },
      { name: "Youth Cultural Exchange Festivals", location: "Malindi", sector: "Culture" },
      { name: "Storytelling & Oral Traditions", location: "Lamu", sector: "Heritage" },
    ],
    color: "text-fuchsia-600",
    bgColor: "bg-fuchsia-50",
    borderColor: "border-fuchsia-100",
  },
  {
    slug: "conferences-hospitality",
    icon: Hotel,
    title: "Conferences and Hospitality Facilities",
    summary: "KVDA residence offers conference facilities for national and international teams with capacity to make a big difference.",
    description: `KVDA residence offers the ambience and aura for holding conferences for national and international teams.

Organizations wishing to organize conference and events are welcome as this is an opportunity with the capacity to make the big difference.

Located in the serene Karen suburb of Nairobi, the KVDA Residence provides comfortable accommodation, equipped conference rooms, and catering services for organizations hosting workshops, seminars, and retreats.`,
    duration: "Day events to multi-week conferences",
    requirements: ["Advance booking required", "Catering services available", "AV equipment provided", "Accommodation packages available"],
    projects: [
      { name: "Conference Hall Rental", location: "KVDA Residence, Karen", sector: "Hospitality" },
      { name: "Workshop & Seminar Hosting", location: "KVDA Residence, Karen", sector: "Training" },
      { name: "Retreat & Team Building", location: "KVDA Residence, Karen", sector: "Corporate" },
      { name: "Volunteer Orientation Center", location: "KVDA Residence, Karen", sector: "Volunteering" },
    ],
    color: "text-slate-600",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-100",
  },
];

const achievements = [
  "KVDA has implemented over 10,000 community development projects",
  "Constructed a water tank at Ole Sankale Primary School in Narok district in conjunction with Japanese International Cooperation Agency (JICA) in 2001",
  "Renovation of Nyamaranya Primary School in Isebania, Kuria district in conjunction with the Kenya Charity Sweepstake in 2002",
  "Constructed Nzinia Community dispensary in Tulia, Kitui district in 2002",
  "Collaborated with Kuria Child and family program in Isebania in Migori county on Girl Child Education in 2002",
  "Facilitated participation of the youth in Poverty Reduction Strategies through the Youth Thematic Group in 2002/3",
  "Organized international work camps at Kakuma Refugees camp in Turkana district in collaboration with United Nations High Commissioner for Refugees (UNHCR) where volunteers worked with UN agencies to address the plight of refugees in 2002 and 2004",
  "Improvement of Kirasha Rescue center in Kiambu through Medium and Long-term voluntary service program from 2001-2007",
  "Hosted the 29th General Assembly and conference of the Coordinating Committee for International Voluntary Service (CCIVS) in Nairobi attended by over 100 member organizations globally in November 2004",
  "In partnership with Nairobi Peace Initiative (NPI-Africa) and World Student Christian Federation (WSCF), organized a training workshop and work camp for the great lakes region on peace building and conflict transformation in Nairobi and Kuria/Transmara districts respectively in August 2005",
  "Improvement of Epang'a Primary School infrastructure through short-term and long-term volunteers from 2006-2009",
  "Participated in tree planting ceremony at Westlands Primary School and sustainable clean up of the Nairobi rivers under the umbrella of Voluntary Associations Consortium of Kenya (VASCO) in December 2006",
  "In 2007 re-elected into the Executive committee of CCIVS and the Executive Director elected as the CCIVS Vice President in charge of capacity building and Quality Improvement during the CCIVS General Assembly held in Ukraine",
  "In 2008 partnered with IJGD-Germany and SCI-Germany in implementing the \"weltwaerts\" one-year volunteer placement program; Germany Government sponsored program with over 20 volunteers deployed to projects for the duration of one year",
  "In January-February 2009 hosted in Nairobi-Kenya Euro-Africa seminar on \"culture meets concepts\" organized by CCIVS and sponsored by European Union",
  "Hosted European Volunteer Serving on arrival training in Kenya for participants for UPA-Uganda and KVDA in Kenya in September 2010 courtesy of CCIVS",
  "In 2010 re-elected into the Executive committee of CCIVS and the Executive Director elected as the CCIVS Vice President in charge of Quality Improvement during the CCIVS General Assembly held in Barcelona, Spain",
  "In 2014/15: In partnership with Lunaria Italy, Concordia France, Grenzenlos-Austria, UPA-Uganda and TYCEN-Tanzania implemented a one year women empowerment program under the Erasmus plus European commission sponsored program",
  "In 2015/16: In partnership with PiNA-Slovenia, TYCEN-Tanzania, CAPEC-Cameroon, Lindenberg-Netherlands and CESIE-Italy, implemented a gender empowerment program through the use of multimedia methodology for the duration of 1.5 years under the Erasmus plus European commission sponsored program",
  "2008-2016: Hosted bilateral workcamps with volunteers from NICE-Japan deployed to Epang'a Primary School and Essumba Primary School",
  "2014/16: Hosted bilateral workcamps in Partnership with Exchange Scotland",
  "In partnership with Informa-Giovanni-Italy, LA Rotllana-Spain, SVI-Belgium, VOLTRA-Hong Kong and SJ-Vietnam implemented a capacity building program on gender empowerment under the Erasmus plus program",
  "In 2017 in partnership with CCIVS, participated in the stakeholders' forum in France to launch the 2-year Erasmus plus program on Volunteer PATH (Partnerships Actions and Tools for Heritage) involving 25 CCIVS member organizations from Africa, Europe, Asia and the Americas",
];

export default function WhatWeDo() {
  return (
    <div className="min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80"
            alt="Volunteers working together"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/60" />
        </div>
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary font-medium tracking-widest text-xs uppercase" data-testid="text-page-label">What We Do</span>
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6" data-testid="text-page-title">
              Our <span className="text-primary italic font-normal">Programs & Services</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              KVDA implements diverse programs that harness the power of volunteerism to drive community
              development across Kenya and beyond. From international workcamps to youth empowerment,
              our programs create lasting impact.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-medium text-gray-900 mb-4">Our Programs</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-light">
              Explore the wide range of programs and services that KVDA offers to volunteers,
              communities, and partner organizations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={service.slug}>
                <Card className={`border ${service.borderColor} shadow-sm h-full flex flex-col`} data-testid={`card-service-${service.slug}`}>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                      <service.icon className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-light mb-3 flex-1">{service.summary}</p>
                    {service.duration && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Duration:</span>
                        <span className="text-xs font-semibold text-gray-700">{service.duration}</span>
                      </div>
                    )}
                    {service.projects && (
                      <div className="mb-4">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Projects: </span>
                        <span className="text-xs font-semibold text-primary">{service.projects.length} available</span>
                      </div>
                    )}
                    <Link href={`/what-we-do/${service.slug}`}>
                      <Button variant="outline" className="w-full border-gray-200 text-gray-700 rounded-md" data-testid={`link-learn-more-${service.slug}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-medium text-gray-900 mb-4">
                For Over Half a Century
              </h2>
              <p className="text-gray-500 font-light">
                Key milestones and achievements from KVDA's decades of community service.
              </p>
            </div>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex gap-3 items-start" data-testid={`text-achievement-${index}`}>
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-gray-700 font-light leading-relaxed">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-display font-medium text-gray-900 mb-6">Get Involved</h2>
            <p className="text-lg text-gray-600 mb-10 font-light">
              Join KVDA's mission to empower communities through volunteerism.
              Whether through volunteering or donations, every effort counts.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/volunteer">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14" data-testid="link-volunteer">
                  Become a Volunteer <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/donate">
                <Button size="lg" variant="outline" className="border-gray-300 text-gray-900 rounded-full px-10 h-14" data-testid="link-donate">
                  Make a Donation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
