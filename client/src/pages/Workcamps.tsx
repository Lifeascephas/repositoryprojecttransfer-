import { useState } from "react";
import { useWorkcamps } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, ChevronDown, ChevronUp, ArrowRight, DollarSign, Tent } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import type { Workcamp } from "@shared/schema";

const MONTHS = ["January", "February", "March", "June", "July", "August", "September", "October", "November"];

function WorkcampCard({ camp, index }: { camp: Workcamp; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <Card
        className="border border-gray-100 shadow-sm overflow-hidden"
        data-testid={`card-workcamp-${camp.id}`}
      >
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-72 h-48 lg:h-auto relative overflow-hidden shrink-0">
            <img
              src={camp.imageUrl || "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80"}
              alt={camp.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent lg:bg-gradient-to-t" />
            <Badge className="absolute top-3 left-3 bg-primary text-white border-0 text-xs">
              {camp.month}
            </Badge>
          </div>

          <div className="flex-1 p-5">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <p className="text-xs font-mono text-gray-400 mb-1" data-testid={`text-workcamp-code-${camp.id}`}>{camp.code}</p>
                <h3 className="text-lg font-semibold text-gray-900" data-testid={`text-workcamp-name-${camp.id}`}>
                  {camp.name}
                </h3>
              </div>
              <Badge variant="outline" className="text-xs shrink-0" data-testid={`text-workcamp-type-${camp.id}`}>
                {camp.type}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {camp.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                {camp.dates}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-primary" />
                Max {camp.maxVolunteers} volunteers
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-primary" />
                {camp.fees}
              </span>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {camp.description}
            </p>

            {expanded && (
              <div className="space-y-4 mb-4">
                <p className="text-sm text-gray-600">{camp.description}</p>
                {camp.activities && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">Activities</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {camp.activities.split(", ").map((activity, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1 shrink-0">-</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {camp.accommodation && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-1">
                      <Tent className="h-3.5 w-3.5" /> Accommodation
                    </h4>
                    <p className="text-sm text-gray-600">{camp.accommodation}</p>
                  </div>
                )}
                {camp.theme && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">Theme</h4>
                    <p className="text-sm text-gray-600">{camp.theme}</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(!expanded)}
                className="text-primary"
                data-testid={`button-expand-${camp.id}`}
              >
                {expanded ? (
                  <>Less Details <ChevronUp className="h-4 w-4 ml-1" /></>
                ) : (
                  <>More Details <ChevronDown className="h-4 w-4 ml-1" /></>
                )}
              </Button>
              <Link href={`/workcamps/${camp.id}`}>
                <Button size="sm" data-testid={`link-workcamp-detail-${camp.id}`}>
                  View Full Details <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link href="/apply">
                <Button variant="outline" size="sm" className="border-primary text-primary" data-testid={`link-apply-${camp.id}`}>
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function Workcamps() {
  const { data: workcamps, isLoading } = useWorkcamps();
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const sortedCamps = workcamps
    ? (workcamps as Workcamp[]).sort((a, b) => {
        const monthOrder = MONTHS;
        return monthOrder.indexOf(a.month || "") - monthOrder.indexOf(b.month || "");
      })
    : [];

  const filteredCamps = selectedMonth
    ? sortedCamps.filter((c) => c.month === selectedMonth)
    : sortedCamps;

  const availableMonths = Array.from(new Set(sortedCamps.map((c) => c.month))).filter(Boolean);

  if (isLoading) {
    return (
      <div className="py-20 text-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Loading workcamps...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80"
            alt="KVDA Workcamps"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary font-medium tracking-widest text-xs uppercase">January - December 2026</span>
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6" data-testid="text-page-title">
              KVDA <span className="text-primary italic font-normal">Workcamps</span> Program
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              Join our 2026 international volunteer workcamps across Kenya. Each 3-week program brings
              together up to 20 volunteers from around the world to work on community development projects.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-b">
        <div className="container px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {filteredCamps.length} Workcamp{filteredCamps.length !== 1 ? "s" : ""} Available
              </h2>
              <p className="text-sm text-gray-500">Participation fee: EUR 300 per workcamp</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedMonth === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMonth(null)}
                data-testid="button-filter-all"
              >
                All
              </Button>
              {availableMonths.map((month) => (
                <Button
                  key={month}
                  variant={selectedMonth === month ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMonth(month || null)}
                  data-testid={`button-filter-${month?.toLowerCase()}`}
                >
                  {month}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container px-4">
          <div className="space-y-6">
            {filteredCamps.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-md border border-gray-100">
                <h3 className="text-xl font-medium text-gray-700">No workcamps found for this month.</h3>
                <p className="mt-2 text-sm text-gray-500">Try selecting a different month or view all workcamps.</p>
              </div>
            ) : (
              filteredCamps.map((camp, index) => (
                <WorkcampCard key={camp.id} camp={camp} index={index} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6">General Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border border-gray-100">
                <CardHeader className="pb-2">
                  <h3 className="font-semibold text-gray-900">Participation Fee</h3>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>EUR 300 per workcamp. The fee covers accommodation, meals, project materials, local transportation, and administrative costs.</p>
                  <p>International travel, visa, and insurance are the responsibility of the volunteer.</p>
                </CardContent>
              </Card>
              <Card className="border border-gray-100">
                <CardHeader className="pb-2">
                  <h3 className="font-semibold text-gray-900">Orientation</h3>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>All volunteers attend a 1-2 day orientation at Nairobi South YMCA before traveling to project sites.</p>
                  <p>Orientation covers cultural preparation, project briefing, safety guidelines, and Swahili basics.</p>
                </CardContent>
              </Card>
              <Card className="border border-gray-100">
                <CardHeader className="pb-2">
                  <h3 className="font-semibold text-gray-900">Who Can Join</h3>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>Open to all nationalities, ages 18 and above. No special skills required - just motivation and willingness to contribute.</p>
                  <p>Maximum 20 volunteers per workcamp for quality group dynamics.</p>
                </CardContent>
              </Card>
              <Card className="border border-gray-100">
                <CardHeader className="pb-2">
                  <h3 className="font-semibold text-gray-900">How to Apply</h3>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>Apply through KVDA directly or through a partner organization in your country. Applications are accepted on a rolling basis.</p>
                  <Link href="/apply">
                    <Button size="sm" className="mt-2" data-testid="button-apply-cta">
                      Apply Online <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
