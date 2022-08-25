import type { NextPage } from 'next';
import useSWR from 'swr';

const ProjectSettings: NextPage = () => {
  const { data: packages, error } = useSWR('/api/configmaps', fetcher);
  if (error) {
    return <div>Failed to load</div>;
  }
  if (!packages) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <p>I am the project settings page</p>
        <p>Enter API keys for Github, npm?, ...</p>
        <p>Invite new users, show existing users, priviliges?</p>

        <form action="/api/configmaps" method="patch">
          <label htmlFor="packages">Packages:</label>
          <input
            type="text"
            id="packages"
            name="packages"
            required
            value={packages}
            onChange={doNothing}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
};

function doNothing() {
  return;
}

async function fetcher(url: string) {
  const response = await fetch(url);
  const { data } = await response.json();
  return data.packages;
}

// export async function getStaticProps() {
//   return {
//     props: (await fetch('/api/configmaps')).json()
//   };
// }

// ProjectSettings.getInitialProps = async () => {
//   return (await fetch('/api/configmaps')).json();
// };

// async function updatePackages() {
//   await fetch('/api/configmaps', { method: 'patch', body: {
//     packages:
//   } });
// }

export default ProjectSettings;
