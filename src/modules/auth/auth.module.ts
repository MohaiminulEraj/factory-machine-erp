import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtService } from './service/jwt.service';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy, ConfigService],
  exports: [AuthService],
})
export class AuthModule {}
