import type { NextPage } from 'next';
import LineChart from '../components/LineChart';
import InfoCard from '../components/InfoCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
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
  jenkinsStackedLineChartData
} from '../utils/mock-data';
import { Stack } from '@mui/system';
import styles from '../styles/Dashboard.module.css';
import StackedBarChart from '../components/StackedBarChart';

const JenkinsIcon =
  new Date().getMonth() === 9 ? JenkinsteinIcon : JenkinsNormalIcon;

const Home: NextPage = () => {
  return (
    <Grid container spacing={2} columns={4}>
      <Grid item xs={3}>
        <Grid container spacing={2} columns={2}>
          <Grid item xs={2}>
            <Paper sx={{ p: 2 }}>
              <LineChart />
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
                  name="Github Actions"
                  data={githubStackedLineChartData}
                />
                <StackedBarChart
                  data={githubStackedBarChartData}
                  xTitle="Actions"
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
                  name="Jenkins"
                  data={jenkinsStackedLineChartData}
                />
                <StackedBarChart
                  data={jenkinsStackedBarChartData}
                  xTitle="Stages"
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
            value="10"
            icon={
              <SvgIcon>
                <PullRequestIcon />
              </SvgIcon>
            }
            color="#434242"
          ></InfoCard>
          <InfoCard
            title="Stars"
            value="102"
            icon={<StarIcon />}
            color="#fcba03"
          ></InfoCard>
          <InfoCard
            title="Open Issues"
            value="26"
            icon={<HelpIcon fontSize="large" />}
            color="#53a158"
          ></InfoCard>
          <InfoCard
            title="PR Response Time"
            value="169 min (-12 min)"
            icon={<TrendUpIcon fontSize="large" />}
            color="#53a158"
          ></InfoCard>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
