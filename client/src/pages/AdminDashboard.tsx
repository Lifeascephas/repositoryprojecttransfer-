import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient, getQueryFn } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Users, Eye, Calendar, Mail, Phone, FileText,
  User, Globe, Heart, ChevronLeft, Loader2, LogIn,
  Plus, Pencil, Trash2, X, Save, Shield, UserCheck, ClipboardList
} from "lucide-react";
import type { VolunteerApplication, TeamMember, BoardMember } from "@shared/schema";

type AdminTab = "applications" | "team" | "board";

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

function TeamMemberForm({ member, onSave, onCancel }: {
  member?: TeamMember;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(member?.name || "");
  const [role, setRole] = useState(member?.role || "");
  const [email, setEmail] = useState(member?.email || "");
  const [phone, setPhone] = useState(member?.phone || "");
  const [imageUrl, setImageUrl] = useState(member?.imageUrl || "");
  const [order, setOrder] = useState(member?.order?.toString() || "0");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, role, email: email || null, phone: phone || null, imageUrl: imageUrl || null, order: parseInt(order) || 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="tm-name" className="text-gray-700 text-sm">Name *</Label>
          <Input id="tm-name" value={name} onChange={e => setName(e.target.value)} required className="mt-1" data-testid="input-team-name" />
        </div>
        <div>
          <Label htmlFor="tm-role" className="text-gray-700 text-sm">Role *</Label>
          <Input id="tm-role" value={role} onChange={e => setRole(e.target.value)} required className="mt-1" data-testid="input-team-role" />
        </div>
        <div>
          <Label htmlFor="tm-email" className="text-gray-700 text-sm">Email</Label>
          <Input id="tm-email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1" data-testid="input-team-email" />
        </div>
        <div>
          <Label htmlFor="tm-phone" className="text-gray-700 text-sm">Phone</Label>
          <Input id="tm-phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1" data-testid="input-team-phone" />
        </div>
        <div>
          <Label htmlFor="tm-image" className="text-gray-700 text-sm">Image URL</Label>
          <Input id="tm-image" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="mt-1" placeholder="https://..." data-testid="input-team-image" />
        </div>
        <div>
          <Label htmlFor="tm-order" className="text-gray-700 text-sm">Display Order</Label>
          <Input id="tm-order" type="number" value={order} onChange={e => setOrder(e.target.value)} className="mt-1" data-testid="input-team-order" />
        </div>
      </div>
      <div className="flex gap-3 justify-end pt-2">
        <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel-team">Cancel</Button>
        <Button type="submit" className="bg-primary text-white" data-testid="button-save-team">
          <Save className="w-4 h-4 mr-2" /> {member ? "Update" : "Add"} Team Member
        </Button>
      </div>
    </form>
  );
}

function BoardMemberForm({ member, onSave, onCancel }: {
  member?: BoardMember;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(member?.name || "");
  const [position, setPosition] = useState(member?.position || "");
  const [imageUrl, setImageUrl] = useState(member?.imageUrl || "");
  const [order, setOrder] = useState(member?.order?.toString() || "0");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, position, imageUrl: imageUrl || null, order: parseInt(order) || 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bm-name" className="text-gray-700 text-sm">Name *</Label>
          <Input id="bm-name" value={name} onChange={e => setName(e.target.value)} required className="mt-1" data-testid="input-board-name" />
        </div>
        <div>
          <Label htmlFor="bm-position" className="text-gray-700 text-sm">Position *</Label>
          <Input id="bm-position" value={position} onChange={e => setPosition(e.target.value)} required className="mt-1" data-testid="input-board-position" />
        </div>
        <div>
          <Label htmlFor="bm-image" className="text-gray-700 text-sm">Image URL</Label>
          <Input id="bm-image" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="mt-1" placeholder="https://..." data-testid="input-board-image" />
        </div>
        <div>
          <Label htmlFor="bm-order" className="text-gray-700 text-sm">Display Order</Label>
          <Input id="bm-order" type="number" value={order} onChange={e => setOrder(e.target.value)} className="mt-1" data-testid="input-board-order" />
        </div>
      </div>
      <div className="flex gap-3 justify-end pt-2">
        <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel-board">Cancel</Button>
        <Button type="submit" className="bg-primary text-white" data-testid="button-save-board">
          <Save className="w-4 h-4 mr-2" /> {member ? "Update" : "Add"} Board Member
        </Button>
      </div>
    </form>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("team");
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);
  const [editingBoard, setEditingBoard] = useState<BoardMember | null>(null);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showBoardForm, setShowBoardForm] = useState(false);
  const { toast } = useToast();

  const { data: applications, isLoading: appsLoading } = useQuery<VolunteerApplication[] | null>({
    queryKey: ["/api/volunteer-applications"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const { data: teamMembers, isLoading: teamLoading } = useQuery<TeamMember[] | null>({
    queryKey: ["/api/team-members"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const { data: boardMembers, isLoading: boardLoading } = useQuery<BoardMember[] | null>({
    queryKey: ["/api/board-members"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const isLoading = appsLoading || teamLoading || boardLoading;
  const isNotAuthenticated = !isLoading && applications === null;

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/volunteer-applications/${id}/status`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/volunteer-applications"] });
      toast({ title: "Status updated" });
    },
  });

  const createTeamMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/team-members", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team-members"] });
      setShowTeamForm(false);
      toast({ title: "Team member added" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const updateTeamMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await apiRequest("PATCH", `/api/team-members/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team-members"] });
      setEditingTeam(null);
      toast({ title: "Team member updated" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const deleteTeamMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/team-members/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team-members"] });
      toast({ title: "Team member removed" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const createBoardMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/board-members", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/board-members"] });
      setShowBoardForm(false);
      toast({ title: "Board member added" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const updateBoardMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await apiRequest("PATCH", `/api/board-members/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/board-members"] });
      setEditingBoard(null);
      toast({ title: "Board member updated" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const deleteBoardMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/board-members/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/board-members"] });
      toast({ title: "Board member removed" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  if (!isLoading && isNotAuthenticated) {
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
            <p className="text-gray-600 mb-8">You need to be logged in to access the admin dashboard.</p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white" data-testid="button-admin-login">
              <a href="/api/login">Log In with Replit</a>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  const filtered = applications
    ? filterStatus === "all"
      ? applications
      : (applications as VolunteerApplication[]).filter((a) => a.status === filterStatus)
    : [];

  const selectedApp = selectedAppId
    ? (applications as VolunteerApplication[])?.find((a) => a.id === selectedAppId)
    : null;

  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80" alt="Admin" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="container px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary font-medium tracking-widest text-xs uppercase">Dashboard</span>
            <h1 className="text-4xl md:text-5xl font-display font-light text-white mt-4" data-testid="text-page-title">
              Admin <span className="text-primary italic font-normal">Panel</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container px-4">
          <div className="flex flex-wrap gap-3 mb-8 border-b border-gray-200 pb-4">
            {([
              { key: "team" as AdminTab, label: "Team Members", icon: Users },
              { key: "board" as AdminTab, label: "Board Members", icon: Shield },
              { key: "applications" as AdminTab, label: "Volunteer Applications", icon: ClipboardList },
            ]).map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={activeTab === key ? "default" : "outline"}
                className={activeTab === key ? "bg-primary text-white" : ""}
                onClick={() => { setActiveTab(key); setSelectedAppId(null); }}
                data-testid={`button-tab-${key}`}
              >
                <Icon className="w-4 h-4 mr-2" /> {label}
              </Button>
            ))}
          </div>

          {activeTab === "team" && (
            <div>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2 className="text-2xl font-display font-medium text-gray-900">Team Members</h2>
                {!showTeamForm && !editingTeam && (
                  <Button className="bg-primary text-white" onClick={() => setShowTeamForm(true)} data-testid="button-add-team">
                    <Plus className="w-4 h-4 mr-2" /> Add Team Member
                  </Button>
                )}
              </div>

              {(showTeamForm || editingTeam) && (
                <Card className="mb-8 border border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {editingTeam ? "Edit Team Member" : "Add New Team Member"}
                    </h3>
                    <TeamMemberForm
                      member={editingTeam || undefined}
                      onSave={(data) => {
                        if (editingTeam) {
                          updateTeamMutation.mutate({ id: editingTeam.id, data });
                        } else {
                          createTeamMutation.mutate(data);
                        }
                      }}
                      onCancel={() => { setShowTeamForm(false); setEditingTeam(null); }}
                    />
                  </CardContent>
                </Card>
              )}

              {teamLoading ? (
                <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
              ) : (
                <div className="space-y-3">
                  {(teamMembers as TeamMember[] || []).map((member) => (
                    <Card key={member.id} className="border border-gray-100" data-testid={`card-admin-team-${member.id}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={member.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"}
                            alt={member.name}
                            className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-200 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900" data-testid={`text-admin-team-name-${member.id}`}>{member.name}</h4>
                            <p className="text-primary text-sm">{member.role}</p>
                            <div className="flex flex-wrap gap-3 mt-1 text-gray-500 text-xs">
                              {member.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{member.email}</span>}
                              {member.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{member.phone}</span>}
                            </div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => { setEditingTeam(member); setShowTeamForm(false); }}
                              data-testid={`button-edit-team-${member.id}`}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              className="text-red-600 border-red-200"
                              onClick={() => { if (confirm("Remove this team member?")) deleteTeamMutation.mutate(member.id); }}
                              data-testid={`button-delete-team-${member.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {(teamMembers as TeamMember[] || []).length === 0 && (
                    <p className="text-gray-500 text-center py-8">No team members yet. Add your first one above.</p>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "board" && (
            <div>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2 className="text-2xl font-display font-medium text-gray-900">Board of Directors</h2>
                {!showBoardForm && !editingBoard && (
                  <Button className="bg-primary text-white" onClick={() => setShowBoardForm(true)} data-testid="button-add-board">
                    <Plus className="w-4 h-4 mr-2" /> Add Board Member
                  </Button>
                )}
              </div>

              {(showBoardForm || editingBoard) && (
                <Card className="mb-8 border border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {editingBoard ? "Edit Board Member" : "Add New Board Member"}
                    </h3>
                    <BoardMemberForm
                      member={editingBoard || undefined}
                      onSave={(data) => {
                        if (editingBoard) {
                          updateBoardMutation.mutate({ id: editingBoard.id, data });
                        } else {
                          createBoardMutation.mutate(data);
                        }
                      }}
                      onCancel={() => { setShowBoardForm(false); setEditingBoard(null); }}
                    />
                  </CardContent>
                </Card>
              )}

              {boardLoading ? (
                <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {(boardMembers as BoardMember[] || []).map((member) => (
                    <Card key={member.id} className="border border-gray-100 overflow-hidden" data-testid={`card-admin-board-${member.id}`}>
                      <div className="h-44 overflow-hidden">
                        <img
                          src={member.imageUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-medium text-gray-900 text-sm" data-testid={`text-admin-board-name-${member.id}`}>{member.name}</h4>
                        <p className="text-primary text-xs mt-1">{member.position}</p>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => { setEditingBoard(member); setShowBoardForm(false); }}
                            data-testid={`button-edit-board-${member.id}`}
                          >
                            <Pencil className="w-3 h-3 mr-1" /> Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200"
                            onClick={() => { if (confirm("Remove this board member?")) deleteBoardMutation.mutate(member.id); }}
                            data-testid={`button-delete-board-${member.id}`}
                          >
                            <Trash2 className="w-3 h-3 mr-1" /> Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {(boardMembers as BoardMember[] || []).length === 0 && (
                    <p className="text-gray-500 text-center py-8 col-span-full">No board members yet. Add your first one above.</p>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "applications" && !selectedApp && (
            <div>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2 className="text-2xl font-display font-medium text-gray-900">Volunteer Applications</h2>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40" data-testid="select-filter-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {appsLoading ? (
                <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((app) => (
                    <Card key={app.id} className="border border-gray-100" data-testid={`card-application-${app.id}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{app.firstName} {app.lastName}</h4>
                              <div className="flex flex-wrap gap-3 text-gray-500 text-xs mt-1">
                                <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{app.email}</span>
                                <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{app.nationality}</span>
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(app.createdAt!).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={`${statusColors[app.status || "pending"]} no-default-hover-elevate no-default-active-elevate`}>
                              {app.status || "pending"}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedAppId(app.id)}
                              data-testid={`button-view-app-${app.id}`}
                            >
                              <Eye className="w-3 h-3 mr-1" /> View
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {filtered.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No applications found.</p>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "applications" && selectedApp && (
            <div>
              <Button variant="outline" onClick={() => setSelectedAppId(null)} className="mb-6" data-testid="button-back-to-list">
                <ChevronLeft className="w-4 h-4 mr-2" /> Back to List
              </Button>

              <Card className="border border-gray-100">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
                    <div>
                      <h2 className="text-2xl font-display font-medium text-gray-900">
                        {selectedApp.firstName} {selectedApp.lastName}
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">Applied {new Date(selectedApp.createdAt!).toLocaleDateString()}</p>
                    </div>
                    <Select
                      value={selectedApp.status || "pending"}
                      onValueChange={(val) => statusMutation.mutate({ id: selectedApp.id, status: val })}
                    >
                      <SelectTrigger className="w-36" data-testid="select-update-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Personal Information</h3>
                      <div className="space-y-3 text-sm">
                        <div><span className="text-gray-500">Date of Birth:</span> <span className="text-gray-900 ml-2">{selectedApp.dateOfBirth}</span></div>
                        <div><span className="text-gray-500">Gender:</span> <span className="text-gray-900 ml-2">{selectedApp.gender}</span></div>
                        <div><span className="text-gray-500">Nationality:</span> <span className="text-gray-900 ml-2">{selectedApp.nationality}</span></div>
                        {selectedApp.passportNumber && <div><span className="text-gray-500">Passport:</span> <span className="text-gray-900 ml-2">{selectedApp.passportNumber}</span></div>}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Contact Details</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /><span className="text-gray-900">{selectedApp.email}</span></div>
                        <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /><span className="text-gray-900">{selectedApp.phone}</span></div>
                        <div><span className="text-gray-500">Address:</span> <span className="text-gray-900 ml-2">{selectedApp.address}, {selectedApp.city}, {selectedApp.country}</span></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Emergency Contact</h3>
                      <div className="space-y-3 text-sm">
                        <div><span className="text-gray-500">Name:</span> <span className="text-gray-900 ml-2">{selectedApp.emergencyContactName}</span></div>
                        <div><span className="text-gray-500">Phone:</span> <span className="text-gray-900 ml-2">{selectedApp.emergencyContactPhone}</span></div>
                        <div><span className="text-gray-500">Relation:</span> <span className="text-gray-900 ml-2">{selectedApp.emergencyContactRelation}</span></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Program Preferences</h3>
                      <div className="space-y-3 text-sm">
                        <div><span className="text-gray-500">Type:</span> <span className="text-gray-900 ml-2">{programLabels[selectedApp.programType] || selectedApp.programType}</span></div>
                        {selectedApp.preferredProject && <div><span className="text-gray-500">Project:</span> <span className="text-gray-900 ml-2">{selectedApp.preferredProject}</span></div>}
                        {selectedApp.preferredStartDate && <div><span className="text-gray-500">Start Date:</span> <span className="text-gray-900 ml-2">{selectedApp.preferredStartDate}</span></div>}
                        {selectedApp.preferredDuration && <div><span className="text-gray-500">Duration:</span> <span className="text-gray-900 ml-2">{selectedApp.preferredDuration}</span></div>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Motivation & Skills</h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <span className="text-gray-500 block mb-1">Motivation:</span>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{selectedApp.motivation}</p>
                      </div>
                      {selectedApp.skills && <div><span className="text-gray-500">Skills:</span> <span className="text-gray-900 ml-2">{selectedApp.skills}</span></div>}
                      {selectedApp.languages && <div><span className="text-gray-500">Languages:</span> <span className="text-gray-900 ml-2">{selectedApp.languages}</span></div>}
                      {selectedApp.healthConditions && <div><span className="text-gray-500">Health Conditions:</span> <span className="text-gray-900 ml-2">{selectedApp.healthConditions}</span></div>}
                      {selectedApp.dietaryRequirements && <div><span className="text-gray-500">Dietary:</span> <span className="text-gray-900 ml-2">{selectedApp.dietaryRequirements}</span></div>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
