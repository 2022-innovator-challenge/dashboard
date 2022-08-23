import type { NextPage } from 'next';
import Head from 'next/head';
import Dashboard from '../components/Dashboard';
import styles from '../styles/Dashboard.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.dashboard}>
      <Head>
        <title>Innovator Dashboard</title>
      </Head>
      <Dashboard />
      <Dashboard />
    </div>
  );
};

export default Home;
