import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { GalleryPhoto } from "@shared/schema";
import {
  Camera, Plus, Trash2, X, ZoomIn, ChevronLeft, ChevronRight, Grid3X3
} from "lucide-react";

const categories = [
  "Workcamps",
  "Community Projects",
  "Cultural Exchange",
  "Environment",
  "Education",
  "Health",
  "Events",
  "Team",
];

export default function Gallery() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ title: "", description: "", imageUrl: "", category: "" });

  const { data: photos = [], isLoading } = useQuery<GalleryPhoto[]>({
    queryKey: ["/api/gallery"],
  });

  const { data: user } = useQuery<any>({ queryKey: ["/api/auth/user"] });
  const isAdmin = !!user;

  const addPhotoMutation = useMutation({
    mutationFn: async (data: typeof newPhoto) => {
      return apiRequest("POST", "/api/gallery", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      setShowAddForm(false);
      setNewPhoto({ title: "", description: "", imageUrl: "", category: "" });
      toast({ title: "Photo added successfully" });
    },
    onError: () => {
      toast({ title: "Failed to add photo", variant: "destructive" });
    },
  });

  const deletePhotoMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/gallery/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "Photo deleted" });
    },
  });

  const filteredPhotos = selectedCategory === "all"
    ? photos
    : photos.filter((p) => p.category === selectedCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextPhoto = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };
  const prevPhoto = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <div className="min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80"
            alt="KVDA Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary font-medium tracking-widest text-xs uppercase">Our Memories</span>
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6" data-testid="text-page-title">
              Photo <span className="text-primary italic font-normal">Gallery</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              Explore moments captured across our volunteer programs, community projects, and cultural exchanges across Kenya.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                data-testid="button-filter-all"
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat)}
                  data-testid={`button-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {cat}
                </Button>
              ))}
            </div>

            {isAdmin && (
              <Button onClick={() => setShowAddForm(true)} data-testid="button-add-photo">
                <Plus className="w-4 h-4 mr-2" />
                Add Photo
              </Button>
            )}
          </div>

          {showAddForm && isAdmin && (
            <Card className="mb-10 border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Add New Photo</h3>
                  <Button size="icon" variant="ghost" onClick={() => setShowAddForm(false)} data-testid="button-close-add-form">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Photo title"
                    value={newPhoto.title}
                    onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                    data-testid="input-photo-title"
                  />
                  <Select onValueChange={(v) => setNewPhoto({ ...newPhoto, category: v })}>
                    <SelectTrigger data-testid="select-photo-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Image URL"
                    value={newPhoto.imageUrl}
                    onChange={(e) => setNewPhoto({ ...newPhoto, imageUrl: e.target.value })}
                    className="md:col-span-2"
                    data-testid="input-photo-url"
                  />
                  <Textarea
                    placeholder="Description (optional)"
                    value={newPhoto.description}
                    onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                    className="md:col-span-2"
                    data-testid="input-photo-description"
                  />
                  <div className="md:col-span-2">
                    <Button
                      onClick={() => addPhotoMutation.mutate(newPhoto)}
                      disabled={!newPhoto.title || !newPhoto.imageUrl || addPhotoMutation.isPending}
                      data-testid="button-submit-photo"
                    >
                      {addPhotoMutation.isPending ? "Adding..." : "Add Photo"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-md animate-pulse" />
              ))}
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-500 mb-2">No photos yet</h3>
              <p className="text-gray-400">
                {selectedCategory !== "all" ? "No photos in this category." : "Photos will appear here once added."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="group relative aspect-square rounded-md overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(index)}
                  data-testid={`card-gallery-photo-${photo.id}`}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end">
                    <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full">
                      <p className="font-medium text-sm truncate">{photo.title}</p>
                      {photo.category && (
                        <p className="text-xs text-zinc-300 mt-1">{photo.category}</p>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-1">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ZoomIn className="w-4 h-4 text-white" />
                      </div>
                      {isAdmin && (
                        <button
                          className="w-8 h-8 bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePhotoMutation.mutate(photo.id);
                          }}
                          data-testid={`button-delete-photo-${photo.id}`}
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white z-50"
            onClick={closeLightbox}
            data-testid="button-close-lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white z-50"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            data-testid="button-lightbox-prev"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white z-50"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            data-testid="button-lightbox-next"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          <div className="max-w-5xl max-h-[85vh] px-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={filteredPhotos[lightboxIndex].imageUrl}
              alt={filteredPhotos[lightboxIndex].title}
              className="max-w-full max-h-[75vh] object-contain mx-auto"
              data-testid="img-lightbox"
            />
            <div className="text-center mt-4">
              <p className="text-white font-medium">{filteredPhotos[lightboxIndex].title}</p>
              {filteredPhotos[lightboxIndex].description && (
                <p className="text-zinc-400 text-sm mt-1">{filteredPhotos[lightboxIndex].description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
