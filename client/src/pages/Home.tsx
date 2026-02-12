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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Unsplash: Group of happy African children/people outdoors */}
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
            alt="Volunteers in Kenya" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container relative z-10 px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Development Against <br/>
              <span className="text-accent">Dependence</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Empowering communities through international volunteering since 1962. Join us in making a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 h-14 rounded-full">
                  Find a Project
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 h-14 rounded-full">
                  Learn Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold text-primary mb-6">Over 60 Years of Impact</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                The Kenya Voluntary Development Association (KVDA) is an indigenous, non-political, and non-profit organization registered in Kenya. 
                Started in 1962 as a work camp organization, we have mobilized volunteers from all over the world to foster peace, understanding, 
                and sustainable development.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our mission is to mobilize resources and foster international cooperation for sustainable development in marginalized communities.
              </p>
              <Link href="/about">
                <Button variant="link" className="text-accent hover:text-accent/80 p-0 text-lg font-semibold">
                  Read our full history <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/10 rounded-2xl transform rotate-3" />
              {/* Unsplash: Hands planting or community work */}
              <img 
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop" 
                alt="Community Work" 
                className="relative rounded-2xl shadow-xl w-full aspect-video object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <SectionHeader 
            title="Our Focus Areas" 
            subtitle="We work holistically to address the root causes of poverty and dependence through these key pillars."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all border-none shadow-sm group">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <area.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{area.title}</h3>
                    <p className="text-muted-foreground">{area.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Preview */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">Latest Updates</h2>
              <p className="text-muted-foreground">Stories from the field and upcoming events</p>
            </div>
            <Link href="/news">
              <Button variant="outline" className="hidden md:flex">View All News</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {newsItems?.slice(0, 3).map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-md">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.imageUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop"} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-accent font-semibold mb-2">
                    {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'Recent'}
                  </div>
                  <h3 className="text-lg font-bold mb-3 line-clamp-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{item.content}</p>
                  <Link href={`/news`}>
                    <span className="text-primary text-sm font-semibold cursor-pointer hover:underline">Read More</span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/news">
              <Button variant="outline">View All News</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10">
            Join thousands of volunteers who have contributed to sustainable development in Kenya. Your journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white h-14 px-8 rounded-full text-lg shadow-xl shadow-black/10">
                Apply Now
              </Button>
            </Link>
            <Link href="/programs">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 h-14 px-8 rounded-full text-lg">
                Explore Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
