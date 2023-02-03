/// <reference types="vitest" />
import * as dotenv from "dotenv";
import { defineConfig } from "vitest/config";

dotenv.config(); // load env vars from .env

// https://vitest.dev/config/#configuration
export default defineConfig({
  test: {
    environment: "prisma",
    environmentOptions: {
      envFile: ".env.test",
    },
    exclude: ["./cypress", "./node_modules"],
  },
});
