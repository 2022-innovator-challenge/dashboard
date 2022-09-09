import type { NextPage } from 'next';
import useSWR, { mutate } from 'swr';

const ProjectSettings: NextPage = () => {
  const { data: packages, error } = useSWR('/api/configmaps', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  if (error) {
    return <div>Failed to load</div>;
  }
  if (!packages) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={updatePackages}>
      <label htmlFor="packages">Packages:</label>
      <input
        type="text"
        id="packages"
        name="packages"
        required
        defaultValue={packages}
      />
      <button type="button">+</button>
      <button type="button">-</button>
      <button type="submit">Submit</button>
    </form>
  );
};

async function fetcher(url: string) {
  const response = await fetch(url);
  const { data } = await response.json();
  return data.packages;
}

async function updatePackages(e) {
  e.preventDefault();
  const packages = e.target.packages.value;
  mutate(
    '/api/configmaps',
    async () => {
      const res = await fetch('/api/configmaps', {
        method: 'PATCH',
        body: JSON.stringify({ packages })
      });
      const { data } = await res.json();
      return data.packages;
    },
    { revalidate: false }
  );
}

export default ProjectSettings;
