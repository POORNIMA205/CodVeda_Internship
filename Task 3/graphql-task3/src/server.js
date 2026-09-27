import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";

import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import { createUserLoader } from "./loaders/userLoader.js";
import { UserModel } from "./models/User.js";
import "./config/db.js";

const PORT = process.env.PORT || 5000;

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in .env");
}

const app = express();
const httpServer = http.createServer(app);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(morgan("dev"));

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await apolloServer.start();

app.get("/api/health", (_, res) => {
  res.json({ status: "ok", service: "graphql-task3-api" });
});

app.use(
  "/graphql",
  express.json({ limit: "20kb" }),
  expressMiddleware(apolloServer, {
    context: async ({ req }) => {
      let user = null;
      const header = req.headers.authorization;

      if (header?.startsWith("Bearer ")) {
        try {
          const token = header.slice(7);
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const dbUser = UserModel.findById(decoded.id);
          if (dbUser) {
            user = {
              id: String(dbUser.id),
              role: dbUser.role
            };
          }
        } catch {
          user = null;
        }
      }

      return {
        user,
        loaders: {
          user: createUserLoader()
        }
      };
    }
  })
);

app.get("/", (_, res) => {
  res.json({
    message: "GraphQL API is running",
    endpoint: "/graphql"
  });
});

app.use((err, _, res, next) => {
  if (res.headersSent) return next(err);
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`GraphQL server running on http://localhost:${PORT}/graphql`);
