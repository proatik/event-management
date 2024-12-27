import { Module, Global } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheModule as NestCacheModule } from "@nestjs/cache-manager";

// service.
import { CacheService } from "./cache.service";

@Global()
@Module({
  imports: [
    ConfigModule,
    NestCacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: parseInt(configService.get<string>("CACHE_TTL", "600"), 10),
        max: parseInt(configService.get<string>("CACHE_MAX", "100"), 10)
      })
    })
  ],
  providers: [CacheService],
  exports: [CacheService]
})
export class CacheModule {}
