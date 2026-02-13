import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, MapPin, Tag, Hash, Calendar, Users } from "lucide-react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import type { Project } from "@shared/schema";

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
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  {project.description}
                </p>
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
                      {project.programType === "short_term" && (
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
                      )}
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
