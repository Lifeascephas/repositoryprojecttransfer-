import { usePrograms } from "@/hooks/use-content";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Globe, BookOpen, Briefcase, ArrowLeft, ArrowRight, Users, MapPin, CheckCircle, Calendar } from "lucide-react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import type { Program, Project } from "@shared/schema";

const programContent: Record<string, {
  heroImage: string;
  fullDescription: string[];
  longTermDescription?: string[];
  highlights: { icon: typeof Clock; label: string; value: string }[];
  longTermHighlights?: { icon: typeof Clock; label: string; value: string }[];
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
  long_term: {
    heroImage: "/assets/medium-term-volunteer.jpg",
    fullDescription: [
      "Medium term volunteer program is usually 2-6 months. It is a non-formal learning experience which develops people's sensitivity towards social and cultural differences, and also builds self-confidence, esteem and your problem-solving ability.",
      "The program brings together individual volunteers as opposed to the short-term volunteering program that brings together several volunteers on a community service project. The volunteers are immersed into the local culture to a much greater extent allowing them to integrate better with the local community and actually become part of it.",
      "Over time they learn the local language, make friends and better understand the needs and challenges experienced by the local people. This enables them to take a more active role in the running of the project where they contribute towards its successful implementation.",
      "On arrival orientation seminar is conducted to help you get acquainted with the project aims, objectives, structure of the host organization, the local norms, traditions and practices. KVDA provides a variety of projects from which the volunteer would make independent choices.",
    ],
    longTermDescription: [
      "Long-term project is usually 12 months and one can extend if interested with about 2-3 months. It is a non-formal international learning experience which develops a volunteer's sensitivity towards social and cultural differences, and also builds self-confidence and your problem solving ability.",
      "Long-term volunteering is for an individual not a group of volunteers. It will be smaller and the work is not group-oriented. Middle term volunteers are immersed in the local culture to a much greater extent allowing them to integrate better with the local community and actually become part of it.",
      "Over time volunteers can learn the local language, make friends and better understand the needs and problems of the locals. This enables them to take a more active role in the running of the project by implementing their own ideas for accomplishment of better outcomes.",
      "Before you begin your project orientation is given to help you get acquainted with the project aims, the host organization, the local norms and traditional practices. You can choose the project that suits you best. Feel very much welcomed when applying for a project from our multi long-term programs.",
    ],
    highlights: [
      { icon: Clock, label: "Duration", value: "2 - 6 Months" },
      { icon: Users, label: "Placement", value: "Individual Volunteers" },
      { icon: Globe, label: "Immersion", value: "Deep Cultural Integration" },
      { icon: MapPin, label: "Location", value: "Across Kenya" },
    ],
    longTermHighlights: [
      { icon: Clock, label: "Duration", value: "12 Months (extendable 2-3 months)" },
      { icon: Users, label: "Placement", value: "Individual Volunteer" },
      { icon: Globe, label: "Experience", value: "International Learning" },
      { icon: MapPin, label: "Location", value: "Across Kenya" },
    ],
    benefits: [
      "Develop sensitivity towards social and cultural differences",
      "Build self-confidence, esteem and problem-solving ability",
      "Learn the local language and make lasting friendships",
      "Integrate deeply with local communities",
      "Take an active role in project implementation",
      "Gain meaningful professional and life experience",
      "Implement your own ideas for better project outcomes",
      "Choose from a variety of long-term programs",
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
  const type = params?.type || "";
  const fetchType = type === "long_term" ? "short_term" : type;
  const { data: linkedProjects } = useQuery<Project[]>({
    queryKey: ['/api/projects', 'programType', fetchType],
    queryFn: async () => {
      const res = await fetch(`/api/projects?programType=${fetchType}`, { credentials: "include" });
      if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
      return res.json();
    },
    enabled: !!type,
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Loading program...</p>
      </div>
    );
  }

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
          <div className="max-w-3xl">
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
          </div>
        </div>
      </section>

      {hasDetailedContent ? (
        <>
          <section className="py-20 bg-white">
            <div className="container px-4">
              <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2">
                  <div>
                    <h2 className="text-3xl font-display font-semibold text-gray-900 mb-8" data-testid="text-about-heading">
                      {content.longTermDescription ? "Medium-Term Volunteering" : "About This Program"}
                    </h2>
                    <div className="space-y-5">
                      {content.fullDescription.map((paragraph, i) => (
                        <p key={i} className="text-gray-600 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <Card className="border border-gray-100 shadow-sm sticky top-24">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-5">{content.longTermDescription ? "Medium-Term Quick Facts" : "Quick Facts"}</h3>
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
                  </div>
                </div>
              </div>
            </div>
          </section>

          {content.longTermDescription && content.longTermHighlights && (
            <section className="py-20 bg-gray-50">
              <div className="container px-4">
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
                  <div className="md:col-span-2">
                    <div>
                      <h2 className="text-3xl font-display font-semibold text-gray-900 mb-8" data-testid="text-longterm-heading">
                        Long-Term Volunteering
                      </h2>
                      <div className="space-y-5">
                        {content.longTermDescription.map((paragraph, i) => (
                          <p key={i} className="text-gray-600 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <Card className="border border-gray-100 shadow-sm sticky top-24">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-5">Long-Term Quick Facts</h3>
                          <div className="space-y-4">
                            {content.longTermHighlights.map((item, i) => {
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
                              <Button className="w-full bg-primary text-white" data-testid="button-apply-longterm">
                                Apply Now <ArrowRight className="h-4 w-4 ml-2" />
                              </Button>
                            </Link>
                            <Link href="/contact" className="block">
                              <Button variant="outline" className="w-full border-primary text-primary" data-testid="button-inquire-longterm">
                                Make Inquiry
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {content.benefits.length > 0 && (
            <section className="py-20 bg-gray-50">
              <div className="container px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <span className="text-primary font-medium tracking-widest text-xs uppercase">Why Join</span>
                    <h2 className="text-3xl font-display font-semibold text-gray-900 mt-3" data-testid="text-benefits-heading">
                      Benefits of This Program
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.benefits.map((benefit, i) => (
                      <div key={i}>
                        <Card className="border border-gray-100 shadow-sm h-full">
                          <CardContent className="p-5 flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <p className="text-gray-700 text-sm leading-relaxed">{benefit}</p>
                          </CardContent>
                        </Card>
                      </div>
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
              <div>
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
              </div>
            </div>
          </div>
        </section>
      )}

      {linkedProjects && linkedProjects.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-medium tracking-widest text-xs uppercase">Our Projects</span>
              <h2 className="text-3xl font-display font-semibold text-gray-900 mt-3" data-testid="text-projects-heading">
                {type === "short_term" ? "Short-Term Volunteering Projects" : "Program Projects"}
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                {type === "short_term"
                  ? "Explore 14 international volunteer projects across Kenya. Click on any project to learn more about the community, activities, and how you can get involved."
                  : "Browse the projects under this program."}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {linkedProjects.map((project, i) => (
                <div key={project.id}>
                  <Link href={`/projects/${project.id}`}>
                    <Card className="overflow-visible h-full hover-elevate cursor-pointer group" data-testid={`card-project-${project.id}`}>
                      <div className="aspect-[4/3] overflow-hidden rounded-t-md">
                        <img
                          src={project.imageUrl || "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <p className="text-xs text-primary font-medium tracking-wide uppercase mb-1">{project.code}</p>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2" data-testid={`text-project-title-${project.id}`}>
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span>{project.location}</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{project.sector}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-primary/5">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
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
          </div>
        </div>
      </section>
    </div>
  );
}
