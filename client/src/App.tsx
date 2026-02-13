import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Programs from "@/pages/Programs";
import Projects from "@/pages/Projects";
import NewsPage from "@/pages/News";
import Contact from "@/pages/Contact";
import WhatWeDo from "@/pages/WhatWeDo";
import Events from "@/pages/Events";
import Volunteer from "@/pages/Volunteer";
import Partners from "@/pages/Partners";
import Donate from "@/pages/Donate";
import VolunteerApplication from "@/pages/VolunteerApplication";
import AdminDashboard from "@/pages/AdminDashboard";
import ServiceDetail from "@/pages/ServiceDetail";
import Gallery from "@/pages/Gallery";
import Workcamps from "@/pages/Workcamps";
import WorkcampDetail from "@/pages/WorkcampDetail";
import KvdaHistory from "@/pages/KvdaHistory";
import ProgramDetail from "@/pages/ProgramDetail";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <ScrollToTop />
      <Navigation />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/kvda-history" component={KvdaHistory} />
          <Route path="/what-we-do" component={WhatWeDo} />
          <Route path="/what-we-do/:slug" component={ServiceDetail} />
          <Route path="/events" component={Events} />
          <Route path="/programs" component={Programs} />
          <Route path="/programs/:type" component={ProgramDetail} />
          <Route path="/projects" component={Projects} />
          <Route path="/workcamps" component={Workcamps} />
          <Route path="/workcamps/:id" component={WorkcampDetail} />
          <Route path="/volunteer" component={Volunteer} />
          <Route path="/apply" component={VolunteerApplication} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/partners" component={Partners} />
          <Route path="/donate" component={Donate} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/news" component={NewsPage} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
