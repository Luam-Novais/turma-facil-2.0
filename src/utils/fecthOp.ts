export function data_post(url: string, data: any) {
  return {
    url: process.env.NEXT_PUBLIC_API_URL + url,
    options: {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  };
}
export function data_get(url: string) {
  return {
    url: process.env.NEXT_PUBLIC_API_URL + url,
    options: {
      credentials: 'include',
    },
  };
}

