import { ReactNode, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }: { children: ReactNode }) {

    const [sidebarElements, setSidebarElements] = useState([
        { name: 'Home', isSelected: true, link: '/' },
        { name: 'Automations', isSelected: false, link: '/automations' },
        { name: 'Settings ', isSelected: false, link: '/settings/project' }
    ]);

    function unselectSidebar() {
      setSidebarElements(
        sidebarElements.map(element => ({ ...element, isSelected: false }))
      )
    }

  return (
    <div className={styles.flexWrapper}>
       <div id={styles.header}>
        <Header
          unselectSidebar={unselectSidebar}
        />
      </div>
      <div className={styles.bottomContainer}>
        <div id={styles.sidebar}>
          <Sidebar 
            sidebarElements={sidebarElements}
            setSidebarElements={setSidebarElements}
          />
        </div>
        <div id={styles.children}>
          {children}
        </div>
      </div>
    </div>
  );
}
