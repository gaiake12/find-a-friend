import request from "supertest";
import { app } from "@/app";
import { describe, it, beforeAll, afterAll, expect } from "vitest";

describe("Create Org (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a org", async () => {
    const response = await request(app.server).post("/orgs").send({
      name: "Care Pet",
      description: "Care Pet",
      email: "johndoe@teste.com.br",
      password: "123123123",
      phone: "11999999999",
      city: "São Paulo",
    });

    expect(response.statusCode).toEqual(201);
  });
});
