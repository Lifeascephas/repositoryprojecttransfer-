import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import kvdaLogo from "@assets/cropped-KVDA-01-copy_1770989337592.png";

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Bar */}
      <div className="bg-primary">
        <div className="container px-4 md:px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white" data-testid="text-newsletter-title">Subscribe to Our Newsletter</h3>
              <p className="text-white/80 text-sm mt-1">Stay updated with our latest projects, events and volunteer opportunities.</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto gap-2" data-testid="form-newsletter">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 md:w-72 px-4 py-2.5 rounded-md text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
                data-testid="input-newsletter-email"
              />
              <Button type="submit" className="bg-gray-900 text-white font-semibold px-6 rounded-md" data-testid="button-newsletter-submit">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container px-4 md:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3" data-testid="link-footer-logo">
              <img src={kvdaLogo} alt="KVDA Logo" className="h-14 w-auto" data-testid="img-footer-logo" />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-xl font-bold text-white">KVDA</span>
                <span className="text-[9px] font-medium text-gray-400 tracking-wide uppercase">Kenya Voluntary Development Association</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              KVDA is an indigenous, non-political and membership organization which is non-sectarian and non-profit making started in 1962 as a work camp organization registered under the Societies' Act. In 1993, KVDA was registered as a Non-Governmental organization by the establishment of the NGOs Coordination Act.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="https://facebook.com/kvdakenya" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors" data-testid="link-social-facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://twitter.com/kvdakenya" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors" data-testid="link-social-twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://instagram.com/kvdakenya" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors" data-testid="link-social-instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://youtube.com/@kvdakenya" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors" data-testid="link-social-youtube">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="text-gray-400 hover:text-primary transition-colors" data-testid="link-footer-about">About Us</Link></li>
              <li><Link href="/what-we-do" className="text-gray-400 hover:text-primary transition-colors" data-testid="link-footer-what-we-do">What We Do</Link></li>
              <li><Link href="/programs" className="text-gray-400 hover:text-primary transition-colors" data-testid="link-footer-programs">Our Programs</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-primary transition-colors" data-testid="link-footer-projects">Volunteer Projects</Link></li>
              <li><Link href="/volunteer" className="text-gray-400 hover:text-primary transition-colors" data-testid="link-footer-volunteer">Become a Volunteer</Link></li>
              <li><Link href="/news" className="text-gray-400 hover:text-primary transition-colors" data-testid="link-footer-news">News & Blog</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white">Programs</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/programs" className="text-gray-400 hover:text-primary transition-colors">Short-Term Workcamps</Link></li>
              <li><Link href="/programs" className="text-gray-400 hover:text-primary transition-colors">Medium & Long-Term</Link></li>
              <li><Link href="/programs" className="text-gray-400 hover:text-primary transition-colors">Outbound Exchange</Link></li>
              <li><Link href="/programs" className="text-gray-400 hover:text-primary transition-colors">Educational Tours</Link></li>
              <li><Link href="/partners" className="text-gray-400 hover:text-primary transition-colors">Partners</Link></li>
              <li><Link href="/donate" className="text-gray-400 hover:text-primary transition-colors">Donate</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Kwarara Road, Karen,<br />P.O. Box 48902-00100,<br />Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href="tel:+254721650357" className="hover:text-primary transition-colors">+254-721650357</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:info@kvdakenya.org" className="hover:text-primary transition-colors">info@kvdakenya.org</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container px-4 md:px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p data-testid="text-copyright">&copy; {new Date().getFullYear()} Kenya Voluntary Development Association. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
