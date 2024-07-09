
export function startGame() {

}

interface IElementCounts {
    [key: string]: number
}

export function generateArray(cards: Array<string>, cardAmount: number) {
    const randomArray: string[] = []
    const elementCounts: IElementCounts = {}  
    
    for (const card of cards) {
        elementCounts[card] = 0
    }
    for (let i = 0; randomArray.length <= cardAmount; i++) {
        const randomIndex = Math.floor(Math.random() * cards.length)
        const randomElement = cards[randomIndex]

        if (elementCounts[randomElement] < 2) {
            randomArray.push(randomElement)
            elementCounts[randomElement]++            
        }
    }

    // while (generatedArray.length < cardAmount) {
    //     const randomIndex = Math.floor(Math.random() * cards.length)
    //     const randomElement = cards[randomIndex]
        
    //     if (elementCounts[randomElement] < 2) {
    //         generatedArray.push(randomElement)
    //         elementCounts[randomElement]++
    //     }
        
    // }

    
    return randomArray
}

function generateBoard() {
    
}
