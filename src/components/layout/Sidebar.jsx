'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.scss';

const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <>
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarLogo}>
          <img
            src="https://hmerp.laravel.cloud/images/logo_brand.png"
            alt="HMERP"
          />
        </div>
        <nav className={styles.sidebarNav}>
          <div className={styles.navGroup}>
            <div className={styles.navGroupTitle}>Kinh doanh</div>
            <Link
              href="/orders"
              className={`${styles.navItem} ${isActive('/orders') ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>📦</span>
              <span>Hàng chuyến</span>
            </Link>
            <Link
              href="/logistics"
              className={`${styles.navItem} ${isActive('/logistics') ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>🚛</span>
              <span>Hàng logistics</span>
            </Link>
            <Link
              href="/freight"
              className={`${styles.navItem} ${isActive('/freight') ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>🏭</span>
              <span>Hàng chành</span>
            </Link>
            <Link
              href="/tracking"
              className={`${styles.navItem} ${isActive('/tracking') ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>📊</span>
              <span>Theo dõi TT</span>
            </Link>
            <Link
              href="/report"
              className={`${styles.navItem} ${isActive('/report') ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>📈</span>
              <span>Bảng kê</span>
            </Link>
            <Link
              href="/customers"
              className={`${styles.navItem} ${isActive('/customers') ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>👥</span>
              <span>Quản lý KH</span>
            </Link>
            <Link
              href="/report-sales"
              className={`${styles.navItem} ${isActive('/report-sales') ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>📊</span>
              <span>Báo cáo</span>
            </Link>
          </div>

          <div className={styles.navGroup}>
            <div className={styles.navGroupTitle}>Yêu cầu</div>
            <Link
              href="/leave"
              className={`${styles.navItem} ${isActive('/leave') ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>🏖️</span>
              <span>Nghỉ phép</span>
            </Link>
            <Link
              href="/rules"
              className={`${styles.navItem} ${isActive('/rules') ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>📜</span>
              <span>Nội quy</span>
            </Link>
          </div>
        </nav>
      </aside>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
    </>
  );
}
export default Sidebar;