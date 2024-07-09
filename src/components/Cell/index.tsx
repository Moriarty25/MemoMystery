import { FC, useState } from "react";
import styles from "./Cell.module.scss";

type TCellProps = {
  src: string;
  title: string;
  id: string;
  openCell: null | {index: number, src: string};
  isMatch: 'match' | 'miss' | null;
  onClick: (src: string, index: number) => void;
  index: number
};



export const Cell: FC<TCellProps> = ({src, index, title, id, onClick, openCell, isMatch}) => {
  
  return (
    <div  onClick={() => onClick(src, index)} className={`${styles.cell} ${styles.visible} ${isMatch ==='match' ? styles.match : isMatch === 'miss' ? styles.miss : ''}`}>
      <div className={styles.cellInner}>
        {index === openCell?.index ? (
          <img
            className={`${styles.img} ${styles.font}`}
            src={src}
            alt={title}
          />
        ) : (
          <img
            className={`${styles.img} ${styles.font}`}
            src="/src/assets/images/space.avif"
            alt={title}
          />
        )}
        {/* <img className={`${styles.img} ${styles.font}`} src='/src/assets/images/space.avif' alt={title} /> */}
        {/* <img className={`${styles.img} ${styles.font}`} src={src} alt={title} /> */}
      </div>
    </div>
  );
};
