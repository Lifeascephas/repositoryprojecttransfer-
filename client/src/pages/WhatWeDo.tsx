import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  HandCoins, Wheat, Users, CloudRain, Droplets, 
  Stethoscope, GraduationCap, ArrowRight 
} from "lucide-react";

const sdgAreas = [
  {
    icon: HandCoins,
    title: "Poverty Alleviation",
    sdg: "SDG 1",
    description: "KVDA works to reduce poverty through community-based development projects that empower marginalized populations with skills, resources, and opportunities for sustainable livelihoods. Our volunteers support income-generating activities, microfinance initiatives, and vocational training programs.",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Wheat,
    title: "Food Security",
    sdg: "SDG 2",
    description: "Through partnerships with organizations like the Kenya Institute of Organic Farming (KIOF), we promote sustainable agriculture, organic farming practices, and food security initiatives. Volunteers work alongside smallholder farmers to improve crop yields and nutrition.",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Stethoscope,
    title: "Health & Well-being",
    sdg: "SDG 3",
    description: "Our health projects focus on community health education, disease prevention, maternal health, and supporting rural health facilities. Volunteers assist in health awareness campaigns, HIV/AIDS education, and training community health workers.",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    icon: GraduationCap,
    title: "Quality Education",
    sdg: "SDG 4",
    description: "KVDA supports education through school renovation projects, teaching assistance, provision of learning materials, and special needs education support. We believe every child deserves access to quality education regardless of their circumstances.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Users,
    title: "Gender Equality",
    sdg: "SDG 5",
    description: "We champion gender equality through women's empowerment programs, vocational training for girls, leadership development, and advocacy against gender-based violence. Our projects aim to challenge patriarchal systems and promote equal opportunities.",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Droplets,
    title: "Clean Water & Sanitation",
    sdg: "SDG 6",
    description: "Access to clean water is fundamental to community development. KVDA implements water harvesting projects, borehole construction, and sanitation improvement programs in rural communities, while educating on water conservation and hygiene practices.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: CloudRain,
    title: "Climate Action",
    sdg: "SDG 13",
    description: "Environmental conservation is central to our work. From reforestation projects to wildlife conservation in Maasai Mara, we engage volunteers in protecting Kenya's natural heritage while educating communities on sustainable environmental practices and climate resilience.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
];

export default function WhatWeDo() {
  return (
    <div className="bg-black min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80"
            alt="Community development"
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
            <span className="text-primary font-medium tracking-widest text-xs uppercase" data-testid="text-page-label">What We Do</span>
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6" data-testid="text-page-title">
              Aligned with the <span className="text-primary italic font-normal">Sustainable Development Goals</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              KVDA's programs are guided by the United Nations Sustainable Development Goals (SDGs). 
              Our volunteer projects address critical development challenges facing Kenyan communities.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-zinc-950">
        <div className="container px-4">
          <div className="grid gap-8">
            {sdgAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-zinc-900/50 border-white/5 overflow-hidden" data-testid={`card-sdg-${index}`}>
                  <CardContent className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                      <div className={`w-16 h-16 ${area.bgColor} rounded-2xl flex items-center justify-center shrink-0`}>
                        <area.icon className={`w-8 h-8 ${area.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <h3 className="text-2xl font-medium text-white">{area.title}</h3>
                          <span className={`text-xs font-medium ${area.color} ${area.bgColor} px-3 py-1 rounded-full`}>{area.sdg}</span>
                        </div>
                        <p className="text-zinc-400 leading-relaxed font-light">{area.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black">
        <div className="container px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-display font-medium text-white mb-6">Support Our Projects</h2>
            <p className="text-lg text-zinc-400 mb-10 font-light">
              Your contribution helps us continue making a difference in communities across Kenya.
              Whether through volunteering or donations, every effort counts.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/volunteer">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14" data-testid="link-volunteer">
                  Become a Volunteer <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/donate">
                <Button size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-full px-10 h-14 backdrop-blur-md" data-testid="link-donate">
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
