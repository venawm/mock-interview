import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mock-interview", {
  id: serial("id").primaryKey(),
  jsonMockResp: varchar("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExp: varchar("jobExp").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
  mockId: varchar("mockId").notNull(),
});
