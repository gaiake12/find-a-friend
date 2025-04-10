import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/orgs").send({
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

    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
