export async function fetcher(url: string): Promise<Record<string, any>> {
  const response = await fetch(url);
  return response.json();
}
