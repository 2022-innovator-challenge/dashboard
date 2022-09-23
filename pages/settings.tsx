import type { NextPage } from 'next';
import { useEffect, useReducer } from 'react';
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
  error?: ValidationError;
}

enum ValidationError {
  DuplicateName = 'Duplicate packages',
  Npm = 'Npm.'
}

const ProjectSettings: NextPage = () => {
  const [packages, dispatchPackageAction] = useReducer(
    packageReducer,
    [],
    initPackages
  );

  // const insertPackage = (packageName: string, afterPackageId: string) => {
  //   const clonedPackages = [...packages];
  //   const i = clonedPackages.findIndex(({ id }) => id === afterPackageId);
  //   clonedPackages.splice(i + 1, 0, { id: uuid(), name: packageName });
  //   setPackages(clonedPackages);
  // };

  // const setPackage = (packageName: string, packageId: string) => {
  //   const clonedPackages = [...packages];
  //   const pkg = clonedPackages.find(({ id }) => id === packageId);
  //   if (pkg) {
  //     const oldPackageName = pkg.name;
  //     pkg.name = packageName;
  //     validatePackages(clonedPackages, pkg, oldPackageName);
  //   }
  //   setPackages(clonedPackages);
  // };

  // const removePackage = (packageId: string) => {
  //   const clonedPackages = [...packages];
  //   const i = clonedPackages.findIndex(({ id }) => id === packageId);
  //   const pkg = clonedPackages.splice(i, 1);

  //   // const duplicates = clonedPackages.filter(
  //   //   ({ id, name }) => id !== pkg.id && name === pkg.name
  //   // );

  //   setPackages(clonedPackages);
  // };

  // const validatePackagesNew = (
  //   clonedPackages: PackageItem[],
  //   newPackageName: string | undefined,
  //   oldPackageName: string | undefined
  // ) => {
  //   if (newPackageName) {
  //     const duplicates = clonedPackages.filter(
  //       ({ name }) => name === newPackageName
  //     );

  //     duplicates.forEach(pkg => {
  //       pkg.error =
  //         duplicates.length > 1 ? ValidationError.DuplicateName : undefined;
  //     });
  //   }
  //   if (oldPackageName) {
  //     const oldDuplicates = clonedPackages.filter(
  //       ({ name }) => name === oldPackageName
  //     );

  //     if (oldDuplicates.length < 2) {
  //       oldDuplicates.forEach(pkg => {
  //         if (pkg.error === ValidationError.DuplicateName) {
  //           pkg.error = undefined;
  //         }
  //       });
  //     }
  //   }
  // };

  // const validatePackages = (
  //   clonedPackages: PackageItem[],
  //   changedPackage: PackageItem,
  //   oldPackageName: string
  // ) => {
  //   const duplicates = clonedPackages.filter(
  //     ({ id, name }) => id !== changedPackage.id && name === changedPackage.name
  //   );

  //   if (duplicates.length) {
  //     changedPackage.error = ValidationError.DuplicateName;
  //     duplicates.forEach(pkg => {
  //       pkg.error = ValidationError.DuplicateName;
  //     });
  //   } else {
  //     changedPackage.error = undefined;
  //   }

  //   const oldDuplicates = clonedPackages.filter(
  //     ({ name }) => oldPackageName === name
  //   );

  //   if (oldDuplicates.length <= 1) {
  //     oldDuplicates.forEach(pkg => {
  //       if (pkg.error === ValidationError.DuplicateName) {
  //         pkg.error = undefined;
  //       }
  //     });
  //   }
  // };

  const { data, error } = useSWR('/api/configmaps', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  useEffect(() => {
    dispatchPackageAction({
      type: 'reset',
      payload: { packages: data?.split(',') }
    });
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
          {packages.map((pkg, i) => (
            <Stack key={pkg.id} direction="row" alignItems="center" spacing={1}>
              <TextField
                variant="outlined"
                sx={{ width: 250, ml: 6 }}
                label={`Package ${i + 1}`}
                name="packages"
                error={!!pkg.error}
                helperText={pkg.error || ' '}
                value={pkg.name}
                autoFocus={!pkg.name}
                onChange={e =>
                  dispatchPackageAction({
                    type: 'update',
                    payload: { pkg, newName: e.target.value }
                  })
                }
                onBlur={e => {
                  if (e.target.value && i == packages.length - 1) {
                    dispatchPackageAction({ type: 'append' });
                  }
                }}
              />
              <IconButton
                sx={{ mb: 6 }}
                onClick={() =>
                  dispatchPackageAction({ type: 'delete', payload: { pkg } })
                }
              >
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
type ResetPackageActionPayload = { packages?: string[] } | undefined;
type AppendPackageActionPayload = { name?: string } | undefined;
type DeletePackageActionPayload = { pkg: PackageItem };
type UpdatePackageActionPayload = { pkg: PackageItem; newName: string };

type Action<T extends string, P> = P extends undefined
  ? { type: T; payload?: P }
  : { type: T; payload: P };

type PackageAction =
  | Action<'reset', ResetPackageActionPayload>
  | Action<'append', AppendPackageActionPayload>
  | Action<'delete', DeletePackageActionPayload>
  | Action<'update', UpdatePackageActionPayload>;

function packageReducer(
  packages: PackageItem[],
  { type, payload }: PackageAction
): PackageItem[] {
  switch (type) {
    case 'reset':
      return initPackages(payload?.packages);
    case 'append':
      return [...packages, { id: uuid(), name: payload?.name ?? '' }];
    case 'delete':
      return deletePackage(packages, payload);
    case 'update':
      return updatePackage(packages, payload);
    default:
      throw new Error();
  }
}

function deletePackage(
  packages: PackageItem[],
  payload: DeletePackageActionPayload
): PackageItem[] {
  packages = packages.filter(({ id }) => id !== payload.pkg.id);
  if (payload.pkg.error === ValidationError.DuplicateName) {
    packages = revalidateOldDuplicates(packages, payload.pkg.name);
  }

  return packages;
}

function updatePackage(
  packages: PackageItem[],
  payload: UpdatePackageActionPayload
): PackageItem[] {
  packages = packages.map(pkg => ({
    ...pkg,
    ...(pkg.id === payload.pkg.id && { name: payload.newName })
  }));

  packages = validateNewDuplicates(packages, payload.newName);

  if (payload.pkg.error === ValidationError.DuplicateName) {
    packages = revalidateOldDuplicates(packages, payload.pkg.name);
  }
  return packages;
}

function validateNewDuplicates(
  packages: PackageItem[],
  newName: string
): PackageItem[] {
  const duplicates = packages.filter(({ name }) => name === newName);

  if (duplicates.length > 1) {
    duplicates.forEach(pkg => {
      pkg.error = ValidationError.DuplicateName;
    });
  } else {
    duplicates.forEach(pkg => {
      if (pkg.error === ValidationError.DuplicateName) {
        pkg.error = undefined;
      }
    });
  }

  return packages;
}

function revalidateOldDuplicates(
  packages: PackageItem[],
  oldName: string
): PackageItem[] {
  const duplicates = packages.filter(({ name }) => name === oldName);

  if (duplicates.length < 2) {
    duplicates.forEach(pkg => {
      if (pkg.error === ValidationError.DuplicateName) {
        pkg.error = undefined;
      }
    });
  }

  return packages;
}

function initPackages(packages: string[] = []): PackageItem[] {
  return [...packages, ''].map(name => ({ name, id: uuid() }));
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
