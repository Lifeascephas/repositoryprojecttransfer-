
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { api } from "@shared/routes";
import { programs, projects, news, db } from "./db"; // Need to import tables and db for seeding
import { programs as programsTable, projects as projectsTable, news as newsTable } from "@shared/schema"; // Correct import

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Replit Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  // Programs
  app.get(api.programs.list.path, async (req, res) => {
    const items = await storage.getPrograms();
    res.json(items);
  });

  app.get(api.programs.get.path, async (req, res) => {
    const item = await storage.getProgram(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Program not found" });
    res.json(item);
  });

  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const items = await storage.getProjects();
    res.json(items);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const item = await storage.getProject(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Project not found" });
    res.json(item);
  });

  // News
  app.get(api.news.list.path, async (req, res) => {
    const items = await storage.getNews();
    res.json(items);
  });

  app.get(api.news.get.path, async (req, res) => {
    const item = await storage.getNewsItem(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "News item not found" });
    res.json(item);
  });

  // Inquiries
  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

  // Seed Data
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
        description: "3-week group-based projects focused on community service, cultural exchange, and global solidarity. Activities include farming, construction, and awareness campaigns.",
        duration: "3 Weeks",
        imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80"
      },
      {
        title: "Medium & Long-Term Volunteering",
        type: "long_term",
        description: "Individual placements lasting 1-12 months. Immerse yourself in local communities, learn languages, and contribute to health, education, or environmental projects.",
        duration: "1 - 12 Months",
        imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?auto=format&fit=crop&q=80"
      },
      {
        title: "Outbound Volunteering",
        type: "outbound",
        description: "Opportunities for Kenyans to volunteer abroad in Africa, Asia, Europe, and the Americas through our international partner networks.",
        duration: "2 Weeks - 1 Year",
        imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80"
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
        description: "Conserving the Maasai Mara ecosystem while empowering the local community through sustainable tourism and wildlife protection.",
        imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80"
      },
      {
        title: "Mount Olives Community Health Centre",
        location: "Mosocho, Kisii",
        sector: "Health & Education",
        code: "KVDA/MLTV/2023/29",
        description: "Improving access to healthcare and health education in rural Kisii, focusing on maternal health and disease prevention.",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
      },
      {
        title: "Sustainable Agriculture Initiative",
        location: "Kiambu County",
        sector: "Agriculture",
        code: "KVDA/MLTV/2023/12",
        description: "Promoting organic farming and food security in partnership with the Kenya Institute of Organic Farming (KIOF).",
        imageUrl: "https://images.unsplash.com/photo-1625246333195-58405079a490?auto=format&fit=crop&q=80"
      },
      {
        title: "Gender Empowerment Project",
        location: "Nairobi",
        sector: "Gender",
        code: "KVDA/MLTV/2023/08",
        description: "Empowering women and girls through vocational training and leadership workshops to challenge patriarchal systems.",
        imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80"
      }
    ]);
  }

  const existingNews = await storage.getNews();
  if (existingNews.length === 0) {
    await db.insert(newsTable).values([
      {
        title: "KVDA Celebrates 60 Years of Service",
        content: "We are proud to celebrate six decades of voluntary service and community development in Kenya. Join us in reflecting on our journey.",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980968a0c?auto=format&fit=crop&q=80"
      },
      {
        title: "New International Partnership Announced",
        content: "KVDA has forged a new partnership with Service Volontaire International (SVI) to increase exchange opportunities for youth.",
        imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80"
      }
    ]);
  }
}
