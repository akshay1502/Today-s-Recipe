import { useEffect, useState } from 'react';

export default function useFetch(url, method, data = null) {
  const [result, setResult] = useState(null);
  const [statusValue, setStatusValue] = useState(null);
  useEffect(() => {
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
        console.log('fetching');
        setResult(resultTemp);
        setStatusValue(statusValueTemp);
      } catch (e) {
        if (e.name === 'AbortError') {
          console.log('aborted the request');
        }
      }
    };
    fetchData();
    return () => {
      myAbortController.abort();
    };
  }, [url]);
  return { result, statusValue };
}
