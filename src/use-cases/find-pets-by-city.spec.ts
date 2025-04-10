import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { FindPetsByCityUseCase } from "./find-pets-by-city";
import { hash } from "bcryptjs";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: FindPetsByCityUseCase;

describe("", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new FindPetsByCityUseCase(petsRepository, orgsRepository);

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

  it("should be able to find all pets from a city", async () => {
    const pets = await sut.execute({ city: "São Paulo" });

    expect(pets).toHaveLength(2);
    expect(pets[0]).toEqual(expect.objectContaining({ race: "Pastor Alemão" }));
  });
});
