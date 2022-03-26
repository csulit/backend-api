import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';

@Injectable()
export class UserService {
  public PrismaUserSelect: Prisma.UserSelect = {
    id: true,
    username: true,
    email: true,
    profile: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        fullName: true,
      },
    },
    roles: true,
  };

  constructor(private readonly prisma: PrismaClientService) {}

  async getAll() {
    return await this.prisma.user.findMany();
  }

  async getOne(id: string) {
    return id;
  }

  async create() {
    return true;
  }

  async update(id: string) {
    return id;
  }

  async delete(id: string) {
    return id;
  }
}
