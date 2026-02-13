import { motion } from "framer-motion";
import { ArrowRight, Globe, Users, Heart, Sprout, BookOpen, Stethoscope } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { useNews } from "@/hooks/use-content";

export default function Home() {
  const { data: newsItems } = useNews();

  const focusAreas = [
    { icon: Sprout, title: "Agriculture", desc: "Sustainable farming & food security initiatives." },
    { icon: Users, title: "Gender", desc: "Empowerment programs for marginalized groups." },
    { icon: Stethoscope, title: "Health", desc: "Community health support & disease prevention." },
    { icon: Globe, title: "Wildlife", desc: "Conservation efforts in Maasai Mara & beyond." },
    { icon: Heart, title: "Youth", desc: "Entrepreneurship & leadership development." },
    { icon: BookOpen, title: "Education", desc: "Supporting schools & special needs education." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
            alt="Kenyan Landscape" 
            className="w-full h-full object-cover fixed"
          />
          <div className="absolute inset-0 bg-black/85" />
        </motion.div>
        
        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm"
            >
              <span className="text-primary font-medium tracking-widest text-xs uppercase">Global Impact Since 1962</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-light mb-8 leading-none tracking-tighter text-white">
              BUILDING <br/>
              <span className="text-primary italic font-normal">THE FUTURE</span>
            </h1>
            <p className="text-lg md:text-xl mb-12 text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              Empowering marginalized communities through transformative international volunteering. Join our global mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/projects">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-xl px-10 h-16 rounded-full shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                  Explore Projects
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/10 text-xl px-10 h-16 rounded-full transition-all hover:border-white/40">
                  Join The Movement
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/30"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black border-y border-white/5">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Volunteers", value: "10k+" },
              { label: "Projects", value: "500+" },
              { label: "Years", value: "60+" },
              { label: "Countries", value: "40+" }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-medium text-white mb-2">{stat.value}</div>
                <div className="text-primary font-medium uppercase tracking-widest text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
        
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6">Our Core Pillars</h2>
            <div className="h-1 w-24 bg-primary mb-8" />
            <p className="text-lg text-zinc-400 font-light">Transforming lives through a holistic approach to community development and global solidarity.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {focusAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-zinc-900/50 border-white/5 hover:border-primary/50 transition-all duration-500 group overflow-hidden">
                  <CardContent className="p-10">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-all duration-500 transform group-hover:rotate-6">
                      <area.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-4">{area.title}</h3>
                    <p className="text-zinc-400 text-base leading-relaxed font-light">{area.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-40 bg-black">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-8 leading-tight">Over 60 Years of Global Impact</h2>
              <div className="h-1 w-20 bg-primary mb-8" />
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed font-light">
                The Kenya Voluntary Development Association (KVDA) is an indigenous, non-political, and non-profit organization registered in Kenya. 
                Since 1962, we have mobilized volunteers globally to foster peace and sustainable development.
              </p>
              <Link href="/about">
                <Button variant="ghost" className="text-primary hover:text-primary/80 p-0 text-lg font-medium">
                  Discover Our Legacy <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-3xl opacity-20" />
              <img 
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop" 
                alt="Community Work" 
                className="relative rounded-2xl shadow-2xl w-full aspect-video object-cover ring-1 ring-white/10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest News Preview */}
      <section className="py-40 bg-zinc-950">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 uppercase tracking-tighter">Inside <span className="text-primary">KVDA</span></h2>
              <p className="text-lg text-zinc-500 font-light">Stories of resilience and progress from our project sites.</p>
            </div>
            <Link href="/news">
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 px-10 h-14 rounded-full text-base font-normal">All Stories</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {newsItems?.slice(0, 3).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-black border-white/5 overflow-hidden group hover:border-primary/50 transition-all duration-700">
                  <div className="h-72 overflow-hidden relative">
                    <img 
                      src={item.imageUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop"} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>
                  <CardContent className="p-10">
                    <div className="text-primary font-medium text-xs uppercase tracking-widest mb-6">
                      {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'Recent'}
                    </div>
                    <h3 className="text-xl font-medium text-white mb-6 group-hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
                    <p className="text-zinc-500 text-base line-clamp-3 mb-8 font-light leading-relaxed">{item.content}</p>
                    <Link href={`/news`}>
                      <Button variant="ghost" className="text-white p-0 h-auto font-medium group-hover:translate-x-2 transition-transform text-base">
                        Read Story <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(185,28,28,0.15)_0%,transparent_70%)]" />
        <div className="container px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-6xl md:text-8xl font-display font-medium text-white mb-10 tracking-tighter leading-none">JOIN THE <br/><span className="text-primary">MOVEMENT</span></h2>
            <p className="text-xl md:text-2xl text-zinc-400 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
              Be the catalyst for change. Your journey from volunteer to global citizen begins now.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-16 px-12 rounded-full text-xl font-medium shadow-[0_0_50px_rgba(185,28,28,0.3)] transition-all hover:scale-105">
                  Apply Now
                </Button>
              </Link>
              <Link href="/programs">
                <Button size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 h-16 px-12 rounded-full text-xl font-light backdrop-blur-xl transition-all hover:border-white/30">
                  Our Programs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>

  );
}
