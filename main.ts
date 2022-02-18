const keyBoard = <HTMLElement> document.getElementById('keyboard')
const errorDiv = <HTMLElement> document.getElementById('error')

const row1: string[] = []
const row2: string[] = []
const row3: string[] = []
const row4: string[] = []
const row5: string[] = []
const row6: string[] = []

const rowsArray: Array<Array<string>> = [row1, row2, row3, row4, row5, row6]

const wordsArray: string[] = ['betty', 'meggy']

class gameState {
    private attempt: number
    private error: string | undefined
    private wordOfTheDay: string

    constructor(attempt: number, wordOfTheDay: string, error?: string) {
        this.attempt = attempt
        this.error = error
        this.wordOfTheDay = wordOfTheDay
    }

    getWordOfTheDay(): string {
        return this.wordOfTheDay
    }

    getAttempt(): number {
        return this.attempt
    }

    getError(): string | undefined {
        return this.error
    }

    setAttempt(attempt: number) {
        this.attempt = attempt
    }

    incrementAttempt(): void {
        this.attempt += 1
    }

    resetError(): void {
        this.error = undefined
        errorDiv.innerHTML = ''
    }

    setError(error: string): void {
        this.error = error
        errorDiv.innerHTML = error
        setInterval(() => {
            this.resetError()
        }, 5000)
    }

    gameEnd(): void {
        console.log("Game over")
    }

}

const submitAttemptBtn = <HTMLElement> document.getElementById('enter')
const currentGameState = new gameState(0, wordsArray[0])

const guessContainingChar = (): void => {
    const currentRow = rowsArray[currentGameState.getAttempt()]
    const wordOfTheDay = currentGameState.getWordOfTheDay()
    let matchedLetters: string[] = [];
    currentRow.forEach((letter) => {
        if(wordOfTheDay.includes(letter)) {
            matchedLetters.push(letter)
        }
    })
    if(matchedLetters.length > 0) {
        matchedLetters.forEach((letter) => {
            let exactMatchIndexes: number[] = []
            let partialMatchIndexes: number[] = []
            for(let i = 0; i < currentRow.length; i++) {
                if(currentRow[i] == letter && wordOfTheDay[i] == letter) {
                    exactMatchIndexes.push(i)
                } else if(currentRow[i] == letter && wordOfTheDay[i] !== letter){
                    partialMatchIndexes.push(i)
                }
            }
            const wordRowContainer = <HTMLElement> document.getElementById(`wordrow${currentGameState.getAttempt() + 1}`)
            const childDivs = wordRowContainer.getElementsByTagName('div')
            partialMatchIndexes.forEach((partialMatch) => {
                const child = childDivs[partialMatch]
                child.classList.add("yellow")
            })
            exactMatchIndexes.forEach((exactMatch) => {
                const child = childDivs[exactMatch]
                child.classList.add("green")
            })
        })
    }
}

const validateSubmission = (): void => {
    const currentRow = rowsArray[currentGameState.getAttempt()]
    const wordOfTheDay = currentGameState.getWordOfTheDay()
    let guess = '';
    const currentAttempt = currentGameState.getAttempt()
    currentRow.map((letter) => {
        guess = guess + letter
    })
    guessContainingChar()
    if(currentAttempt <= 5 && guess === wordOfTheDay) {
        console.log("winner!")
    } else if(currentAttempt < 6){
        console.log("nope, try again")
    } else {
        console.log("Game over")
    }
}

const mapCharToRowArray = (char: string): void => {
    const currentRow = rowsArray[currentGameState.getAttempt()]
    if(currentRow.length < 5) {
        currentRow.push(char)
    } else {
        currentGameState.setError("The word must not be longer than 5 characters")
    }
}

const mapHtmlToWordInput = (): void => {
    const wordRowContainer = <HTMLElement> document.getElementById(`wordrow${currentGameState.getAttempt() + 1}`)
    const childDivs = wordRowContainer.getElementsByTagName('div')
    const currentRow = rowsArray[currentGameState.getAttempt()]
    const child = childDivs[currentRow.length - 1]
    child.innerHTML = currentRow[currentRow.length - 1].valueOf()
}

submitAttemptBtn?.addEventListener("click", (e) => {
    e.preventDefault()
    const currentAttempt = currentGameState.getAttempt() 
    const currentRow = rowsArray[currentGameState.getAttempt()]
    if(currentAttempt < 5 && currentRow.length === 5) {
        validateSubmission()
        currentGameState.incrementAttempt()
    } else if(currentAttempt === 5) {
        currentGameState.gameEnd()
    } else {
        currentGameState.setError("Must enter a five letter word before continuing towards your next guess")
    }
})

const keyElements = keyBoard?.getElementsByTagName('span')
if(keyElements && keyElements?.length) {
    for(let i = 0; i < keyElements?.length; i++) {
        const currentRow = rowsArray[currentGameState.getAttempt()]
        console.log(currentRow)
        const keyElement = keyElements[i]
        keyElement.addEventListener("click", (e) => {
            const element = <HTMLElement> e.target
            const key = element.innerHTML
            mapCharToRowArray(key)
            mapHtmlToWordInput()
        })
    }
}

const backspace = <HTMLElement> document.getElementById('backspace')
backspace.addEventListener("click", (e) => {
    e.preventDefault()
    const currentRow = rowsArray[currentGameState.getAttempt()]
    const wordRowContainer = <HTMLElement> document.getElementById(`wordrow${currentGameState.getAttempt() + 1}`)
    const childDivs = wordRowContainer.getElementsByTagName('div')
    const lastChild = childDivs[currentRow.length - 1]
    if(lastChild) {
        lastChild.innerHTML = ''
        currentRow.pop()
    }
})

window.addEventListener("keyup", (e) => {
    const { key, keyCode} = e
    console.log(e)
    if (keyCode >= 65 && keyCode <= 90) {
    // Alphabet upper case
        console.log(key)
        mapCharToRowArray(key.toLocaleLowerCase())
        mapHtmlToWordInput()
    } else if (keyCode >= 97 && keyCode <= 122) {
        // Alphabet lower case
        console.log(key)
        mapCharToRowArray(key)
        mapHtmlToWordInput()
    }
    if(key === "Backspace") {
        const currentRow = rowsArray[currentGameState.getAttempt()]
        const wordRowContainer = <HTMLElement> document.getElementById(`wordrow${currentGameState.getAttempt() + 1}`)
        const childDivs = wordRowContainer.getElementsByTagName('div')
        const lastChild = childDivs[currentRow.length - 1]
        if(lastChild) {
            lastChild.innerHTML = ''
            currentRow.pop()
        } 
    }
    if(key === "Enter") {
        const currentAttempt = currentGameState.getAttempt() 
        const currentRow = rowsArray[currentGameState.getAttempt()]
        if(currentAttempt < 5 && currentRow.length === 5) {
            validateSubmission()
            currentGameState.incrementAttempt()
        } else if(currentAttempt === 5) {
            currentGameState.gameEnd()
        } else {
            currentGameState.setError("Must enter a five letter word before continuing towards your next guess")
        }
    }
})

export { }