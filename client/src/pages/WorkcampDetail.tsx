import { useWorkcamp } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, DollarSign, Tent, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";

export default function WorkcampDetail() {
  const [, params] = useRoute("/workcamps/:id");
  const id = Number(params?.id);
  const { data: camp, isLoading, error } = useWorkcamp(id);

  if (isLoading) {
    return (
      <div className="py-20 text-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Loading workcamp details...</p>
      </div>
    );
  }

  if (error || !camp) {
    return (
      <div className="py-20 text-center min-h-screen">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Workcamp Not Found</h2>
        <p className="text-gray-500 mb-6">The workcamp you're looking for doesn't exist or has been removed.</p>
        <Link href="/workcamps">
          <Button data-testid="link-back-workcamps">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Workcamps
          </Button>
        </Link>
      </div>
    );
  }

  const activities = camp.activities ? camp.activities.split(", ") : [];

  return (
    <div className="min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={camp.imageUrl || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80"}
            alt={camp.name}
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
            <Link href="/workcamps">
              <Button variant="ghost" size="sm" className="text-zinc-300 mb-4" data-testid="link-back">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Workcamps
              </Button>
            </Link>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className="bg-primary text-white border-0">{camp.month}</Badge>
              <Badge variant="outline" className="text-zinc-300 border-zinc-500">{camp.type}</Badge>
            </div>
            <p className="text-sm font-mono text-zinc-400 mb-2" data-testid="text-detail-code">{camp.code}</p>
            <h1 className="text-4xl md:text-5xl font-display font-light text-white mb-4" data-testid="text-detail-name">
              {camp.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-zinc-300 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-primary" />
                {camp.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-primary" />
                {camp.dates}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">About This Workcamp</h2>
                  <p className="text-gray-600 leading-relaxed">{camp.description}</p>
                </motion.div>

                {activities.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">Activities</h2>
                    <ul className="space-y-3">
                      {activities.map((activity: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-gray-600">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {camp.accommodation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">Accommodation & Living</h2>
                    <p className="text-gray-600 leading-relaxed">{camp.accommodation}</p>
                  </motion.div>
                )}
              </div>

              <div className="space-y-6">
                <Card className="border border-gray-100 sticky top-24">
                  <CardHeader className="pb-3">
                    <h3 className="font-semibold text-gray-900">Quick Facts</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Dates</p>
                        <p className="text-sm text-gray-500">{camp.dates}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Location</p>
                        <p className="text-sm text-gray-500">{camp.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Group Size</p>
                        <p className="text-sm text-gray-500">Max {camp.maxVolunteers} volunteers</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Participation Fee</p>
                        <p className="text-sm text-gray-500">{camp.fees}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Tent className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Age Range</p>
                        <p className="text-sm text-gray-500">{camp.ageRange === "18-99" ? "18+" : camp.ageRange}</p>
                      </div>
                    </div>
                    {camp.theme && (
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-800 mb-1">Theme</p>
                        <p className="text-sm text-gray-500">{camp.theme}</p>
                      </div>
                    )}

                    <div className="pt-3 space-y-2">
                      <Link href="/apply" className="block">
                        <Button className="w-full" data-testid="button-apply">
                          Apply Now <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                      <Link href="/contact" className="block">
                        <Button variant="outline" className="w-full border-primary text-primary" data-testid="button-inquire">
                          Make Inquiry
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">Important Notes</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="border border-gray-100">
                <CardContent className="pt-5 text-sm text-gray-600 space-y-2">
                  <p className="font-medium text-gray-800">Before Arrival</p>
                  <p>All volunteers attend a 1-2 day orientation at Nairobi South YMCA covering cultural preparation, project briefing, and Swahili basics.</p>
                </CardContent>
              </Card>
              <Card className="border border-gray-100">
                <CardContent className="pt-5 text-sm text-gray-600 space-y-2">
                  <p className="font-medium text-gray-800">What's Included</p>
                  <p>Accommodation, meals, project materials, local transportation, and KVDA coordination. International travel, visa, and insurance are the volunteer's responsibility.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
