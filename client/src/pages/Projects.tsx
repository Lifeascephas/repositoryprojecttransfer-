import { useProjects } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import type { Project } from "@shared/schema";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <div className="py-20 text-center bg-black min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80"
            alt="Volunteer projects"
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
            <span className="text-primary font-medium tracking-widest text-xs uppercase">Active Opportunities</span>
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6" data-testid="text-page-title">
              Volunteer <span className="text-primary italic font-normal">Projects</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              Browse our active projects across Kenya. From conservation in Maasai Mara 
              to education in rural villages.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-zinc-950">
        <div className="container px-4">
          {(!projects || (projects as Project[]).length === 0) ? (
            <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-white/5">
              <h3 className="text-xl font-medium text-zinc-300">No active projects found at the moment.</h3>
              <p className="mt-2 text-sm text-zinc-500">Please check back later or contact us for upcoming opportunities.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(projects as Project[]).map((project: Project, index: number) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="flex flex-col h-full bg-zinc-900/50 border-white/5 overflow-hidden group" data-testid={`card-project-${project.id}`}>
                    <div className="h-56 relative overflow-hidden">
                      <img
                        src={project.imageUrl || "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&q=80"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      <span className="absolute top-4 right-4 bg-primary/90 text-white text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide" data-testid={`text-project-sector-${project.id}`}>
                        {project.sector}
                      </span>
                    </div>

                    <CardHeader className="pb-2">
                      <div className="flex items-center text-zinc-400 text-sm mb-2 gap-1">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span data-testid={`text-project-location-${project.id}`}>{project.location}</span>
                      </div>
                      <h3 className="text-lg font-medium text-white line-clamp-2 leading-tight" data-testid={`text-project-title-${project.id}`}>
                        {project.title}
                      </h3>
                    </CardHeader>

                    <CardContent className="flex-grow">
                      <p className="text-zinc-500 text-sm line-clamp-3 font-light">
                        {project.description}
                      </p>
                      {project.code && (
                        <p className="text-xs text-zinc-600 mt-3 font-mono">{project.code}</p>
                      )}
                    </CardContent>

                    <CardFooter className="pt-0 border-t border-white/5 p-6 mt-auto">
                      <Link href="/contact" className="w-full">
                        <Button className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors" data-testid={`link-inquire-${project.id}`}>
                          Inquire & Apply
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
