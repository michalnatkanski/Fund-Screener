  import { useState, useEffect } from "react";
  //debounce hook for search
  export function useSearchDebounce(value, delay) {
    const [search, setSearch] = useState(value);
    useEffect(() => {
      const delayFn = setTimeout(() => setSearch(value), delay);
      return () => clearTimeout(delayFn);
    }, [value]);
  
    return search;
  }