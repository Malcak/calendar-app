const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchWithoutToken = (endpoint, data, method = 'GET') => {
  const url = `${BASE_URL}/${endpoint}`;
  if (method === 'GET') {
    return fetch(url);
  }

  return fetch(url, {
    method,
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const fetchWithToken = (endpoint, data, method = 'GET') => {
  const url = `${BASE_URL}/${endpoint}`;
  const token = localStorage.getItem('token') || '';
  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        'x-token': token,
      },
    });
  }

  return fetch(url, {
    method,
    headers: {
      'Content-type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(data),
  });
};
