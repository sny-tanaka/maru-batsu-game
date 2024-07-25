import styles from './style.module.scss';

type Props = {
  items: React.ReactNode[];
  onClick: (n: number) => void;
};

export const Grid3x3 = ({ items, onClick }: Props) => {
  return (
    <div className={styles.grid}>
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className={styles.item}
          onClick={() => onClick(i)}
        >
          {items[i]}
        </div>
      ))}
    </div>
  );
};
