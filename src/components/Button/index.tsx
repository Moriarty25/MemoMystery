import { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.scss";

type TButtonProps = {
  content: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<TButtonProps> = ({ content, ...attrs }) => {
  return (
    <div className={styles.wrap}>
      {/* <img src="/src/assets/images/wood.avif" alt="wood" />   */}
      <button className={styles.button} {...attrs}>
        {content}
      </button>
    </div>
  );
};
