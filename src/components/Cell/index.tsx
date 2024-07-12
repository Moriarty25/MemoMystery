import { FC } from "react";
import styles from "./Cell.module.scss";
import { TCell } from "../Board";

type TCellProps = {
  title: string;
  cell: TCell;
  isMatch: 'match' | 'miss' | null;
  onClick: (arg: TCell) => void;
};



export const Cell: FC<TCellProps> = ({title, onClick, cell, isMatch,}) => {
  
  const index = cell?.index
  const open = cell?.open
  const src = cell?.src
 
  return (
    <div className={`${styles.cell} ${styles.visible} ${isMatch ==='match' ? styles.match : isMatch === 'miss' ? styles.miss : ''}`}>
      <div onClick={ ()=> {onClick({index, src, open})}} className={styles.cellInner}>
        {open ? (
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
