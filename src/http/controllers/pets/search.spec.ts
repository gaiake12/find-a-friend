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

  it("should be able to search pets by color", async () => {
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
      .get("/pets/search")
      .query({
        query: "Caramelo",
        page: 1,
      })
      .send();

    expect(response.status).toEqual(200);
    expect(response.body.pets).toHaveLength(1);
    expect(response.body.pets[0]).toEqual(
      expect.objectContaining({
        race: "Vira-Lata",
      })
    );
  });

  it("should be able to search pets by race", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    const response = await request(app.server)
      .get("/pets/search")
      .query({
        query: "Pastor Alemão",
        page: 1,
      })
      .send();

    console.log(response.body.pets);

    expect(response.status).toEqual(200);
    expect(response.body.pets).toHaveLength(1);
    expect(response.body.pets[0]).toEqual(
      expect.objectContaining({
        race: "Pastor Alemão",
      })
    );
  });
});
