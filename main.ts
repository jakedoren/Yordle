const keyBoard = document.getElementById('keyboard')
const errorDiv = <HTMLElement> document.getElementById('error')

const row1: Array<String> = [];
const row2: Array<String> = [];
const row3: Array<String> = [];
const row4: Array<String> = [];
const row5: Array<String> = [];
const row6: Array<String> = [];

const rowsArray: Array<Array<String>> = [row1, row2, row3, row4, row5, row6]

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

    incrementAttempt() {
        this.attempt += 1
    }

    resetError() {
        this.error = undefined
        errorDiv.innerHTML = ''
    }

    setError(error: string) {
        this.error = error
        errorDiv.innerHTML = error
        setInterval(() => {
            this.resetError()
        }, 5000)
    }

    gameEnd() {
        console.log("Game over")
    }

}

const submitAttemptBtn = <HTMLElement> document.getElementById('enter')
const currentGameState = new gameState(0)

const mapCharToRowArray = (char: string, arrayIndex: number) => {
    const currentRow = rowsArray[currentGameState.getAttempt()]
    if(currentRow.length < 5) {
        currentRow.push(char)
        console.log(rowsArray[arrayIndex])
    } else {
        currentGameState.setError("The word must not be longer than 5 characters")
    }
}

const mapHtmlToWordInput = () => {
    const wordRowContainer = <HTMLElement> document.getElementById(`wordrow${currentGameState.getAttempt() + 1}`)
    const childDivs = wordRowContainer.getElementsByTagName('div')
    const currentRow = rowsArray[currentGameState.getAttempt()]
    console.log(currentRow)
    const child = childDivs[currentRow.length - 1]
    child.innerHTML = currentRow[currentRow.length - 1].valueOf()
}

submitAttemptBtn?.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(rowsArray)
    const currentAttempt = currentGameState.getAttempt() 
    currentAttempt < 6 ? currentGameState.incrementAttempt() : currentGameState.gameEnd()
    console.log(currentGameState.getAttempt())
})

const keyElements = keyBoard?.getElementsByTagName('span')
if(keyElements && keyElements?.length) {
    for(let i = 0; i < keyElements?.length; i++) {
        const key = keyElements[i]
        key.addEventListener("click", (e) => {
            const element = <HTMLElement> e.target
            const key = element.innerHTML
            console.log(key)
            const currentGameIndex = 0
            mapCharToRowArray(key, currentGameIndex)
            mapHtmlToWordInput()
        })
    }
}

export { }