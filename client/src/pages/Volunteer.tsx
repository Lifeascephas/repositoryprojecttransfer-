import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useTestimonials } from "@/hooks/use-content";
import {
  Search, FileText, CreditCard, Plane, Users, CheckCircle2,
  ArrowRight, Quote
} from "lucide-react";
import type { Testimonial } from "@shared/schema";

const steps = [
  {
    icon: Search,
    title: "Choose a Program",
    description: "Browse our Short-term Workcamps, Medium/Long-term placements, Educational Tours, or Outbound exchange programs to find the right fit.",
  },
  {
    icon: FileText,
    title: "Send an Inquiry",
    description: "Contact us through our website or email to express your interest. We'll send you the Volunteer Exchange Form (VEF) and detailed program information.",
  },
  {
    icon: FileText,
    title: "Complete Application",
    description: "Fill in and return the VEF with your details, motivation letter, and preferences. Our team will review your application.",
  },
  {
    icon: CreditCard,
    title: "Pay Participation Fee",
    description: "Once accepted, pay the participation fee which covers accommodation, meals, project materials, and local transportation during your placement.",
  },
  {
    icon: Plane,
    title: "Prepare & Travel",
    description: "We provide pre-departure information including visa requirements, packing lists, and cultural tips. We arrange airport pickup in Nairobi upon arrival.",
  },
  {
    icon: Users,
    title: "Volunteer & Make Impact",
    description: "Join your project, work alongside local communities, experience Kenyan culture, and create lasting change while building friendships that span continents.",
  },
];

const kvdaPrograms = [
  {
    title: "Community Service Programme (CSP)",
    description: "Short-term group workcamps lasting 2-3 weeks, bringing together 15-20 international and local volunteers to work on community-identified projects. Activities range from school construction to environmental conservation.",
  },
  {
    title: "Community Reconciliation Camp (CRC)",
    description: "Special workcamps focused on peace-building and conflict resolution through community dialogue, cultural exchange, and collaborative development projects in post-conflict areas.",
  },
  {
    title: "Youth Exchange & Leadership Development (YELD)",
    description: "Programs designed to develop leadership skills among young people through cross-cultural exchanges, training workshops, and community engagement activities.",
  },
];

export default function Volunteer() {
  const { data: testimonials } = useTestimonials();

  return (
    <div className="min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80"
            alt="Volunteers working together"
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
            <span className="text-primary font-medium tracking-widest text-xs uppercase">Join Us</span>
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6" data-testid="text-page-title">
              Be a <span className="text-primary italic font-normal">Volunteer</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              Join thousands of volunteers who have transformed communities and their own lives through KVDA's programs.
              Your journey from volunteer to global citizen starts here.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl font-display font-medium text-gray-900 mb-6">How to Volunteer</h2>
            <div className="h-1 w-24 bg-primary mb-8" />
            <p className="text-lg text-gray-600 font-light">Follow these simple steps to start your volunteering journey with KVDA.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="border border-gray-100 shadow-sm h-full" data-testid={`card-step-${index}`}>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <span className="text-primary font-display text-xl font-medium">{index + 1}</span>
                      </div>
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 font-light text-sm leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-12 h-14 text-lg" data-testid="link-apply-now">
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl font-display font-medium text-gray-900 mb-6">KVDA in Action</h2>
            <div className="h-1 w-24 bg-primary mb-8" />
            <p className="text-lg text-gray-600 font-light">Our flagship volunteer programs that drive community transformation.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {kvdaPrograms.map((prog, index) => (
              <motion.div
                key={prog.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border border-gray-100 shadow-sm h-full" data-testid={`card-program-${index}`}>
                  <CardContent className="p-8">
                    <CheckCircle2 className="w-8 h-8 text-primary mb-6" />
                    <h3 className="text-lg font-medium text-gray-900 mb-4">{prog.title}</h3>
                    <p className="text-gray-600 font-light text-sm leading-relaxed">{prog.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {testimonials && (testimonials as Testimonial[]).length > 0 && (
        <section className="py-24 bg-white">
          <div className="container px-4">
            <div className="max-w-3xl mb-16">
              <h2 className="text-4xl font-display font-medium text-gray-900 mb-6">Volunteer Stories</h2>
              <div className="h-1 w-24 bg-primary mb-8" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(testimonials as Testimonial[]).map((t, index) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border border-gray-100 shadow-sm h-full" data-testid={`card-testimonial-${t.id}`}>
                    <CardContent className="p-8">
                      <Quote className="w-8 h-8 text-primary/20 mb-4" />
                      <p className="text-gray-600 font-light text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                      <div className="flex items-center gap-4">
                        {t.imageUrl && (
                          <img src={t.imageUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                        )}
                        <div>
                          <p className="text-gray-900 font-medium text-sm" data-testid={`text-testimonial-name-${t.id}`}>{t.name}</p>
                          <p className="text-gray-500 text-xs">{t.country} - {t.program}</p>
                        </div>
                      </div>
                    </CardContent>
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
