import { useState, useCallback } from "react";

export function useArrayState(initial = []) {
  const [array, setArray] = useState(initial);

  const cb = useCallback((f) => {
    setArray((prevArray) => {
      const newArray = [...prevArray];
      f(newArray);
      return newArray;
    });
  }, []);

  return [array, cb];
}
