import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache, Events } from 'cache-manager';

export const DummyCacheManager: Cache = {
  get: async () => null,
  set: async () => undefined,
  del: async () => undefined,
  wrap: async (key, fn) => fn(),
  mget: async () => [],
  ttl: async () => 0,
  mset: async () => undefined,
  mdel: async () => undefined,
  clear: function (): Promise<boolean> {
    throw new Error('Function not implemented.');
  },
  on: function <E extends keyof Events>(event: E, listener: Events[E]): import("events") {
    throw new Error('Function not implemented.');
  },
  off: function <E extends keyof Events>(event: E, listener: Events[E]): import("events") {
    throw new Error('Function not implemented.');
  },
  disconnect: function (): Promise<undefined> {
    throw new Error('Function not implemented.');
  },
  cacheId: function (): string {
    throw new Error('Function not implemented.');
  },
  stores: []
}; 