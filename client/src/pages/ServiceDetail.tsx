import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useParams, Redirect } from "wouter";
import { ArrowLeft, ArrowRight, Clock, CheckCircle2, MapPin, Tag } from "lucide-react";
import { services } from "./WhatWeDo";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <Redirect to="/what-we-do" />;
  }

  const currentIndex = services.indexOf(service);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  const paragraphs = service.description.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80"
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/60" />
        </div>
        <div className="container px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Link href="/what-we-do">
              <span className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm mb-6 cursor-pointer" data-testid="link-back-what-we-do">
                <ArrowLeft className="w-4 h-4" />
                Back to What We Do
              </span>
            </Link>
            <div className={`w-14 h-14 ${service.bgColor} rounded-xl flex items-center justify-center mb-6`}>
              <service.icon className={`w-7 h-7 ${service.color}`} />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-light text-white mb-4" data-testid="text-service-title">
              {service.title}
            </h1>
            {service.duration && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-md px-4 py-2 mt-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-white/90 text-sm font-medium" data-testid="text-service-duration">{service.duration}</span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="space-y-6"
                >
                  {paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-gray-700 text-lg leading-relaxed font-light" data-testid={`text-service-paragraph-${index}`}>
                      {paragraph}
                    </p>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="mt-10"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/apply">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-md" data-testid="link-apply-now">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 rounded-md" data-testid="link-contact-us">
                        Contact Us
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>

              {service.requirements && service.requirements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <Card className="border border-gray-100 shadow-sm sticky top-24">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 text-base" data-testid="text-requirements-heading">Requirements</h3>
                      <div className="space-y-3">
                        {service.requirements.map((req, i) => (
                          <div key={i} className="flex gap-2.5 items-start" data-testid={`text-requirement-${i}`}>
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span className="text-gray-600 text-sm">{req}</span>
                          </div>
                        ))}
                      </div>
                      {service.duration && (
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">Duration:</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-800 mt-1 block">{service.duration}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {service.projects && service.projects.length > 0 && (
        <section className="py-20 bg-gray-50" data-testid="section-service-projects">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h2 className="text-2xl md:text-3xl font-display font-medium text-gray-900 mb-3" data-testid="text-projects-heading">
                  Available Projects
                </h2>
                <p className="text-gray-500 font-light">
                  Explore the specific projects available under this program. Each project offers unique opportunities for impact.
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-4">
                {service.projects.map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.025 }}
                  >
                    <Card className="border border-gray-100 shadow-sm h-full" data-testid={`card-project-${i}`}>
                      <CardContent className="p-5">
                        <h4 className="font-semibold text-gray-900 text-sm mb-2">{project.name}</h4>
                        <div className="flex flex-wrap gap-3">
                          <span className="flex items-center gap-1.5 text-xs text-gray-500">
                            <MapPin className="w-3 h-3 text-primary" />
                            {project.location}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Tag className="w-3 h-3 text-primary" />
                            {project.sector}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-10 text-center"
              >
                <Link href="/apply">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-md" data-testid="link-apply-project">
                    Apply for a Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center gap-4">
              {prevService ? (
                <Link href={`/what-we-do/${prevService.slug}`}>
                  <span className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors cursor-pointer text-sm" data-testid="link-prev-service">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">{prevService.title}</span>
                    <span className="sm:hidden">Previous</span>
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {nextService ? (
                <Link href={`/what-we-do/${nextService.slug}`}>
                  <span className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors cursor-pointer text-sm" data-testid="link-next-service">
                    <span className="hidden sm:inline">{nextService.title}</span>
                    <span className="sm:hidden">Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
