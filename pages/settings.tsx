import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';

const ProjectSettings: NextPage = () => {
  // const [packages, setPackages] = useState('');
  const { data, error } = useSWR('/api/configmaps', fetcher);
  // useEffect(() => {
  //   setPackages(data || '');
  // }, [data]);
  if (error) {
    return <div>Failed to load</div>;
  }
  if (!data) {
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
        // value='test'
        // onChange={e => setPackages(e.target.value)}
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

  await fetch('/api/configmaps', {
    method: 'PATCH',
    body: JSON.stringify({ packages })
  });

  mutate('/api/configmaps');
}

export default ProjectSettings;
