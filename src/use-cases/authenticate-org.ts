import { OrgsRepository } from "@/repositories/orgs-repository";
import { compare } from "bcryptjs";

interface AuthenticateOrgUseCaseRequest {
  email: string;
  password: string;
}

export class AuthenticateOrgUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({ email, password }: AuthenticateOrgUseCaseRequest) {
    const org = await this.orgRepository.findByEmail(email);

    if (!org) {
      throw new Error();
    }

    const hasPasswordMatch = await compare(password, org.passwordHash);

    if (!hasPasswordMatch) {
      throw new Error();
    }

    return org;
  }
}
