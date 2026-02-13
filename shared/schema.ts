
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  duration: text("duration"),
  imageUrl: text("image_url"),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  sector: text("sector").notNull(),
  code: text("code"),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at").defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  location: text("location"),
  imageUrl: text("image_url"),
  type: text("type"),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  email: text("email"),
  phone: text("phone"),
  imageUrl: text("image_url"),
  order: integer("order").default(0),
});

export const boardMembers = pgTable("board_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  imageUrl: text("image_url"),
  order: integer("order").default(0),
});

export const partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country"),
  website: text("website"),
  logoUrl: text("logo_url"),
  description: text("description"),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country"),
  program: text("program"),
  quote: text("quote").notNull(),
  imageUrl: text("image_url"),
});

export const volunteerApplications = pgTable("volunteer_applications", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  gender: text("gender").notNull(),
  nationality: text("nationality").notNull(),
  passportNumber: text("passport_number"),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  emergencyContactName: text("emergency_contact_name").notNull(),
  emergencyContactPhone: text("emergency_contact_phone").notNull(),
  emergencyContactRelation: text("emergency_contact_relation").notNull(),
  programType: text("program_type").notNull(),
  preferredProject: text("preferred_project"),
  preferredStartDate: text("preferred_start_date"),
  preferredDuration: text("preferred_duration"),
  skills: text("skills"),
  languages: text("languages"),
  motivation: text("motivation").notNull(),
  healthConditions: text("health_conditions"),
  dietaryRequirements: text("dietary_requirements"),
  howDidYouHear: text("how_did_you_hear"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertProgramSchema = createInsertSchema(programs).omit({ id: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertNewsSchema = createInsertSchema(news).omit({ id: true, publishedAt: true });
export const insertInquirySchema = createInsertSchema(inquiries).omit({ id: true, createdAt: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true });
export const insertBoardMemberSchema = createInsertSchema(boardMembers).omit({ id: true });
export const insertPartnerSchema = createInsertSchema(partners).omit({ id: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export const insertVolunteerApplicationSchema = createInsertSchema(volunteerApplications).omit({ id: true, status: true, createdAt: true });

// Types
export type User = typeof users.$inferSelect;
export type Program = typeof programs.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type News = typeof news.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Event = typeof events.$inferSelect;
export type TeamMember = typeof teamMembers.$inferSelect;
export type BoardMember = typeof boardMembers.$inferSelect;
export type Partner = typeof partners.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type VolunteerApplication = typeof volunteerApplications.$inferSelect;
export type InsertVolunteerApplication = z.infer<typeof insertVolunteerApplicationSchema>;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type InsertBoardMember = z.infer<typeof insertBoardMemberSchema>;
