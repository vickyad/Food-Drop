/* --> Imports <-- */
import { getInputDirection } from './input.js'


/* --> Constants <-- */
// Board
const GRID_SIZE = 18

// Dino
let dinoXPosition = 10


/* --> Functions <-- */
// updateDino(): update the dino position at each time interval
export function updateDino() {
    // Get the movement direction (changed by the user)
    const inputDirection = getInputDirection()

    if(inputDirection){
        if((inputDirection.d === 'L' && dinoXPosition > 0) || (inputDirection.d === 'R' && dinoXPosition < GRID_SIZE - 2))
        dinoXPosition += inputDirection.x
    }
}

// renderDino(gameBoard): render the dino on the board
//  input: gameBoard -> html element : div where the game renders
export function renderDino(gameBoard) {
    const dinoDiv = document.createElement('IMG')

    // Set all attributes
    dinoDiv.setAttribute("src", './assets/dino.png')
    dinoDiv.style.gridRowStart = GRID_SIZE - 2
    dinoDiv.style.gridColumnStart = dinoXPosition
    dinoDiv.classList.add('dino')

    // Append the segment to the board
    gameBoard.appendChild(dinoDiv)
}

// foodAte(position): verify if the food was ate
//  input: position -> { x , y } : the position of the current food
//  output: boolean :
//      true -> food was ate
//      false -> food is still there
export function foodAte(position) {
    return ((dinoXPosition === position.x) || dinoXPosition + 1 === position.x) && (position.y === (GRID_SIZE - 2) || position.y === (GRID_SIZE - 1) || position.y === GRID_SIZE)
}