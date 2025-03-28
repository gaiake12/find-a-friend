import { FastifyInstance } from "fastify";
import { create } from "./create";
import { findByCity } from "./findByCity";

export function petsRoutes(app: FastifyInstance) {
  app.post("/pets", create);
  app.get("/pets/city", findByCity);
}
