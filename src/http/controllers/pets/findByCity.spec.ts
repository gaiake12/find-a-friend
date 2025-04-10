import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/utils/tests/create-and-authenticate-org";

describe("Find Pets By City (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to find pets by city", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        race: "Pastor Alemão",
        color: "Branco",
      });

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        race: "Vira-Lata",
        color: "Caramelo",
      });

    const response = await request(app.server)
      .get("/pets/city")
      .query({
        city: "São Paulo",
      })
      .send();

    expect(response.status).toEqual(200);
    expect(response.body.pets).toHaveLength(2);
  });
});
