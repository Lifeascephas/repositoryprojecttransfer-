import { usePrograms } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Globe, BookOpen, Briefcase, ArrowLeft, ArrowRight, Users, MapPin, CheckCircle, Calendar } from "lucide-react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import type { Program } from "@shared/schema";

const programContent: Record<string, {
  heroImage: string;
  fullDescription: string[];
  highlights: { icon: typeof Clock; label: string; value: string }[];
  benefits: string[];
}> = {
  short_term: {
    heroImage: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80",
    fullDescription: [
      "Short-Term Programs are perfect for people who only have little time for volunteering or don't have the resources for a long-term stay but want to do something beyond just travelling. It is an interesting and meaningful way to travel with purpose and spend 3 weeks in a foreign environment.",
      "This Program caters for volunteers from different countries in the world. They work together towards a certain objective, like farming, women and youth empowerment, constructing a new school room, HIV/AIDS awareness among others.",
      "Orientation session is given to the volunteers before the project begins to help them get adequate information about the aims of project they are going to participate in, the host organization, the local norms and culture.",
      "Participating in a short term program has many benefits. Working and living together with other volunteers from around the world provides an excellent opportunity to make many new friends, learn about unknown places and cultures, and gain new skills and experience.",
      "In addition, your time, energy, and enthusiasm can make a difference in areas where help is really needed. The unique environment in a work-camp can reveal new sides of your character and personality and you can learn so much about yourself as well. You will find out that you are capable of doing things that you've never tried before.",
    ],
    highlights: [
      { icon: Clock, label: "Duration", value: "3 Weeks" },
      { icon: Users, label: "Group Size", value: "15-20 Volunteers" },
      { icon: Globe, label: "Participants", value: "International" },
      { icon: MapPin, label: "Location", value: "Across Kenya" },
    ],
    benefits: [
      "Make new friends from around the world",
      "Learn about unknown places and cultures",
      "Gain new skills and experience",
      "Make a real difference in communities",
      "Discover new sides of your character",
      "Travel with purpose and meaning",
    ],
  },
};

const defaultContent = {
  heroImage: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80",
  fullDescription: [],
  highlights: [],
  benefits: [],
};

export default function ProgramDetail() {
  const [, params] = useRoute("/programs/:type");
  const { data: programs, isLoading } = usePrograms();

  if (isLoading) {
    return (
      <div className="py-20 text-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Loading program...</p>
      </div>
    );
  }

  const type = params?.type || "";
  const program = (programs as Program[])?.find((p) => p.type === type);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">Program Not Found</h2>
          <Link href="/programs">
            <Button variant="outline" className="border-primary text-primary">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Programs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const content = programContent[type] || defaultContent;
  const hasDetailedContent = content.fullDescription.length > 0;

  const getIcon = (t: string) => {
    switch (t) {
      case "short_term": return Clock;
      case "outbound": return Globe;
      case "educational": return BookOpen;
      default: return Briefcase;
    }
  };

  const Icon = getIcon(type);

  return (
    <div className="min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={content.heroImage || program.imageUrl || defaultContent.heroImage}
            alt={program.title}
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
            <Link href="/programs" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6" data-testid="link-back-programs">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Programs</span>
            </Link>
            <div className="flex items-center gap-3 text-primary font-medium tracking-wide uppercase text-xs mb-4">
              <Icon className="h-5 w-5" />
              <span>{type.replace("_", " ")} Program</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-light text-white mb-6" data-testid="text-program-title">
              {program.title}
            </h1>
            {program.duration && (
              <div className="flex items-center text-zinc-300 text-sm gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Duration: {program.duration}</span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {hasDetailedContent ? (
        <>
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
                      About This Program
                    </h2>
                    <div className="space-y-5">
                      {content.fullDescription.map((paragraph, i) => (
                        <p key={i} className="text-gray-600 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-5">Quick Facts</h3>
                        <div className="space-y-4">
                          {content.highlights.map((item, i) => {
                            const HIcon = item.icon;
                            return (
                              <div key={i} className="flex items-start gap-3">
                                <HIcon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                <div>
                                  <p className="text-xs text-gray-400 uppercase tracking-wide">{item.label}</p>
                                  <p className="text-gray-900 font-medium text-sm">{item.value}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                          <Link href="/apply" className="block">
                            <Button className="w-full bg-primary text-white" data-testid="button-apply">
                              Apply Now <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </Link>
                          <Link href="/contact" className="block">
                            <Button variant="outline" className="w-full border-primary text-primary" data-testid="button-inquire">
                              Make Inquiry
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {content.benefits.length > 0 && (
            <section className="py-20 bg-gray-50">
              <div className="container px-4">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                  >
                    <span className="text-primary font-medium tracking-widest text-xs uppercase">Why Join</span>
                    <h2 className="text-3xl font-display font-semibold text-gray-900 mt-3" data-testid="text-benefits-heading">
                      Benefits of This Program
                    </h2>
                  </motion.div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.benefits.map((benefit, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Card className="border border-gray-100 shadow-sm h-full">
                          <CardContent className="p-5 flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <p className="text-gray-700 text-sm leading-relaxed">{benefit}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="py-20 bg-white">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-display font-semibold text-gray-900 mb-8" data-testid="text-about-heading">
                  About This Program
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  {program.description}
                </p>
                {program.duration && (
                  <div className="flex items-center text-gray-700 mb-8 gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="font-medium">Duration: {program.duration}</span>
                  </div>
                )}
                <div className="flex flex-wrap gap-4">
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
          </div>
        </section>
      )}

      <section className="py-16 bg-primary/5">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
              Explore More Programs
            </h2>
            <p className="text-gray-600 mb-6">
              Discover other ways to volunteer with KVDA across Kenya and beyond.
            </p>
            <Link href="/programs">
              <Button variant="outline" className="border-primary text-primary" data-testid="link-all-programs">
                View All Programs <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
