import useSWR from 'swr';

async function fetcher(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw Error(`${response.status}: ${response.statusText}`);
  const data = await response.json();
  return data;
}

interface UseFetcher<T> {
  data: T;
  error: unknown;
  loading: boolean;
}

// accepts null for conditional fetching https://swr.vercel.app/docs/conditional-fetching
function useFetcher<T = unknown>(url: string | null): UseFetcher<T> {
  const { error, data } = useSWR(url, fetcher);
  return { data, error, loading: !data && !error };
}

export default useFetcher;
