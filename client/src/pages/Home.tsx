import { motion } from "framer-motion";
import { ArrowRight, Globe, Users, Heart, Sprout, BookOpen, Stethoscope, Calendar, MapPin, ChevronRight, CheckCircle2, Trophy, Handshake, Building, TreePine, Play } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNews, usePrograms, useEvents } from "@/hooks/use-content";
import type { News, Program, Event } from "@shared/schema";
import { useState, useEffect, useRef } from "react";
import { SiFacebook, SiX, SiInstagram, SiYoutube, SiLinkedin, SiTiktok } from "react-icons/si";
import heroImg1 from "@assets/WhatsApp_Image_2026-02-07_at_10.03.11_AM_1770992106295.jpeg";
import heroImg2 from "@assets/WhatsApp_Image_2026-02-07_at_10.11.37_AM_1770992106295.jpeg";
import heroImg3 from "@assets/WhatsApp_Image_2026-02-07_at_10.11.42_AM_1770992106296.jpeg";
import heroImg4 from "@assets/WhatsApp_Image_2026-02-07_at_10.14.19_AM_1770992106297.jpeg";
import heroImg5 from "@assets/WhatsApp_Image_2026-02-07_at_10.14.24_AM_1770992106293.jpeg";
import ctaImage from "@assets/new-23_1770997971705.jpg";

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
import niceLogo from "@assets/logo_nice2_1770997143709.jpg";
import ubeleLogo from "@assets/the-ubele-initiative-logo_1770997143719.webp";
import logo01aLogo from "@assets/logo-01_(1)_1770997143710.png";
import logo02bLogo from "@assets/logo-02_1770997143712.webp";
import logo03Logo from "@assets/logo-03_1770997143715.png";
import logo05Logo from "@assets/logo-05_1770997143718.png";
import etudesLogo from "@assets/jh_1770997511723.png";
import figderLogo from "@assets/kj_1770997511724.png";
import icjaLogo from "@assets/logo_1770997511726.png";
import mviacLogo from "@assets/logo-d_1770997511730.png";
import dnaNgoLogo from "@assets/logo-g_1770997511732.png";

const programTypeToSlug: Record<string, string> = {
  short_term: "international-workcamps",
  long_term: "medium-long-term-placement",
  outbound: "outbound-exchange",
  educational: "educational-tours",
};

const heroImages = [
  heroImg1,
  heroImg2,
  heroImg3,
  heroImg4,
  heroImg5,
];

const partnerLogosForSlider = [
  { name: "CCIVS", logo: ccivsLogo },
  { name: "Alliance of European VS", logo: allianceLogo },
  { name: "NAVO", logo: navoLogo },
  { name: "EAVS", logo: eavsLogo },
  { name: "VASCO", logo: vascoLogo },
  { name: "DreamWalker", logo: dreamWalkerLogo },
  { name: "Compagnons Batisseurs", logo: cbLogo },
  { name: "Concordia", logo: concordiaSmLogo },
  { name: "Erasmus+", logo: erasmusLogo },
  { name: "GIED", logo: giedLogo },
  { name: "IJGD", logo: ijgdLogo },
  { name: "ESTYES", logo: estyesLogo },
  { name: "SVI", logo: sviLogo },
  { name: "Workcamp", logo: workcampLogo },
  { name: "COCAT", logo: cocatLogo },
  { name: "Concordia France", logo: concordiaColorLogo },
  { name: "Pro International", logo: proIntlLogo },
  { name: "AJOV", logo: ajovLogo },
  { name: "COVODA", logo: covodaLogo },
  { name: "Najitolea", logo: najitoleaLogo },
  { name: "UPA", logo: upaLogo },
  { name: "VFP", logo: vfpLogo },
  { name: "Vive Mexico", logo: viveMexicoLogo },
  { name: "VJF", logo: vjfLogo },
  { name: "VOLTRA", logo: voltraLogo },
  { name: "NICE", logo: niceLogo },
  { name: "Ubele Initiative", logo: ubeleLogo },
  { name: "VJF Germany", logo: logo01aLogo },
  { name: "ICYE", logo: logo02bLogo },
  { name: "SCI", logo: logo03Logo },
  { name: "MS ActionAid", logo: logo05Logo },
  { name: "Etudes et Chantiers", logo: etudesLogo },
  { name: "FIGDER", logo: figderLogo },
  { name: "ICJA", logo: icjaLogo },
  { name: "AMVIAC", logo: mviacLogo },
  { name: "DNA.NGO", logo: dnaNgoLogo },
];

const focusAreas = [
  { icon: Sprout, title: "Agriculture & Food Security", desc: "Sustainable farming initiatives to combat hunger and improve nutrition in rural communities." },
  { icon: Users, title: "Gender Equality", desc: "Programs empowering women and girls through education, training, and community support." },
  { icon: Stethoscope, title: "Health & Well-being", desc: "Community health outreach, disease prevention, and access to medical services." },
  { icon: Globe, title: "Environment & Wildlife", desc: "Conservation efforts protecting Kenya's natural heritage and biodiversity." },
  { icon: Heart, title: "Youth Empowerment", desc: "Leadership development, entrepreneurship training, and mentorship programs." },
  { icon: BookOpen, title: "Quality Education", desc: "Supporting schools, special needs education, and vocational training centers." },
];

export default function Home() {
  const { data: newsItems } = useNews();
  const { data: programs } = usePrograms();
  const { data: events } = useEvents();

  const [currentImage, setCurrentImage] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden" data-testid="section-hero">
        {heroImages.map((img, i) => {
          const nextImage = (currentImage + 1) % heroImages.length;
          const isVisible = i === currentImage || i === nextImage;
          if (!isVisible) return null;
          return (
            <div
              key={img}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: i === currentImage ? 1 : 0 }}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="max-w-2xl"
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-md bg-primary text-white text-xs font-semibold uppercase tracking-wider" data-testid="text-hero-badge">
              Since 1962
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white" data-testid="text-hero-title">
              Building Communities,<br />
              <span className="text-primary">Changing Lives</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/80 leading-relaxed" data-testid="text-hero-subtitle">
              Empowering marginalized communities through international volunteerism, sustainable development, and cross-cultural exchange.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/volunteer">
                <Button size="lg" className="bg-primary text-white font-semibold text-base px-8" data-testid="button-hero-volunteer">
                  Become a Volunteer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/programs">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white font-semibold text-base px-8" data-testid="button-hero-programs">
                  Explore Programs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === currentImage ? 'bg-primary scale-110' : 'bg-white/50'}`}
              data-testid={`button-hero-dot-${i}`}
            />
          ))}
        </div>
      </section>

      <section className="bg-primary text-white py-10" data-testid="section-stats">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Volunteers Mobilized", value: "10,000+" },
              { label: "Community Projects", value: "500+" },
              { label: "Years of Service", value: "60+" },
              { label: "Partner Countries", value: "40+" },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1" data-testid={`text-stat-value-${i}`}>{stat.value}</div>
                <div className="text-white/80 text-sm font-medium" data-testid={`text-stat-label-${i}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white" data-testid="section-about-summary">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">About KVDA</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">Over 60 Years of Global Impact</h2>
              <div className="h-1 w-16 bg-primary mb-6 rounded-full" />
              <p className="text-gray-600 leading-relaxed mb-4">
                The Kenya Voluntary Development Association (KVDA) is an indigenous, non-political, and non-profit making organization registered in Kenya since 1962. We coordinate and organize volunteer programmes that bring people from diverse backgrounds together.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our mission is to promote sustainable community development through international voluntary service, fostering peace, cross-cultural understanding, and social justice across Africa and beyond.
              </p>
              <Link href="/about">
                <Button variant="outline" className="border-primary text-primary font-semibold" data-testid="button-about-learn-more">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
                alt="Community volunteering"
                className="rounded-md shadow-lg w-full aspect-[4/3] object-cover"
                loading="lazy"
                data-testid="img-about-summary"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-md shadow-lg hidden md:block" data-testid="text-about-callout">
                <div className="text-3xl font-bold">60+</div>
                <div className="text-sm font-medium text-white/90">Years of Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gray-50" data-testid="section-focus-areas">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Our Focus Areas</h2>
            <div className="h-1 w-16 bg-primary mx-auto mb-4 rounded-full" />
            <p className="text-gray-500 max-w-2xl mx-auto">Aligned with the UN Sustainable Development Goals, we tackle the most pressing challenges facing communities in Kenya and beyond.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map((area, index) => (
              <Card key={area.title} className="h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow group" data-testid={`card-focus-${index}`}>
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-red-50 rounded-md flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                    <area.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{area.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{area.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white" data-testid="section-programs">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Programs</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Volunteer Programs</h2>
            <div className="h-1 w-16 bg-primary mx-auto mb-4 rounded-full" />
            <p className="text-gray-500 max-w-2xl mx-auto">Choose from a range of volunteer programs designed to match your interests, skills, and availability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(programs as Program[])?.slice(0, 4).map((program: Program, i: number) => (
              <Card key={program.id} className="h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow group overflow-hidden" data-testid={`card-program-${program.id}`}>
                <div className="h-48 overflow-hidden">
                  <img
                    src={program.imageUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-5">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">{program.type?.replace('_', ' ')}</span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2 line-clamp-2">{program.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-4">{program.description}</p>
                  <Link href={`/what-we-do/${programTypeToSlug[program.type || ''] || 'international-workcamps'}`}>
                    <span className="text-primary text-sm font-semibold inline-flex items-center hover:underline cursor-pointer" data-testid={`link-program-details-${program.id}`}>
                      Learn More <ChevronRight className="h-4 w-4 ml-1" />
                    </span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/programs">
              <Button variant="outline" className="border-primary text-primary font-semibold px-8" data-testid="button-view-all-programs">
                View All Programs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gray-50" data-testid="section-news">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Latest Updates</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-2">News & Blog</h2>
              <div className="h-1 w-16 bg-primary rounded-full" />
            </div>
            <Link href="/news">
              <Button variant="outline" className="border-primary text-primary font-semibold" data-testid="button-view-all-news">
                All Stories <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {(newsItems as News[])?.slice(0, 3).map((item: News, i: number) => (
              <Card key={item.id} className="h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow group overflow-hidden" data-testid={`card-news-${item.id}`}>
                <div className="h-52 overflow-hidden">
                  <img
                    src={item.imageUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="text-xs font-semibold text-primary mb-2">
                    {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-4">{item.content}</p>
                  <Link href="/news">
                    <span className="text-primary text-sm font-semibold inline-flex items-center hover:underline cursor-pointer">
                      Read More <ChevronRight className="h-4 w-4 ml-1" />
                    </span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white" data-testid="section-events">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Upcoming</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Events & Activities</h2>
            <div className="h-1 w-16 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {(events as Event[])?.slice(0, 4).map((event: Event, i: number) => (
              <Card key={event.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow" data-testid={`card-event-${event.id}`}>
                <CardContent className="p-5 flex gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-red-50 rounded-md flex flex-col items-center justify-center text-primary">
                    <Calendar className="h-5 w-5 mb-0.5" />
                    <span className="text-xs font-bold">
                      {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'short' }) : ''}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{event.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-2">{event.description}</p>
                    {event.location && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {event.location}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/events">
              <Button variant="outline" className="border-primary text-primary font-semibold px-8" data-testid="button-view-all-events">
                View All Events <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50 overflow-hidden" data-testid="section-partners">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Network</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">International Partners</h2>
            <div className="h-1 w-16 bg-primary mx-auto rounded-full" />
          </div>
        </div>

        <div className="relative" ref={sliderRef}>
          <div className="flex animate-scroll-left" style={{ width: 'max-content' }}>
            {[...partnerLogosForSlider, ...partnerLogosForSlider].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="flex-shrink-0 mx-4 w-40 h-24 bg-white rounded-md border border-gray-100 shadow-sm flex items-center justify-center p-3"
                data-testid={`partner-logo-${i}`}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                  title={partner.name}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/partners">
            <Button variant="outline" className="border-primary text-primary font-semibold px-8" data-testid="button-view-all-partners">
              View All Partners <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white" data-testid="section-accomplishments">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Explore More</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">What KVDA Has Accomplished</h2>
            <div className="h-1 w-16 bg-primary mx-auto mb-4 rounded-full" />
            <p className="text-gray-500 max-w-2xl mx-auto">Over six decades of dedicated service, KVDA has made a lasting impact on communities across Kenya and beyond.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {[
              { icon: Trophy, value: "10,000+", label: "Community Projects", desc: "Successfully implemented across Kenya since 1962" },
              { icon: Handshake, value: "25+", label: "Erasmus+ Projects", desc: "Implemented since 2008 with EU partnerships" },
              { icon: Building, value: "40+", label: "Partner Countries", desc: "Global volunteer exchange network" },
              { icon: TreePine, value: "50+", label: "Annual Workcamps", desc: "Organized nationwide every year" },
            ].map((item, i) => (
              <Card key={item.label} className="border border-gray-100 shadow-sm text-center h-full" data-testid={`card-accomplishment-${i}`}>
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-red-50 rounded-md flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{item.value}</div>
                  <div className="text-sm font-semibold text-gray-800 mb-2">{item.label}</div>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Milestones</h3>
              <div className="space-y-4">
                {[
                  "Constructed water tanks at schools in Narok district with JICA",
                  "Organized workcamps at Kakuma Refugees camp with UNHCR",
                  "Hosted the 29th General Assembly of CCIVS in Nairobi, attended by 100+ global organizations",
                  "Facilitated youth participation in Poverty Reduction Strategies",
                  "Peace building workshops for the Great Lakes region with NPI-Africa and WSCF",
                  "Improvement of Kirasha Rescue center through long-term voluntary service",
                ].map((milestone, i) => (
                  <div
                    key={i}
                    className="flex gap-3 items-start"
                    data-testid={`text-milestone-${i}`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-gray-600 text-sm leading-relaxed">{milestone}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/what-we-do">
                  <Button variant="outline" className="border-primary text-primary font-semibold" data-testid="button-explore-more">
                    Explore All Programs <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80"
                alt="KVDA volunteers working together"
                className="rounded-md shadow-lg w-full aspect-[4/3] object-cover"
                loading="lazy"
                data-testid="img-accomplishments"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-white p-5 rounded-md shadow-lg hidden md:block">
                <div className="text-2xl font-bold">Since 1962</div>
                <div className="text-xs text-white/90">Serving communities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50" data-testid="section-social-media">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Stay Connected</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Follow Us on Social Media</h2>
            <div className="h-1 w-16 bg-primary mx-auto mb-4 rounded-full" />
            <p className="text-gray-500 max-w-xl mx-auto">Join our online community to stay updated on volunteer opportunities, project stories, and community impact.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: SiFacebook, label: "Facebook", href: "https://facebook.com/kvdakenya", color: "bg-[#1877F2]", handle: "@kvdakenya" },
              { icon: SiX, label: "X (Twitter)", href: "https://twitter.com/kvdakenya", color: "bg-gray-900", handle: "@kvdakenya" },
              { icon: SiInstagram, label: "Instagram", href: "https://instagram.com/kvdakenya", color: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]", handle: "@kvdakenya" },
              { icon: SiYoutube, label: "YouTube", href: "https://www.youtube.com/@kvda-kenyavoluntarydevelop8044", color: "bg-[#FF0000]", handle: "KVDA Kenya" },
              { icon: SiLinkedin, label: "LinkedIn", href: "https://linkedin.com/company/kvdakenya", color: "bg-[#0A66C2]", handle: "KVDA Kenya" },
              { icon: SiTiktok, label: "TikTok", href: "https://tiktok.com/@kvdakenya", color: "bg-gray-900", handle: "@kvdakenya" },
            ].map((social, i) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-social-home-${social.label.toLowerCase().replace(/[\s()]/g, '')}`}
              >
                <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow group h-full">
                  <CardContent className="p-5 flex flex-col items-center text-center">
                    <div className={`w-12 h-12 ${social.color} rounded-md flex items-center justify-center mb-3`}>
                      <social.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-0.5">{social.label}</h4>
                    <span className="text-xs text-gray-400">{social.handle}</span>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white" data-testid="section-youtube">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Watch & Learn</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">KVDA in Action</h2>
            <div className="h-1 w-16 bg-primary mx-auto mb-4 rounded-full" />
            <p className="text-gray-500 max-w-2xl mx-auto">See our volunteers and communities in action. Watch stories of impact, project highlights, and volunteer experiences.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div>
              <div className="relative aspect-video rounded-md overflow-hidden shadow-lg" data-testid="video-main">
                <iframe
                  src="https://www.youtube.com/embed/VOqum1Pz79Y"
                  title="KVDA Volunteer Experience"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mt-4" data-testid="text-video-main-title">KVDA Volunteer Experience</h3>
              <p className="text-gray-500 text-sm mt-1">Discover what it's like to volunteer with KVDA and make a lasting impact in Kenyan communities.</p>
            </div>

            <div className="space-y-4">
              {[
                { title: "International Workcamps 2024", desc: "Highlights from our annual international workcamp season across Kenya.", id: "nJPERZDfyWc" },
                { title: "Community Development Projects", desc: "See how KVDA projects transform schools, health centers and communities.", id: "L_jWHffIx5E" },
                { title: "Volunteer Testimonials", desc: "Hear directly from volunteers about their transformative experiences with KVDA.", id: "YQHsXMglC9A" },
              ].map((video, i) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-video-${i}`}
                >
                  <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex gap-4 items-center">
                      <div className="flex-shrink-0 w-16 h-16 bg-red-50 rounded-md flex items-center justify-center">
                        <Play className="w-7 h-7 text-primary fill-primary" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">{video.title}</h4>
                        <p className="text-gray-500 text-xs line-clamp-2">{video.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}

              <div className="pt-2">
                <a href="https://www.youtube.com/@kvda-kenyavoluntarydevelop8044" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full border-primary text-primary font-semibold" data-testid="button-youtube-channel">
                    <SiYoutube className="mr-2 h-4 w-4" />
                    Visit Our YouTube Channel
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 overflow-hidden" data-testid="section-cta">
        <div className="absolute inset-0">
          <img
            src={ctaImage}
            alt="KVDA volunteers"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/50 to-primary/30" />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="hidden md:block" />
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
              <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
                Join thousands of volunteers who have transformed communities across Kenya. Your journey starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/volunteer">
                  <Button size="lg" className="bg-white text-primary font-semibold text-base px-8" data-testid="button-cta-volunteer">
                    Become a Volunteer
                  </Button>
                </Link>
                <Link href="/donate">
                  <Button size="lg" variant="outline" className="border-white/50 text-white font-semibold text-base px-8 bg-white/10 backdrop-blur-sm" data-testid="button-cta-donate">
                    <Heart className="mr-2 h-5 w-5" />
                    Support Our Work
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
