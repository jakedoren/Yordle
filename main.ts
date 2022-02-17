const keyBoard = <HTMLElement> document.getElementById('keyboard')
const errorDiv = <HTMLElement> document.getElementById('error')

const row1: string[] = [];
const row2: string[] = [];
const row3: string[] = [];
const row4: string[] = [];
const row5: string[] = [];
const row6: string[] = [];

const rowsArray: Array<Array<string>> = [row1, row2, row3, row4, row5, row6]

class gameState {
    private attempt: number
    private error: string | undefined

    constructor(attempt: number, error?: string) {
        this.attempt = attempt
        this.error = error
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
const currentGameState = new gameState(0)

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
        const keyElement = keyElements[i]
        keyElement.addEventListener("click", (e) => {
            const element = <HTMLElement> e.target
            const key = element.innerHTML
            mapCharToRowArray(key)
            mapHtmlToWordInput()
        })
    }
}

export { }