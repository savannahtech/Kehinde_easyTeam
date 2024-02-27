import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@/modules/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { UserDto } from '@/modules/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(user: AuthDto) {
    const dbUser = await this.userService.findOneByEmail(user.email);

    if (
      !dbUser ||
      !(await this.comparePassword(user.password, dbUser.password))
    )
      return null;
    const { password, ...result } = dbUser;
    return result;
  }

  public async login(user) {
    const {
      email,
      name,
      id,
    }: {
      email: string;
      name: string;
      id: string;
    } = user;
    const token = await this.generateToken({ email, name, id });
    return { user, token };
  }

  public async create(user: UserDto) {
    const pass = await this.hashPassword(user.password);
    const newUser = await this.userService.create({ ...user, password: pass });
    const { password, ...result } = newUser;
    return result;
  }

  private async generateToken(user: {
    name: string;
    email: string;
    id: string;
  }) {
    return await this.jwtService.signAsync(user);
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  private async comparePassword(enteredPassword: string, dbPassword: string) {
    return await bcrypt.compare(enteredPassword, dbPassword);
  }
}
