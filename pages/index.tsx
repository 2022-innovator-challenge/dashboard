import type { NextPage } from 'next';
import LineChart from '../components/LineChart';
import InfoCard from '../components/InfoCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import SvgIcon from '@mui/material/SvgIcon';
import PullRequestIcon from '../public/git-pull-request.svg';
import JenkinsNormalIcon from '../public/jenkins.svg';
import JenkinsteinIcon from '../public/jenkinstein.svg';
import StarIcon from '@material-ui/icons/Star';
import HelpIcon from '@material-ui/icons/HelpOutline';
import GitHubIcon from '@material-ui/icons/GitHub';
import TrendUpIcon from '@material-ui/icons/KeyboardArrowUp';
import StackedLineChart from '../components/StackedLineChart';
import {
  githubStackedBarChartData,
  githubStackedLineChartData,
  jenkinsStackedBarChartData,
  jenkinsStackedLineChartData,
  trendLineChartData
} from '../utils/mock-data';
import { Stack } from '@mui/system';
import styles from '../styles/Dashboard.module.css';
import StackedBarChart from '../components/StackedBarChart';
import useSWR from 'swr';
import {
  parseDownloadsScraper,
  ScraperResponse
} from '../utils/parseResponses';
import { fetcher } from './api-util/fetcher';
import { useEffect, useState } from 'react';

const JenkinsIcon =
  new Date().getMonth() === 9 ? JenkinsteinIcon : JenkinsNormalIcon;

interface Pull {
  title: string;
  url: string;
}

interface RepoDetails {
  pulls: Pull[];
}

const Home: NextPage = () => {
  const { data: statsData, error: statsError } = useSWR(
    'https://downloadstats.c2aecf0.kyma.ondemand.com/download-stats',
    fetcher,
    {
      refreshInterval: 300000
    }
  );

  const npmData = statsData
    ? {
        datasets: parseDownloadsScraper(statsData as ScraperResponse[])
      }
    : undefined;

  const [repoDetails, setRepoDetails] = useState<RepoDetails>({ pulls: [] });
  const { data: pullsData, error: pullsError } = useSWR(
    '/api/gh/pulls',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  useEffect(() => {
    if (pullsData) {
      setRepoDetails({
        pulls: pullsData.map((pull: any) => ({
          title: pull.title
        }))
      });
    }
  }, [pullsData]);

  if (pullsError) {
    return <div>Failed to load</div>;
  }
  if (!pullsData) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2} columns={4}>
      <Grid item xs={3}>
        <Grid container spacing={2} columns={2}>
          <Grid item xs={2}>
            <Paper sx={{ p: 2 }}>
              <LineChart
                title="NPM Downloads"
                dataset={npmData}
                error={statsError}
              />
            </Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper sx={{ p: 2 }}>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <GitHubIcon className={styles.chartIcon} />
                <StackedLineChart
                  title="Github Actions"
                  data={githubStackedLineChartData}
                />
                <StackedBarChart
                  data={githubStackedBarChartData}
                  xTitle="Actions"
                  yTitle="Runs"
                />
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper sx={{ p: 2 }}>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <SvgIcon viewBox="0 0 226 312" className={styles.chartIcon}>
                  <JenkinsIcon />
                </SvgIcon>
                <StackedLineChart
                  title="Jenkins"
                  data={jenkinsStackedLineChartData}
                />
                <StackedBarChart
                  data={jenkinsStackedBarChartData}
                  xTitle="Stages"
                  yTitle="Runs"
                />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <Box>
          <InfoCard
            title="Open Pull Requests"
            value="9"
            icon={
              <SvgIcon>
                <PullRequestIcon />
              </SvgIcon>
            }
            color="#434242"
          >
            <Stack>
              {repoDetails.pulls.map(({ title, url }, i) => (
                <Link key={i} href={url} target='_blank' rel="noopener">
                  {title}
                </Link>
              ))}
            </Stack>
          </InfoCard>
          <InfoCard
            title="Stars"
            value="111"
            icon={<StarIcon />}
            color="#fcba03"
          >
            <Stack>
              <Link href="https://github.com/vinibar" target='_blank' rel="noopener">
                vinibar
              </Link>
              <Link href="https://github.com/zachmichael" target='_blank' rel="noopener">
                zachmichael
              </Link>
              <Link href="https://github.com/dimitrovnikolay" target='_blank' rel="noopener">
                dimitrovnikolay
              </Link>
            </Stack>
          </InfoCard>
          <InfoCard
            title="Open Issues"
            value="20"
            icon={<HelpIcon fontSize="large" />}
            color="#53a158"
          >
            <Stack>
              <Link href="https://github.com/SAP/cloud-sdk-js/issues/2950" sx={{ mb: 0.5 }} target='_blank' rel="noopener">
                  How to use @sap-cloud-sdk/generator services in Angular project?
              </Link>
              <Link href="https://github.com/SAP/cloud-sdk-js/issues/2876" sx={{ mb: 0.5 }} target='_blank' rel="noopener">
                Catch Unresolved Promises
              </Link>
              <Link href="https://github.com/SAP/cloud-sdk-js/issues/2853" sx={{ mb: 0.5 }} target='_blank' rel="noopener">
                Regd support for On-Premise Connectivity in SAP BTP Kyma runtime
              </Link>
            </Stack>
          </InfoCard>
          <InfoCard
            title="PR Response Time"
            value="169 min (-12 min)"
            icon={<TrendUpIcon fontSize="large" />}
            color="#53a158"
          >
          <LineChart 
            dataset={trendLineChartData}
            legend={false} 
          />
          </InfoCard>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
