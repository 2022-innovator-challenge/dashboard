import { ReactNode, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }: { children: ReactNode }) {

    const [sidebarElements, setSidebarElements] = useState([
        { name: 'Home', isSelected: false, link: '/' },
        { name: 'Settings ', isSelected: false, link: '/settings' },
        { name: 'Logout', isSelected: false, link: '/logout' }
    ]);

    function unselectSidebar() {
      setSidebarElements(
        sidebarElements.map(element => ({ ...element, isSelected: false }))
      )
    }

  return (
    <div className={styles.grid}>
      <Header
        unselectSidebar={unselectSidebar}
      />
      <Sidebar 
        sidebarElements={sidebarElements}
        setSidebarElements={setSidebarElements}
      />
      {children}
    </div>
  );
}
