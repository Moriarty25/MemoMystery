import {useState} from 'react';
import { useBoardState } from '../../hooks/useBoardState';
import { starWarsImages } from "../../modes/starWars/card";
import { generateArray } from "../../modes/starWars/game";
import { Cell } from "../Cell";
import styles from "./Board.module.scss";
import { v4 as uuidv4 } from 'uuid';

export const Board = () => {
  const [displayBoard, setDisplayBoard] = useState<string[]>([]);
  const [openCell, setOpenCell] = useState<null | {index: number, src: string}>(null);
  const [isMatch, setIsMatch] = useState<null | 'match' | 'miss'>(null);

  function onStart() {
    setDisplayBoard(generateArray(starWarsImages, 17)); 
  }

  function onFlippingBoardHandler(src: string, id: number) {
    console.log(displayBoard.indexOf(src));
    
    if (src === openCell?.src) {
      setIsMatch('match')
    } else {
      setIsMatch('miss')
      setOpenCell({src, index: id}) 
    }
  }

  const cellsElements = displayBoard.map((cell, index) => {
    const id = uuidv4(); 
    return <Cell src={cell} title={'title'} index ={index} key={index} id={id} openCell={openCell} isMatch={isMatch} onClick={onFlippingBoardHandler}/>;
  });

  return (
    <div className={styles.board}>
      <h1 className={styles.title} onClick={onStart}>Memo Games</h1>

      <main className={styles.grid}>
        <div className={styles.wrap}></div>
        {cellsElements}
      </main>
      <footer>Time: 1 Score: Moves: </footer>
    </div>
  );
};
