import { Prisma, Pet } from "@prisma/client";

type PetWithoutSearch = Omit<Pet, "search">;

export interface PetsRepository {
  findPetById(id: string): Promise<PetWithoutSearch | null>;
  createPet(
    data: Omit<Prisma.PetUncheckedCreateInput, "search">
  ): Promise<PetWithoutSearch | null>;
  findPetByOrgId(orgsIds: string[]): Promise<PetWithoutSearch[]>;
  searchPets(query: string, page: number): Promise<PetWithoutSearch[]>;
}
