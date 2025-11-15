import { registerAs } from "@nestjs/config";
export default registerAs("database", () => ({
  host: "neon",
  port: 5432,
  user: "admin",
  password: "admin"
}));
