import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Heart, GraduationCap, Stethoscope, Droplets, TreePine,
  Users, ArrowRight
} from "lucide-react";

const impactAreas = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "Support school renovation, learning materials, and teaching programs for vulnerable children.",
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    description: "Fund community health centers, health education campaigns, and medical supply distribution.",
  },
  {
    icon: Droplets,
    title: "Clean Water",
    description: "Help build water harvesting systems and boreholes for rural communities lacking clean water access.",
  },
  {
    icon: TreePine,
    title: "Environment",
    description: "Support reforestation projects and wildlife conservation efforts across Kenya.",
  },
  {
    icon: Users,
    title: "Gender Equality",
    description: "Fund vocational training and empowerment programs for women and girls.",
  },
  {
    icon: Heart,
    title: "General Fund",
    description: "Contribute to KVDA's overall mission of community development and volunteer mobilization.",
  },
];

export default function Donate() {
  return (
    <div className="bg-black min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80"
            alt="Community impact"
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
            <span className="text-primary font-medium tracking-widest text-xs uppercase">Make a Difference</span>
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6" data-testid="text-page-title">
              Support Our <span className="text-primary italic font-normal">Mission</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              Your donation directly supports community development projects across Kenya. 
              Every contribution helps us empower marginalized communities and create lasting change.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-zinc-950">
        <div className="container px-4">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl font-display font-medium text-white mb-6">Where Your Donation Goes</h2>
            <div className="h-1 w-24 bg-primary mb-8" />
            <p className="text-lg text-zinc-400 font-light">
              Every donation is carefully directed to maximize impact in the communities we serve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="bg-zinc-900/50 border-white/5 h-full" data-testid={`card-impact-${index}`}>
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                      <area.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-3">{area.title}</h3>
                    <p className="text-zinc-400 font-light text-sm leading-relaxed">{area.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-zinc-900/50 border-white/5 overflow-hidden">
              <CardContent className="p-10 md:p-16">
                <div className="text-center">
                  <Heart className="w-16 h-16 text-primary mx-auto mb-8" />
                  <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-6">How to Donate</h2>
                  <p className="text-zinc-400 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                    You can support KVDA's community development work through the following channels. 
                    All donations are tax-deductible and go directly towards our programs.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div className="p-6 rounded-xl bg-zinc-800/50 border border-white/5">
                    <h3 className="text-lg font-medium text-white mb-4">Bank Transfer</h3>
                    <div className="space-y-2 text-sm text-zinc-400">
                      <p><span className="text-zinc-300">Bank:</span> Kenya Commercial Bank (KCB)</p>
                      <p><span className="text-zinc-300">Account Name:</span> KVDA</p>
                      <p><span className="text-zinc-300">Account No:</span> 1100274857</p>
                      <p><span className="text-zinc-300">Branch:</span> Karen</p>
                      <p><span className="text-zinc-300">Swift Code:</span> KCBLKENX</p>
                    </div>
                  </div>
                  <div className="p-6 rounded-xl bg-zinc-800/50 border border-white/5">
                    <h3 className="text-lg font-medium text-white mb-4">Mobile Money (M-Pesa)</h3>
                    <div className="space-y-2 text-sm text-zinc-400">
                      <p><span className="text-zinc-300">Paybill No:</span> Available on request</p>
                      <p><span className="text-zinc-300">Account Name:</span> KVDA</p>
                      <p className="mt-4 text-zinc-300">For M-Pesa donations, please contact us for the current Paybill number.</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-zinc-400 text-sm mb-6">
                    For more information about donating or to discuss specific project support, contact us:
                  </p>
                  <Link href="/contact">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14" data-testid="link-contact-donate">
                      Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
