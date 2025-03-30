import { FastifyInstance } from "fastify";
import { create } from "./create";
import { findByCity } from "./findByCity";
import { search } from "./search";
import { fetchInfo } from "./fetchInfo";

export function petsRoutes(app: FastifyInstance) {
  app.post("/pets", create);
  app.get("/pets/city", findByCity);
  app.get("/pets/search", search);
  app.get("/pets/:id", fetchInfo);
}
