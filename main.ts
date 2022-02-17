const keyBoard = document.getElementById('keyboard')

const row1: Array<String> = [];
const row2: Array<String> = [];
const row3: Array<String> = [];
const row4: Array<String> = [];
const row5: Array<String> = [];
const row6: Array<String> = [];

const rowsArray: Array<Array<String>> = [row1, row2, row3, row4, row5, row6]

const mapCharToRowArray = (char: string, arrayIndex: number) => {
    rowsArray[arrayIndex].push(char)
    console.log(rowsArray[arrayIndex])
}

keyBoard?.addEventListener("click", (e) => {
    const element = <HTMLElement> e.target
    const key = element.innerHTML
    console.log(key)
    const currentGameIndex = 0
    mapCharToRowArray(key, currentGameIndex)
})

export { }