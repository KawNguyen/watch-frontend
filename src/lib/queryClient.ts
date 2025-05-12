export type QueryCache = {
  data: any;
  timestamp: number;
  invalidated: boolean;
};

export const queryClient = {
  cache: new Map<string, QueryCache>(),

  // Lấy tất cả các key theo pattern
  getKeysByPattern(pattern: string) {
    return Array.from(this.cache.keys()).filter((key) =>
      key.startsWith(pattern),
    );
  },

  // Invalidate cache theo pattern
  invalidateQueries(pattern: string) {
    const keys = this.getKeysByPattern(pattern);
    keys.forEach((key) => {
      const entry = this.cache.get(key);
      if (entry) {
        entry.invalidated = true;
      }
    });
  },

  // Xóa cache theo pattern
  removeQueries(pattern: string) {
    const keys = this.getKeysByPattern(pattern);
    keys.forEach((key) => this.cache.delete(key));
  },
};
