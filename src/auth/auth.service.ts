import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { UserDocument } from 'src/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcript from 'bcryptjs';
import { TokenDto } from './dto/token.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  userModel: any;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  private async generateToken(user: UserDocument): Promise<TokenDto> {
    const payload = { email: user.email, id: user._id };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(authDto: AuthDto): Promise<UserDocument> {
    const user = await this.usersService.getUserByEmail(authDto.email);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Некоректный email или пароль',
      });
    }

    const isPasswordEquals = await bcript.compare(
      authDto.password,
      user.password,
    );

    if (user && isPasswordEquals) {
      return user as UserDocument;
    }

    throw new UnauthorizedException({
      message: 'Некоректный email или пароль',
    });
  }

  async login(authDto: AuthDto): Promise<TokenDto> {
    const user: UserDocument = await this.validateUser(authDto);
    return this.generateToken(user);
  }

  async registration(createUserDto: CreateUserDto): Promise<TokenDto> {
    const candidate = await this.usersService.getUserByEmail(
      createUserDto.email,
    );

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcript.hash(createUserDto.password, 5);
    const user = await this.usersService.createUser({
      ...createUserDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }
}
