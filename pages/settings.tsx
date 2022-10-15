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
import Typography from '@mui/material/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import validateNpmPackageName from 'validate-npm-package-name';
import { fetcher } from '../utils/api-util/fetcher';

interface PackageItem {
  id: string;
  name: string;
  errors: string[];
}

const duplicateNameError = 'Package names must be unique';

const ProjectSettings: NextPage = () => {
  const [packages, dispatchPackageAction] = useReducer(
    packageReducer,
    [],
    initPackages
  );

  const { data, error } = useSWR('/api/configmaps', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
  const packageData = data?.data?.packages;

  useEffect(() => {
    dispatchPackageAction({
      type: 'reset',
      payload: { packages: packageData?.split(',') }
    });
  }, [packageData]);

  if (error) {
    return <div>Failed to load</div>;
  }
  if (!packageData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Paper sx={{ p: 2 }}>
        <Stack spacing={2} alignItems="center">
          <Typography sx={{ ml: 3 }}>
            Add npm packages you want to track:
          </Typography>
          {packages.map((pkg, i) => (
            <Stack
              key={pkg.id}
              direction="row"
              alignItems="flex-start"
              justifyContent="center"
            >
              <TextField
                variant="outlined"
                sx={{ width: 250, ml: 6 }}
                label={`Package ${i + 1}`}
                name="packages"
                error={!!pkg.errors.length}
                helperText={pkg.errors[0] || ' '}
                value={pkg.name}
                autoFocus={!pkg.name}
                onChange={e =>
                  dispatchPackageAction({
                    type: 'update',
                    payload: { pkg, newName: e.target.value }
                  })
                }
                onBlur={() => {
                  if (pkg.name && i == packages.length - 1) {
                    dispatchPackageAction({ type: 'append' });
                  }
                }}
                onKeyUp={({ key }) => {
                  if (pkg.name && i == packages.length - 1 && key === 'Enter') {
                    dispatchPackageAction({ type: 'append' });
                  }
                }}
              />
              <IconButton
                sx={{ m: 1 }}
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
            disabled={packages.some(({ errors }) => errors.length !== 0)}
            onClick={() => updatePackages(packages.map(({ name }) => name))}
          >
            Submit
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

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
      return [
        ...packages,
        { id: uuid(), name: payload?.name ?? '', errors: [] }
      ];
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
  if (payload.pkg.errors.includes(duplicateNameError)) {
    packages = revalidateOldDuplicates(packages, payload.pkg.name);
  }

  return packages;
}

function updatePackage(
  packages: PackageItem[],
  payload: UpdatePackageActionPayload
): PackageItem[] {
  packages = packages.map(pkg => {
    if (pkg.id === payload.pkg.id) {
      pkg.name = payload.newName;
      if (payload.newName !== '') {
        const { errors = [], warnings = [] } = validateNpmPackageName(
          payload.newName
        );
        pkg.errors =
          [...errors, ...warnings].map(
            (err: string) => err[0].toUpperCase() + err.slice(1)
          ) || [];
      }
    }
    return pkg;
  });

  packages = validateNewDuplicates(packages, payload.newName);

  if (payload.pkg.errors.includes(duplicateNameError)) {
    packages = revalidateOldDuplicates(packages, payload.pkg.name);
  }
  return packages;
}

function validateNewDuplicates(
  packages: PackageItem[],
  newName: string
): PackageItem[] {
  const duplicates = packages.filter(
    ({ name }) => name === newName && newName !== ''
  );

  if (duplicates.length > 1) {
    duplicates.forEach(pkg => {
      if (!pkg.errors.includes(duplicateNameError)) {
        pkg.errors.unshift(duplicateNameError);
      }
    });
  } else {
    duplicates.forEach(pkg => {
      if (pkg.errors.includes(duplicateNameError)) {
        pkg.errors.shift();
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
      if (pkg.errors.includes(duplicateNameError)) {
        pkg.errors.shift();
      }
    });
  }

  return packages;
}

function initPackages(packages: string[] = []): PackageItem[] {
  return [...packages, ''].map(name => ({ name, id: uuid(), errors: [] }));
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
