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
        <div className={`${styles.prs} ${styles.smallCard}`}>
          <div className={`${styles.leftSmallCard} ${styles.leftPr}`}>
            <div className={styles.leftSmallCardImg}>
              <Image src="/git-pull-request.svg" alt="Pull Request Image" layout="fill" />
            </div>
            <p>Open Pull Requests</p>
          </div>
          <div className={styles.rightSmallCard}>
            <p>10</p>
          </div>
        </div>
        <div className={`${styles.stars} ${styles.smallCard}`}>
          <div className={styles.leftSmallCard}>
            <div className={`${styles.leftSmallCardImg} ${styles.leftStarImg}`}>
              <Image src="/star.svg" alt="Star Image" layout="fill" />
            </div>
          <p className={styles.starsFont}>Stars</p>
          </div>
          <div className={styles.rightSmallCard}>
            <p>103</p>
          </div>
        </div>
        <div className={`${styles.issues} ${styles.smallCard}`}>
          <div className={styles.leftSmallCard}>
            <div className={`${styles.leftSmallCardImg} ${styles.leftStarImg}`}>
              <Image src="/issues.svg" alt="Issue Image" layout="fill" />
            </div>
          <p className={styles.issuesFont}>Open Issues</p>
          </div>
          <div className={styles.rightSmallCard}>
            <p>26</p>
          </div>
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
            <p className={styles.trendCardSubSubText}>compared to the last 7 days</p>
          </div>
        </div>
        <div className={`${styles.jenkinsPipeline} ${styles.chartCard}`}>Jenkins Area</div>
        <div className={`${styles.githubPipeline} ${styles.chartCard}`}>Github Area</div>
      </div>
    </div>
  );
};

export default Home;
