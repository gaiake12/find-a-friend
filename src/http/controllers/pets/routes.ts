import { FastifyInstance } from "fastify";
import { create } from "./create";
import { findByCity } from "./findByCity";
import { search } from "./search";

export function petsRoutes(app: FastifyInstance) {
  app.post("/pets", create);
  app.get("/pets/city", findByCity);
  app.get("/pets/search", search);
}
