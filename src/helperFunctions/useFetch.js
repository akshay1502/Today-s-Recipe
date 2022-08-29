/* eslint-disable no-useless-return */
import { useEffect, useState } from 'react';

export default function useFetch(url, method, data = null) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [statusValue, setStatusValue] = useState(null);
  useEffect(() => {
    setLoading(true);
    const myAbortController = new AbortController();
    const fetchData = async () => {
      try {
        let options = {
          method,
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          signal: myAbortController.signal,
        };
        if (method !== 'GET') {
          options = { ...options, body: JSON.stringify(data) };
        }
        const fetchResponse = await fetch(`${process.env.REACT_APP_API_URL}${url}`, options);
        const statusValueTemp = fetchResponse.status;
        const resultTemp = await fetchResponse.json();
        setResult(resultTemp);
        setStatusValue(statusValueTemp);
        setLoading(false);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err);
      }
    };
    fetchData();

    return () => {
      myAbortController.abort();
    };
  }, [url]);
  return {
    loading, error, result, statusValue,
  };
}
