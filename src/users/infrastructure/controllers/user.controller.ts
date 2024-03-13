import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/useCases/createUser.useCase';
import { LogInUserUseCase } from '../../application/useCases/LogInUser.useCase';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { UserDto, LoginDto } from '../../application/dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly logInUserUseCase: LogInUserUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: UserDto })
  @Post()
  async create(@Body() body: any) {
    return this.createUserUseCase.execute(
      body.username,
      body.email,
      body.password,
    );
  }
  @ApiOperation({ summary: 'Log in a user' })
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() body: any) {
    return this.logInUserUseCase.execute(body.email, body.password);
  }
}
