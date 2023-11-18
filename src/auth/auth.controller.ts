import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() authDto: AuthDto): Promise<TokenDto> {
    return this.authService.login(authDto);
  }

  @Post('/registration')
  registration(@Body() createUserDto: CreateUserDto): Promise<TokenDto> {
    return this.authService.registration(createUserDto);
  }
}
