import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MachineModule } from './modules/machine/machine.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({
        envFilePath: ['.env'],
        isGlobal: true,
        cache: true
    }),
    ThrottlerModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async () => ({
            throttlers: [
                {
                    ttl:
                        parseInt(
                            process.env.RATE_LIMITER_TIME_TO_LEAVE,
                            10
                        ) || 60000, // default to 60000 if env variable not present
                    limit:
                        parseInt(process.env.RATE_LIMITER_MAX_TRY, 10) || 60 // default to 60 if env variable not present
                }
            ]
        })
    }),
    UsersModule,
    AuthModule,
    MachineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
