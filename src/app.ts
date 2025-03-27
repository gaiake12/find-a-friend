import fastify from "fastify";
import { orgsRoutes } from "./http/controllers/orgs/routes";
import { petsRoutes } from "./http/controllers/pets/routes";

export const app = fastify();

app.register(orgsRoutes);
app.register(petsRoutes);
