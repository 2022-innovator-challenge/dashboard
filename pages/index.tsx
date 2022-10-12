import type { NextPage } from 'next';
import Head from 'next/head';
import LineChart from '../components/LineChart';
import InfoCard from '../components/InfoCard';
import styles from '../styles/Dashboard.module.css';
import Image from 'next/image';

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
// import GitHubIcon from '@material-ui/icons/GitHub';
import StackedLineChart from '../components/StackedLineChart';
import { jenkinsStackedLineChartData } from '../utils/mock-data';
import { Stack } from '@mui/system';

const JenkinsIcon =
  new Date().getMonth() === 9 ? JenkinsNormalIcon : JenkinsteinIcon;

const Home: NextPage = () => {
  return (
    <div className={styles.dashboard}>
      <Head>
        <title>Innovator Dashboard</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={4}>
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
        <Grid item xs={4}>
          <InfoCard title="Stars" value={102} imageBackgroundColor="#fcba03">
            <StarIcon />
          </InfoCard>
        </Grid>
        <Grid item xs={4}>
          <InfoCard
            title="Open Issues"
            value={26}
            imageBackgroundColor="#53a158"
          >
            <HelpIcon fontSize="large" />
          </InfoCard>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ p: 2 }}>
            <LineChart />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <div className={`${styles.prResponseTime} ${styles.trendCard}`}>
            <div className={styles.trendCardLeftSide}>
              <div className={`${styles.trendCardImg} ${styles.positive}`}>
                <Image src="/up-arrow.svg" alt="Trend Arrow" layout="fill" />
              </div>
            </div>
            <div className={styles.trendCardRightSide}>
              <p className={styles.trendCardTitle}>
                Avg. PR Response Time <br />
              </p>
              <p className={styles.trendCardSubText}>
                -12 Minutes <br />
                <span className={styles.trendCardSubSubText}>
                  compared to the last 7 days
                </span>
              </p>
            </div>
          </div>
          <Paper sx={{ p: 2 }}>
            <div className={styles.trendCardText}>
              <p>Avg. PR Response Time</p>
              <p>169 Minutes</p>
            </div>
            <div className={`${styles.trendCardImg} ${styles.positive}`}>
              <Image src="/up-arrow.svg" alt="Trend Arrow" layout="fill" />
            </div>
            <div className={styles.trendCardSubText}>
              <p>-12 Minutes</p>
              <p className={styles.trendCardSubSubText}>
                compared to the last 7 days
              </p>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <GitHubIcon />
              <Typography>Github Area</Typography>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>
            <Stack direction="row">
              <SvgIcon viewBox="0 0 226 312">
                <JenkinsIcon />
              </SvgIcon>
              <Typography align="center">Jenkins Area</Typography>
              <StackedLineChart
                name="Pipeline Stats"
                data={jenkinsStackedLineChartData}
              />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
