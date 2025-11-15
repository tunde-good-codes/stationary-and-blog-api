import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { appCreate } from "app-create";
//import { DataResponseInterceptor } from "./no-spec/common/interceptors/data-response/data-response.interceptor";
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // add middleware

  appCreate(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
