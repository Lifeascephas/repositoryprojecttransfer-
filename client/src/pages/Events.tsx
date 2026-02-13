import { useEvents } from "@/hooks/use-content";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin } from "lucide-react";
import type { Event } from "@shared/schema";

export default function Events() {
  const { data: events, isLoading } = useEvents();

  if (isLoading) {
    return (
      <div className="py-20 text-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80"
            alt="Events"
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
            <span className="text-primary font-medium tracking-widest text-xs uppercase">Stay Connected</span>
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6" data-testid="text-page-title">
              Events & <span className="text-primary italic font-normal">Activities</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              Join us at our upcoming events, orientations, training sessions, and celebrations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {(events as Event[])?.map((event, index) => (
              <div key={event.id}>
                <Card className="border border-gray-100 shadow-sm overflow-hidden h-full" data-testid={`card-event-${event.id}`}>
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={event.imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80"}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    {event.type && (
                      <span className="absolute top-4 right-4 bg-primary/90 text-white text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide" data-testid={`text-event-type-${event.id}`}>
                        {event.type}
                      </span>
                    )}
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-medium text-gray-900 mb-4" data-testid={`text-event-title-${event.id}`}>{event.title}</h3>
                    <div className="flex items-center gap-2 text-primary text-sm mb-2">
                      <CalendarDays className="h-4 w-4" />
                      <span data-testid={`text-event-date-${event.id}`}>{event.date}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                        <MapPin className="h-4 w-4" />
                        <span data-testid={`text-event-location-${event.id}`}>{event.location}</span>
                      </div>
                    )}
                    <p className="text-gray-600 font-light leading-relaxed" data-testid={`text-event-desc-${event.id}`}>{event.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
