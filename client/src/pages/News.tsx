import { useNews } from "@/hooks/use-content";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

export default function NewsPage() {
  const { data: newsItems, isLoading } = useNews();

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading news...</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="container px-4">
        <SectionHeader 
          title="News & Updates" 
          subtitle="Stay updated with our latest activities, success stories, and upcoming events."
        />

        <div className="max-w-4xl mx-auto space-y-12">
          {newsItems?.map((item) => (
            <Card key={item.id} className="overflow-hidden border-none shadow-md">
              <div className="md:flex">
                <div className="md:w-2/5 h-64 md:h-auto relative">
                   <img 
                      src={item.imageUrl || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop"} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                </div>
                <CardContent className="md:w-3/5 p-8 flex flex-col justify-center">
                  <div className="text-sm font-semibold text-accent mb-2">
                    {item.publishedAt ? format(new Date(item.publishedAt), 'MMMM dd, yyyy') : 'Recently Published'}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">{item.title}</h3>
                  <div className="prose prose-sm text-muted-foreground max-w-none">
                    <p className="whitespace-pre-line">{item.content}</p>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
