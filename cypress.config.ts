import { tmpdir } from "os";
import * as dotenv from "dotenv";
import { defineConfig } from "cypress";

dotenv.config({ path: ".env.test" });
dotenv.config();

export default defineConfig({
  env: {
    database_url: `file:${tmpdir()}/${process.env.DATABASE_NAME}.sqlite`,
    next_auth_secret: process.env.NEXTAUTH_SECRET,
    mobileViewportWidthBreakpoint: 414,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/tests/**/*.spec.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    chromeWebSecurity: false,
    viewportHeight: 1000,
    viewportWidth: 1280,
  },
});
