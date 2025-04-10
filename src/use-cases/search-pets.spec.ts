import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { describe, it, beforeEach, expect } from "vitest";
import { SearchPetsUseCase } from "./search-pets";
import { hash } from "bcryptjs";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: SearchPetsUseCase;

describe("Seach pet use case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new SearchPetsUseCase(petsRepository);

    const org = await orgsRepository.create({
      name: "Care Pet",
      description: "Care Pet",
      email: "johndoe@teste.com.br",
      passwordHash: await hash("123123123", 6),
      phone: "11999999999",
      city: "São Paulo",
    });

    await petsRepository.createPet({
      race: "Pastor Alemão",
      color: "Branco",
      orgId: org.id,
    });

    await petsRepository.createPet({
      race: "Vira-Lata",
      color: "Caramelo",
      orgId: org.id,
    });
  });

  it("should be able to search a pet by race", async () => {
    const pets = await sut.execute({ query: "Pastor", page: 1 });

    expect(pets).toHaveLength(1);
    expect(pets[0]).toEqual(expect.objectContaining({ race: "Pastor Alemão" }));
  });

  it("should be able to search a pet by color", async () => {
    const pets = await sut.execute({ query: "Caramelo", page: 1 });

    expect(pets).toHaveLength(1);
    expect(pets[0]).toEqual(expect.objectContaining({ race: "Vira-Lata" }));
  });
});
