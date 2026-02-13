
import { z } from 'zod';
import { insertInquirySchema, insertVolunteerApplicationSchema, insertTeamMemberSchema, insertBoardMemberSchema, programs, projects, news, inquiries, events, teamMembers, boardMembers, partners, testimonials, volunteerApplications } from './schema';

export { insertInquirySchema, insertVolunteerApplicationSchema, insertTeamMemberSchema, insertBoardMemberSchema };

export type InsertInquiry = z.infer<typeof insertInquirySchema>;

export const api = {
  programs: {
    list: {
      method: 'GET' as const,
      path: '/api/programs' as const,
      responses: {
        200: z.array(z.custom<typeof programs.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/programs/:id' as const,
      responses: {
        200: z.custom<typeof programs.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    }
  },
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects' as const,
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/projects/:id' as const,
      responses: {
        200: z.custom<typeof projects.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    }
  },
  news: {
    list: {
      method: 'GET' as const,
      path: '/api/news' as const,
      responses: {
        200: z.array(z.custom<typeof news.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/news/:id' as const,
      responses: {
        200: z.custom<typeof news.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    }
  },
  inquiries: {
    create: {
      method: 'POST' as const,
      path: '/api/inquiries' as const,
      input: insertInquirySchema,
      responses: {
        201: z.custom<typeof inquiries.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    }
  },
  events: {
    list: {
      method: 'GET' as const,
      path: '/api/events' as const,
      responses: {
        200: z.array(z.custom<typeof events.$inferSelect>()),
      },
    },
  },
  teamMembers: {
    list: {
      method: 'GET' as const,
      path: '/api/team-members' as const,
      responses: {
        200: z.array(z.custom<typeof teamMembers.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/team-members' as const,
      input: insertTeamMemberSchema,
      responses: {
        201: z.custom<typeof teamMembers.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/team-members/:id' as const,
      input: insertTeamMemberSchema.partial(),
      responses: {
        200: z.custom<typeof teamMembers.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/team-members/:id' as const,
      responses: {
        200: z.object({ success: z.boolean() }),
        404: z.object({ message: z.string() }),
      },
    },
  },
  boardMembers: {
    list: {
      method: 'GET' as const,
      path: '/api/board-members' as const,
      responses: {
        200: z.array(z.custom<typeof boardMembers.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/board-members' as const,
      input: insertBoardMemberSchema,
      responses: {
        201: z.custom<typeof boardMembers.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/board-members/:id' as const,
      input: insertBoardMemberSchema.partial(),
      responses: {
        200: z.custom<typeof boardMembers.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/board-members/:id' as const,
      responses: {
        200: z.object({ success: z.boolean() }),
        404: z.object({ message: z.string() }),
      },
    },
  },
  partners: {
    list: {
      method: 'GET' as const,
      path: '/api/partners' as const,
      responses: {
        200: z.array(z.custom<typeof partners.$inferSelect>()),
      },
    },
  },
  testimonials: {
    list: {
      method: 'GET' as const,
      path: '/api/testimonials' as const,
      responses: {
        200: z.array(z.custom<typeof testimonials.$inferSelect>()),
      },
    },
  },
  volunteerApplications: {
    create: {
      method: 'POST' as const,
      path: '/api/volunteer-applications' as const,
      input: insertVolunteerApplicationSchema,
      responses: {
        201: z.custom<typeof volunteerApplications.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/volunteer-applications' as const,
      responses: {
        200: z.array(z.custom<typeof volunteerApplications.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/volunteer-applications/:id' as const,
      responses: {
        200: z.custom<typeof volunteerApplications.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
    updateStatus: {
      method: 'PATCH' as const,
      path: '/api/volunteer-applications/:id/status' as const,
      input: z.object({ status: z.string() }),
      responses: {
        200: z.custom<typeof volunteerApplications.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
