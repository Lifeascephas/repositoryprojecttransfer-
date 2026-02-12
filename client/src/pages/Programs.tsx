import { usePrograms } from "@/hooks/use-content";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Globe, BookOpen, Briefcase } from "lucide-react";
import { Link } from "wouter";

export default function Programs() {
  const { data: programs, isLoading } = usePrograms();

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
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
    <div className="py-12 bg-background min-h-screen">
      <div className="container px-4">
        <SectionHeader 
          title="Our Programs" 
          subtitle="Explore the diverse ways you can engage with communities and foster development."
        />

        <div className="grid gap-12">
          {programs?.map((program, index) => {
            const Icon = getIcon(program.type);
            const isEven = index % 2 === 0;

            return (
              <div 
                key={program.id} 
                className={`flex flex-col md:flex-row gap-8 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}
              >
                <div className="flex-1 w-full">
                  <div className="rounded-2xl overflow-hidden shadow-xl aspect-video relative group">
                     {/* Using the program image url if available, otherwise a placeholder based on type */}
                    <img 
                      src={program.imageUrl || "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2070&auto=format&fit=crop"} 
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-3 text-primary font-bold tracking-wide uppercase text-sm">
                    <Icon className="h-5 w-5" />
                    <span>{program.type.replace('_', ' ')} Program</span>
                  </div>
                  
                  <h3 className="text-3xl font-display font-bold text-foreground">{program.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {program.description}
                  </p>
                  
                  {program.duration && (
                    <div className="flex items-center text-sm font-medium text-accent">
                      <Clock className="h-4 w-4 mr-2" />
                      Duration: {program.duration}
                    </div>
                  )}

                  <Link href="/contact">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full mt-4">
                      Apply for this Program
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
