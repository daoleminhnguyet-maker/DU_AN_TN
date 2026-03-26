'use client';
import { useState, useEffect } from 'react';
import styles from './Header.module.scss';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roleListOpen, setRoleListOpen] = useState(false);
  const [userName, setUserName] = useState('Đào Lê Minh Nguyệt');
  const [userRole, setUserRole] = useState('Admin');

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) setUserRole(savedRole);
    const savedName = localStorage.getItem('userName');
    if (savedName) setUserName(savedName);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleRoleChange = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
    setRoleListOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoArea}>
          <button
            className={styles.menuToggle}
            onClick={() => window.dispatchEvent(new Event('toggleSidebar'))}
          >
            ☰
          </button>
          <img
            src="https://hmerp.laravel.cloud/images/logo_brand.png"
            alt="HMERP"
            className={styles.logo}
          />
        </div>
        <div className={styles.userMenu} onClick={() => setDropdownOpen(!dropdownOpen)}>
          <div className={styles.avatar}>MN</div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{userName}</div>
            <div className={styles.userRole}>{userRole}</div>
          </div>
        </div>

        {dropdownOpen && (
          <div className={styles.userDropdown}>
            <div className={styles.dropdownItem} onClick={() => alert('Hồ sơ')}>
              <span className={styles.dropdownIcon}>👤</span>
              <span>Hồ sơ</span>
            </div>
            <div className={styles.dropdownDivider} />
            <div className={styles.dropdownItem} onClick={() => setRoleListOpen(!roleListOpen)}>
              <span className={styles.dropdownIcon}>🔄</span>
              <span>Đổi vai trò</span>
            </div>
            {roleListOpen && (
              <div className={styles.dropdownRoleList}>
                {['Admin', 'Kinh doanh', 'Kho chành', 'Điều vận', 'HCNS', 'Kế toán'].map((role) => (
                  <div
                    key={role}
                    className={styles.roleItem}
                    onClick={() => handleRoleChange(role)}
                  >
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.dropdownDivider} />
            <div className={`${styles.dropdownItem} ${styles.logoutItem}`} onClick={handleLogout}>
              <span className={styles.dropdownIcon}>🚪</span>
              <span>Đăng xuất</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;