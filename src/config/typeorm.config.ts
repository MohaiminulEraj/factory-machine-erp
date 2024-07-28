import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm"

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
        configService: ConfigService
    ): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'mysql',
            host: configService.get('DATABASE_HOST', 'localhost'),
            port: configService.get<number>('DATABASE_PORT', 3306),
            username: configService.get('DB_USERNAME', 'root'),
            password: configService.get<string>('DB_PASSWORD', 'password'),
            database: configService.get('DB_NAME', 'factory-machine-erp'),
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
            extra: {
                charset: 'utf8mb4_unicode_ci'
            },
            synchronize: true,
            logging: false
        }
    }
}