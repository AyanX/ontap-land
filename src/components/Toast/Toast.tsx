import check from "../../assets/check-circle.png";
import x from "../../assets/X.png";

import styles from './Toast.module.scss';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

export default function Toast({ message, type }: ToastProps) {
  return (
    <div className={`${styles.toast} ${styles[type]}`} role="alert" aria-live="polite">
      {type === 'success' ? <img src={check} alt="success" width={18} height={18} /> : <img src={x} alt="error" width={18} height={18} />}
      <span>{message}</span>
    </div>
  );
}
