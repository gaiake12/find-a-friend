import { Prisma, org } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrgRepository implements OrgsRepository {
  async create(data: Prisma.orgUncheckedCreateInput) {
    const org = await prisma.org.create({
      data,
      select: {
        id: true,
        name: true,
        description: true,
        city: true,
        phone: true,
        email: true,
      },
    });

    if (!org) return null;

    return org;
  }

  async findByEmail(email: string) {
    const org = prisma.org.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        description: true,
        city: true,
        phone: true,
        email: true,
        passwordHash: true,
      },
    });

    if (!org) {
      return null;
    }

    return org;
  }
}
