import { useEffect, useState } from "react";

export const useMediaQuery = (query: string = "(min-width: 1024px)") => {
  const getMatches = () => window.matchMedia(query).matches;

  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return getMatches();
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(getMatches);

    setMatches(getMatches());
    mediaQuery.addEventListener("change", handleChange);
    window.addEventListener("resize", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      window.removeEventListener("resize", handleChange);
    };
  }, [query]);

  return matches;
};
