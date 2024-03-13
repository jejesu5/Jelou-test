import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import { UserRepository } from './infrastructure/repositories/MongoDBUser.repository';
import { UserService } from './infrastructure/services/user.service';
import { AuthService } from './infrastructure/services/auth.service';
import { CreateUserUseCase } from './application/useCases/createUser.useCase';
import { LogInUserUseCase } from './application/useCases/LogInUser.useCase';
import { UserController } from './infrastructure/controllers/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserService,
    AuthService,
    CreateUserUseCase,
    LogInUserUseCase,
  ],
  exports: [UserService, UserRepository],
})
export class UsersModule {}
