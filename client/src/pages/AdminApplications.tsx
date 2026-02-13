import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient, getQueryFn } from "@/lib/queryClient";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Users, Eye, Calendar, Mail, Phone, FileText,
  User, Globe, Heart, ChevronLeft, Loader2, LogIn
} from "lucide-react";
import type { VolunteerApplication } from "@shared/schema";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  reviewed: "bg-blue-100 text-blue-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const programLabels: Record<string, string> = {
  short_term: "Short-Term Workcamps",
  long_term: "Medium / Long-Term",
  outbound: "Outbound Volunteering",
  educational: "Educational Tours",
};

export default function AdminApplications() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const { data: applications, isLoading, error } = useQuery<VolunteerApplication[] | null>({
    queryKey: ["/api/volunteer-applications"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/volunteer-applications/${id}/status`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/volunteer-applications"] });
    },
  });

  const filtered = applications
    ? filterStatus === "all"
      ? applications
      : (applications as VolunteerApplication[]).filter((a) => a.status === filterStatus)
    : [];

  const selected = selectedId
    ? (applications as VolunteerApplication[])?.find((a) => a.id === selectedId)
    : null;

  if (!isLoading && applications === null) {
    return (
      <div className="min-h-screen">
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80" alt="Admin" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/80" />
          </div>
          <div className="container px-4 relative z-10">
            <h1 className="text-4xl font-display font-light text-white" data-testid="text-page-title">Admin Access Required</h1>
          </div>
        </section>
        <section className="py-24 bg-white">
          <div className="container px-4 max-w-md text-center">
            <LogIn className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Login Required</h2>
            <p className="text-gray-600 mb-8">You need to be logged in to access the admin dashboard and view volunteer applications.</p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white" data-testid="button-admin-login">
              <a href="/api/login">Log In with Replit</a>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="min-h-screen">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80" alt="Admin" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/80" />
          </div>
          <div className="container px-4 relative z-10">
            <h1 className="text-4xl font-display font-light text-white" data-testid="text-page-title">Application Details</h1>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container px-4 max-w-4xl">
            <Button variant="outline" onClick={() => setSelectedId(null)} className="mb-6" data-testid="button-back-to-list">
              <ChevronLeft className="w-4 h-4 mr-2" /> Back to Applications
            </Button>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <h2 className="text-2xl font-medium text-gray-900">{selected.firstName} {selected.lastName}</h2>
              <Badge className={`${statusColors[selected.status || "pending"]} no-default-hover-elevate no-default-active-elevate`} data-testid="badge-status">
                {selected.status?.toUpperCase()}
              </Badge>
              <div className="ml-auto flex gap-2">
                <Select value={selected.status || "pending"} onValueChange={(v) => statusMutation.mutate({ id: selected.id, status: v })}>
                  <SelectTrigger className="w-[160px]" data-testid="select-update-status"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6">
              <Card className="border border-gray-100 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-5 h-5 text-primary" />
                    <h3 className="font-medium text-gray-900">Personal Information</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div><span className="text-gray-500">Full Name:</span> <p className="text-gray-900 font-medium">{selected.firstName} {selected.lastName}</p></div>
                    <div><span className="text-gray-500">Date of Birth:</span> <p className="text-gray-900">{selected.dateOfBirth}</p></div>
                    <div><span className="text-gray-500">Gender:</span> <p className="text-gray-900 capitalize">{selected.gender}</p></div>
                    <div><span className="text-gray-500">Nationality:</span> <p className="text-gray-900">{selected.nationality}</p></div>
                    <div><span className="text-gray-500">Passport:</span> <p className="text-gray-900">{selected.passportNumber || "Not provided"}</p></div>
                    <div><span className="text-gray-500">Applied:</span> <p className="text-gray-900">{selected.createdAt ? new Date(selected.createdAt).toLocaleDateString() : "N/A"}</p></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-100 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="w-5 h-5 text-primary" />
                    <h3 className="font-medium text-gray-900">Contact Information</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-500">Email:</span> <p className="text-gray-900">{selected.email}</p></div>
                    <div><span className="text-gray-500">Phone:</span> <p className="text-gray-900">{selected.phone}</p></div>
                    <div className="md:col-span-2"><span className="text-gray-500">Address:</span> <p className="text-gray-900">{selected.address}, {selected.city}, {selected.country}</p></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-100 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Phone className="w-5 h-5 text-primary" />
                    <h3 className="font-medium text-gray-900">Emergency Contact</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div><span className="text-gray-500">Name:</span> <p className="text-gray-900">{selected.emergencyContactName}</p></div>
                    <div><span className="text-gray-500">Phone:</span> <p className="text-gray-900">{selected.emergencyContactPhone}</p></div>
                    <div><span className="text-gray-500">Relationship:</span> <p className="text-gray-900">{selected.emergencyContactRelation}</p></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-100 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="font-medium text-gray-900">Program Preferences</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-500">Program Type:</span> <p className="text-gray-900">{programLabels[selected.programType] || selected.programType}</p></div>
                    <div><span className="text-gray-500">Preferred Project:</span> <p className="text-gray-900">{selected.preferredProject || "Not specified"}</p></div>
                    <div><span className="text-gray-500">Start Date:</span> <p className="text-gray-900">{selected.preferredStartDate || "Flexible"}</p></div>
                    <div><span className="text-gray-500">Duration:</span> <p className="text-gray-900">{selected.preferredDuration || "Not specified"}</p></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-100 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-5 h-5 text-primary" />
                    <h3 className="font-medium text-gray-900">Skills, Motivation & Health</h3>
                  </div>
                  <div className="grid gap-4 text-sm">
                    <div><span className="text-gray-500">Skills:</span> <p className="text-gray-900">{selected.skills || "Not provided"}</p></div>
                    <div><span className="text-gray-500">Languages:</span> <p className="text-gray-900">{selected.languages || "Not provided"}</p></div>
                    <div><span className="text-gray-500">Motivation:</span> <p className="text-gray-900 leading-relaxed">{selected.motivation}</p></div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div><span className="text-gray-500">Health Conditions:</span> <p className="text-gray-900">{selected.healthConditions || "None"}</p></div>
                      <div><span className="text-gray-500">Dietary Requirements:</span> <p className="text-gray-900">{selected.dietaryRequirements || "None"}</p></div>
                    </div>
                    <div><span className="text-gray-500">How did they hear about KVDA:</span> <p className="text-gray-900 capitalize">{selected.howDidYouHear?.replace(/_/g, " ") || "Not specified"}</p></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80" alt="Admin" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="container px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-primary font-medium tracking-widest text-xs uppercase">Admin Panel</span>
            <h1 className="text-4xl md:text-5xl font-display font-light text-white mt-4 mb-4" data-testid="text-page-title">
              Volunteer <span className="text-primary italic font-normal">Applications</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light">Review and manage all volunteer exchange form submissions.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container px-4">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-medium text-gray-900">
                {filtered.length} Application{filtered.length !== 1 ? "s" : ""}
              </h2>
            </div>
            <div className="ml-auto">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[160px]" data-testid="select-filter-status"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <Card className="border border-gray-100 shadow-sm">
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Found</h3>
                <p className="text-gray-500">No volunteer applications have been submitted yet{filterStatus !== "all" ? ` with "${filterStatus}" status` : ""}.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {(filtered as VolunteerApplication[]).map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.015 }}
                >
                  <Card className="border border-gray-100 shadow-sm hover-elevate cursor-pointer" onClick={() => setSelectedId(app.id)} data-testid={`card-application-${app.id}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-[200px]">
                          <h3 className="font-medium text-gray-900" data-testid={`text-applicant-name-${app.id}`}>{app.firstName} {app.lastName}</h3>
                          <p className="text-sm text-gray-500">{app.email}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <Badge className={`${statusColors[app.status || "pending"]} no-default-hover-elevate no-default-active-elevate text-xs`}>
                            {app.status?.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Globe className="w-3 h-3" /> {app.nationality}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <FileText className="w-3 h-3" /> {programLabels[app.programType] || app.programType}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}
                          </span>
                          <Button size="sm" variant="outline" className="ml-2" data-testid={`button-view-${app.id}`}>
                            <Eye className="w-4 h-4 mr-1" /> View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
