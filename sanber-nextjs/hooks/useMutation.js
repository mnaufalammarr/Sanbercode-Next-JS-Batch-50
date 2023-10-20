import { useCallback, useEffect, useState } from "react";

export const useMutation = () => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    isError: false,
  });

  const mutate = useCallback(async ({ url = "", method = "POST", payload = {} }= {}) => {
    try {
      const response = await fetch(url, { method , body: JSON.stringify(payload) , headers: {
        "Content-Type": "application/json",
      },});
      const result = await response.json();
      setData({ ...data, data: result.data, isLoading: false, isError: false });
      return {...result};
    } catch (error) {
      setData({ ...data, isLoading: false, isError: true });
      return error;
    }
  }, []);


  return { ...data , mutate };
};
