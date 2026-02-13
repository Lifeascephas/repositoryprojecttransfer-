import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useParams, Redirect } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
            initial={{ opacity: 0, y: 30 }}
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
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-700 text-lg leading-relaxed font-light" data-testid={`text-service-paragraph-${index}`}>
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12 pt-8 border-t border-gray-100"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/apply">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8" data-testid="link-apply-now">
                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 rounded-full px-8" data-testid="link-contact-us">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
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
