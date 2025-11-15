import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    const appName = this.configService.get<string>("APP_NAME", "default");
    console.log(appName);

    return "Hello to a new nestjs now World!";
  }
}
