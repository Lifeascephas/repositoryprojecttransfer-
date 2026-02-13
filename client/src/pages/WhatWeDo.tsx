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

We encourage professionals to take advantage of the available opportunities in order to continue to impact positively on society.`,
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

We are open to new partnerships and welcome motivated volunteers to join the program.`,
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

We are open to new partnerships based on our track record on deliverables.`,
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

The outgoing volunteers are hosted in projects identified by our partners overseas.`,
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

We have different tailor-made packages that are suitable to volunteers motivated to experience that circumstance bestowed by the beauty of Kenya, wildlife and national heritage.`,
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

Through the maxim "Development Against Dependence", we are cognizant of the fact that true development must be people-centered and driven for sustainable development.`,
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

This program has the capacity to transform communities in dire straits through enhanced infrastructure to spur sustainable development.`,
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

KVDA has devised training course to respond to this challenge with the capacity to enable the youths to translate the program skills into economic opportunities.`,
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

The program is tailor-made to suit the needs of the potential volunteers organized at the grassroots.`,
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

KVDA works with budding artistes and theater groups on a program that has profoundly translated thematic issues through drama, music, storytelling and dance.`,
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

Organizations wishing to organize conference and events are welcome as this is an opportunity with the capacity to make the big difference.`,
    color: "text-slate-600",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-100",
  },
];

const achievements = [
  "Implemented over 10,000 community development projects",
  "Constructed a water tank at Ole Sankale Primary School in Narok district in conjunction with JICA in 2001",
  "Renovation of Nyamaranya Primary School in Isebania, Kuria district in conjunction with the Kenya Charity Sweepstake in 2002",
  "Constructed Nzinia Community dispensary in Tulia, Kitui district in 2002",
  "Collaborated with Kuria Child and Family program on Girl Child Education in 2002",
  "Facilitated youth participation in Poverty Reduction Strategies through the Youth Thematic Group in 2002/3",
  "Organized international work camps at Kakuma Refugees camp with UNHCR in 2002 and 2004",
  "Improvement of Kirasha Rescue center in Kiambu through voluntary service from 2001-2007",
  "Hosted the 29th General Assembly of CCIVS in Nairobi attended by over 100 member organizations globally in 2004",
  "Organized peace building and conflict transformation workshops for the Great Lakes region in partnership with NPI-Africa and WSCF in 2005",
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-primary font-medium tracking-widest text-xs uppercase" data-testid="text-page-label">What We Do</span>
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6" data-testid="text-page-title">
              Our <span className="text-primary italic font-normal">Programs & Services</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              KVDA implements diverse programs that harness the power of volunteerism to drive community
              development across Kenya and beyond. From international workcamps to youth empowerment,
              our programs create lasting impact.
            </p>
          </motion.div>
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
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                <Card className={`border ${service.borderColor} shadow-sm h-full flex flex-col`} data-testid={`card-service-${service.slug}`}>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                      <service.icon className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-light mb-4 flex-1">{service.summary}</p>
                    <Link href={`/what-we-do/${service.slug}`}>
                      <Button variant="outline" className="w-full border-gray-200 text-gray-700 rounded-md" data-testid={`link-learn-more-${service.slug}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-medium text-gray-900 mb-4">
                For Over Half a Century
              </h2>
              <p className="text-gray-500 font-light">
                Key milestones and achievements from KVDA's decades of community service.
              </p>
            </motion.div>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="flex gap-3 items-start"
                  data-testid={`text-achievement-${index}`}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-gray-700 font-light leading-relaxed">{achievement}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto"
          >
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
