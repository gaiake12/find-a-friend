import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { describe } from "vitest";
import { CreatePetUseCase } from "./create-pet";
import { beforeEach } from "node:test";
import { hash } from "bcryptjs";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: CreatePetUseCase;
let orgId: string;

describe("Create Pet use case", async () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new CreatePetUseCase(petsRepository, orgsRepository);

    const org = await orgsRepository.create({
      name: "Care Pet",
      description: "Care Pet",
      email: "johndoe@teste.com.br",
      passwordHash: await hash("123123123", 6),
      phone: "11999999999",
      city: "São Paulo",
    });

    orgId = org.id;
  });
});
