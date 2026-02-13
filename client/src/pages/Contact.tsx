import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1596005554384-d293674c91d7?auto=format&fit=crop&q=80"
            alt="Contact KVDA"
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
            <span className="text-primary font-medium tracking-widest text-xs uppercase">Get in Touch</span>
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6" data-testid="text-page-title">
              Contact <span className="text-primary italic font-normal">Us</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              Have questions about volunteering or want to partner with us? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="grid gap-6">
                <Card className="border border-gray-100 shadow-sm">
                  <CardContent className="flex items-start p-6 gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-lg mb-1" data-testid="text-contact-address-title">Visit Our Office</h3>
                      <p className="text-gray-600 font-light text-sm">Kwarara Road, Karen<br />Nairobi, Kenya</p>
                      <p className="text-gray-500 text-xs mt-2">P.O. Box 48902-00100</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-100 shadow-sm">
                  <CardContent className="flex items-start p-6 gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-lg mb-1">Email Us</h3>
                      <p className="text-gray-600 font-light text-sm" data-testid="text-contact-email">info@kvdakenya.org</p>
                      <p className="text-gray-500 text-xs mt-1">We respond within 24 hours</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-100 shadow-sm">
                  <CardContent className="flex items-start p-6 gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-lg mb-1">Call Us</h3>
                      <p className="text-gray-600 font-light text-sm" data-testid="text-contact-phone">+254-721650357</p>
                      <p className="text-gray-500 text-xs mt-1">Mon-Fri, 8am - 5pm EAT</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border border-gray-100 shadow-sm">
                <CardContent className="p-8">
                  <h3 className="font-display font-medium text-gray-900 text-xl mb-6">How to Volunteer</h3>
                  <ol className="relative border-l border-gray-200 ml-3 space-y-8">
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full -left-4 ring-4 ring-white">
                        <span className="text-primary font-medium text-sm">1</span>
                      </span>
                      <h4 className="font-medium text-gray-900 mb-1">Choose a Program</h4>
                      <p className="text-sm text-gray-600 font-light">Browse our Short-term, Long-term, or Educational tour programs.</p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full -left-4 ring-4 ring-white">
                        <span className="text-primary font-medium text-sm">2</span>
                      </span>
                      <h4 className="font-medium text-gray-900 mb-1">Send an Inquiry</h4>
                      <p className="text-sm text-gray-600 font-light">Use the form to express your interest. We'll send you the Volunteer Exchange Form (VEF).</p>
                    </li>
                    <li className="ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full -left-4 ring-4 ring-white">
                        <span className="text-primary font-medium text-sm">3</span>
                      </span>
                      <h4 className="font-medium text-gray-900 mb-1">Prepare & Travel</h4>
                      <p className="text-sm text-gray-600 font-light">Once accepted, we help with logistics, visa advice, and airport pickup.</p>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <Card className="border border-gray-100 shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-display font-medium text-gray-900 mb-6">Send a Message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="h-12 border-gray-200" data-testid="input-name" {...field} />
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
                          <FormLabel className="text-gray-700">Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="h-12 border-gray-200" data-testid="input-email" {...field} />
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
                          <FormLabel className="text-gray-700">Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Volunteering Inquiry" className="h-12 border-gray-200" data-testid="input-subject" {...field} value={field.value || ''} />
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
                          <FormLabel className="text-gray-700">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your interest in volunteering..."
                              className="min-h-[150px] border-gray-200 resize-none"
                              data-testid="input-message"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full h-12 text-lg font-medium bg-primary hover:bg-primary/90"
                      disabled={createInquiry.isPending}
                      data-testid="button-submit"
                    >
                      {createInquiry.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
