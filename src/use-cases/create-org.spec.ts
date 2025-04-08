import { expect, describe, it, beforeEach } from "vitest";
import { CreateOrgUseCase } from "./create-org";
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: CreateOrgUseCase;

describe("Create Pet use case", async () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgUseCase(orgsRepository);
  });

  it("should be able to create an org", async () => {
    const org = await sut.execute({
      name: "Care Pet",
      description: "Care Pet",
      email: "johndoe@teste.com.br",
      password: "123123123",
      phone: "11999999999",
      city: "São Paulo",
    });

    expect(org?.id).toEqual(expect.any(String));
  });

  it("should hash org password upon create", async () => {
    const org = await sut.execute({
      name: "Care Pet",
      description: "Care Pet",
      email: "johndoe@teste.com.br",
      password: "123123123",
      phone: "11999999999",
      city: "São Paulo",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123123123",
      org?.passwordHash ?? ""
    );

    expect(isPasswordCorrectlyHashed).toEqual(true);
  });

  it("should not be able to create a org with same email", async () => {
    await sut.execute({
      name: "Care Pet",
      description: "Care Pet",
      email: "johndoe@teste.com.br",
      password: "123123123",
      phone: "11999999999",
      city: "São Paulo",
    });

    await expect(() =>
      sut.execute({
        name: "Care Pet",
        description: "Care Pet",
        email: "johndoe@teste.com.br",
        password: "123123123",
        phone: "11999999999",
        city: "São Paulo",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
