import { useCallback, useEffect, useState } from "react";

export const useQueries = ({ prefixUrl = "" , headers = {}} ={}) => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    isError: false,
  });

  const fetchingData = useCallback(async ({ url = "", method = "GET" }= {}) => {
    try {
      const response = await fetch(url, { method , headers });
      const result = await response.json();
      setData({ ...data, data: result.data, isLoading: false, isError: false });
    } catch (error) {
      setData({ ...data, isLoading: false, isError: true });
    }
  }, []);

  useEffect(() => {
    if (prefixUrl) {
      fetchingData({ url: prefixUrl , headers : headers });
    }
  }, []);

  return { ...data };
};
