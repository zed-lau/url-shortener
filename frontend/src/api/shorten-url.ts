import { IShortenUrlRequest } from '../types';

export const post = async (body: IShortenUrlRequest) => {
  const url = 'http://localhost:3000/shortUrl';
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, options);
  return response.json();
};
