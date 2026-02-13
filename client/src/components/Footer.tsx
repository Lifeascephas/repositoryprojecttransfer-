import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/5">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-primary">
              KVDA<span className="text-white">Kenya</span>
            </h3>
            <p className="text-zinc-500 leading-relaxed text-sm font-light">
              Development Against Dependence. Serving communities and empowering volunteers since 1962.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/kvdakenya" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-primary transition-colors" data-testid="link-facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/kvdakenya" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-primary transition-colors" data-testid="link-twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/kvdakenya" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-primary transition-colors" data-testid="link-instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-zinc-500 hover:text-primary transition-colors" data-testid="link-footer-about">About Us</Link></li>
              <li><Link href="/what-we-do" className="text-zinc-500 hover:text-primary transition-colors" data-testid="link-footer-what-we-do">What We Do</Link></li>
              <li><Link href="/programs" className="text-zinc-500 hover:text-primary transition-colors" data-testid="link-footer-programs">Our Programs</Link></li>
              <li><Link href="/projects" className="text-zinc-500 hover:text-primary transition-colors" data-testid="link-footer-projects">Volunteer Projects</Link></li>
              <li><Link href="/volunteer" className="text-zinc-500 hover:text-primary transition-colors" data-testid="link-footer-volunteer">Be a Volunteer</Link></li>
              <li><Link href="/news" className="text-zinc-500 hover:text-primary transition-colors" data-testid="link-footer-news">News & Blog</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider">Programs</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/programs" className="text-zinc-500 hover:text-primary transition-colors">Short-Term Workcamps</Link></li>
              <li><Link href="/programs" className="text-zinc-500 hover:text-primary transition-colors">Medium & Long-Term</Link></li>
              <li><Link href="/programs" className="text-zinc-500 hover:text-primary transition-colors">Outbound Exchange</Link></li>
              <li><Link href="/programs" className="text-zinc-500 hover:text-primary transition-colors">Educational Tours</Link></li>
              <li><Link href="/partners" className="text-zinc-500 hover:text-primary transition-colors">Partners</Link></li>
              <li><Link href="/donate" className="text-zinc-500 hover:text-primary transition-colors">Donate</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-zinc-500">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Kwarara Road, Karen,<br />P.O. Box 48902-00100,<br />Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-500">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+254-721650357</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-500">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>info@kvdakenya.org</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-zinc-600">
          <p>&copy; {new Date().getFullYear()} Kenya Voluntary Development Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
