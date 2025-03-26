import { FastifyInstance } from "fastify";
import { create } from "./create";

export function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", create);
}
