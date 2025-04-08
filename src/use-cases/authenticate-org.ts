import { OrgsRepository } from "@/repositories/orgs-repository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateOrgUseCaseRequest {
  email: string;
  password: string;
}

export class AuthenticateOrgUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({ email, password }: AuthenticateOrgUseCaseRequest) {
    const org = await this.orgRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const hasPasswordMatch = await compare(password, org.passwordHash);

    if (!hasPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return org;
  }
}
