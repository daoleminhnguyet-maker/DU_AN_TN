'use client';
import styles from './Button.module.scss';

const Button = ({ children, variant = 'primary', onClick, disabled, icon }) => {
  return (
    <button
      className={`${styles.btn} ${styles[`btn-${variant}`]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className={styles.btnIcon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;