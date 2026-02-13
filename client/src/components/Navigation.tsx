import { Link, useLocation } from "wouter";
import { Menu, X, Heart, ChevronDown, Phone } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/about",
    label: "About Us",
    children: [
      { href: "/about", label: "Our Story" },
      { href: "/what-we-do", label: "What We Do" },
      { href: "/events", label: "Events" },
    ],
  },
  {
    href: "/programs",
    label: "Programs",
    children: [
      { href: "/programs", label: "All Programs" },
      { href: "/projects", label: "Volunteer Projects" },
    ],
  },
  {
    href: "/volunteer",
    label: "Join Us",
    children: [
      { href: "/volunteer", label: "Be a Volunteer" },
      { href: "/partners", label: "Our Partners" },
    ],
  },
  { href: "/news", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const isActive = location === item.href || item.children?.some(c => location === c.href);

  const handleEnter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => () => clearTimeout(timeout.current), []);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={`transition-colors hover:text-primary text-sm font-medium ${
          isActive ? "text-primary" : "text-gray-700"
        }`}
        data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className={`flex items-center gap-1 transition-colors hover:text-primary text-sm font-medium ${
          isActive ? "text-primary" : "text-gray-700"
        }`}
        data-testid={`button-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {item.label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 pt-2 z-50"
          >
            <div className="bg-white border border-gray-100 rounded-md shadow-lg py-2 min-w-[200px]">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={`block px-4 py-2.5 text-sm transition-colors hover:bg-red-50 hover:text-primary ${
                    location === child.href ? "text-primary bg-red-50/50" : "text-gray-600"
                  }`}
                  onClick={() => setOpen(false)}
                  data-testid={`link-nav-${child.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="hidden lg:block bg-primary text-white">
        <div className="container flex items-center justify-between px-4 md:px-6 py-1.5 text-xs">
          <div className="flex items-center gap-4">
            <a href="mailto:info@kvdakenya.org" className="flex items-center gap-1.5 hover:underline" data-testid="link-topbar-email">
              info@kvdakenya.org
            </a>
            <span className="opacity-40">|</span>
            <a href="tel:+254721650357" className="flex items-center gap-1.5 hover:underline" data-testid="link-topbar-phone">
              <Phone className="h-3 w-3" /> +254-721650357
            </a>
          </div>
          <span className="font-medium">Development Against Dependence</span>
        </div>
      </div>

      <nav className={`sticky top-0 z-50 w-full bg-white transition-shadow ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="container flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="mr-6 flex items-center space-x-2" data-testid="link-logo">
            <span className="font-display text-2xl font-bold tracking-tight">
              <span className="text-primary">KVDA</span><span className="text-gray-800">Kenya</span>
            </span>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navItems.map((item) => (
              <DesktopDropdown key={item.href + item.label} item={item} />
            ))}
            <Link href="/donate">
              <Button className="bg-primary text-white font-medium rounded-md" data-testid="link-donate-nav">
                <Heart className="mr-2 h-4 w-4 fill-current" />
                Donate
              </Button>
            </Link>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
          >
            <span className="sr-only">Toggle menu</span>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-100 bg-white lg:hidden overflow-hidden"
            >
              <div className="flex flex-col py-4 px-6 space-y-1">
                {navItems.map((item) => (
                  <div key={item.href + item.label}>
                    {item.children ? (
                      <>
                        <button
                          className={`flex items-center justify-between w-full py-3 text-base transition-colors hover:text-primary ${
                            expanded === item.label ? "text-primary" : "text-gray-700"
                          }`}
                          onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                          data-testid={`button-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {item.label}
                          <ChevronDown className={`h-4 w-4 transition-transform ${expanded === item.label ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {expanded === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-2 space-y-1 border-l-2 border-primary/20 ml-2">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className={`block py-2 text-sm transition-colors hover:text-primary ${
                                      location === child.href ? "text-primary" : "text-gray-500"
                                    }`}
                                    onClick={() => setIsOpen(false)}
                                    data-testid={`link-mobile-${child.label.toLowerCase().replace(/\s+/g, '-')}`}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block py-3 text-base transition-colors hover:text-primary ${
                          location === item.href ? "text-primary" : "text-gray-700"
                        }`}
                        onClick={() => setIsOpen(false)}
                        data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-4">
                  <Link href="/donate" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-primary text-white rounded-md" data-testid="link-mobile-donate">
                      <Heart className="mr-2 h-4 w-4 fill-current" />
                      Donate Now
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
