export const appConfig = () => ({
  environment: process.env.NODE_ENV || "production",
  database: {
    host: "neon",
    port: 5432,
    user: "admin",
    password: "admin"
  }
});
