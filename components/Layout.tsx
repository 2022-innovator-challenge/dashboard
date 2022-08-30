import { ReactNode } from 'react';
import Header from './Header';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.flexWrapper}>
       <div id={styles.header}>
        <Header />
      </div>
      <div className={styles.bottomContainer}>
        <div id={styles.children}>
          {children}
        </div>
      </div>
    </div>
  );
}
