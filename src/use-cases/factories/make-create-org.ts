import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { CreateOrgUseCase } from "../create-org";

export function makeCreateOrgUseCase() {
  const orgsRepository = new PrismaOrgRepository();
  const createOrgUseCase = new CreateOrgUseCase(orgsRepository);

  return createOrgUseCase;
}
