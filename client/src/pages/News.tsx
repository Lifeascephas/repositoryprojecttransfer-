import { useNews } from "@/hooks/use-content";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { motion } from "framer-motion";
import type { News } from "@shared/schema";

export default function NewsPage() {
  const { data: newsItems, isLoading } = useNews();

  if (isLoading) {
    return (
      <div className="py-20 text-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Loading news...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504711434969-e33886168d6c?auto=format&fit=crop&q=80"
            alt="KVDA News"
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
            <span className="text-primary font-medium tracking-widest text-xs uppercase">Stay Updated</span>
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6" data-testid="text-page-title">
              News & <span className="text-primary italic font-normal">Updates</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              Stay updated with our latest activities, success stories, and upcoming events.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto space-y-10">
            {(newsItems as News[])?.map((item: News, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.025 }}
              >
                <Card className="overflow-hidden border border-gray-100 shadow-sm" data-testid={`card-news-${item.id}`}>
                  <div className="md:flex">
                    <div className="md:w-2/5 h-64 md:h-auto relative">
                      <img
                        src={item.imageUrl || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="md:w-3/5 p-8 flex flex-col justify-center">
                      <div className="text-sm font-medium text-primary mb-2 uppercase tracking-wider" data-testid={`text-news-date-${item.id}`}>
                        {item.publishedAt ? format(new Date(item.publishedAt), 'MMMM dd, yyyy') : 'Recently Published'}
                      </div>
                      <h3 className="text-2xl font-display font-medium text-gray-900 mb-4" data-testid={`text-news-title-${item.id}`}>{item.title}</h3>
                      <p className="text-gray-600 font-light leading-relaxed whitespace-pre-line" data-testid={`text-news-content-${item.id}`}>{item.content}</p>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
