import type { NextPage } from 'next';
import LineChart from '../components/LineChart';
import InfoCard from '../components/InfoCard';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
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
  githubStackedLineChartData,
  jenkinsStackedLineChartData
} from '../utils/mock-data';
import { Stack } from '@mui/system';
import styles from '../styles/Dashboard.module.css';

const JenkinsIcon =
  new Date().getMonth() === 9 ? JenkinsteinIcon : JenkinsNormalIcon;

const Home: NextPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <InfoCard
          title="Open Pull Requests"
          value={10}
          imageBackgroundColor="#434242"
        >
          <SvgIcon>
            <PullRequestIcon />
          </SvgIcon>
        </InfoCard>
      </Grid>
      <Grid item xs={3}>
        <InfoCard title="Stars" value={102} imageBackgroundColor="#fcba03">
          <StarIcon />
        </InfoCard>
      </Grid>
      <Grid item xs={3}>
        <InfoCard title="Open Issues" value={26} imageBackgroundColor="#53a158">
          <HelpIcon fontSize="large" />
        </InfoCard>
      </Grid>

      <Grid item xs={3}>
        <Paper sx={{ p: 2 }}>
          <Stack direction="row" alignItems="center">
            <TrendUpIcon
              style={{ fontSize: 60, marginLeft: -16 }}
              htmlColor="#53a158"
            ></TrendUpIcon>
            <Stack>
              <Typography sx={{ mb: -0.5 }}>PR Response Time</Typography>
              <Typography
                color="#53a158"
                sx={{ fontSize: 20, mt: -0.5 }}
                fontWeight="bold"
              >
                169 min (-12 min)
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <LineChart />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper sx={{ p: 2 }}>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <GitHubIcon className={styles.chartIcon} />
            <StackedLineChart
              name="Github Actions"
              data={githubStackedLineChartData}
            />
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper sx={{ p: 2 }}>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <SvgIcon viewBox="0 0 226 312" className={styles.chartIcon}>
              <JenkinsIcon />
            </SvgIcon>
            <StackedLineChart
              name="Pipeline Stats"
              data={jenkinsStackedLineChartData}
            />
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
