import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "../server/storage";
import { db } from "../server/db";
import { users } from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Endpoint de teste de conexão com Neon
  app.get("/api/test-db", async (req, res) => {
    try {
      // Tenta buscar 1 usuário no banco Neon
      const result = await db.select().from(users).limit(1);
      res.json({ ok: true, result });
    } catch (err) {
      res.status(500).json({ ok: false, error: String(err) });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
