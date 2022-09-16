import type { NextPage } from 'next';
import { FormEvent, useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { PackageInput } from '../components/PackageInput';
import { v4 as uuid } from 'uuid';

const ProjectSettings: NextPage = () => {
  const [packages, setPackages] = useState<{ id: string; name: string }[]>([]);

  const insertPackage = (packageName: string, afterPackageId: string) => {
    const clonedPackages = [...packages];
    const i = clonedPackages.findIndex(({ id }) => id === afterPackageId);
    clonedPackages.splice(i + 1, 0, { id: uuid(), name: packageName });
    setPackages(clonedPackages);
  };

  const setPackage = (packageName: string, packageId: string) => {
    const clonedPackages = [...packages];
    const pkg = clonedPackages.find(({ id }) => id === packageId);
    if (pkg) {
      pkg.name = packageName;
    }
    setPackages(clonedPackages);
  };

  const removePackage = (packageId: string) => {
    const clonedPackages = [...packages];
    const i = clonedPackages.findIndex(({ id }) => id === packageId);
    clonedPackages.splice(i, 1);
    setPackages(clonedPackages);
  };

  const { data, error } = useSWR('/api/configmaps', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  useEffect(() => {
    setPackages(
      data?.split(',').map(pkg => ({ name: pkg, id: uuid() })) || [
        { id: uuid(), name: '' }
      ]
    );
  }, [data]);

  if (error) {
    return <div>Failed to load</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={e =>
        updatePackages(
          e,
          packages.map(({ name }) => name)
        )
      }
    >
      <label htmlFor="packages">Packages:</label>
      {packages.map(({ id, name }) => (
        <PackageInput
          name="packages"
          key={id}
          value={name}
          onChange={e => setPackage(e.target.value, id)}
          onAdd={() => insertPackage('', id)}
          onRemove={() => removePackage(id)}
        ></PackageInput>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

async function fetcher(url: string): Promise<string> {
  const response = await fetch(url);
  const { data } = await response.json();
  return data.packages;
}

async function updatePackages(e: FormEvent, packages: string[]) {
  e.preventDefault();
  mutate(
    '/api/configmaps',
    async () => {
      const res = await fetch('/api/configmaps', {
        method: 'PATCH',
        body: JSON.stringify({ packages: packages.join(',') })
      });
      const { data } = await res.json();
      return data.packages;
    },
    { revalidate: false }
  );
}

export default ProjectSettings;
