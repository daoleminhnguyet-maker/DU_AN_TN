'use client';
import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './Layout.module.scss';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setSidebarOpen((prev) => !prev);
    window.addEventListener('toggleSidebar', handleToggle);
    return () => window.removeEventListener('toggleSidebar', handleToggle);
  }, []);

  return (
    <>
      <Header />
      <div className={styles.appWrapper}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </>
  );
};

export default Layout;