import { useState, useEffect } from "react";

export function useBoardState(currentCellId: string) {
  const [openedCells, setOpenedCells] = useState<string[]>([]);
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  
  if (openedCells.length < 2) {
    setOpenedCells([...openedCells, currentCellId]);
  } 

//   openedCells[0] === openedCells[1] ?
//     setIsMatch(true) :
//     setIsMatch (false)

    if (openedCells[0] === openedCells[1] && openedCells[0] !== '' && openedCells.length > 1) {
        console.log(openedCells)
        
        setIsMatch(true)
    } else if (openedCells[0] !== openedCells[1] && openedCells[0] !== '' && openedCells.length > 1) {
        setIsMatch(false)
    }
    
  

//   useEffect(() => {
//     function onFlipping
//   }, [])
   return {isMatch, setOpenedCells}
}
