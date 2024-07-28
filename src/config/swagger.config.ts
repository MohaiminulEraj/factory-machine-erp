import { DocumentBuilder } from '@nestjs/swagger'

export const swaggerConfig = new DocumentBuilder()
    .setTitle(process.env.APP_TITLE)
    .setDescription('This is the collection of APIs.')
    .setVersion(process.env.APP_VERSION)
    .addBearerAuth()
    .build()
