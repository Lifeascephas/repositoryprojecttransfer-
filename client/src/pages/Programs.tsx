import { usePrograms } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Globe, BookOpen, Briefcase, ArrowRight, Calendar } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import type { Program } from "@shared/schema";

export default function Programs() {
  const { data: programs, isLoading } = usePrograms();

  if (isLoading) {
    return (
      <div className="py-20 text-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Loading programs...</p>
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'short_term': return Clock;
      case 'outbound': return Globe;
      case 'educational': return BookOpen;
      default: return Briefcase;
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80"
            alt="Volunteer programs"
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
            <span className="text-primary font-medium tracking-widest text-xs uppercase">Explore</span>
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6" data-testid="text-page-title">
              Our <span className="text-primary italic font-normal">Programs</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              Explore the diverse ways you can engage with communities and foster development 
              through international volunteer exchange.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="grid gap-16">
            {(programs as Program[])?.map((program: Program, index: number) => {
              const Icon = getIcon(program.type);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div
                    className={`flex flex-col md:flex-row gap-10 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}
                    data-testid={`card-program-${program.id}`}
                  >
                    <div className="flex-1 w-full">
                      <div className="rounded-2xl overflow-hidden aspect-video relative group shadow-sm">
                        <img
                          src={program.imageUrl || "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80"}
                          alt={program.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    </div>

                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-3 text-primary font-medium tracking-wide uppercase text-xs">
                        <Icon className="h-5 w-5" />
                        <span>{program.type.replace('_', ' ')} Program</span>
                      </div>

                      <h3 className="text-2xl font-display font-medium text-gray-900" data-testid={`text-program-title-${program.id}`}>{program.title}</h3>
                      <p className="text-gray-600 leading-relaxed font-light">
                        {program.description}
                      </p>

                      {program.duration && (
                        <div className="flex items-center text-sm text-gray-700">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          Duration: {program.duration}
                        </div>
                      )}

                      <Link href={`/programs/${program.type}`}>
                        <Button size="lg" className="bg-primary text-white rounded-md mt-4" data-testid={`link-learn-more-${program.id}`}>
                          Learn More <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
            <Calendar className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-display font-semibold text-gray-900 mb-4">
              2026 Workcamps Program
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Explore our full schedule of 16 international volunteer workcamps running from January to November 2026 
              across 8 counties in Kenya. Each 3-week program brings together up to 20 volunteers from around the world.
            </p>
            <Link href="/workcamps">
              <Button size="lg" className="bg-primary text-white" data-testid="link-view-workcamps">
                View 2026 Workcamps <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
