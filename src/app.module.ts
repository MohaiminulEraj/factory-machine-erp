import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({
        envFilePath: ['.env'],
        isGlobal: true,
        cache: true
    }),
    ThrottlerModule.forRootAsync({
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
