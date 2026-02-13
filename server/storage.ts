
import { 
  programs, projects, news, inquiries, events, teamMembers, boardMembers, partners, testimonials, volunteerApplications,
  type Program, type Project, type News, type Inquiry, type InsertInquiry,
  type Event, type TeamMember, type BoardMember, type Partner, type Testimonial,
  type VolunteerApplication, type InsertVolunteerApplication,
  type InsertTeamMember, type InsertBoardMember
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc } from "drizzle-orm";

export interface IStorage {
  getPrograms(): Promise<Program[]>;
  getProgram(id: number): Promise<Program | undefined>;
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getNews(): Promise<News[]>;
  getNewsItem(id: number): Promise<News | undefined>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  getTeamMembers(): Promise<TeamMember[]>;
  getBoardMembers(): Promise<BoardMember[]>;
  getPartners(): Promise<Partner[]>;
  getTestimonials(): Promise<Testimonial[]>;
  createVolunteerApplication(application: InsertVolunteerApplication): Promise<VolunteerApplication>;
  getVolunteerApplications(): Promise<VolunteerApplication[]>;
  getVolunteerApplication(id: number): Promise<VolunteerApplication | undefined>;
  updateVolunteerApplicationStatus(id: number, status: string): Promise<VolunteerApplication | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: number): Promise<boolean>;
  createBoardMember(member: InsertBoardMember): Promise<BoardMember>;
  updateBoardMember(id: number, member: Partial<InsertBoardMember>): Promise<BoardMember | undefined>;
  deleteBoardMember(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getPrograms(): Promise<Program[]> {
    return await db.select().from(programs);
  }

  async getProgram(id: number): Promise<Program | undefined> {
    const [program] = await db.select().from(programs).where(eq(programs.id, id));
    return program;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async getNews(): Promise<News[]> {
    return await db.select().from(news).orderBy(desc(news.publishedAt));
  }

  async getNewsItem(id: number): Promise<News | undefined> {
    const [item] = await db.select().from(news).where(eq(news.id, id));
    return item;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db.insert(inquiries).values(insertInquiry).returning();
    return inquiry;
  }

  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers).orderBy(asc(teamMembers.order));
  }

  async getBoardMembers(): Promise<BoardMember[]> {
    return await db.select().from(boardMembers).orderBy(asc(boardMembers.order));
  }

  async getPartners(): Promise<Partner[]> {
    return await db.select().from(partners);
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async createVolunteerApplication(application: InsertVolunteerApplication): Promise<VolunteerApplication> {
    const [result] = await db.insert(volunteerApplications).values(application).returning();
    return result;
  }

  async getVolunteerApplications(): Promise<VolunteerApplication[]> {
    return await db.select().from(volunteerApplications).orderBy(desc(volunteerApplications.createdAt));
  }

  async getVolunteerApplication(id: number): Promise<VolunteerApplication | undefined> {
    const [result] = await db.select().from(volunteerApplications).where(eq(volunteerApplications.id, id));
    return result;
  }

  async updateVolunteerApplicationStatus(id: number, status: string): Promise<VolunteerApplication | undefined> {
    const [result] = await db.update(volunteerApplications).set({ status }).where(eq(volunteerApplications.id, id)).returning();
    return result;
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [result] = await db.insert(teamMembers).values(member).returning();
    return result;
  }

  async updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const [result] = await db.update(teamMembers).set(member).where(eq(teamMembers.id, id)).returning();
    return result;
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    const result = await db.delete(teamMembers).where(eq(teamMembers.id, id)).returning();
    return result.length > 0;
  }

  async createBoardMember(member: InsertBoardMember): Promise<BoardMember> {
    const [result] = await db.insert(boardMembers).values(member).returning();
    return result;
  }

  async updateBoardMember(id: number, member: Partial<InsertBoardMember>): Promise<BoardMember | undefined> {
    const [result] = await db.update(boardMembers).set(member).where(eq(boardMembers.id, id)).returning();
    return result;
  }

  async deleteBoardMember(id: number): Promise<boolean> {
    const result = await db.delete(boardMembers).where(eq(boardMembers.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
