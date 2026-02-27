export async function apiFetch(url: string, options: RequestInit) {
  const response = await fetch(url, options);
  if(!response.ok && response.status === 401){
    window.location.href = '/login'
  }
  return response
}