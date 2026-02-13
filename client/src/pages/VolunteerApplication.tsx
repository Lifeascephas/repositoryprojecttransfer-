import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { ArrowRight, CheckCircle2, User, MapPin, Phone, Heart, FileText } from "lucide-react";

export default function VolunteerApplication() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    passportNumber: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
    programType: "",
    preferredProject: "",
    preferredStartDate: "",
    preferredDuration: "",
    skills: "",
    languages: "",
    motivation: "",
    healthConditions: "",
    dietaryRequirements: "",
    howDidYouHear: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof form) => {
      const res = await apiRequest("POST", "/api/volunteer-applications", data);
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({ title: "Application Submitted", description: "Your volunteer application has been received. We will contact you soon." });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.dateOfBirth || !form.gender || !form.nationality || !form.email || !form.phone || !form.address || !form.city || !form.country || !form.emergencyContactName || !form.emergencyContactPhone || !form.emergencyContactRelation || !form.programType || !form.motivation) {
      toast({ title: "Missing Fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    mutation.mutate(form);
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80" alt="Volunteers" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/80" />
          </div>
          <div className="container px-4 relative z-10">
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6">Application Submitted</h1>
          </div>
        </section>
        <section className="py-24 bg-white">
          <div className="container px-4 max-w-2xl text-center">
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-display font-medium text-gray-900 mb-4">Thank You for Applying!</h2>
            <p className="text-gray-600 text-lg mb-8">Your Volunteer Exchange Form has been successfully submitted. Our team will review your application and contact you at <strong>{form.email}</strong> within 5-7 business days.</p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white" data-testid="link-back-home">
              <a href="/">Return to Home</a>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80" alt="Volunteers working together" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="container px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-primary font-medium tracking-widest text-xs uppercase">Volunteer Exchange Form</span>
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6" data-testid="text-page-title">
              Apply to <span className="text-primary italic font-normal">Volunteer</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              Complete the Volunteer Exchange Form (VEF) below to apply for any of KVDA's volunteer programs.
              All fields marked with * are required.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 max-w-4xl">
          <form onSubmit={handleSubmit}>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <Card className="border border-gray-100 shadow-sm mb-8">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-medium text-gray-900">Personal Information</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-gray-700 mb-2 block">First Name *</Label>
                      <Input value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} placeholder="Enter your first name" data-testid="input-first-name" />
                    </div>
                    <div>
                      <Label className="text-gray-700 mb-2 block">Last Name *</Label>
                      <Input value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} placeholder="Enter your last name" data-testid="input-last-name" />
                    </div>
                    <div>
                      <Label className="text-gray-700 mb-2 block">Date of Birth *</Label>
                      <Input type="date" value={form.dateOfBirth} onChange={(e) => updateField("dateOfBirth", e.target.value)} data-testid="input-dob" />
                    </div>
                    <div>
                      <Label className="text-gray-700 mb-2 block">Gender *</Label>
                      <Select value={form.gender} onValueChange={(v) => updateField("gender", v)}>
                        <SelectTrigger data-testid="select-gender"><SelectValue placeholder="Select gender" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-700 mb-2 block">Nationality *</Label>
                      <Input value={form.nationality} onChange={(e) => updateField("nationality", e.target.value)} placeholder="Enter your nationality" data-testid="input-nationality" />
                    </div>
                    <div>
                      <Label className="text-gray-700 mb-2 block">Passport Number</Label>
                      <Input value={form.passportNumber} onChange={(e) => updateField("passportNumber", e.target.value)} placeholder="Enter passport number" data-testid="input-passport" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <Card className="border border-gray-100 shadow-sm mb-8">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-medium text-gray-900">Contact & Address</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-gray-700 mb-2 block">Email Address *</Label>
                      <Input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="your@email.com" data-testid="input-email" />
                    </div>
                    <div>
                      <Label className="text-gray-700 mb-2 block">Phone Number *</Label>
                      <Input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+254..." data-testid="input-phone" />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-gray-700 mb-2 block">Street Address *</Label>
                      <Input value={form.address} onChange={(e) => updateField("address", e.target.value)} placeholder="Enter your address" data-testid="input-address" />
                    </div>
                    <div>
                      <Label className="text-gray-700 mb-2 block">City *</Label>
                      <Input value={form.city} onChange={(e) => updateField("city", e.target.value)} placeholder="Enter your city" data-testid="input-city" />
                    </div>
                    <div>
                      <Label className="text-gray-700 mb-2 block">Country *</Label>
                      <Input value={form.country} onChange={(e) => updateField("country", e.target.value)} placeholder="Enter your country" data-testid="input-country" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Card className="border border-gray-100 shadow-sm mb-8">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Phone className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-medium text-gray-900">Emergency Contact</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <Label className="text-gray-700 mb-2 block">Contact Name *</Label>
                      <Input value={form.emergencyContactName} onChange={(e) => updateField("emergencyContactName", e.target.value)} placeholder="Full name" data-testid="input-emergency-name" />
                    </div>
                    <div>
                      <Label className="text-gray-700 mb-2 block">Contact Phone *</Label>
                      <Input value={form.emergencyContactPhone} onChange={(e) => updateField("emergencyContactPhone", e.target.value)} placeholder="+254..." data-testid="input-emergency-phone" />
                    </div>
                    <div>
                      <Label className="text-gray-700 mb-2 block">Relationship *</Label>
                      <Input value={form.emergencyContactRelation} onChange={(e) => updateField("emergencyContactRelation", e.target.value)} placeholder="e.g. Parent, Spouse" data-testid="input-emergency-relation" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <Card className="border border-gray-100 shadow-sm mb-8">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <FileText className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-medium text-gray-900">Program Preferences</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-gray-700 mb-2 block">Program Type *</Label>
                      <Select value={form.programType} onValueChange={(v) => updateField("programType", v)}>
                        <SelectTrigger data-testid="select-program-type"><SelectValue placeholder="Select a program" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short_term">Short-Term Workcamps (2-3 weeks)</SelectItem>
                          <SelectItem value="long_term">Medium / Long-Term Volunteering (1-12 months)</SelectItem>
                          <SelectItem value="outbound">Outbound Volunteering (Kenyans abroad)</SelectItem>
                          <SelectItem value="educational">Educational Tours (1-4 weeks)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-700 mb-2 block">Preferred Project</Label>
                      <Input value={form.preferredProject} onChange={(e) => updateField("preferredProject", e.target.value)} placeholder="e.g. Health, Education, Environment" data-testid="input-preferred-project" />
                    </div>
                    <div>
                      <Label className="text-gray-700 mb-2 block">Preferred Start Date</Label>
                      <Input type="date" value={form.preferredStartDate} onChange={(e) => updateField("preferredStartDate", e.target.value)} data-testid="input-start-date" />
                    </div>
                    <div>
                      <Label className="text-gray-700 mb-2 block">Preferred Duration</Label>
                      <Input value={form.preferredDuration} onChange={(e) => updateField("preferredDuration", e.target.value)} placeholder="e.g. 3 weeks, 6 months" data-testid="input-duration" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Card className="border border-gray-100 shadow-sm mb-8">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Heart className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-medium text-gray-900">Skills, Experience & Health</h3>
                  </div>
                  <div className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gray-700 mb-2 block">Skills & Qualifications</Label>
                        <Input value={form.skills} onChange={(e) => updateField("skills", e.target.value)} placeholder="e.g. Teaching, Construction, First Aid" data-testid="input-skills" />
                      </div>
                      <div>
                        <Label className="text-gray-700 mb-2 block">Languages Spoken</Label>
                        <Input value={form.languages} onChange={(e) => updateField("languages", e.target.value)} placeholder="e.g. English, French, Swahili" data-testid="input-languages" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-700 mb-2 block">Motivation / Why do you want to volunteer with KVDA? *</Label>
                      <Textarea value={form.motivation} onChange={(e) => updateField("motivation", e.target.value)} placeholder="Tell us about your motivation for volunteering, what you hope to gain, and how you can contribute..." className="min-h-[120px]" data-testid="input-motivation" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gray-700 mb-2 block">Health Conditions</Label>
                        <Input value={form.healthConditions} onChange={(e) => updateField("healthConditions", e.target.value)} placeholder="Any allergies, medications, or conditions" data-testid="input-health" />
                      </div>
                      <div>
                        <Label className="text-gray-700 mb-2 block">Dietary Requirements</Label>
                        <Input value={form.dietaryRequirements} onChange={(e) => updateField("dietaryRequirements", e.target.value)} placeholder="e.g. Vegetarian, Vegan, Halal" data-testid="input-dietary" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-700 mb-2 block">How did you hear about KVDA?</Label>
                      <Select value={form.howDidYouHear} onValueChange={(v) => updateField("howDidYouHear", v)}>
                        <SelectTrigger data-testid="select-how-heard"><SelectValue placeholder="Select an option" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">KVDA Website</SelectItem>
                          <SelectItem value="partner">Partner Organization</SelectItem>
                          <SelectItem value="social_media">Social Media</SelectItem>
                          <SelectItem value="friend">Friend / Word of Mouth</SelectItem>
                          <SelectItem value="search_engine">Search Engine (Google)</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Card className="border border-gray-100 shadow-sm mb-8">
                <CardContent className="p-8">
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    By submitting this form, I confirm that the information provided is accurate and complete. I understand that KVDA will review my application and contact me regarding the next steps. I agree to abide by KVDA's code of conduct and volunteer guidelines during my placement.
                  </p>
                  <Button type="submit" size="lg" disabled={mutation.isPending} className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg" data-testid="button-submit-application">
                    {mutation.isPending ? "Submitting..." : "Submit Application"}
                    {!mutation.isPending && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
