import { Button } from '../Button';
import styles from "./Menu.module.scss";

export const Menu = () => {
  return (
    <nav className={styles.menu}>
      <ul className={styles.list}>
        <li>
          <a href={`/continue`}>
            <Button content='Продолжить' disabled/>
          </a>
        </li>
        <li>
          <a href={`/new-game2`}>
            <Button content='Новая игра'/>
          </a>
        </li>
        <li>
          <a href={`/settings`}>
            <Button content='Настройки'/>
          </a>
        </li>
      </ul>
    </nav>
  );
};
