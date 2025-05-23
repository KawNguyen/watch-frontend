import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (delay < 0) {
      console.warn("Delay must be a positive number.");
      return;
    }

    const handler = setTimeout(() => {
      // So sánh trước khi cập nhật
      setDebouncedValue((prev) => {
        if (Object.is(prev, value)) return prev;
        return value;
      });
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
