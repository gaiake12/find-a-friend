import { FastifyInstance } from "fastify";
import { create } from "./create";
import { authenticate } from "./authenticate";

export function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", create);
  app.post("/orgs/authenticate", authenticate);
}
