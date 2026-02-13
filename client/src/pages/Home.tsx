import { motion } from "framer-motion";
import { ArrowRight, Globe, Users, Heart, Sprout, BookOpen, Stethoscope, Calendar, MapPin, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNews, usePrograms, useEvents, usePartners } from "@/hooks/use-content";
import type { News, Program, Event, Partner } from "@shared/schema";
import { useState, useEffect } from "react";

const heroImages = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509099836639-18ba4637e4c1?q=80&w=2031&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2070&auto=format&fit=crop",
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
  const { data: partners } = usePartners();

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section with Rotating Background */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden" data-testid="section-hero">
        {heroImages.map((img, i) => (
          <motion.div
            key={img}
            initial={false}
            animate={{ opacity: i === currentImage ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
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

      {/* Stats Bar */}
      <section className="bg-primary text-white py-10" data-testid="section-stats">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Volunteers Mobilized", value: "10,000+" },
              { label: "Community Projects", value: "500+" },
              { label: "Years of Service", value: "60+" },
              { label: "Partner Countries", value: "40+" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold mb-1" data-testid={`text-stat-value-${i}`}>{stat.value}</div>
                <div className="text-white/80 text-sm font-medium" data-testid={`text-stat-label-${i}`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Summary */}
      <section className="py-20 md:py-28 bg-white" data-testid="section-about-summary">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
                alt="Community volunteering"
                className="rounded-md shadow-lg w-full aspect-[4/3] object-cover"
                data-testid="img-about-summary"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-md shadow-lg hidden md:block" data-testid="text-about-callout">
                <div className="text-3xl font-bold">60+</div>
                <div className="text-sm font-medium text-white/90">Years of Service</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 md:py-28 bg-gray-50" data-testid="section-focus-areas">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Our Focus Areas</h2>
            <div className="h-1 w-16 bg-primary mx-auto mb-4 rounded-full" />
            <p className="text-gray-500 max-w-2xl mx-auto">Aligned with the UN Sustainable Development Goals, we tackle the most pressing challenges facing communities in Kenya and beyond.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow group" data-testid={`card-focus-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-red-50 rounded-md flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                      <area.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{area.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{area.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 md:py-28 bg-white" data-testid="section-programs">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Programs</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Volunteer Programs</h2>
            <div className="h-1 w-16 bg-primary mx-auto mb-4 rounded-full" />
            <p className="text-gray-500 max-w-2xl mx-auto">Choose from a range of volunteer programs designed to match your interests, skills, and availability.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(programs as Program[])?.slice(0, 4).map((program: Program, i: number) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow group overflow-hidden" data-testid={`card-program-${program.id}`}>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={program.imageUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-5">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{program.type?.replace('_', ' ')}</span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2 line-clamp-2">{program.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-3 mb-4">{program.description}</p>
                    <Link href="/programs">
                      <span className="text-primary text-sm font-semibold inline-flex items-center hover:underline cursor-pointer" data-testid={`link-program-details-${program.id}`}>
                        Learn More <ChevronRight className="h-4 w-4 ml-1" />
                      </span>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
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

      {/* News Preview */}
      <section className="py-20 md:py-28 bg-gray-50" data-testid="section-news">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4"
          >
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
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {(newsItems as News[])?.slice(0, 3).map((item: News, i: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow group overflow-hidden" data-testid={`card-news-${item.id}`}>
                  <div className="h-52 overflow-hidden">
                    <img
                      src={item.imageUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="py-20 md:py-28 bg-white" data-testid="section-events">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Upcoming</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Events & Activities</h2>
            <div className="h-1 w-16 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {(events as Event[])?.slice(0, 4).map((event: Event, i: number) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow" data-testid={`card-event-${event.id}`}>
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
              </motion.div>
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

      {/* Partners Logo Slider */}
      <section className="py-16 md:py-20 bg-gray-50 overflow-hidden" data-testid="section-partners">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Network</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">International Partners</h2>
            <div className="h-1 w-16 bg-primary mx-auto rounded-full" />
          </motion.div>
        </div>

        <div className="relative">
          <div className="flex animate-scroll-left" style={{ width: 'max-content' }}>
            {[...(partners as Partner[] || []), ...(partners as Partner[] || [])].map((partner: Partner, i: number) => (
              <div
                key={`${partner.id}-${i}`}
                className="flex-shrink-0 mx-6 w-48 h-24 bg-white rounded-md border border-gray-100 shadow-sm flex items-center justify-center p-4"
                data-testid={`partner-logo-${i}`}
              >
                <div className="text-center">
                  <div className="font-semibold text-gray-700 text-sm line-clamp-2">{partner.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{partner.country}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-primary relative overflow-hidden" data-testid="section-cta">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1509099836639-18ba4637e4c1?q=80&w=2031&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
              Join thousands of volunteers who have transformed communities across Kenya. Your journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
