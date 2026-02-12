import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="container px-4">
        <SectionHeader 
          title="About KVDA" 
          subtitle="A legacy of volunteerism and community development since 1962."
        />

        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-display font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To mobilize resources and foster international cooperation for sustainable development in marginalized communities. We believe in the power of people coming together to solve common challenges.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-display font-bold text-accent mb-4">Our Vision</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A peaceful society where people live in harmony with dignity and mutual respect. We envision a world where development is participatory and sustainable.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* History Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            {/* Unsplash: Old map or historical style image of Kenya/Africa */}
            <img 
              src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072&auto=format&fit=crop" 
              alt="History of KVDA" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div>
            <h3 className="text-3xl font-display font-bold mb-6">Our History</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                The Kenya Voluntary Development Association (KVDA) is an indigenous, non-political, and non-sectarian membership organization. It was registered under the Societies' Act in Kenya and later as a Non-Governmental Organization (NGO) in 1993.
              </p>
              <p>
                Founded in 1962, KVDA was the first work camp organization in Kenya. For over five decades, we have been at the forefront of voluntary service, hosting thousands of international volunteers and sending Kenyans abroad to foster cross-cultural understanding.
              </p>
              <p>
                Our motto, "Development Against Dependence," guides every project we undertake. We strive to empower communities to take charge of their own development rather than relying on external aid.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership / Values */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border mb-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-display font-bold mb-4">Our Core Values</h3>
            <p className="text-muted-foreground">The principles that guide our work every day.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Volunteerism & Service", 
              "Cross-cultural Understanding", 
              "Community Participation", 
              "Sustainability", 
              "Integrity & Transparency", 
              "Gender Equality"
            ].map((value) => (
              <div key={value} className="flex items-center space-x-3 p-4 bg-muted/50 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <span className="font-semibold text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
