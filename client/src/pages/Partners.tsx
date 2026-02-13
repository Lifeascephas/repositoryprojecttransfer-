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

import dreamWalkerLogo from "@assets/20150407-dream-walker-logo-1_1770996713563.webp";
import cbLogo from "@assets/CB_logotype_reduced-1_1770996713564.webp";
import concordiaSmLogo from "@assets/concordia-logo-sm_RGB-2_1770996713565.jpg";
import erasmusLogo from "@assets/erasmus_logo-1_big-1_1770996713566.png";
import giedLogo from "@assets/GIED-Logo-1_1770996713566.jpg";
import ijgdLogo from "@assets/Internationle-Jugendegemeinchaftsdienste-1_1770996713567.png";
import estyesLogo from "@assets/logo_estyes02_1770996713568.jpg";
import sviLogo from "@assets/logo_SVI_transparent_original-1-1_1770996713569.png";
import workcampLogo from "@assets/Logo_Workcamp_2019-1_1770996713569.png";
import cocatLogo from "@assets/logo-3_(1)_1770996713570.png";
import concordiaColorLogo from "@assets/Logo-couleur-haute-res-1_1770996713571.jpg";
import proIntlLogo from "@assets/logo-pro-international-germany-2_1770996713572.jpg";
import ajovLogo from "@assets/Logotipo-1_1770996713573.jpg";
import covodaLogo from "@assets/photo-3_1770996713574.jpg";
import najitoleaLogo from "@assets/programLOGO-1_1770996713575.png";
import upaLogo from "@assets/UPA-Logo-3_1770996713575.png";
import vfpLogo from "@assets/VFP-Logo-1-1_1770996713576.webp";
import viveMexicoLogo from "@assets/VIVE-MEXICO-logo_1770996713577.webp";
import vjfLogo from "@assets/VJF_Logo_30Jahre-1-1_1770996713579.jpg";
import voltraLogo from "@assets/Voltra_logo_without-tagline-1_1770996713580.png";

import etudesLogo from "@assets/jh_1770997511723.png";
import figderLogo from "@assets/kj_1770997511724.png";
import icjaLogo from "@assets/logo_1770997511726.png";
import mviacLogo from "@assets/logo-d_1770997511730.png";
import dnaNgoLogo from "@assets/logo-g_1770997511732.png";

import iLogo from "@assets/i_1770997143705.webp";
import leLogo from "@assets/le_1770997143706.png";
import lkLogo from "@assets/lk_1770997143707.jpg";
import log1Logo from "@assets/log1_1770997143708.png";
import logo01aLogo from "@assets/logo-01_(1)_1770997143710.png";
import logo01bLogo from "@assets/logo-01_1770997143711.png";
import logo02aLogo from "@assets/logo-02_1770997143711.png";
import logo02bLogo from "@assets/logo-02_1770997143712.webp";
import logo03Logo from "@assets/logo-03_1770997143715.png";
import logo05Logo from "@assets/logo-05_1770997143718.png";
import logo2aLogo from "@assets/logo-2_1770997143713.jpg";
import logo2bLogo from "@assets/logo-2_1770997143715.webp";
import logo3Logo from "@assets/logo-3_1770997143716.png";
import logo4Logo from "@assets/logo-4_1770997143717.webp";
import logo7Logo from "@assets/logo-7_1770997143718.png";
import logo8Logo from "@assets/logo-8_1770997143719.png";
import niceLogo from "@assets/logo_nice2_1770997143709.jpg";
import ubeleLogo from "@assets/the-ubele-initiative-logo_1770997143719.webp";
import vLogo from "@assets/v_1770997143720.webp";
import vwLogo from "@assets/vw-1_1770997143721.jpg";

const affiliations = [
  { name: "Coordinating Committee for International Voluntary Service (CCIVS)", logo: ccivsLogo, level: "International" },
  { name: "Alliance of European Voluntary Service Organisations", logo: allianceLogo, level: "Continental" },
  { name: "Network of African Voluntary Organisations (NAVO)", logo: navoLogo, level: "Continental" },
  { name: "Eastern Africa Voluntary Service Network (EAVS)", logo: eavsLogo, level: "Regional" },
  { name: "Voluntary Associations Consortium of Kenya (VASCO)", logo: vascoLogo, level: "National" },
];

const partnerLogos = [
  { name: "DreamWalker", logo: dreamWalkerLogo },
  { name: "Compagnons Batisseurs", logo: cbLogo },
  { name: "Concordia", logo: concordiaSmLogo },
  { name: "Erasmus+", logo: erasmusLogo },
  { name: "GIED", logo: giedLogo },
  { name: "IJGD", logo: ijgdLogo },
  { name: "ESTYES", logo: estyesLogo },
  { name: "SVI - Service Volontaire International", logo: sviLogo },
  { name: "Workcamp", logo: workcampLogo },
  { name: "COCAT", logo: cocatLogo },
  { name: "Concordia France", logo: concordiaColorLogo },
  { name: "Pro International Germany", logo: proIntlLogo },
  { name: "AJOV", logo: ajovLogo },
  { name: "COVODA", logo: covodaLogo },
  { name: "Najitolea", logo: najitoleaLogo },
  { name: "UPA - Uganda", logo: upaLogo },
  { name: "VFP - International Voluntary Service", logo: vfpLogo },
  { name: "Vive Mexico", logo: viveMexicoLogo },
  { name: "VJF", logo: vjfLogo },
  { name: "VOLTRA", logo: voltraLogo },
  { name: "NICE - Never-ending International workCamps Exchange", logo: niceLogo },
  { name: "The Ubele Initiative", logo: ubeleLogo },
  { name: "Vereinigung Junger Freiwilliger", logo: logo01aLogo },
  { name: "Youth Action for Peace", logo: logo01bLogo },
  { name: "Solidarites Jeunesses", logo: logo02aLogo },
  { name: "ICYE - International Cultural Youth Exchange", logo: logo02bLogo },
  { name: "Service Civil International (SCI)", logo: logo03Logo },
  { name: "MS ActionAid Denmark", logo: logo05Logo },
  { name: "Lunaria", logo: logo2aLogo },
  { name: "IBG - Internationale Begegnung in Gemeinschaftsdiensten", logo: logo2bLogo },
  { name: "InformaGiovani", logo: logo3Logo },
  { name: "Jeunesse et Reconstruction", logo: logo4Logo },
  { name: "World4U", logo: logo7Logo },
  { name: "SEEDS Iceland", logo: logo8Logo },
  { name: "Volunteers for Peace Vietnam", logo: vLogo },
  { name: "Voluntary Workcamps Association", logo: vwLogo },
  { name: "Lanka Jathika Sarvodaya", logo: lkLogo },
  { name: "Legambiente", logo: leLogo },
  { name: "LYVS - Lesotho Youth Voluntary Service", logo: log1Logo },
  { name: "IBO Italia", logo: iLogo },
  { name: "Etudes et Chantiers", logo: etudesLogo },
  { name: "FIGDER", logo: figderLogo },
  { name: "ICJA Freiwilligenaustausch weltweit", logo: icjaLogo },
  { name: "AMVIAC - Asociacion Mexicana de Voluntariado Internacional", logo: mviacLogo },
  { name: "DNA.NGO", logo: dnaNgoLogo },
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
          <div className="max-w-3xl">
            <span className="text-primary font-medium tracking-widest text-xs uppercase">Global Network</span>
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6" data-testid="text-page-title">
              Our <span className="text-primary italic font-normal">Partners</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              KVDA works with over 100 partner organizations across 40+ countries. Together, we mobilize
              volunteers for community development and cross-cultural exchange worldwide.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-display font-medium text-gray-900 mb-6" data-testid="text-affiliations-heading">
              Our Affiliations
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8" />
            <p className="text-gray-700 text-lg font-light leading-relaxed" data-testid="text-affiliations-intro">
              KVDA is affiliated to the following National, Regional, Continental and International Voluntary Service Networks:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {affiliations.map((partner, index) => (
              <div key={partner.name}>
                <Card className="border border-gray-100 shadow-sm h-full" data-testid={`card-affiliation-${index}`}>
                  <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                    <div className="w-full h-32 flex items-center justify-center p-4">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain"
                        data-testid={`img-affiliation-logo-${index}`}
                      />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">{partner.level}</span>
                      <h3 className="text-sm font-semibold text-gray-900 mt-1 leading-snug" data-testid={`text-affiliation-name-${index}`}>
                        {partner.name}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-medium text-gray-900 mb-6" data-testid="text-partners-heading">
              Our Partners
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {partnerLogos.map((partner, index) => (
              <div key={partner.name}>
                <Card className="border border-gray-100 shadow-sm h-full" data-testid={`card-partner-${index}`}>
                  <CardContent className="p-4 flex flex-col items-center justify-center gap-3 h-full">
                    <div className="w-full h-24 flex items-center justify-center p-2">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain"
                        data-testid={`img-partner-logo-${index}`}
                      />
                    </div>
                    <p className="text-xs text-gray-600 font-medium text-center leading-tight" data-testid={`text-partner-name-${index}`}>
                      {partner.name}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="p-12 rounded-md bg-gray-50 border border-gray-100 text-center max-w-3xl mx-auto">
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
          </div>
        </div>
      </section>
    </div>
  );
}
