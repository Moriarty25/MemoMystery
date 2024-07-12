import { FC, useEffect } from "react";
import { TCell } from "../Board";
import styles from "./Cell.module.scss";

type TCellProps = {
  title: string;
  cell: TCell;
  isMatch: 'match' | 'miss' | null;
  onClick: (arg: TCell) => void;
  mathedCards: number[];
  flippedCards: number[];
  isDisabled: boolean;
};



export const Cell: FC<TCellProps> = ({title, onClick, cell, isDisabled, mathedCards, flippedCards}) => {
  
  const index = cell?.index
  const open = cell?.open
  const src = cell?.src

  useEffect(() => {
    console.log(isDisabled);
    
    if (isDisabled) {

    }
  },[isDisabled])

  function checkMatchingCard() {
    if (mathedCards.includes(index) || flippedCards.includes(index)) {
      return true
    }
  }
 
  return (
    <div className={`${styles.cell} ${checkMatchingCard() ?? styles.visible }  ${checkMatchingCard() ? styles.disabled : ''}`}>
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
