import { useEffect, useState } from 'react';
import { starWarsImages } from "../../modes/starWars/card";
import { generateArray } from "../../modes/starWars/game";
import { Cell } from "../Cell";
import styles from "./Board.module.scss";
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Modal } from '../Modal';
import { Pause, RestartAlt } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

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
  const [mode, setMode] = useLocalStorage('mode', 'star_wars');
  const [size, setSize] = useLocalStorage('size', 10);
  const [activeModal, setActiveModal] = useState(false);
  const [isYourMove, setIsYouMove] = useState(true);
  const [userScore, setUserScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);


  useEffect(() => {
    if (!isYourMove && flippedCards.length === 0) {
      const firstIndex = aiNextStep()
      setFlippedCards([...flippedCards, firstIndex])
      const secondIndex = aiNextStep()
      const aiCard1 = displayBoard[secondIndex]
      const aiCard2 = displayBoard[aiNextStep()]
      const newCards = displayBoard.map((card, i) => {
        if (i === aiCard1.index || i === aiCard2.index) {
          card.open = true
        }
        return card
      })
      setDisplayBoard(newCards)

      if (aiCard1.src === aiCard2.src) {
        setMatchedCards([...matchedCards, aiCard1.index, aiCard2.index])
        setFlippedCards([])
        setIsDisabled(false)
        setIsMatch('match')
        setIsYouMove(true)
        setAiScore(aiScore + 1)
      } else {
        setTimeout(() => {
          const newCards = displayBoard.map((card, index) => {
            if (index === aiCard1.index || index === aiCard2.index) {
              card.open = false
            }
            return card
          })
          setDisplayBoard(newCards)
          setFlippedCards([])
          setIsDisabled(false)
          setIsMatch('miss')
          setIsYouMove(true)
        }, 1000) 
      }
    }
  }, [isYourMove])

  useEffect(() => {
    
    if (flippedCards.length === 2) {
      setIsDisabled(true)
      const [first, second] = flippedCards
      if (displayBoard[first].src === displayBoard[second].src) {
        setMatchedCards([...matchedCards, first, second])
        setFlippedCards([])
        setIsDisabled(false)
        setIsMatch('match')
        setIsYouMove(false)
        setUserScore(userScore + 1)
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
          setIsYouMove(false)
        }, 1000)
      }
    }
  }, [displayBoard, flippedCards, matchedCards, isYourMove])

  function aiNextStep() {
    // let randomIndex = Math.floor(Math.random() * (displayBoard.length - 1)); 
    const freeCards: number[] = []
    displayBoard.forEach((card) => {
      if (!flippedCards.includes(card.index) && !matchedCards.includes(card.index)) {
        freeCards.push(card.index)
      }
    })
    const randomIndex = Math.floor(Math.random() * freeCards.length)
    return freeCards[randomIndex]
  }
  
  function onStart() {
    const sizeBoard =  48;
    const newArr = generateArray(starWarsImages, sizeBoard).map((el, index) => {
      return { src: el, index, open: false }
    })
    setDisplayBoard(newArr)
  }

  function onPause() {
    console.log('pause');
    setActiveModal(true)
  }

  function onCloseModal() {
    setActiveModal(false)
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
    <>
    <div className={`${styles.board} ${activeModal && styles.modal}`}>
      <header className={styles.header}>
        <h1 className={styles.title} onClick={onStart}>Memo Games</h1>
        <div className={styles.restart} onClick={onStart}>
        <Tooltip title="Restart">
          <IconButton>
            <RestartAlt fontSize='large' />
          </IconButton>
        </Tooltip>
        </div>
        <div onClick={onPause} className={styles.pause}>
        <Tooltip title="Pause">
          <IconButton>
            <Pause fontSize='large' />
          </IconButton>
        </Tooltip>
        </div>
      </header>

      <main className={styles.grid}>
        <div className={styles.wrap}></div>
        {cellsElements}
      </main>
      <footer>Time: 1 Score: {userScore +' : '+ aiScore} Moves: {isYourMove ? 'You' : 'AI'}</footer>
    </div>
   {activeModal && <Modal onClose={onCloseModal}/> }
    </>
    
  );
};
