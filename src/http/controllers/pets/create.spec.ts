import request from "supertest";
import { describe, it, beforeAll, afterAll, expect } from "vitest";

import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/utils/tests/create-and-authenticate-org";
import { prisma } from "@/lib/prisma";

describe("Create Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a pet", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        race: "Pastor Alemão",
        color: "Branco",
      });

    expect(response.status).toEqual(201);
  });
});
