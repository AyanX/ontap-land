import styles from './Skeleton.module.scss';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export default function Skeleton({ width = '100%', height = '100%', className = '' }: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
