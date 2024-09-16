import { useEffect, useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [data, setData] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // const [data, setData] = useState<T>(
  //   JSON.parse(
  //     localStorage.getItem(key) ? localStorage.getItem(key) : initialValue
  //   )
  // );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData] as [T, typeof setData];
};

export default useLocalStorage;
