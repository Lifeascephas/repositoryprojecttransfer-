import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema } from "@shared/routes";
import { useCreateInquiry } from "@/hooks/use-content";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export default function Contact() {
  const createInquiry = useCreateInquiry();
  
  const form = useForm<z.infer<typeof insertInquirySchema>>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof insertInquirySchema>) {
    createInquiry.mutate(data, {
      onSuccess: () => form.reset()
    });
  }

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="container px-4">
        <SectionHeader 
          title="Contact Us" 
          subtitle="Have questions about volunteering or want to partner with us? Reach out today."
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid gap-6">
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-primary/5">
                <CardContent className="flex items-start p-6 space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Visit Our Office</h3>
                    <p className="text-muted-foreground">Kwarara Road, Karen<br/>Nairobi, Kenya</p>
                    <p className="text-sm text-muted-foreground mt-2">P.O. Box 48902-00100</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-accent/5">
                <CardContent className="flex items-start p-6 space-x-4">
                  <Mail className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email Us</h3>
                    <p className="text-muted-foreground">info@kvdakenya.org</p>
                    <p className="text-sm text-muted-foreground mt-1">We respond within 24 hours</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-muted/50">
                <CardContent className="flex items-start p-6 space-x-4">
                  <Phone className="h-6 w-6 text-foreground mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Call Us</h3>
                    <p className="text-muted-foreground">+254-721650357</p>
                    <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 8am - 5pm EAT</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* How to Volunteer Steps */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border mt-8">
              <h3 className="font-display font-bold text-xl mb-6">How to Volunteer</h3>
              <ol className="relative border-l border-muted ml-3 space-y-8">
                <li className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full -left-4 ring-4 ring-white">
                    <span className="text-primary font-bold text-sm">1</span>
                  </span>
                  <h4 className="font-semibold text-lg mb-1">Choose a Program</h4>
                  <p className="text-sm text-muted-foreground">Browse our Short-term, Long-term, or Educational tour programs.</p>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full -left-4 ring-4 ring-white">
                    <span className="text-primary font-bold text-sm">2</span>
                  </span>
                  <h4 className="font-semibold text-lg mb-1">Send an Inquiry</h4>
                  <p className="text-sm text-muted-foreground">Use the form on this page to express your interest. We'll send you the Volunteer Exchange Form (VEF).</p>
                </li>
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full -left-4 ring-4 ring-white">
                    <span className="text-primary font-bold text-sm">3</span>
                  </span>
                  <h4 className="font-semibold text-lg mb-1">Prepare & Travel</h4>
                  <p className="text-sm text-muted-foreground">Once accepted, we'll help with logistics, visa advice, and airport pickup arrangements.</p>
                </li>
              </ol>
            </div>
          </div>

          {/* Inquiry Form */}
          <Card className="border-none shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-display font-bold mb-6">Send a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="h-12 bg-muted/20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" className="h-12 bg-muted/20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Volunteering Inquiry" className="h-12 bg-muted/20" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your interest in volunteering..." 
                            className="min-h-[150px] bg-muted/20 resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90"
                    disabled={createInquiry.isPending}
                  >
                    {createInquiry.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
