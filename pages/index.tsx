import type { NextPage } from 'next';
import Head from 'next/head';
import Linechart from '../components/Linechart';
import InfoCard from '../components/InfoCard';
import styles from '../styles/Dashboard.module.css';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

const Home: NextPage = () => {
  return (
    <div className={styles.dashboard}>
      <Head>
        <title>Innovator Dashboard</title>
      </Head>
      <div className={styles.grid}>
        <div className={`${styles.prs} ${styles.smallCard}`}>
          <InfoCard
            title="Open Pull Requests"
            value={10}
            imageSrc="/git-pull-request.svg"
            imageBackgroundColor="#434242"
          />
        </div>
        <div className={`${styles.stars} ${styles.smallCard}`}>
          <InfoCard
            title="Stars"
            value={102}
            imageSrc="/star.svg"
            imageBackgroundColor="#fcba03"
          />
        </div>
        <div className={`${styles.issues} ${styles.smallCard}`}>
          <InfoCard
            title="Open Issues"
            value={26}
            imageSrc="/issues.svg"
            imageBackgroundColor="#53a158"
          />
        </div>
        <div className={`${styles.npmDownloads} ${styles.chartCard}`}>
          <Linechart />
        </div>
        <div className={`${styles.prResponseTime} ${styles.trendCard}`}>
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
        </div>
        <div className={`${styles.jenkinsPipeline} ${styles.chartCard}`}>
          Jenkins Area
        </div>
        <div className={`${styles.githubPipeline} ${styles.chartCard}`}>
          Github Area
        </div>
      </div>
    </div>
  );
};

export default Home;
