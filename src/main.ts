import { NestFactory, Reflector } from '@nestjs/core'
import * as dotenv from 'dotenv'
import { ClassSerializerInterceptor, Logger } from '@nestjs/common'
import { AppModule } from './app.module'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  const globalPrefix = 'api'
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.setGlobalPrefix(globalPrefix)

  const port = 3333

  await app.listen(port, () => {
    Logger.log(`REST API on http://localhost:${port}/${globalPrefix}`)
    Logger.log(`Graphql on http://localhost:${port}/graphql`)
  })
}

bootstrap()
