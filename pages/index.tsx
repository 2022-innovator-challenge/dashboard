import type { NextPage } from 'next';
import Head from 'next/head';
import Linechart from '../components/Linechart';
import styles from '../styles/Dashboard.module.css'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className={styles.dashboard}>
      <Head>
        <title>Innovator Dashboard</title>
      </Head>
      <div className={styles.grid}>
        <div className={styles.stars}>Stars</div>
        <div className={styles.prs}>
          <p>Pull Requests</p>
          <Image src="/git-pull-request.svg" alt="pull-request-image" width="30" height="30" />
          <p>10</p>
        </div>
        <div className={styles.issues}>Issues</div>
        <div className={styles.npmDownloads}>
          <Linechart />
        </div>
        <div className={styles.prResponseTime}>PR Response Time</div>
        <div className={styles.jenkinsPipeline}>Jenkins Area</div>
        <div className={styles.githubPipeline}>Github Area</div>
      </div>
    </div>
  );
};

export default Home;
