import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import {
  Heart, GraduationCap, Stethoscope, Droplets, TreePine,
  Users, ArrowRight, CreditCard, Building2, Smartphone, CheckCircle2
} from "lucide-react";

const impactAreas = [
  { icon: GraduationCap, title: "Education", description: "Support school renovation, learning materials, and teaching programs for vulnerable children." },
  { icon: Stethoscope, title: "Healthcare", description: "Fund community health centers, health education campaigns, and medical supply distribution." },
  { icon: Droplets, title: "Clean Water", description: "Help build water harvesting systems and boreholes for rural communities lacking clean water access." },
  { icon: TreePine, title: "Environment", description: "Support reforestation projects and wildlife conservation efforts across Kenya." },
  { icon: Users, title: "Gender Equality", description: "Fund vocational training and empowerment programs for women and girls." },
  { icon: Heart, title: "General Fund", description: "Contribute to KVDA's overall mission of community development and volunteer mobilization." },
];

const presetAmounts = [25, 50, 100, 250, 500, 1000];

export default function Donate() {
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donationSuccess, setDonationSuccess] = useState(false);

  const amount = customAmount || (selectedAmount ? String(selectedAmount) : "");

  const donationMutation = useMutation({
    mutationFn: async (method: string) => {
      return apiRequest("POST", "/api/donations", {
        amount,
        currency: "USD",
        method,
        donorName: donorName || undefined,
        donorEmail: donorEmail || undefined,
      });
    },
    onSuccess: () => {
      setDonationSuccess(true);
      toast({ title: "Thank you for your donation intent!" });
    },
    onError: () => {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    },
  });

  if (donationSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-display font-medium text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-8">
            Your donation intent has been recorded. Please complete the payment using the method you selected. 
            KVDA appreciates your generous support for community development in Kenya.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button onClick={() => setDonationSuccess(false)} variant="outline" data-testid="button-donate-again">
              Make Another Donation
            </Button>
            <Link href="/">
              <Button data-testid="link-home-from-donate">Return Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80"
            alt="Community impact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary font-medium tracking-widest text-xs uppercase">Make a Difference</span>
            <h1 className="text-5xl md:text-6xl font-display font-light text-white mt-4 mb-6" data-testid="text-page-title">
              Support Our <span className="text-primary italic font-normal">Mission</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              Your donation directly supports community development projects across Kenya. 
              Every contribution helps us empower marginalized communities and create lasting change.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl font-display font-medium text-gray-900 mb-6">Where Your Donation Goes</h2>
            <div className="h-1 w-24 bg-primary mb-8" />
            <p className="text-lg text-gray-600 font-light">
              Every donation is carefully directed to maximize impact in the communities we serve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactAreas.map((area, index) => (
              <Card key={area.title} className="border border-gray-100 shadow-sm h-full" data-testid={`card-impact-${index}`}>
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <area.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">{area.title}</h3>
                  <p className="text-gray-600 font-light text-sm leading-relaxed">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-display font-medium text-gray-900 mb-4">Make a Donation</h2>
              <p className="text-gray-600 font-light max-w-2xl mx-auto">
                Choose your donation amount and preferred payment method. All donations are tax-deductible.
              </p>
            </div>

            <Card className="border border-gray-100 shadow-sm">
              <CardContent className="p-8 md:p-10">
                <div className="mb-8">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Select Amount (USD)</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                    {presetAmounts.map((amt) => (
                      <Button
                        key={amt}
                        variant={selectedAmount === amt && !customAmount ? "default" : "outline"}
                        onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                        data-testid={`button-amount-${amt}`}
                      >
                        ${amt}
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm">Or enter custom amount:</span>
                    <Input
                      type="number"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                      className="max-w-[160px]"
                      data-testid="input-custom-amount"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <Input
                    placeholder="Your name (optional)"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    data-testid="input-donor-name"
                  />
                  <Input
                    type="email"
                    placeholder="Your email (optional)"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    data-testid="input-donor-email"
                  />
                </div>

                <Tabs defaultValue="bank" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="bank" data-testid="tab-bank">
                      <Building2 className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Bank</span>
                    </TabsTrigger>
                    <TabsTrigger value="mpesa" data-testid="tab-mpesa">
                      <Smartphone className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">M-Pesa</span>
                    </TabsTrigger>
                    <TabsTrigger value="paypal" data-testid="tab-paypal">
                      <CreditCard className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">PayPal</span>
                    </TabsTrigger>
                    <TabsTrigger value="card" data-testid="tab-card">
                      <CreditCard className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Card</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="bank">
                    <div className="p-6 rounded-md bg-gray-50 border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Bank Transfer Details</h3>
                      <div className="space-y-3 text-sm text-gray-600 mb-6">
                        <p><span className="font-medium text-gray-800">Bank:</span> Kenya Commercial Bank (KCB)</p>
                        <p><span className="font-medium text-gray-800">Account Name:</span> Kenya Voluntary Development Association</p>
                        <p><span className="font-medium text-gray-800">Account No:</span> 1100274857</p>
                        <p><span className="font-medium text-gray-800">Branch:</span> Karen</p>
                        <p><span className="font-medium text-gray-800">Swift Code:</span> KCBLKENX</p>
                      </div>
                      <p className="text-xs text-gray-500 mb-4">
                        After making a bank transfer, please email your transaction receipt to finance@kvdakenya.org for confirmation.
                      </p>
                      <Button
                        onClick={() => donationMutation.mutate("bank_transfer")}
                        disabled={!amount || Number(amount) <= 0 || donationMutation.isPending}
                        data-testid="button-confirm-bank"
                      >
                        {donationMutation.isPending ? "Processing..." : `Record Donation - $${amount || "0"}`}
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="mpesa">
                    <div className="p-6 rounded-md bg-gray-50 border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">M-Pesa Payment</h3>
                      <div className="space-y-3 text-sm text-gray-600 mb-6">
                        <p><span className="font-medium text-gray-800">Paybill Number:</span> 522522</p>
                        <p><span className="font-medium text-gray-800">Account Name:</span> KVDA</p>
                        <p><span className="font-medium text-gray-800">Steps:</span></p>
                        <ol className="list-decimal pl-5 space-y-1">
                          <li>Go to M-Pesa on your phone</li>
                          <li>Select "Lipa na M-Pesa"</li>
                          <li>Select "Pay Bill"</li>
                          <li>Enter Business Number: 522522</li>
                          <li>Enter Account Number: KVDA</li>
                          <li>Enter Amount</li>
                          <li>Enter your M-Pesa PIN and confirm</li>
                        </ol>
                      </div>
                      <Button
                        onClick={() => donationMutation.mutate("mpesa")}
                        disabled={!amount || Number(amount) <= 0 || donationMutation.isPending}
                        className="bg-green-600 hover:bg-green-700"
                        data-testid="button-confirm-mpesa"
                      >
                        {donationMutation.isPending ? "Processing..." : `Record M-Pesa Donation - $${amount || "0"}`}
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="paypal">
                    <div className="p-6 rounded-md bg-gray-50 border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">PayPal Donation</h3>
                      <p className="text-sm text-gray-600 mb-6">
                        You can send your donation via PayPal to our verified account. 
                        Click the button below to be redirected to PayPal where you can complete your payment securely.
                      </p>
                      <div className="p-4 rounded-md bg-blue-50 border border-blue-200 mb-6">
                        <p className="text-sm text-blue-800">
                          <span className="font-medium">PayPal Email:</span> donations@kvdakenya.org
                        </p>
                      </div>
                      <Button
                        onClick={() => donationMutation.mutate("paypal")}
                        disabled={!amount || Number(amount) <= 0 || donationMutation.isPending}
                        className="bg-blue-600 hover:bg-blue-700"
                        data-testid="button-confirm-paypal"
                      >
                        {donationMutation.isPending ? "Processing..." : `Record PayPal Donation - $${amount || "0"}`}
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="card">
                    <div className="p-6 rounded-md bg-gray-50 border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Credit/Debit Card</h3>
                      <p className="text-sm text-gray-600 mb-6">
                        Secure card payments are being set up. In the meantime, you can donate via PayPal (which accepts cards), 
                        bank transfer, or M-Pesa.
                      </p>
                      <div className="p-4 rounded-md bg-yellow-50 border border-yellow-200 mb-6">
                        <p className="text-sm text-yellow-800">
                          Card payment integration coming soon. Please use another payment method for now.
                        </p>
                      </div>
                      <Link href="/contact">
                        <Button variant="outline" data-testid="link-contact-card">
                          Contact Us for Card Payments <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 text-center">
          <p className="text-gray-600 text-sm mb-4">
            For more information about donating or to discuss specific project support:
          </p>
          <Link href="/contact">
            <Button size="lg" className="rounded-full px-10" data-testid="link-contact-donate">
              Contact Us <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
