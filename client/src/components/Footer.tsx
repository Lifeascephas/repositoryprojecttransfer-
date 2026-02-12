import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary/5 border-t border-primary/10">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand & Mission */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-primary">
              KVDA<span className="text-accent">Kenya</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Development Against Dependence. Serving communities and empowering volunteers since 1962.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/programs" className="text-muted-foreground hover:text-primary transition-colors">Our Programs</Link></li>
              <li><Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">Volunteer Projects</Link></li>
              <li><Link href="/news" className="text-muted-foreground hover:text-primary transition-colors">Latest News</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg text-foreground">Programs</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/programs" className="text-muted-foreground hover:text-primary transition-colors">Short-Term Workcamps</Link></li>
              <li><Link href="/programs" className="text-muted-foreground hover:text-primary transition-colors">Long-Term Volunteering</Link></li>
              <li><Link href="/programs" className="text-muted-foreground hover:text-primary transition-colors">Educational Tours</Link></li>
              <li><Link href="/programs" className="text-muted-foreground hover:text-primary transition-colors">Outbound Exchange</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg text-foreground">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Kwarara Road, Karen,<br/>P.O. Box 48902-00100,<br/>Nairobi, Kenya</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+254-721650357</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>info@kvdakenya.org</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-primary/10 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Kenya Voluntary Development Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
