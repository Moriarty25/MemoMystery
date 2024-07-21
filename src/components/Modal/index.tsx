import { FC, MouseEvent, useEffect } from 'react';
import styles from './Modal.module.scss';

type TModalProps = {
    onClose: () => void;
}

export const Modal: FC<TModalProps> = ({onClose}) => {
    useEffect(() => {
        
        
        document.addEventListener('keydown', onKeydownHandler)
        return () =>  document.removeEventListener('keydown', onKeydownHandler)
    })

    function onKeydownHandler ({key}: KeyboardEvent) {
        switch (key) {
            case 'Escape':
              onClose()
              break
        }
    }

    function onBackground(e: MouseEvent<HTMLElement>) {
        e.stopPropagation()
    }

    return (
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.background}>
                <div className={styles.content} onClick={onBackground}>
                    <h3 className={styles.title}>Pause</h3>
                    <div className={styles.menu}>
                        <ul>
                            <li>
                                <span>
                                    Режим игры:
                                </span>
                                <div className={styles.mode}>
                                <span>Pirates, StarWars</span>
                                </div>
                            </li>
                            <li>
                                Игровое поле:
                            </li>
                        </ul>
                    </div>
                </div>  
            </div>
        </div>
    )
}