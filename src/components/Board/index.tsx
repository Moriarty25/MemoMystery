import { useEffect, useState } from 'react';
import { starWarsImages } from "../../modes/starWars/card";
import { generateArray } from "../../modes/starWars/game";
import { Cell } from "../Cell";
import styles from "./Board.module.scss";
import { v4 as uuidv4 } from 'uuid';

export type TCell = {
  index: number,
  src: string,
  open: boolean
}

export const Board = () => {
  const [displayBoard, setDisplayBoard] = useState<TCell[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isMatch, setIsMatch] = useState<null | 'match' | 'miss'>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsDisabled(true)
      const [first, second] = flippedCards
      if (displayBoard[first].src === displayBoard[second].src) {
        setMatchedCards([...matchedCards, first, second])
        setFlippedCards([])
        setIsDisabled(false)
        setIsMatch('match')
      } else {
        setTimeout(() => {
          const newCards = displayBoard.map((card, index) => {
            if (index === first || index === second) {
              card.open = false
            }
            return card
          })
          setDisplayBoard(newCards)
          setFlippedCards([])
          setIsDisabled(false)
          setIsMatch('miss')
        }, 1000)
      }
    }
  }, [displayBoard, flippedCards, matchedCards])

  function onStart() {
    // setDisplayBoard(generateArray(starWarsImages, 17)); 
    const newArr = generateArray(starWarsImages, 17).map((el, index) => {
      return { src: el, index, open: false }
    })
    setDisplayBoard(newArr)
  }

  function onFlippingBoardHandler({ index, }: TCell) {
    if (isDisabled
      || flippedCards.includes(index)
      || matchedCards.includes(index)
    ) return

    const newCards = displayBoard.map((card, i) => {
      if (i === index) {
        card.open = true
      }
      return card
    })
    setDisplayBoard(newCards)
    setFlippedCards([...flippedCards, index])

  }

  const cellsElements = displayBoard.map((cell) => {
    const id = uuidv4();
    return <Cell title={'title'} key={id} cell={cell} isDisabled={isDisabled} flippedCards={flippedCards} mathedCards={matchedCards} isMatch={isMatch} onClick={onFlippingBoardHandler} />;
  });

  return (
    <div className={styles.board}>
      <h1 className={styles.title} onClick={onStart}>Memo Games</h1>

      <main className={styles.grid}>
        <div className={styles.wrap}></div>
        {cellsElements}
      </main>
      <footer>Time: 1 Score: {matchedCards.length / 2} Moves: </footer>
    </div>
  );
};
