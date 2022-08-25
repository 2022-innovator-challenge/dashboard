import type { NextPage } from 'next';
import Head from 'next/head';
import Linechart from '../components/Linechart';
import styles from '../styles/Dashboard.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.dashboard}>
      <Head>
        <title>Innovator Dashboard</title>
      </Head>
      <div className={styles.grid}>
        <div className={styles.stars}></div>
        <div className={styles.prs}></div>
        <div className={styles.issues}></div>
        <div className={styles.npmDownloads}>
          <Linechart />
        </div>
        <div className={styles.prResponseTime}></div>
        <div className={styles.jenkinsPipeline}></div>
        <div className={styles.githubPipeline}></div>
      </div>
    </div>
  );
};

export default Home;
