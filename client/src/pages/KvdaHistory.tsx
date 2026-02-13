import { motion } from "framer-motion";
import { Calendar, Globe, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import founderPhoto from "@assets/Mr.-Africa-236x300_1771014136639.jpg";

const milestones = [
  {
    year: "1920",
    title: "The Beginning of Workcamps",
    description: "The concept of work camps began as an international movement, dedicated to a positive and creative effort to erase the hatred and fears created by the First World War.",
    icon: Globe,
  },
  {
    year: "1956",
    title: "First Workcamp in Kenya",
    description: "The first work camp in Kenya was organized with the support of the British and American Quakers, laying the foundation for voluntary service in the country.",
    icon: Calendar,
  },
  {
    year: "1962",
    title: "KVDA Founded",
    description: "In May 1962, the Kenya Voluntary Workcamps Association was formally established to carry on the mandate of organizing volunteer workcamps across Kenya.",
    icon: Users,
  },
  {
    year: "1969",
    title: "Renamed to KVDA",
    description: "The name changed to Kenya Voluntary Development Association to widen the scope and diversify operations in the entire development spectrum with international voluntary service as the core-competence.",
    icon: Award,
  },
];

export default function KvdaHistory() {
  return (
    <div className="min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&q=80"
            alt="Kenya landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="container px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-primary font-medium tracking-widest text-xs uppercase">Since 1962</span>
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6" data-testid="text-page-title">
              KVDA <span className="text-primary italic font-normal">History</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              Over six decades of championing volunteerism, social justice, and community development across Kenya and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-semibold text-gray-900 mb-8" data-testid="text-overview-heading">
                An Overview on Voluntarism & KVDA Development Cooperation
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                An overview on voluntarism and KVDA development cooperation history reveals efforts by heroes of the century who dedicated their lives to remarkably transform the world.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                The concept of work camps began as an international movement in 1920, dedicated to a positive and creative effort to erase the hatred and fears created by the First World War. The good work and success of the camps in the subsequent years enabled the movement to spread worldwide.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                In Kenya, the first work camp was organized in 1956 with the support of the British and American Quakers. Subsequently, several other camps were held and in May 1962, the Kenya Voluntary Workcamps Association was formed to carry on the mandate.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The name changed to Kenya Voluntary Development Association in 1969 to widen the scope, diversify operations in the entire development spectrum with international voluntary service as the core-competence of the Association.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <span className="text-primary font-medium tracking-widest text-xs uppercase">Our Founder</span>
                <h2 className="text-3xl font-display font-semibold text-gray-900 mt-3 mb-6" data-testid="text-founder-heading">
                  The Late Cephas Mufanawo Munanairi
                </h2>
                <p className="text-primary font-medium text-lg mb-4 italic">
                  Popularly known as "Mr. Africa"
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The founder of KVDA, the late Cephas Mufanawo Munanairi, who died on 2nd October 1994, was a key Pan-African hero who hailed from Zimbabwe and came to Kenya at the height of colonial oppression in his motherland.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  He was inspired to join ranks with fellow like-minded people to establish an organization that would champion the cause for social justice and the idea of volunteering was captured to enable the world to appreciate the spirit of togetherness.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-72 rounded-md overflow-hidden shadow-lg border-4 border-white">
                    <img
                      src={founderPhoto}
                      alt="Mr. Africa - Cephas Mufanawo Munanairi, Founder of KVDA"
                      className="w-full h-auto object-cover"
                      style={{ imageRendering: "auto", filter: "contrast(1.08) brightness(1.05)" }}
                      data-testid="img-founder"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-gray-900 font-semibold text-lg">Cephas Mufanawo Munanairi</p>
                    <p className="text-primary font-medium text-sm tracking-wide uppercase mt-1">"Mr. Africa"</p>
                    <p className="text-gray-500 text-sm mt-1">Founder of KVDA</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-primary font-medium tracking-widest text-xs uppercase">Key Milestones</span>
              <h2 className="text-3xl font-display font-semibold text-gray-900 mt-3" data-testid="text-milestones-heading">
                Our Journey Through the Years
              </h2>
            </motion.div>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />
              <div className="space-y-12">
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  const isLeft = index % 2 === 0;
                  return (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.025 }}
                      className={`relative md:flex md:items-center gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                    >
                      <div className={`md:w-1/2 ${isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                        <Card className="border border-gray-100 shadow-sm">
                          <CardContent className="p-6">
                            <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:justify-end" : ""}`}>
                              <Icon className="h-5 w-5 text-primary" />
                              <span className="text-primary font-bold text-2xl font-display" data-testid={`text-milestone-year-${milestone.year}`}>{milestone.year}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm" />
                      <div className="md:w-1/2" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-semibold text-gray-900 mb-8" data-testid="text-legacy-heading">
                A Legacy of International Cooperation
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                KVDA's launch pad coincided with efforts by the 35th President of the United States of America, John Fitzgerald Kennedy, to establish the Peace Corps. Through the Peace Corps, the USA President sought to encourage mutual understanding between Americans and people of other nations and cultures.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Since our founding, KVDA has carried on this legacy that has inspired generations. As we celebrate over 60 years of community-oriented volunteer work and development, hundreds of Kenyan and international volunteers have come together in solidarity and friendship to mobilize resources to enhance sustainable development.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mt-12">
                <Card className="border border-gray-100 shadow-sm text-center">
                  <CardContent className="p-6">
                    <p className="text-4xl font-display font-bold text-primary" data-testid="text-stat-years">60+</p>
                    <p className="text-gray-600 text-sm mt-2">Years of Service</p>
                  </CardContent>
                </Card>
                <Card className="border border-gray-100 shadow-sm text-center">
                  <CardContent className="p-6">
                    <p className="text-4xl font-display font-bold text-primary" data-testid="text-stat-volunteers">1000s</p>
                    <p className="text-gray-600 text-sm mt-2">Volunteers Mobilized</p>
                  </CardContent>
                </Card>
                <Card className="border border-gray-100 shadow-sm text-center">
                  <CardContent className="p-6">
                    <p className="text-4xl font-display font-bold text-primary" data-testid="text-stat-countries">50+</p>
                    <p className="text-gray-600 text-sm mt-2">Partner Countries</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
