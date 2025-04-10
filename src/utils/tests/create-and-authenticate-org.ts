import request from "supertest";
import { FastifyInstance } from "fastify";

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const responseCreate = await request(app.server).post("/orgs").send({
    name: "Care Pet",
    description: "Care Pet",
    email: "johndoe@teste.com.br",
    password: "123123123",
    phone: "11999999999",
    city: "São Paulo",
  });

  const response = await request(app.server).post("/orgs/authenticate").send({
    email: "johndoe@teste.com.br",
    password: "123123123",
  });

  const { token } = response.body;

  return { token };
}
