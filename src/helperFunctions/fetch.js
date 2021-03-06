const fetchURL = async (url, method, data = null) => {
  let options = {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  if (method !== 'GET') {
    options = { ...options, body: JSON.stringify(data) };
  }
  const fetchResponse = await fetch(`${process.env.REACT_APP_API_URL}${url}`, options);
  const statusValue = fetchResponse.status;
  const result = await fetchResponse.json();
  return { result, statusValue };
};

export default fetchURL;
