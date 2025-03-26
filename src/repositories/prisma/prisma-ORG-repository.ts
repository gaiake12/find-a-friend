import { Prisma, ORG } from "@prisma/client";
import { ORGRepository } from "../ORG-repository";
import { prisma } from "@/lib/prisma";

export class PrismaORGRepository implements ORGRepository {
  async create(data: Prisma.ORGUncheckedCreateInput) {
    const ORG = await prisma.oRG.create({
      data,
      select: {
        id: true,
        name: true,
        description: true,
        city: true,
        phone: true,
      },
    });

    if (!ORG) return null;

    return ORG;
  }
}
