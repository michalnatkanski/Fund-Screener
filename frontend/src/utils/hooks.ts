  import { useState, useEffect } from "react";
  //debounce hook for search
  export function useSearchDebounce(value:string, delay:number) {
    const [search, setSearch] = useState(value);
    useEffect(() => {
      const delayFn = setTimeout(() => setSearch(value), delay);
      return () => clearTimeout(delayFn);
    }, [value]);
  
    return search;
  }