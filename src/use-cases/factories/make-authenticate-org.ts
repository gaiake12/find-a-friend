import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateOrgUseCase } from "../authenticate-org";

export function makeAuthenticateOrgUseCase() {
  const prismaOrgRepository = new PrismaOrgRepository();

  const authenticateOrgUseCase = new AuthenticateOrgUseCase(
    prismaOrgRepository
  );

  return authenticateOrgUseCase;
}
