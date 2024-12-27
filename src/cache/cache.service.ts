import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
export class CacheService {
  private keys: Set<string> = new Set();

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async set(key: string, value: any, ttl?: number): Promise<void> {
    this.keys.add(key);

    if (ttl) {
      await this.cacheManager.set(key, value, ttl);
    } else {
      await this.cacheManager.set(key, value);
    }
  }

  async get(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  async remove(key: string): Promise<void> {
    this.keys.delete(key);
    await this.cacheManager.del(key);
  }

  async size(): Promise<number> {
    return this.keys.size;
  }

  async clear(): Promise<void> {
    this.keys.clear();
    await this.cacheManager.reset();
  }
}
