import { usePartners } from "@/hooks/use-content";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, ExternalLink } from "lucide-react";
import type { Partner } from "@shared/schema";

export default function Partners() {
  const { data: partners, isLoading } = usePartners();

  if (isLoading) {
    return (
      <div className="py-20 text-center bg-black min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Loading partners...</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80"
            alt="Global partnership"
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
            <span className="text-primary font-medium tracking-widest text-xs uppercase">Global Network</span>
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6" data-testid="text-page-title">
              Our <span className="text-primary italic font-normal">Partners</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              KVDA works with over 100 partner organizations across 40+ countries. Together, we mobilize 
              volunteers for community development and cross-cultural exchange worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-zinc-950">
        <div className="container px-4">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-display font-medium text-white mb-6">International Partner Organizations</h2>
            <div className="h-1 w-24 bg-primary mb-8" />
            <p className="text-zinc-400 font-light">
              Our partnership network spans across Africa, Asia, Europe, and the Americas, enabling volunteer exchange and collaborative development projects globally.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(partners as Partner[])?.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-zinc-900/50 border-white/5 h-full group" data-testid={`card-partner-${partner.id}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <Globe className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-white mb-1 leading-tight" data-testid={`text-partner-name-${partner.id}`}>
                          {partner.name}
                        </h3>
                        {partner.country && (
                          <p className="text-primary text-xs font-medium uppercase tracking-wider mb-2" data-testid={`text-partner-country-${partner.id}`}>
                            {partner.country}
                          </p>
                        )}
                        {partner.description && (
                          <p className="text-zinc-500 text-sm font-light leading-relaxed">{partner.description}</p>
                        )}
                        {partner.website && (
                          <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-primary transition-colors mt-3"
                            data-testid={`link-partner-website-${partner.id}`}
                          >
                            <ExternalLink className="w-3 h-3" />
                            Visit website
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 p-12 rounded-2xl bg-zinc-900/50 border border-white/5 text-center">
            <h3 className="text-2xl font-display font-medium text-white mb-4">Become a Partner</h3>
            <p className="text-zinc-400 font-light max-w-2xl mx-auto mb-6">
              If your organization is interested in partnering with KVDA for volunteer exchange 
              or collaborative development projects, we'd love to hear from you.
            </p>
            <p className="text-zinc-400 text-sm">
              Contact us at <a href="mailto:info@kvdakenya.org" className="text-primary hover:underline" data-testid="link-partner-email">info@kvdakenya.org</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
