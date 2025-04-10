import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { FetchPetInfoUseCase } from "./fetch-pet-info";
import { hash } from "bcryptjs";
import { InvalidPetError } from "./errors/invalid-pet-error";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: FetchPetInfoUseCase;
let petId: string;

describe("Fetch pet info use case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new FetchPetInfoUseCase(petsRepository);

    const org = await orgsRepository.create({
      name: "Care Pet",
      description: "Care Pet",
      email: "johndoe@teste.com.br",
      passwordHash: await hash("123123123", 6),
      phone: "11999999999",
      city: "São Paulo",
    });

    const pet = await petsRepository.createPet({
      race: "Pastor Alemão",
      color: "Branco",
      orgId: org.id,
    });

    petId = pet.id;
  });

  it("should be able to fetch a pet info", async () => {
    const pet = await sut.execute({
      id: petId,
    });

    expect(pet.id).toEqual(expect.any(String));
  });

  it("should not be able to fecth with an invalid pet id", async () => {
    await expect(async () => sut.execute({ id: "123" })).rejects.toBeInstanceOf(
      InvalidPetError
    );
  });
});
