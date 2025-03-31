import { FastifyInstance } from "fastify";
import { create } from "./create";
import { findByCity } from "./findByCity";
import { search } from "./search";
import { fetchInfo } from "./fetchInfo";
import { checkJWT } from "@/http/middlewares/check-jwt";

export function petsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: checkJWT }, create);
  app.get("/pets/city", findByCity);
  app.get("/pets/search", search);
  app.get("/pets/:id", fetchInfo);
}
