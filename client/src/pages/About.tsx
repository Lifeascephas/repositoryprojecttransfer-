import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Mail, Phone } from "lucide-react";
import { useTeamMembers, useBoardMembers } from "@/hooks/use-content";
import type { TeamMember, BoardMember } from "@shared/schema";

export default function About() {
  const { data: teamMembers } = useTeamMembers();
  const { data: boardMembers } = useBoardMembers();

  return (
    <div className="bg-black min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80"
            alt="Kenya landscape"
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
            <span className="text-primary font-medium tracking-widest text-xs uppercase">Our Story</span>
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6" data-testid="text-page-title">
              About <span className="text-primary italic font-normal">KVDA</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              A legacy of volunteerism and community development since 1962. 
              Development Against Dependence.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-zinc-950">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <Card className="bg-zinc-900/50 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-display font-medium text-primary mb-4">Our Mission</h3>
                <p className="text-zinc-400 leading-relaxed font-light">
                  To mobilize resources and foster international cooperation for sustainable development in 
                  marginalized communities. We believe in the power of people coming together across borders 
                  to solve common challenges through voluntary service.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/50 border-white/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-display font-medium text-white mb-4">Our Vision</h3>
                <p className="text-zinc-400 leading-relaxed font-light">
                  A peaceful society where people live in harmony with dignity and mutual respect. 
                  We envision a world where development is participatory, sustainable, and driven by 
                  the collective effort of global citizens.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-3xl opacity-20" />
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80"
                  alt="KVDA volunteers at work"
                  className="relative rounded-2xl shadow-2xl w-full aspect-video object-cover ring-1 ring-white/10"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-display font-medium text-white mb-6">Our History</h3>
              <div className="h-1 w-20 bg-primary mb-8" />
              <div className="space-y-4 text-zinc-400 font-light leading-relaxed">
                <p>
                  The Kenya Voluntary Development Association (KVDA) is an indigenous, non-political, 
                  and non-sectarian membership organization. It was registered under the Societies' Act 
                  in Kenya and later as a Non-Governmental Organization (NGO) in 1993.
                </p>
                <p>
                  Founded in 1962, KVDA was the first work camp organization in Kenya. For over six 
                  decades, we have been at the forefront of voluntary service, hosting thousands of 
                  international volunteers and sending Kenyans abroad to foster cross-cultural understanding.
                </p>
                <p>
                  Our motto, "Development Against Dependence," guides every project we undertake. We 
                  strive to empower communities to take charge of their own development rather than 
                  relying on external aid. Through international volunteer exchanges, we build bridges 
                  between cultures while addressing real community needs.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mb-24">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-display font-medium text-white mb-4">Our Core Values</h3>
              <p className="text-zinc-400 font-light">The principles that guide our work every day.</p>
              <div className="h-1 w-20 bg-primary mx-auto mt-4" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Volunteerism & Service",
                "Cross-cultural Understanding",
                "Community Participation",
                "Sustainability",
                "Integrity & Transparency",
                "Gender Equality"
              ].map((value) => (
                <div key={value} className="flex items-center gap-3 p-4 bg-zinc-900/50 rounded-xl border border-white/5">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-zinc-200 text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {boardMembers && (boardMembers as BoardMember[]).length > 0 && (
        <section className="py-24 bg-black">
          <div className="container px-4">
            <div className="max-w-3xl mb-16">
              <h2 className="text-4xl font-display font-medium text-white mb-6">Board of Directors</h2>
              <div className="h-1 w-24 bg-primary mb-8" />
              <p className="text-zinc-400 font-light">Our governing board provides strategic direction and oversight.</p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {(boardMembers as BoardMember[]).map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card className="bg-zinc-900/50 border-white/5 overflow-hidden" data-testid={`card-board-member-${member.id}`}>
                    <div className="h-56 overflow-hidden">
                      <img
                        src={member.imageUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-5 text-center">
                      <h4 className="font-medium text-white text-sm" data-testid={`text-board-name-${member.id}`}>{member.name}</h4>
                      <p className="text-primary text-xs mt-1" data-testid={`text-board-position-${member.id}`}>{member.position}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {teamMembers && (teamMembers as TeamMember[]).length > 0 && (
        <section className="py-24 bg-zinc-950">
          <div className="container px-4">
            <div className="max-w-3xl mb-16">
              <h2 className="text-4xl font-display font-medium text-white mb-6">Our Team</h2>
              <div className="h-1 w-24 bg-primary mb-8" />
              <p className="text-zinc-400 font-light">The dedicated staff who coordinate our programs and volunteer activities.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(teamMembers as TeamMember[]).map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card className="bg-zinc-900/50 border-white/5 overflow-hidden" data-testid={`card-team-member-${member.id}`}>
                    <div className="flex items-center p-6 gap-5">
                      <img
                        src={member.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"}
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover ring-2 ring-white/10"
                      />
                      <div className="min-w-0">
                        <h4 className="font-medium text-white" data-testid={`text-team-name-${member.id}`}>{member.name}</h4>
                        <p className="text-primary text-sm" data-testid={`text-team-role-${member.id}`}>{member.role}</p>
                        {member.email && (
                          <div className="flex items-center gap-1 text-zinc-500 text-xs mt-2">
                            <Mail className="w-3 h-3" />
                            <span>{member.email}</span>
                          </div>
                        )}
                        {member.phone && (
                          <div className="flex items-center gap-1 text-zinc-500 text-xs mt-1">
                            <Phone className="w-3 h-3" />
                            <span>{member.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
