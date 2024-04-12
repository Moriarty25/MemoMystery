import { Link } from "react-router-dom"
import { Button } from '../Button';
import styles from "./Menu.module.scss";

export const Menu = () => {
  return (
    <nav className={styles.menu}>
      <ul className={styles.list}>
        <li>
          <Link to={`contacts/1`}>
            <Button content='Продолжить' disabled/>
          </Link>
            

        </li>
        <li>
          <Link to={`/new-game`}>
            <Button content='Новая игра'/>
          </Link>
        </li>
        <li>
          <Link to={`/settings`}>
            <Button content='Настройки'/>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
