
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";
import { api } from "@shared/routes";
import { db } from "./db";
import { 
  programs as programsTable, projects as projectsTable, news as newsTable,
  events as eventsTable, teamMembers as teamMembersTable, boardMembers as boardMembersTable,
  partners as partnersTable, testimonials as testimonialsTable
} from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await setupAuth(app);
  registerAuthRoutes(app);

  app.get(api.programs.list.path, async (req, res) => {
    const items = await storage.getPrograms();
    res.json(items);
  });

  app.get(api.programs.get.path, async (req, res) => {
    const item = await storage.getProgram(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Program not found" });
    res.json(item);
  });

  app.get(api.projects.list.path, async (req, res) => {
    const items = await storage.getProjects();
    res.json(items);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const item = await storage.getProject(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Project not found" });
    res.json(item);
  });

  app.get(api.news.list.path, async (req, res) => {
    const items = await storage.getNews();
    res.json(items);
  });

  app.get(api.news.get.path, async (req, res) => {
    const item = await storage.getNewsItem(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "News item not found" });
    res.json(item);
  });

  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

  app.get(api.events.list.path, async (req, res) => {
    const items = await storage.getEvents();
    res.json(items);
  });

  app.get(api.teamMembers.list.path, async (req, res) => {
    const items = await storage.getTeamMembers();
    res.json(items);
  });

  app.get(api.boardMembers.list.path, async (req, res) => {
    const items = await storage.getBoardMembers();
    res.json(items);
  });

  app.get(api.partners.list.path, async (req, res) => {
    const items = await storage.getPartners();
    res.json(items);
  });

  app.get(api.testimonials.list.path, async (req, res) => {
    const items = await storage.getTestimonials();
    res.json(items);
  });

  app.post(api.volunteerApplications.create.path, async (req, res) => {
    try {
      const input = api.volunteerApplications.create.input.parse(req.body);
      const application = await storage.createVolunteerApplication(input);
      res.status(201).json(application);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

  app.get(api.volunteerApplications.list.path, isAuthenticated, async (req, res) => {
    const items = await storage.getVolunteerApplications();
    res.json(items);
  });

  app.get(api.volunteerApplications.get.path, isAuthenticated, async (req, res) => {
    const item = await storage.getVolunteerApplication(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Application not found" });
    res.json(item);
  });

  app.patch(api.volunteerApplications.updateStatus.path, isAuthenticated, async (req, res) => {
    try {
      const { status } = api.volunteerApplications.updateStatus.input.parse(req.body);
      const item = await storage.updateVolunteerApplicationStatus(Number(req.params.id), status);
      if (!item) return res.status(404).json({ message: "Application not found" });
      res.json(item);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingPrograms = await storage.getPrograms();
  if (existingPrograms.length === 0) {
    await db.insert(programsTable).values([
      {
        title: "Short-Term Volunteering (Workcamps)",
        type: "short_term",
        description: "3-week group-based projects focused on community service, cultural exchange, and global solidarity. Workcamps bring together 15-20 volunteers from different countries to work on community-identified projects. Activities include farming, construction, health awareness campaigns, environmental conservation, and cultural exchange. Volunteers live with host communities, sharing meals and experiences that foster cross-cultural understanding.",
        duration: "3 Weeks",
        imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80"
      },
      {
        title: "Medium & Long-Term Volunteering",
        type: "long_term",
        description: "Individual placements lasting 1-12 months. Immerse yourself in local communities, learn Swahili, and contribute meaningfully to health, education, or environmental projects. Long-term volunteers develop deeper connections with host communities and gain professional skills while making a sustained impact. Projects span teaching, healthcare support, community development, and environmental conservation across Kenya.",
        duration: "1 - 12 Months",
        imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?auto=format&fit=crop&q=80"
      },
      {
        title: "Outbound Volunteering",
        type: "outbound",
        description: "Opportunities for Kenyans to volunteer abroad in Africa, Asia, Europe, and the Americas through our extensive international partner network. KVDA facilitates placements with partner organizations in over 40 countries, providing Kenyan youth with cross-cultural experiences, skills development, and global perspectives. Programs range from community development to environmental conservation.",
        duration: "2 Weeks - 1 Year",
        imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80"
      },
      {
        title: "Educational Tours",
        type: "educational",
        description: "Customized educational and cultural tours for groups and individuals wanting to experience Kenya's rich heritage, wildlife, and community development programs firsthand. Tours include visits to KVDA project sites, national parks, cultural centers, and community organizations. Ideal for university groups, school delegations, and organizations interested in development studies.",
        duration: "1 - 4 Weeks",
        imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80"
      }
    ]);
  }

  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await db.insert(projectsTable).values([
      {
        title: "Oloisukut Group Conservancy",
        location: "Maasai Mara, Narok",
        sector: "Wildlife Conservation",
        code: "KVDA/MLTV/2021/18",
        description: "Conserving the Maasai Mara ecosystem while empowering the local Maasai community through sustainable tourism and wildlife protection. Volunteers assist with wildlife monitoring, anti-poaching patrols, and community education programs.",
        imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80"
      },
      {
        title: "Mount Olives Community Health Centre",
        location: "Mosocho, Kisii",
        sector: "Health",
        code: "KVDA/MLTV/2023/29",
        description: "Improving access to healthcare and health education in rural Kisii, focusing on maternal health, disease prevention, and community health worker training.",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
      },
      {
        title: "Sustainable Agriculture Initiative - KIOF",
        location: "Kiambu County",
        sector: "Agriculture",
        code: "KVDA/MLTV/2023/12",
        description: "Promoting organic farming and food security in partnership with the Kenya Institute of Organic Farming (KIOF). Volunteers learn and teach sustainable farming methods to local farmers.",
        imageUrl: "https://images.unsplash.com/photo-1625246333195-58405079a490?auto=format&fit=crop&q=80"
      },
      {
        title: "Gender Empowerment Project",
        location: "Nairobi",
        sector: "Gender",
        code: "KVDA/MLTV/2023/08",
        description: "Empowering women and girls through vocational training, leadership workshops, and advocacy to challenge patriarchal systems and promote gender equality.",
        imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80"
      },
      {
        title: "Esibila Primary School Support",
        location: "Vihiga County",
        sector: "Education",
        code: "KVDA/MLTV/2021/31",
        description: "Supporting primary education for vulnerable children in Vihiga through teaching assistance, infrastructure improvement, and provision of learning materials.",
        imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80"
      },
      {
        title: "Roddy's Eco Cover",
        location: "Vihiga County",
        sector: "Environment",
        code: "KVDA/MLTV/2021/25",
        description: "Environmental conservation and reforestation project aimed at restoring local ecosystems, promoting eco-friendly practices, and combating climate change effects.",
        imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?auto=format&fit=crop&q=80"
      },
      {
        title: "Community Health Volunteers",
        location: "Shinyalu, Kakamega",
        sector: "Health",
        code: "KVDA/MLTV/2021/30",
        description: "Training and supporting community health volunteers to provide basic healthcare services and health education in remote Kakamega villages.",
        imageUrl: "https://images.unsplash.com/photo-1584515169010-2590d737b673?auto=format&fit=crop&q=80"
      },
      {
        title: "Maasai Community Development",
        location: "Kajiado County",
        sector: "Community Development",
        code: "KVDA/MLTV/2023/15",
        description: "Working with Maasai communities on water access, education, and livelihood improvement projects. Volunteers help build water collection systems and support school programs.",
        imageUrl: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&q=80"
      },
      {
        title: "Lake Victoria Beach Cleanup",
        location: "Kisumu",
        sector: "Environment",
        code: "KVDA/STV/2024/05",
        description: "Environmental conservation project focused on cleaning Lake Victoria shoreline, educating local communities about waste management, and protecting aquatic ecosystems.",
        imageUrl: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80"
      },
      {
        title: "Special Needs Education Support",
        location: "Thika, Kiambu",
        sector: "Education",
        code: "KVDA/MLTV/2023/20",
        description: "Supporting children with special needs through adapted teaching methods, therapy assistance, and infrastructure improvements at special education centers.",
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80"
      },
      {
        title: "Youth Entrepreneurship Program",
        location: "Nairobi",
        sector: "Youth Development",
        code: "KVDA/MLTV/2024/02",
        description: "Equipping young people with entrepreneurial skills, financial literacy, and mentorship to create sustainable livelihoods and reduce youth unemployment.",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
      },
      {
        title: "Rural Water & Sanitation",
        location: "Machakos County",
        sector: "Water & Sanitation",
        code: "KVDA/STV/2024/08",
        description: "Improving access to clean water and sanitation facilities in rural Machakos. Volunteers help construct water harvesting systems and latrines for schools and communities.",
        imageUrl: "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?auto=format&fit=crop&q=80"
      }
    ]);
  }

  const existingNews = await storage.getNews();
  if (existingNews.length === 0) {
    await db.insert(newsTable).values([
      {
        title: "KVDA Celebrates 60 Years of Service",
        content: "The Kenya Voluntary Development Association marked six decades of voluntary service and community development. Since 1962, KVDA has mobilized over 10,000 international and local volunteers across hundreds of community development projects in Kenya. The anniversary celebration brought together past volunteers, partner organizations, and community leaders to reflect on the impact and chart the future of volunteerism in Kenya.",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980968a0c?auto=format&fit=crop&q=80"
      },
      {
        title: "New Partnership with Service Volontaire International",
        content: "KVDA has forged a new partnership with Service Volontaire International (SVI) to increase exchange opportunities for youth across continents. This collaboration will enable more young Kenyans to access volunteer placements in Europe, Asia, and the Americas while bringing international volunteers to Kenya. The partnership strengthens KVDA's global network of over 100 partner organizations.",
        imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80"
      },
      {
        title: "2024 Workcamp Season Kicks Off",
        content: "KVDA has launched its 2024 short-term workcamp season with projects across 8 counties in Kenya. This year's workcamps focus on environmental conservation, education support, and community health. Over 200 international volunteers from 30 countries are expected to participate in 15 different workcamps running from June through December.",
        imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80"
      },
      {
        title: "KVDA Receives UN Volunteer Award Recognition",
        content: "KVDA has been recognized by the United Nations Volunteers program for its outstanding contribution to promoting volunteerism and sustainable development in East Africa. The recognition highlights KVDA's six-decade commitment to mobilizing volunteers for community development and peace-building across Kenya.",
        imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80"
      }
    ]);
  }

  const existingEvents = await storage.getEvents();
  if (existingEvents.length === 0) {
    await db.insert(eventsTable).values([
      {
        title: "International Volunteer Day Celebration",
        description: "Join KVDA in celebrating International Volunteer Day with activities, exhibitions, and volunteer recognition ceremonies at our Karen headquarters.",
        date: "December 5, 2025",
        location: "KVDA Headquarters, Karen, Nairobi",
        type: "celebration",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80"
      },
      {
        title: "Summer Workcamp Orientation",
        description: "Pre-departure orientation for all volunteers participating in the 2025 summer workcamp season. Covers cultural preparation, project details, and logistics.",
        date: "June 1-3, 2025",
        location: "KVDA Training Centre, Karen",
        type: "orientation",
        imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80"
      },
      {
        title: "Annual General Meeting 2025",
        description: "KVDA's Annual General Meeting brings together members, staff, and stakeholders to review the year's achievements and plan for the future.",
        date: "March 15, 2025",
        location: "KVDA Headquarters, Karen, Nairobi",
        type: "meeting",
        imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80"
      },
      {
        title: "Youth Volunteer Leadership Training",
        description: "A 5-day intensive training program for young volunteer leaders focusing on project management, community engagement, and cross-cultural communication skills.",
        date: "August 10-14, 2025",
        location: "KVDA Training Centre, Karen",
        type: "training",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
      }
    ]);
  }

  const existingTeam = await storage.getTeamMembers();
  if (existingTeam.length === 0) {
    await db.insert(teamMembersTable).values([
      {
        name: "Mr. Paul Munguti",
        role: "Executive Director",
        email: "paul@kvdakenya.org",
        phone: "+254-721650357",
        order: 1,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Ms. Grace Wambui",
        role: "Programs Coordinator",
        email: "programs@kvdakenya.org",
        phone: "+254-722000001",
        order: 2,
        imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Mr. Daniel Ochieng",
        role: "Outbound Programs Officer",
        email: "outbound@kvdakenya.org",
        phone: "+254-722000002",
        order: 3,
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Ms. Faith Njeri",
        role: "Finance & Administration",
        email: "finance@kvdakenya.org",
        phone: "+254-722000003",
        order: 4,
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Mr. James Kiplagat",
        role: "Volunteer Coordinator",
        email: "volunteers@kvdakenya.org",
        phone: "+254-722000004",
        order: 5,
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
      }
    ]);
  }

  const existingBoard = await storage.getBoardMembers();
  if (existingBoard.length === 0) {
    await db.insert(boardMembersTable).values([
      { name: "Prof. Samson Mwangi", position: "Chairperson", order: 1, imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" },
      { name: "Dr. Esther Wanjiku", position: "Vice Chairperson", order: 2, imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
      { name: "Mr. Peter Kamau", position: "Secretary", order: 3, imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" },
      { name: "Ms. Margaret Odhiambo", position: "Treasurer", order: 4, imageUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=400" },
      { name: "Dr. John Mutiso", position: "Board Member", order: 5, imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" },
      { name: "Ms. Alice Chebet", position: "Board Member", order: 6, imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400" },
    ]);
  }

  const existingPartners = await storage.getPartners();
  if (existingPartners.length === 0) {
    await db.insert(partnersTable).values([
      { name: "Service Civil International (SCI)", country: "Switzerland", website: "https://sci.ngo", description: "Global peace movement promoting voluntary service since 1920." },
      { name: "Coordinating Committee for International Voluntary Service (CCIVS)", country: "France", website: "https://ccivs.org", description: "UNESCO-affiliated international coordinating body for voluntary service." },
      { name: "Alliance of European Voluntary Service Organizations", country: "Europe", website: "https://alliance-network.eu", description: "Network of 50+ voluntary service organizations across Europe." },
      { name: "Network for Voluntary Development in Asia (NVDA)", country: "Asia", website: "https://nvda-asia.org", description: "Regional network promoting voluntary service in Asian countries." },
      { name: "Service Volontaire International (SVI)", country: "Belgium", website: "https://servicevolontaire.org", description: "Belgian volunteer organization coordinating international exchanges." },
      { name: "Voluntary Service Overseas (VSO)", country: "UK", website: "https://vsointernational.org", description: "International development organization working through volunteers." },
      { name: "United Nations Volunteers (UNV)", country: "International", website: "https://unv.org", description: "UN programme promoting volunteerism for peace and development." },
      { name: "International Cultural Youth Exchange (ICYE)", country: "Germany", website: "https://icye.org", description: "Global youth exchange network promoting intercultural learning." },
      { name: "Volunteers for Peace (VFP)", country: "USA", website: "https://vfp.org", description: "US-based organization connecting volunteers with international workcamps." },
      { name: "Japan International Volunteer Center (JVC)", country: "Japan", website: "https://ngo-jvc.net", description: "Japanese NGO working on community development across Asia and Africa." },
      { name: "Solidarites Jeunesses", country: "France", website: "https://solidaritesjeunesses.org", description: "French movement promoting solidarity through voluntary service." },
      { name: "MS ActionAid Denmark", country: "Denmark", website: "https://ms.dk", description: "Danish development organization supporting global justice and equality." },
    ]);
  }

  const existingTestimonials = await storage.getTestimonials();
  if (existingTestimonials.length === 0) {
    await db.insert(testimonialsTable).values([
      {
        name: "Sarah Mueller",
        country: "Germany",
        program: "Short-Term Workcamp",
        quote: "My workcamp experience in Kisii was life-changing. Working alongside local community members on the health centre project gave me a completely new perspective on global solidarity. The friendships I made will last a lifetime.",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Takeshi Yamamoto",
        country: "Japan",
        program: "Long-Term Volunteering",
        quote: "Spending six months at the Oloisukut Conservancy in Maasai Mara was the most meaningful experience of my life. Learning from the Maasai community about wildlife conservation and living sustainably with nature changed how I see the world.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Marie Dubois",
        country: "France",
        program: "Short-Term Workcamp",
        quote: "KVDA's workcamp brought together volunteers from 12 different countries. Despite our different backgrounds, we worked together beautifully on the school renovation project. Kenya's beauty and the warmth of the people made this unforgettable.",
        imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "David Kimani",
        country: "Kenya",
        program: "Outbound Volunteering",
        quote: "Through KVDA's outbound program, I volunteered in Belgium for three months. The cross-cultural exchange broadened my horizons and equipped me with skills I now use in my community development work back in Kenya.",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Anna Bergstrom",
        country: "Sweden",
        program: "Educational Tour",
        quote: "The educational tour organized by KVDA was incredibly well-structured. We visited project sites, national parks, and cultural centers. It was the perfect blend of learning and adventure. I recommend it to anyone interested in development work.",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
      }
    ]);
  }
}
