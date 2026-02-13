import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Mail, Phone, Target, Eye, Handshake, BookOpen } from "lucide-react";
import { useTeamMembers, useBoardMembers } from "@/hooks/use-content";
import type { TeamMember, BoardMember } from "@shared/schema";
import ourStoryImg from "@assets/WhatsApp-Image-2021-01-03-at-7.18.46-PM_1770997691725.jpeg";

export default function About() {
  const { data: teamMembers } = useTeamMembers();
  const { data: boardMembers } = useBoardMembers();

  return (
    <div className="min-h-screen">
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
              Volunteer in Kenya with KVDA. Development Against Dependence since 1962.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-medium text-gray-900 mb-6">Our Story</h2>
              <div className="h-1 w-20 bg-primary mb-8" />
              <div className="space-y-5 text-gray-600 font-light leading-relaxed">
                <p>
                  Kenya Voluntary Development Association has a 59-year history of working to "develop against dependence" while cultivating trust and friendships with volunteers and partner organizations all over the world. The three mandates of the organization are as follows:
                </p>
                <p>
                  The Association is a non-profit, non-governmental, non-religious and non-political Association, whose inspiration is the furtherance of peace, friendship, understanding, development, democracy and equality among peoples of different cultures and backgrounds.
                </p>
                <p>
                  The Association is dedicated to seeking opportunities for young men and women from diverse national, cultural and educational backgrounds to live, work and share life and experiences in order to improve their world, to provide voluntary services to marginalized communities, to acquire alternative education, to gather information and build international cooperation.
                </p>
                <p>
                  The Association is further dedicated to mobilizing resources within and across national borders to support community development initiatives whose aims are to eradicate poverty and human suffering as well as to promote democracy and justice among peoples.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-3xl opacity-20" />
                <img
                  src={ourStoryImg}
                  alt="KVDA volunteers climbing a tree together"
                  className="relative rounded-2xl shadow-2xl w-full aspect-video object-cover ring-1 ring-gray-200"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <Card className="border border-primary/20 shadow-sm bg-red-50/30">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <Handshake className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <h3 className="text-2xl font-display font-medium text-gray-900">Bright Spots</h3>
                </div>
                <div className="space-y-5 text-gray-600 font-light leading-relaxed">
                  <p>
                    <span className="font-medium text-gray-800">Volunteering abroad International Partnerships</span> – KVDA has a long history of successfully partnering with organizations around the world to deliver programs.
                  </p>
                  <p>
                    Successful recent partnerships include CCIVS, successfully implemented 15 Erasmus+ projects funded by the European commission, implemented Germany Government funded program "Weltwaerts", worked with Lunaria Italy on series of EU bilateral projects, and in partnership with the Dobrudzha Agricultural and Business School in Bulgaria implemented Climate change project under Youth in Action program of the EU.
                  </p>
                  <p>
                    KVDA served on the Executive Committee of the Coordinating Committee for International Voluntary Service (CCIVS) based in Paris France from 2004 and 2014.
                  </p>
                  <p>
                    This history of successfully partnering and assuming a leadership position with international organizations demonstrates KVDA's aptitude for working cross culturally.
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Network of Past Volunteers</span> – KVDA has worked with thousands of international and Kenyan volunteers over the years since inception in 1962.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border border-gray-100 shadow-sm border-primary/20 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-display font-medium text-primary">Mission</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed font-light">
                    The mission of KVDA is to promote peace, and understanding through international volunteerism combined with locally-driven, sustainable development. We believe that powerful personal and global change happens when people work together, build cross-cultural friendships, and mobilize their resources to support development against dependence.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border border-gray-100 shadow-sm h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-display font-medium text-gray-900">Vision</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed font-light">
                    KVDA envisions a more peaceful and connected world through International Voluntary Service.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-display font-medium text-gray-900 mb-4">YouTube Video</h3>
              <div className="h-1 w-20 bg-primary mx-auto mt-4" />
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/aIeOoDRLsV0"
                  title="KVDA Kenya"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  data-testid="video-youtube"
                />
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-display font-medium text-gray-900">Strategic Objectives</h3>
              </div>
              <div className="h-1 w-20 bg-primary mb-8" />
              <div className="space-y-3">
                {[
                  "Afford voluntary service opportunities to young people.",
                  "Mobilize communities to action.",
                  "Supplement formal education with experiential learning.",
                  "Create awareness amongst Kenyan communities about development issues.",
                  "Foster global peace, friendship and understanding.",
                  "Mobilizing all-purpose resources to promote grassroots development."
                ].map((objective) => (
                  <div key={objective} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md border border-gray-100">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm font-light">{objective}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-display font-medium text-gray-900 mb-6">Core Values</h3>
              <div className="h-1 w-20 bg-primary mb-8" />
              <div className="space-y-3">
                {[
                  "Promotion of voluntarism.",
                  "Transparency and accountability.",
                  "Participatory evaluation of projects.",
                  "Local community ownership of projects.",
                  "Continuous research and development.",
                  "Regular follow up of projects.",
                  "A learning organization.",
                  "Documentary evidence of processes and events."
                ].map((value) => (
                  <div key={value} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md border border-gray-100">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm font-light">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {boardMembers && (boardMembers as BoardMember[]).length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="container px-4">
            <div className="max-w-3xl mb-16">
              <h2 className="text-4xl font-display font-medium text-gray-900 mb-6">Board of Directors</h2>
              <div className="h-1 w-24 bg-primary mb-8" />
              <p className="text-gray-600 font-light">Our governing board provides strategic direction and oversight.</p>
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
                  <Card className="border border-gray-100 shadow-sm overflow-hidden" data-testid={`card-board-member-${member.id}`}>
                    <div className="h-56 overflow-hidden">
                      <img
                        src={member.imageUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-5 text-center">
                      <h4 className="font-medium text-gray-900 text-sm" data-testid={`text-board-name-${member.id}`}>{member.name}</h4>
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
        <section className="py-24 bg-white">
          <div className="container px-4">
            <div className="max-w-3xl mb-16">
              <h2 className="text-4xl font-display font-medium text-gray-900 mb-6">Our Team</h2>
              <div className="h-1 w-24 bg-primary mb-8" />
              <p className="text-gray-600 font-light">The dedicated staff who coordinate our programs and volunteer activities.</p>
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
                  <Card className="border border-gray-100 shadow-sm overflow-hidden" data-testid={`card-team-member-${member.id}`}>
                    <div className="flex items-center p-6 gap-5">
                      <img
                        src={member.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"}
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-200"
                      />
                      <div className="min-w-0">
                        <h4 className="font-medium text-gray-900" data-testid={`text-team-name-${member.id}`}>{member.name}</h4>
                        <p className="text-primary text-sm" data-testid={`text-team-role-${member.id}`}>{member.role}</p>
                        {member.email && (
                          <div className="flex items-center gap-1 text-gray-500 text-xs mt-2">
                            <Mail className="w-3 h-3" />
                            <span>{member.email}</span>
                          </div>
                        )}
                        {member.phone && (
                          <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
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
