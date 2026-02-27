
export function data_post(url: string, data: any, token:string) {
  return {
    url: process.env.NEXT_PUBLIC_API_URL + url,
    options: {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  };
}
export function data_put(url: string, data: any, token:string) {
  return {
    url: process.env.NEXT_PUBLIC_API_URL + url,
    options: {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  };
}
export function data_put_no_body(url: string, token:string) {
  return {
    url: process.env.NEXT_PUBLIC_API_URL + url,
    options: {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  };
}
export function data_get(url: string, token:string) {
  return {
    url: process.env.NEXT_PUBLIC_API_URL + url,
    options: {
      method: 'GET',
      headers:{
        authorization: `Bearer ${token}`,
      }
    },
  };
}
export function data_del(url: string, token:string) {
  return {
    url: process.env.NEXT_PUBLIC_API_URL + url,
    options: {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  };
}

