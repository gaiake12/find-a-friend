import { Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async createPet(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
      select: {
        id: true,
        color: true,
        race: true,
        orgId: true,
      },
    });

    if (!pet) return null;

    return pet;
  }

  async findPetById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        color: true,
        race: true,
        orgId: true,
      },
    });

    return pet;
  }
}
