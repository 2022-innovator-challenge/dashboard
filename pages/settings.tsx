import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { v4 as uuid } from 'uuid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import DeleteIcon from '@material-ui/icons/Delete';

interface PackageItem {
  id: string;
  name: string;
}

const ProjectSettings: NextPage = () => {
  const [packages, setPackages] = useState<PackageItem[]>([]);

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
    setPackages([
      ...(data?.split(',').map(pkg => ({ name: pkg, id: uuid() })) || []),
      { id: uuid(), name: '' }
    ]);
  }, [data]);

  if (error) {
    return <div>Failed to load</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Paper sx={{ p: 2 }}>
        <Stack spacing={2} alignItems="center">
          <Box sx={{ ml: 6 }}>Add npm packages you want to track:</Box>
          {packages.map(({ id, name }, i) => (
            <Stack key={id} direction="row" alignItems="center" spacing={1}>
              <TextField
                variant="outlined"
                sx={{ width: 250, ml: 6 }}
                label={`Package ${i + 1}`}
                name="packages"
                value={name}
                autoFocus={!name}
                onChange={e => setPackage(e.target.value, id)}
                onBlur={e => {
                  if (e.target.value && i == packages.length - 1) {
                    insertPackage('', id);
                  }
                }}
              />
              <IconButton onClick={() => removePackage(id)}>
                <DeleteIcon></DeleteIcon>
              </IconButton>
            </Stack>
          ))}

          <Button
            variant="outlined"
            onClick={() => updatePackages(packages.map(({ name }) => name))}
          >
            Submit
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

async function fetcher(url: string): Promise<string> {
  const response = await fetch(url);
  const { data } = await response.json();
  return data.packages;
}

async function updatePackages(packages: string[]) {
  mutate(
    '/api/configmaps',
    async () => {
      const res = await fetch('/api/configmaps', {
        method: 'PATCH',
        body: JSON.stringify({
          packages: packages.filter(pkg => pkg).join(',')
        })
      });
      const { data } = await res.json();
      return data.packages;
    },
    { revalidate: false }
  );
}

export default ProjectSettings;
