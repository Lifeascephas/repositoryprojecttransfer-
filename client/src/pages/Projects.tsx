import { useProjects } from "@/hooks/use-content";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Tag } from "lucide-react";
import { Link } from "wouter";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-muted/20 min-h-screen">
      <div className="container px-4">
        <SectionHeader 
          title="Volunteer Projects" 
          subtitle="Browse our active projects across Kenya. From conservation in Maasai Mara to education in rural villages."
        />

        {(!projects || projects.length === 0) ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <h3 className="text-xl font-medium text-muted-foreground">No active projects found at the moment.</h3>
            <p className="mt-2 text-sm text-muted-foreground">Please check back later or contact us for upcoming opportunities.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="flex flex-col h-full hover:shadow-xl transition-all duration-300 border-none shadow-sm overflow-hidden group">
                <div className="h-56 relative overflow-hidden">
                  <img 
                    src={project.imageUrl || "https://images.unsplash.com/photo-1516214104703-d870798883c5?q=80&w=2070&auto=format&fit=crop"} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary uppercase tracking-wide">
                    {project.sector}
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex items-center text-muted-foreground text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1 text-accent" />
                    {project.location}
                  </div>
                  <h3 className="text-xl font-medium font-display line-clamp-2 leading-tight">
                    {project.title}
                  </h3>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm line-clamp-4 font-light">
                    {project.description}
                  </p>
                </CardContent>
                
                <CardFooter className="pt-0 border-t bg-muted/10 p-6 mt-auto">
                  <Link href={`/contact`} className="w-full">
                    <Button className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white font-medium transition-colors">
                      Inquire & Apply
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
