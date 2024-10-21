interface CacheOptions {
  value: any;
  timeout: NodeJS.Timeout;
}

export default class Cache {
  private cache: Map<string, CacheOptions>;
  private ttl: number;

  constructor() {
    this.cache = new Map();
    this.ttl = 5 * 60 * 1000;
  }

  set(key: string, value: any) {
    if (this.cache.has(key)) {
      clearTimeout(this.cache.get(key)!.timeout);
    }

    // Set the cache value and its expiration timer
    const timeout = setTimeout(() => {
      this.cache.delete(key); // Remove the key when it expires
    }, this.ttl);

    this.cache.set(key, { value, timeout });
  }

  // Get cache value if it exists
  get(key: string) {
    const cachedItem = this.cache.get(key);
    if (!cachedItem) {
      return null; // Cache miss
    }
    return cachedItem.value; // Cache hit
  }

  // Manually clear cache
  delete(key: string) {
    if (this.cache.has(key)) {
      clearTimeout(this.cache.get(key)!.timeout); // Clear timeout on delete
      this.cache.delete(key); // Remove key from cache
    }
  }

  // Clear all cache
  clear() {
    this.cache.forEach((_, key) => clearTimeout(this.cache.get(key)?.timeout));
    this.cache.clear();
  }
}
