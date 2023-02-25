/// <reference types="vitest" />
import { loadEnvConfig } from "@next/env";
import { defineConfig } from "vitest/config";

loadEnvConfig(process.cwd()); // load env vars from .env and .env.test

// https://vitest.dev/config/#configuration
export default defineConfig({
  test: {
    environment: "prisma",
    environmentOptions: {
      adapter: "sqlite",
      envFile: ".env.test",
    },
    exclude: ["./cypress", "./node_modules"],
  },
});
