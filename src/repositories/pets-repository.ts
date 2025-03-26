import { Prisma, Pet } from "@prisma/client";

export interface PetsRepository {
  findPetById(id: string): Promise<Pet | null>;
  createPet(data: Prisma.PetUncheckedCreateInput): Promise<Pet | null>;
}
