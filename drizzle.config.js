/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://interview_owner:8EY4IyawxOmb@ep-broad-star-a1374txd.ap-southeast-1.aws.neon.tech/interview?sslmode=require",
  },
};
