import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

import ccivsLogo from "@assets/CCIVS-logo-horizontal-1_1770994490707.png";
import eavsLogo from "@assets/eavs-logo_1770994490709.png";
import vascoLogo from "@assets/kvda-vaSCO_-Print-02-1_1770994490710.png";
import allianceLogo from "@assets/logo-1_1770994490710.jpg";
import navoLogo from "@assets/WhatsApp-Image-2020-09-27-at-16.26.07_1770994490711.jpg";

const affiliations = [
  { name: "Coordinating Committee for International Voluntary Service (CCIVS)", logo: ccivsLogo, level: "International" },
  { name: "Alliance of European Voluntary Service Organisations", logo: allianceLogo, level: "Continental" },
  { name: "Network of African Voluntary Organisations (NAVO)", logo: navoLogo, level: "Continental" },
  { name: "Eastern Africa Voluntary Service Network (EAVS)", logo: eavsLogo, level: "Regional" },
  { name: "Voluntary Associations Consortium of Kenya (VASCO)", logo: vascoLogo, level: "National" },
];

export default function Partners() {
  return (
    <div className="min-h-screen">
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

      <section className="py-24 bg-white">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl font-display font-medium text-gray-900 mb-6" data-testid="text-affiliations-heading">
              Our Affiliations
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8" />
            <p className="text-gray-700 text-lg font-light leading-relaxed" data-testid="text-affiliations-intro">
              KVDA is affiliated to the following National, Regional, Continental and International Voluntary Service Networks:
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {affiliations.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="border border-gray-100 shadow-sm h-full" data-testid={`card-affiliation-${index}`}>
                  <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                    <div className="w-full h-32 flex items-center justify-center p-4">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain"
                        data-testid={`img-partner-logo-${index}`}
                      />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">{partner.level}</span>
                      <h3 className="text-sm font-semibold text-gray-900 mt-1 leading-snug" data-testid={`text-partner-name-${index}`}>
                        {partner.name}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-12 rounded-md bg-gray-50 border border-gray-100 text-center max-w-3xl mx-auto"
          >
            <h3 className="text-2xl font-display font-medium text-gray-900 mb-4">Become a Partner</h3>
            <p className="text-gray-600 font-light max-w-2xl mx-auto mb-6">
              If your organization is interested in partnering with KVDA for volunteer exchange
              or collaborative development projects, we'd love to hear from you.
            </p>
            <Link href="/contact">
              <Button className="bg-primary text-white rounded-md" data-testid="button-partner-contact">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
