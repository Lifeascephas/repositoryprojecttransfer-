import { useQuery, useMutation } from "@tanstack/react-query";
import { api, type InsertInquiry } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function usePrograms() {
  return useQuery({
    queryKey: [api.programs.list.path],
    queryFn: async () => {
      const res = await fetch(api.programs.list.path);
      if (!res.ok) throw new Error("Failed to fetch programs");
      return res.json();
    },
  });
}

export function useProgram(id: number) {
  return useQuery({
    queryKey: [api.programs.get.path, id],
    queryFn: async () => {
      const res = await fetch(api.programs.get.path.replace(":id", String(id)));
      if (res.status === 404) throw new Error("Program not found");
      if (!res.ok) throw new Error("Failed to fetch program");
      return res.json();
    },
    enabled: !!id,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: [api.projects.list.path],
    queryFn: async () => {
      const res = await fetch(api.projects.list.path);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  });
}

export function useNews() {
  return useQuery({
    queryKey: [api.news.list.path],
    queryFn: async () => {
      const res = await fetch(api.news.list.path);
      if (!res.ok) throw new Error("Failed to fetch news");
      return res.json();
    },
  });
}

export function useEvents() {
  return useQuery({
    queryKey: [api.events.list.path],
    queryFn: async () => {
      const res = await fetch(api.events.list.path);
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json();
    },
  });
}

export function useTeamMembers() {
  return useQuery({
    queryKey: [api.teamMembers.list.path],
    queryFn: async () => {
      const res = await fetch(api.teamMembers.list.path);
      if (!res.ok) throw new Error("Failed to fetch team members");
      return res.json();
    },
  });
}

export function useBoardMembers() {
  return useQuery({
    queryKey: [api.boardMembers.list.path],
    queryFn: async () => {
      const res = await fetch(api.boardMembers.list.path);
      if (!res.ok) throw new Error("Failed to fetch board members");
      return res.json();
    },
  });
}

export function usePartners() {
  return useQuery({
    queryKey: [api.partners.list.path],
    queryFn: async () => {
      const res = await fetch(api.partners.list.path);
      if (!res.ok) throw new Error("Failed to fetch partners");
      return res.json();
    },
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: [api.testimonials.list.path],
    queryFn: async () => {
      const res = await fetch(api.testimonials.list.path);
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    },
  });
}

export function useCreateInquiry() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: InsertInquiry) => {
      const validated = api.inquiries.create.input.parse(data);
      const res = await fetch(api.inquiries.create.path, {
        method: api.inquiries.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to send message");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We will get back to you shortly.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
