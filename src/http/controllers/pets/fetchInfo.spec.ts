import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/utils/tests/create-and-authenticate-org";
import request from "supertest";
import { describe, it, beforeAll, afterAll, expect } from "vitest";

describe("Fetch Pet Info (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch pet info", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    const createResponse = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        race: "Pastor Alemão",
        color: "Branco",
      });

    const { pet } = createResponse.body;

    const response = await request(app.server).get(`/pets/${pet.id}`).send();

    expect(response.status).toEqual(200);
  });
});
