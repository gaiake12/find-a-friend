import { FastifyInstance } from "fastify";
import { create } from "./create";

export function petsRoutes(app: FastifyInstance) {
  app.post("/pets", create);
}
