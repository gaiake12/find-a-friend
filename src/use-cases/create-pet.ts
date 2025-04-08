import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { InvalidOrgError } from "./errors/invalid-org-error";

interface CreatePetUseCaseResquest {
  color: string;
  race: string;
  orgId: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({ ...data }: CreatePetUseCaseResquest) {
    const org = await this.orgsRepository.findById(data.orgId);

    if (!org) {
      throw new InvalidOrgError();
    }

    const pet = await this.petsRepository.createPet(data);

    if (!pet) {
      throw new Error();
    }

    return { pet };
  }
}
