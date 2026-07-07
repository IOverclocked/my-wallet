import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    // provider: "postgresql",
    url: env("DATABASE_URL"),
  },
  adapter: new PgAdapter({
    connectionString: env("DATABASE_URL"),
  }),
});
