import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository";
import { describe, expect, beforeEach, it } from "vitest";
import { AuthenticateOrgUseCase } from "./authenticate-org";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateOrgUseCase;

describe("Authenticate use case", async () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateOrgUseCase(orgsRepository);

    await orgsRepository.create({
      name: "Care Pet",
      description: "Care Pet",
      email: "johndoe@teste.com.br",
      passwordHash: await hash("123123123", 6),
      phone: "11999999999",
      city: "São Paulo",
    });
  });

  it("should be able to authenticate", async () => {
    const org = await sut.execute({
      email: "johndoe@teste.com.br",
      password: "123123123",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong e-mail", async () => {
    await expect(
      sut.execute({
        email: "johndoe2@teste.com.br",
        password: "123123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await expect(
      sut.execute({
        email: "johndoe@teste.com.br",
        password: "123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
