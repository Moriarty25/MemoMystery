import { FC, useState } from "react";
import styles from "./Cell.module.scss";

type TButtonProps = {
  src: string;
  title: string;
  id: string;
  openCell: string | null;
  isMatch: 'match' | 'miss' | null;
  onClick: (id: string) => void;
};



export const Cell: FC<TButtonProps> = ({ src, title, id, onClick, openCell, isMatch}) => {
  const [isOpen, setIsOpen] = useState(false);

  function onFlippingHandler() {
    console.log(id, 'this');
    
    setIsOpen(!isOpen)
    
    
  }
  
  return (
    <div  onClick={() => onClick(src)} className={`${styles.cell} ${styles.visible} ${isMatch ==='match' ? styles.match : isMatch === 'miss' ? styles.miss : ''}`}>
      <div className={styles.cellInner}>
        {openCell ? (
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
