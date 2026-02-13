
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";
import { api } from "@shared/routes";
import { db } from "./db";
import { 
  programs as programsTable, projects as projectsTable, news as newsTable,
  events as eventsTable, teamMembers as teamMembersTable, boardMembers as boardMembersTable,
  partners as partnersTable, testimonials as testimonialsTable, workcamps as workcampsTable
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
    const programType = req.query.programType as string | undefined;
    if (programType) {
      const items = await storage.getProjectsByProgramType(programType);
      return res.json(items);
    }
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

  app.post(api.teamMembers.create.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.teamMembers.create.input.parse(req.body);
      const member = await storage.createTeamMember(input);
      res.status(201).json(member);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

  app.patch(api.teamMembers.update.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.teamMembers.update.input.parse(req.body);
      const member = await storage.updateTeamMember(Number(req.params.id), input);
      if (!member) return res.status(404).json({ message: "Team member not found" });
      res.json(member);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

  app.delete(api.teamMembers.delete.path, isAuthenticated, async (req, res) => {
    const success = await storage.deleteTeamMember(Number(req.params.id));
    if (!success) return res.status(404).json({ message: "Team member not found" });
    res.json({ success: true });
  });

  app.get(api.boardMembers.list.path, async (req, res) => {
    const items = await storage.getBoardMembers();
    res.json(items);
  });

  app.post(api.boardMembers.create.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.boardMembers.create.input.parse(req.body);
      const member = await storage.createBoardMember(input);
      res.status(201).json(member);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

  app.patch(api.boardMembers.update.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.boardMembers.update.input.parse(req.body);
      const member = await storage.updateBoardMember(Number(req.params.id), input);
      if (!member) return res.status(404).json({ message: "Board member not found" });
      res.json(member);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

  app.delete(api.boardMembers.delete.path, isAuthenticated, async (req, res) => {
    const success = await storage.deleteBoardMember(Number(req.params.id));
    if (!success) return res.status(404).json({ message: "Board member not found" });
    res.json({ success: true });
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

  app.post(api.newsletter.subscribe.path, async (req, res) => {
    try {
      const { email } = api.newsletter.subscribe.input.parse(req.body);
      const existing = await storage.getNewsletterSubscriberByEmail(email);
      if (existing) {
        if (existing.confirmed) {
          return res.status(400).json({ message: "You are already subscribed." });
        }
        return res.status(200).json({ message: "A confirmation was already sent. Please check your email." });
      }
      const token = crypto.randomUUID();
      await storage.createNewsletterSubscriber(email, token);
      res.status(201).json({ message: "Thank you for subscribing! Your subscription has been confirmed." });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

  app.get(api.newsletter.confirm.path, async (req, res) => {
    const subscriber = await storage.confirmNewsletterSubscriber(req.params.token);
    if (!subscriber) return res.status(404).json({ message: "Invalid confirmation link." });
    res.json({ message: "Your subscription has been confirmed!" });
  });

  app.get(api.gallery.list.path, async (req, res) => {
    const photos = await storage.getGalleryPhotos();
    res.json(photos);
  });

  app.post(api.gallery.create.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.gallery.create.input.parse(req.body);
      const photo = await storage.createGalleryPhoto(input);
      res.status(201).json(photo);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

  app.delete(api.gallery.delete.path, isAuthenticated, async (req, res) => {
    const success = await storage.deleteGalleryPhoto(Number(req.params.id));
    if (!success) return res.status(404).json({ message: "Photo not found" });
    res.json({ success: true });
  });

  app.post(api.donations.create.path, async (req, res) => {
    try {
      const input = api.donations.create.input.parse(req.body);
      const donation = await storage.createDonation(input);
      res.status(201).json(donation);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

  app.get(api.donations.list.path, isAuthenticated, async (req, res) => {
    const items = await storage.getDonations();
    res.json(items);
  });

  app.get(api.workcamps.list.path, async (req, res) => {
    const items = await storage.getWorkcamps();
    res.json(items);
  });

  app.get(api.workcamps.get.path, async (req, res) => {
    const item = await storage.getWorkcamp(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Workcamp not found" });
    res.json(item);
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
        description: "Medium term volunteer program is usually 2-6 months. It is a non-formal learning experience which develops people's sensitivity towards social and cultural differences, and also builds self-confidence, esteem and your problem-solving ability. The program brings together individual volunteers immersed into the local culture, allowing them to integrate better with the local community and actually become part of it.",
        duration: "2 - 6 Months",
        imageUrl: "/assets/medium-term-volunteer.jpg"
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
        title: "Oloisukut Group Conservancy (OGC)",
        location: "Narok County, Rift Valley",
        sector: "Wildlife Conservation",
        code: "KVDA/STV/2026/OGC",
        description: "The Maasai Mara National Reserve is a large game reserve in Narok County, contiguous with the Serengeti National Park in Tanzania. It is globally famous for its exceptional population of Masai lions, African leopards and Tanzanian cheetahs, and the annual Great Migration. Volunteers participate in tree planting, school classroom renovation, environmental conservation discussions, visits to schools and homes, sports with pupils and the local Maasai community, and learning Maasai culture.",
        imageUrl: "/assets/oloisukut-conservancy.jpeg",
        programType: "short_term"
      },
      {
        title: "Esibila Primary School (EPS)",
        location: "Esibila, Vihiga County",
        sector: "Education",
        code: "KVDA/STV/2026/EPS",
        description: "Esibila Primary School is located in Emuhaya district of Vihiga County and was started in 1952. The school has an enrolment of 858 pupils (440 girls and 418 boys), 17 teachers employed by the Teachers' Service Commission and 2 by the board of management. Volunteers participate in brick making, teaching, sporting with pupils, home visits, and inter-cultural activities. The project theme is Quality Education as part of the UN 2030 Sustainable Development Goals.",
        imageUrl: "/assets/esibila-school.jpg",
        programType: "short_term"
      },
      {
        title: "Roddy's Eco Cover Environmental Project",
        location: "Vihiga County, Western Kenya",
        sector: "Environment",
        code: "KVDA/STV/2026/REC",
        description: "Roddy's Eco-Cover is a community-based organization founded in 2011 to champion environmental awareness with forestry as key concern. Located at Ebuyangu village in Emuhaya constituency, Vihiga County, 430 km from Nairobi, the project focuses on environmental conservation to mitigate climate change effects and foster inter-cultural education. Volunteers participate in agro forestry, tree planting, nursery preparation, bamboo landscaping, cleanup activities, and home visits for exposure to development challenges.",
        imageUrl: "/assets/roddys-eco-cover.jpg",
        programType: "short_term"
      },
      {
        title: "Nyamanche Primary School (NPS)",
        location: "Kuria, Migori County, South West Kenya",
        sector: "Education",
        code: "KVDA/STV/2026/08B",
        description: "Nyamanche Primary School started in 1981 as a Government School supporting children from neighbouring villages. It consists of 600 pupils — 350 girls and 250 boys — with 12 teachers, 10 classrooms, 2 offices and 1 kitchen. The school has a strong academic record in the County. The project theme is Gender Sensitivity with a focus on Female Genital Mutilation (FGM), a deeply rooted cultural practice in this community. Volunteers will work alongside the community on school construction, teaching primary school pupils, tree planting, stones collection and pathways clearing, sensitization on the side effects of FGM, home visits and topical discussions with local people. Volunteers work six hours daily from Monday to Friday. The school motto is \"Strive for Excellence.\" Accommodation is in classrooms at the school with basic living conditions. KVDA provides foodstuffs and volunteers cook their own meals in turns. Water is available from springs. English is the language of the workcamp with opportunities to learn Kiswahili.",
        imageUrl: "/assets/nyamanche-school.webp",
        programType: "short_term"
      },
      {
        title: "St. Theresa Mabera Primary School",
        location: "Mabera, Migori County, South West Kenya",
        sector: "Education",
        code: "KVDA/STV/2026/STM",
        description: "St. Theresa Mabera Primary School was registered on 3rd September 2018. The school is situated in Mabera Township along the Migori to Isebania Road, Taraga location, Mabera Sub County of Migori County in South West Kenya. It is a mixed day school for boys and girls located predominantly among the Kuria community, one of Kenya's marginalized ethnic communities. The school has 187 pupils (96 boys and 91 girls), 8 teachers and 4 non-teaching staff. The project theme is Women Empowerment with a focus on Girl Child Education. Volunteers work six hours daily Monday to Friday on teaching, playing with children, sand harvesting, sensitization on effects of FGM, empowering the vulnerable with focus on children, promotion of safe male circumcision, home visits to orphans, and inter-cultural education.",
        imageUrl: "/assets/st-theresa-mabera.webp",
        programType: "short_term"
      },
      {
        title: "Nyamira Missionaries Cultural Development",
        location: "Nyaramba, Nyamira County",
        sector: "Cultural Development",
        code: "KVDA/STV/2026/NMCD",
        description: "Nyamira Missionaries was founded in 2002 and is located at Nyaramba in Nyamira County. The organization consists of 137 members and promotes cultural preservation through traditional Gusii dances, soapstone carvings, clay and wooden artifacts, and African basket weaving. Volunteers participate in entrepreneurship skills training, women empowerment, cultural performances, and community development activities.",
        imageUrl: "/assets/nyamira-missionaries.webp",
        programType: "short_term"
      },
      {
        title: "St. James Community Orphans School",
        location: "Mfangano Island, Homa Bay County",
        sector: "Education",
        code: "KVDA/STV/2026/SJC",
        description: "St. James Community Orphans School is a community-owned school located on Mfangano Island in Lake Victoria, Homa Bay County. Started in 2014 with 45 orphans, it now serves 112 children aged 3-12 years with 8 teachers across 7 classes. The school addresses free education for orphans, poor nutrition, and low domestic income among caregivers. Volunteers participate in teaching, farming, home visits, advocacy against teenage pregnancy, and guiding and counseling for HIV/AIDS programs.",
        imageUrl: "/assets/st-james-orphans.jpg",
        programType: "short_term"
      },
      {
        title: "St. Joseph's Nyamosense Special Unit School",
        location: "Kuria, Migori County",
        sector: "Education",
        code: "KVDA/STV/2026/SJN",
        description: "St. Joseph's Nyamosense Special Unit School was started in 2012 under Nyamosense Primary School and Nyamosense Catholic Church, located in Kuria, Migori County in South West Kenya. The project sensitizes the local community on the plight of children with disabilities who suffer neglect and denial. Volunteers teach at the Special Unit School, care for orphans, interact with children with disabilities, learn sign language, make bricks, lead open forums on children's rights, and study retrogressive cultural practices like FGM.",
        imageUrl: "/assets/st-josephs-nyamosense.jpg",
        programType: "short_term"
      },
      {
        title: "Newstar Drama Group Volunteers (NDGV)",
        location: "Kisii County",
        sector: "Youth Development",
        code: "KVDA/STV/2026/NDGV",
        description: "Newstar Drama Group was founded in 1993 at Kenya Institute of Mass Communication (KIMC) Nairobi and registered in 1996 by the Ministry of Culture and Social Services. The group is a traveling theatre that has performed at high schools, universities, colleges, primary schools, social forums and Kenya National Theatre. A member of International Drama/Theatre and Education Association (IDEA), volunteers participate in performing arts training, live drama performances, mentorship for artistes, and promotional activities including marketing theatre productions.",
        imageUrl: "/assets/newstar-drama.jpg",
        programType: "short_term"
      },
      {
        title: "Esiarambatsi Health Center (EHC)",
        location: "Vihiga County, Western Kenya",
        sector: "Health",
        code: "KVDA/STV/2026/EHC",
        description: "Esiarambatsi Health Centre is a community-based health center in Emuhaya district, Vihiga County, caring for mothers, children, and people living with HIV/AIDS. The centre offers pre-and ante-natal care, curative, preventative and promotion services. Run by the Ministry of Health with three nurses under a nursing officer, volunteers assist with patient registration, family planning, immunization, maternal and child health, and community awareness on public health and sanitation.",
        imageUrl: "/assets/esiarambatsi-health.webp",
        programType: "short_term"
      },
      {
        title: "Happy Me Happy You Volunteer",
        location: "Hamisi, Vihiga County, Western Kenya",
        sector: "Community Development",
        code: "KVDA/STV/2026/HMHY",
        description: "Happy Me Happy You is a community-based organization set up to break the cycle of poverty in communities in Western Kenya. Located in Kipkiran village, Vihiga County, the CBO prioritizes children, with the majority being orphans who have grown up in extreme poverty with food scarcity. By supplementing nutritional needs, providing clean water and other basic necessities, the CBO provides a conducive environment for learning. Volunteers teach children, cook and serve meals, assist in classroom construction, farm to provide food, and engage in team building activities.",
        imageUrl: "/assets/happy-me-happy-you.jpeg",
        programType: "short_term"
      },
      {
        title: "Neema Good Shepherds Orphanage",
        location: "Webuye, Bungoma County",
        sector: "Community Development",
        code: "KVDA/STV/2026/NGS",
        description: "Neema Good Shepherds School is located in Webuye West Sub-County, Bungoma County, 13 km from Webuye Town. Started in 2011 with 80 pupils under banana shade on a donated half acre of land, the school now has a population of over 300 pupils with 8 teachers and 2 non-teaching staff. Dedicated to academic excellence and character education, the school supports orphaned and vulnerable children. Volunteers participate in manual work at the school, social work with children, HIV/AIDS awareness, home visits, and inter-cultural education.",
        imageUrl: "/assets/neema-good-shepherds.webp",
        programType: "short_term"
      },
      {
        title: "Kito International Volunteers",
        location: "Siaya County, Western Kenya",
        sector: "Community Development",
        code: "KVDA/STV/2026/KIV",
        description: "KITO International is a non-profit social enterprise dedicated to getting youth off the streets and out of poverty. Inspired and founded by a former street boy, KITO combats poverty by providing economic opportunities. Based in Nairobi and Siaya, KITO trains youth in entrepreneurship, financial literacy, employability skills, and life skills. Volunteers train youths, mentor marginalized girls, design biodegradable bags, participate in Lake Victoria cleanups, conduct gender discussions, and assist in the community library.",
        imageUrl: "/assets/kito-international.webp",
        programType: "short_term"
      },
      {
        title: "Esikoma Community Health Volunteers",
        location: "Kakamega County, Western Kenya",
        sector: "Health",
        code: "KVDA/STV/2026/ECHV",
        description: "Esikoma Community Health Volunteers (ECHV) is a community self-help group established in 2014 by local volunteers operating within Butula Sub County, focusing on health and community development. The group addresses health issues including HIV/AIDS, jigger infestation among orphans, and reproductive health. Volunteers participate in rehabilitation of Busia wetlands, environmental education, conservation activities, support for vulnerable children, rural renewable energy management, and nature-based livelihood support.",
        imageUrl: "/assets/esikoma-health.webp",
        programType: "short_term"
      },
      {
        title: "Mount Olives Community Health Centre",
        location: "Mosocho, Kisii",
        sector: "Health",
        code: "KVDA/MLTV/2026/29",
        description: "Improving access to healthcare and health education in rural Kisii, focusing on maternal health, disease prevention, and community health worker training.",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
      },
      {
        title: "Ushuhuda Network for Orphans and Vulnerable Children",
        location: "Webuye, Bungoma County",
        sector: "Education",
        code: "KVDA/MLTV/2026/28",
        description: "Ushuhuda Network for Orphans and Vulnerable Children was established in 2011 and registered as a community based organization in 2012. Its major focus is to address the challenges facing the local community including high poverty levels, disease and social exclusion. HIV/AIDS is among the leading scourges within the local community. The school has a population of 150 children with 13 teachers. Volunteers participate in teaching, capacity building, social work, guiding and counseling, field visits, and home visits to enhance inter-cultural education and solidarity.",
        imageUrl: "/assets/ushuhuda-orphans.webp",
        programType: "short_term"
      },
      {
        title: "Sustainable Agriculture Initiative - KIOF",
        location: "Kiambu County",
        sector: "Agriculture",
        code: "KVDA/MLTV/2026/12",
        description: "Promoting organic farming and food security in partnership with the Kenya Institute of Organic Farming (KIOF). Volunteers learn and teach sustainable farming methods to local farmers.",
        imageUrl: "https://images.unsplash.com/photo-1625246333195-58405079a490?auto=format&fit=crop&q=80"
      },
      {
        title: "Gender Empowerment Project",
        location: "Nairobi",
        sector: "Gender",
        code: "KVDA/MLTV/2026/08",
        description: "Empowering women and girls through vocational training, leadership workshops, and advocacy to challenge patriarchal systems and promote gender equality.",
        imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80"
      },
      {
        title: "Community Health Volunteers",
        location: "Shinyalu, Kakamega",
        sector: "Health",
        code: "KVDA/MLTV/2026/30",
        description: "Training and supporting community health volunteers to provide basic healthcare services and health education in remote Kakamega villages.",
        imageUrl: "https://images.unsplash.com/photo-1584515169010-2590d737b673?auto=format&fit=crop&q=80"
      },
      {
        title: "Maasai Community Development",
        location: "Kajiado County",
        sector: "Community Development",
        code: "KVDA/MLTV/2026/15",
        description: "Working with Maasai communities on water access, education, and livelihood improvement projects. Volunteers help build water collection systems and support school programs.",
        imageUrl: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&q=80"
      },
      {
        title: "Special Needs Education Support",
        location: "Thika, Kiambu",
        sector: "Education",
        code: "KVDA/MLTV/2026/20",
        description: "Supporting children with special needs through adapted teaching methods, therapy assistance, and infrastructure improvements at special education centers.",
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80"
      },
      {
        title: "Youth Entrepreneurship Program",
        location: "Nairobi",
        sector: "Youth Development",
        code: "KVDA/MLTV/2026/02",
        description: "Equipping young people with entrepreneurial skills, financial literacy, and mentorship to create sustainable livelihoods and reduce youth unemployment.",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
      },
      {
        title: "Rural Water & Sanitation",
        location: "Machakos County",
        sector: "Water & Sanitation",
        code: "KVDA/STV/2026/08",
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

  const existingWorkcamps = await storage.getWorkcamps();
  if (existingWorkcamps.length === 0) {
    await db.insert(workcampsTable).values([
      {
        code: "KVDA/STV/01A/2026",
        name: "Kisumu Tree Planting",
        location: "Kisumu City, Kisumu County",
        county: "Kisumu",
        dates: "January 5 - 25, 2026",
        startDate: "2026-01-05",
        endDate: "2026-01-25",
        month: "January",
        type: "Environment",
        theme: "Environment / Climate Action",
        description: "This workcamp focuses on environmental conservation through tree planting in Kisumu City. Volunteers will participate in tree planting campaigns, environmental education in local schools, and community awareness on climate change and sustainable living. The project contributes to Kenya's national goal of increasing forest cover. Volunteers will also engage in cultural exchange activities with the local Luo community and explore the shores of Lake Victoria.",
        activities: "Tree planting and nursery management, Environmental education in local schools, Community awareness campaigns on climate change, Cleanup of public spaces, Cultural exchange and Lake Victoria excursions",
        accommodation: "Volunteers will be hosted at a local community center with basic amenities. Meals will be prepared collectively by volunteers and local hosts.",
        maxVolunteers: 20,
        ageRange: "18-99",
        fees: "300 EUR",
        imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?auto=format&fit=crop&q=80"
      },
      {
        code: "KVDA/STV/02A/2026",
        name: "Ebukobelo Primary School - Phase 1",
        location: "Ebukobelo, Vihiga County",
        county: "Vihiga",
        dates: "February 2 - 22, 2026",
        startDate: "2026-02-02",
        endDate: "2026-02-22",
        month: "February",
        type: "Education / Construction",
        theme: "Education / Community Development",
        description: "Ebukobelo Primary School serves over 500 pupils from disadvantaged families in Vihiga County, Western Kenya. The school urgently needs renovation and expansion of classrooms. Volunteers will assist in renovation of school buildings, painting, and construction of educational facilities. In addition, volunteers will engage in teaching support, sports activities with children, and cultural exchange with the local Maragoli community.",
        activities: "School building renovation and painting, Classroom construction support, Teaching English and Mathematics, Sports and creative activities with pupils, Cultural exchange with Maragoli community",
        accommodation: "Volunteers will stay at the school compound or nearby community hall. Basic facilities available with shared cooking arrangements.",
        maxVolunteers: 20,
        ageRange: "18-99",
        fees: "300 EUR",
        imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80"
      },
      {
        code: "KVDA/STV/03A/2026",
        name: "Neema Good Shepherds School - Phase 1",
        location: "Kimilili, Bungoma County",
        county: "Bungoma",
        dates: "March 2 - 22, 2026",
        startDate: "2026-03-02",
        endDate: "2026-03-22",
        month: "March",
        type: "Education / Women Empowerment",
        theme: "Education / Women Empowerment",
        description: "Neema Good Shepherds School in Kimilili sub-county of Bungoma County was established to support orphans and vulnerable children, with a special focus on girl-child education and women empowerment. The school provides a safe learning environment for children who would otherwise have no access to education. Volunteers will support teaching, mentoring of girls and young women, and participate in women empowerment workshops in the community.",
        activities: "Teaching and tutoring (English, Math, Science), Girl-child mentorship programs, Women empowerment workshops, Renovation and maintenance of school facilities, Cultural exchange and community visits",
        accommodation: "Hosted at the school guest house or local families. Meals shared with the community.",
        maxVolunteers: 20,
        ageRange: "18-99",
        fees: "300 EUR",
        imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80"
      },
      {
        code: "KVDA/STV/06A/2026",
        name: "Gideon Mosi Primary School",
        location: "Nambale, Busia County",
        county: "Busia",
        dates: "June 1 - 21, 2026",
        startDate: "2026-06-01",
        endDate: "2026-06-21",
        month: "June",
        type: "Education / Construction",
        theme: "Education / Community Development",
        description: "Gideon Mosi Primary School is located in Nambale sub-county of Busia County near the Kenya-Uganda border. The school serves a farming community and faces challenges of inadequate infrastructure, few teaching materials, and limited sanitation facilities. Volunteers will support construction and renovation of classrooms, assist in teaching, and help improve sanitation facilities at the school.",
        activities: "Classroom construction and renovation, Teaching support (English, Math, Creative Arts), Building and renovating sanitation facilities, Sports and games with pupils, Community engagement and cultural exchange",
        accommodation: "Accommodation at the school compound or nearby community center. Volunteers cook meals together with local coordinators.",
        maxVolunteers: 20,
        ageRange: "18-99",
        fees: "300 EUR",
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80"
      },
      {
        code: "KVDA/STV/07A/2026",
        name: "Shining Star ECDC",
        location: "Luanda, Vihiga County",
        county: "Vihiga",
        dates: "July 6 - 26, 2026",
        startDate: "2026-07-06",
        endDate: "2026-07-26",
        month: "July",
        type: "Education / Child Development",
        theme: "Education / Early Childhood Development",
        description: "Shining Star Early Childhood Development Centre (ECDC) in Luanda, Vihiga County, provides pre-school education for children aged 3-6 years from vulnerable families. The centre needs renovation, learning materials, and playground equipment. Volunteers will assist in renovating the facility, creating learning materials, building outdoor play structures, and engaging children in educational activities through play-based learning approaches.",
        activities: "Renovation and painting of classrooms, Creating learning and teaching materials, Building playground equipment, Play-based educational activities with children, Community health awareness campaigns",
        accommodation: "Hosted in a local community hall or volunteer house. Meals prepared communally.",
        maxVolunteers: 20,
        ageRange: "18-99",
        fees: "300 EUR",
        imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80"
      },
      {
        code: "KVDA/STV/07B/2026",
        name: "Mount Olives Health Centre",
        location: "Mosocho, Kisii County",
        county: "Kisii",
        dates: "July 6 - 26, 2026",
        startDate: "2026-07-06",
        endDate: "2026-07-26",
        month: "July",
        type: "Health",
        theme: "Health / Community Development",
        description: "Mount Olives Community Health Centre in Mosocho, Kisii County, provides essential healthcare services to rural communities. The health centre faces challenges of understaffing, limited medical supplies, and poor infrastructure. Volunteers will assist in health awareness campaigns, renovation of the facility, and community outreach on preventive health topics including maternal health, HIV/AIDS awareness, and nutrition education.",
        activities: "Community health awareness campaigns, Health facility renovation and painting, Maternal health education outreach, HIV/AIDS awareness programs, Nutrition education and demonstrations",
        accommodation: "Hosted at the health centre's guest wing or nearby community housing. Meals prepared by local cooks.",
        maxVolunteers: 20,
        ageRange: "18-99",
        fees: "300 EUR",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
      },
      {
        code: "KVDA/STV/07C/2026",
        name: "KVDA Volunteers Centre Construction",
        location: "Karen, Nairobi County",
        county: "Nairobi",
        dates: "July 6 - 26, 2026",
        startDate: "2026-07-06",
        endDate: "2026-07-26",
        month: "July",
        type: "Construction",
        theme: "Construction / Organizational Development",
        description: "KVDA is constructing a Volunteers Centre at its headquarters in Karen, Nairobi. The centre will serve as a hub for volunteer orientation, training, cultural exchange, and accommodation for incoming international volunteers. This project directly contributes to KVDA's organizational capacity to host and coordinate volunteer programs. Volunteers will participate in construction work alongside local artisans and learn traditional building techniques.",
        activities: "Construction work (masonry, carpentry, painting), Site clearing and landscaping, Building furniture and fittings, Cultural exchange programs in Nairobi, Weekend excursions to nearby attractions",
        accommodation: "Volunteers will be hosted at the KVDA headquarters compound in Karen. Meals provided at the centre.",
        maxVolunteers: 20,
        ageRange: "18-99",
        fees: "300 EUR",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80"
      },
      {
        code: "KVDA/STV/07D/2026",
        name: "Ebukobelo Primary School - Phase 2",
        location: "Ebukobelo, Vihiga County",
        county: "Vihiga",
        dates: "July 6 - 26, 2026",
        startDate: "2026-07-06",
        endDate: "2026-07-26",
        month: "July",
        type: "Education / Construction",
        theme: "Education / Community Development",
        description: "Phase 2 of the Ebukobelo Primary School project continues the renovation and construction work started in February. This phase focuses on completing classroom renovations, building a school library, and setting up a computer lab. Volunteers will also support the school's summer learning program for children who need academic support during the school holiday period.",
        activities: "Completion of classroom renovations, Library and computer lab construction, Summer learning program facilitation, Sports tournament organization, Community engagement activities",
        accommodation: "Volunteers will stay at the school compound or nearby community hall. Basic facilities available with shared cooking arrangements.",
        maxVolunteers: 20,
        ageRange: "18-99",
        fees: "300 EUR",
        imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80"
      },
      {
        code: "KVDA/STV/08A/2026",
        name: "Neema Good Shepherds School - Phase 2",
        location: "Kimilili, Bungoma County",
        county: "Bungoma",
        dates: "August 3 - 23, 2026",
        startDate: "2026-08-03",
        endDate: "2026-08-23",
        month: "August",
        type: "Education / Women Empowerment",
        theme: "Education / Women Empowerment",
        description: "Phase 2 of the Neema Good Shepherds School project continues the focus on supporting orphans, vulnerable children, and women empowerment in Kimilili. This phase emphasizes skills training for young women, establishing a school garden for nutrition, and continuing infrastructure improvements. The project aims to create sustainable livelihood opportunities for women in the community.",
        activities: "Skills training workshops for young women, School garden establishment and farming, Infrastructure renovation continuation, Mentorship and career guidance programs, Community cultural exchange events",
        accommodation: "Hosted at the school guest house or local families. Meals shared with the community.",
        maxVolunteers: 20,
        ageRange: "18-99",
        fees: "300 EUR",
        imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80"
      },
      {
        code: "KVDA/STV/08B/2026",
        name: "Nyamira Missionaries Cultural Development",
        location: "Nyaramba, Nyamira County",
        county: "Nyamira",
        dates: "August 3 - 24, 2026",
        startDate: "2026-08-03",
        endDate: "2026-08-24",
        month: "August",
        type: "CULT/MANU/ART",
        theme: "Entrepreneurship Skills Training",
        description: "Nyamira Missionaries was founded and registered with Social Development in 2002. Located at Nyaramba in Nyamira County, the organization consists of 137 members including men, women, and youth aged 18 to 80 years. The organization promotes cultural preservation through traditional Gusii dances, soapstone carvings, clay and wooden artifacts, African basket weaving, and runs community development programs including an orphanage home and women empowerment initiatives.",
        activities: "Weaving, Art work, Women training on self-awareness and confidence building, Women training on entrepreneurship skills and financial management, Meetings and media campaign on women empowerment in leadership, Home visits and topical discussion with the local people, Traditional Gusii cultural dances, Soapstone carving and artifact making",
        accommodation: "Self-contained volunteer rooms at the organization offices with warm water and cooking facilities. Clean and secure environment with friendly neighbourhood. KVDA will provide foodstuffs and volunteers will cook their own meals in turns.",
        maxVolunteers: 20,
        ageRange: "18+",
        fees: "300 EUR",
        imageUrl: "/assets/nyamira-missionaries.webp"
      },
      {
        code: "KVDA/STV/08C/2026",
        name: "Nyamanche Primary School",
        location: "Nyamanche, Kisii County",
        county: "Kisii",
        dates: "August 3 - 23, 2026",
        startDate: "2026-08-03",
        endDate: "2026-08-23",
        month: "August",
        type: "Education / Construction",
        theme: "Education / Community Development",
        description: "Nyamanche Primary School in Kisii County serves a rural community with limited educational resources. The school needs renovation of existing structures, additional classrooms, and improved sanitation facilities. Volunteers will participate in construction work, teaching support during the school term, and organizing extracurricular activities for pupils. The project also includes community health awareness campaigns.",
        activities: "School renovation and construction, Teaching support (English, Sciences), Sanitation facility improvement, Extracurricular activities (sports, arts, music), Community health awareness campaigns",
        accommodation: "Community center near the school. Shared cooking and basic amenities.",
        maxVolunteers: 20,
        ageRange: "18-99",
        fees: "300 EUR",
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80"
      },
      {
        code: "KVDA/STV/08D/2026",
        name: "Kanana Hill Academy",
        location: "Kanana, Kisii County",
        county: "Kisii",
        dates: "August 3 - 23, 2026",
        startDate: "2026-08-03",
        endDate: "2026-08-23",
        month: "August",
        type: "Education",
        theme: "Education / Youth Development",
        description: "Kanana Hill Academy is a community school serving children from low-income families in Kisii County. The academy focuses on holistic education and character development. Volunteers will support teaching activities, organize life skills workshops for youth, assist in school infrastructure improvements, and engage in community outreach programs focusing on education advocacy.",
        activities: "Teaching and tutoring support, Life skills workshops for youth, School infrastructure improvements, Education advocacy in the community, Sports and recreational activities",
        accommodation: "School dormitory or community accommodation. Meals prepared communally.",
        maxVolunteers: 20,
        ageRange: "18-99",
        fees: "300 EUR",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
      },
      {
        code: "KVDA/STV/03A/2026",
        name: "St. James Community Orphans School",
        location: "Mfangano Island, Homa Bay County",
        county: "Homa Bay",
        dates: "March 8 - 28, 2026",
        startDate: "2026-03-08",
        endDate: "2026-03-28",
        month: "March",
        type: "CHIL/AGRI/EDUC",
        theme: "Teenage Pregnancy in the Society",
        description: "St. James Community Orphans School is a community-owned school located on Mfangano Island in Lake Victoria, Homa Bay County. Started in 2014 with 45 orphans, the school now has a population of 112 both total and partial orphans aged between 3 to 12 years, with 8 teachers across 7 classes. Being on an island with many fishing beaches, the community faces high HIV/AIDS prevalence which leads to many orphans. The school addresses free education for orphans, poor nutrition, and alarming low levels of domestic income among caregiver households.",
        activities: "Farming, Home visits to orphans and caregivers, Sports with school pupils, Workshops about children rights to the local community, Advocacy against teenage pregnancy, Social work and guiding and counseling for HIV/AIDS program at the health center, Field visits and face to face meetings with local people, Inter-cultural education and solidarity",
        accommodation: "The host community will provide a house with basic living conditions. KVDA will provide foodstuffs and volunteers cook their own meals in turns. Water available from springs - drinking water should be boiled or medicated. No electricity at the project but volunteers can charge appliances at nearest market center.",
        maxVolunteers: 20,
        ageRange: "18+",
        fees: "300 EUR",
        imageUrl: "/assets/st-james-orphans.jpg"
      },
      {
        code: "KVDA/STV/09A/2026",
        name: "Happy Me Happy You",
        location: "Kisumu City, Kisumu County",
        county: "Kisumu",
        dates: "September 7 - 27, 2026",
        startDate: "2026-09-07",
        endDate: "2026-09-27",
        month: "September",
        type: "Health / Youth Development",
        theme: "Mental Health / Youth Empowerment",
        description: "Happy Me Happy You is a community-based organization in Kisumu working on mental health awareness and youth empowerment. The project addresses the growing mental health challenges among young people through art therapy, counseling support, and community dialogue. Volunteers will facilitate mental health awareness workshops, creative arts sessions, and youth empowerment programs. The project also supports young people living with HIV/AIDS.",
        activities: "Mental health awareness workshops, Art therapy and creative expression, Youth empowerment and leadership training, Community dialogue on mental health, Support for youth living with HIV/AIDS",
        accommodation: "Volunteer house in Kisumu City. Meals prepared at the volunteer house.",
        maxVolunteers: 20,
        ageRange: "18-99",
        fees: "300 EUR",
        imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80"
      },
      {
        code: "KVDA/STV/10A/2026",
        name: "Kamagap Comprehensive School",
        location: "Bomet County",
        county: "Bomet",
        dates: "October 5 - 25, 2026",
        startDate: "2026-10-05",
        endDate: "2026-10-25",
        month: "October",
        type: "Education / Agriculture",
        theme: "Education / Sustainable Agriculture",
        description: "Kamagap Comprehensive School is located in Bomet County in the South Rift region of Kenya. The school serves a predominantly pastoralist Kipsigis community. Volunteers will support teaching activities, establish a school kitchen garden for nutrition, and participate in environmental conservation activities. The project also includes cultural exchange with the Kipsigis community and visits to local tea plantations.",
        activities: "Teaching support and academic programs, School kitchen garden establishment, Environmental conservation activities, Cultural exchange with Kipsigis community, Visits to local tea farms and factories",
        accommodation: "School compound or community center. Meals prepared communally with local produce.",
        maxVolunteers: 20,
        ageRange: "18-99",
        fees: "300 EUR",
        imageUrl: "https://images.unsplash.com/photo-1625246333195-58405079a490?auto=format&fit=crop&q=80"
      },
      {
        code: "KVDA/STV/11A/2026",
        name: "KITO International",
        location: "Kisumu City, Kisumu County",
        county: "Kisumu",
        dates: "November 2 - 22, 2026",
        startDate: "2026-11-02",
        endDate: "2026-11-22",
        month: "November",
        type: "Community Development",
        theme: "Community Development / Social Enterprise",
        description: "KITO International is a community development organization based in Kisumu that works on social enterprise, youth skills training, and community empowerment. The project focuses on building capacity for local youth through vocational training, entrepreneurship workshops, and community development initiatives. Volunteers will assist in facilitating training sessions, supporting social enterprise activities, and engaging in community outreach.",
        activities: "Vocational skills training facilitation, Entrepreneurship workshops, Social enterprise development support, Community outreach and engagement, Cultural exchange activities in Kisumu",
        accommodation: "KITO volunteer house in Kisumu. Meals provided at the volunteer house.",
        maxVolunteers: 20,
        ageRange: "18-99",
        fees: "300 EUR",
        imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80"
      }
    ]);
  }
}
