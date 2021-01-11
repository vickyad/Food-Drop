/* --> Imports <-- */
// import { renderSnake, outsideGrid, snakeOverItself, updateSnake } from './snake.js'
// import { updateFood, renderFood, score } from './food.js'


/* --> Constants <-- */
// HTML Elements
const gameBoard = document.getElementById('game-board')
const scoreBoard = document.getElementById('score-board')
// const restartDialog = document.getElementById('restart-dialog')
// const cancelButton = document.getElementById('cancel')
// const confirmButton = document.getElementById('confirm')

// General attirbutes
let lastRender = 0
let gameOver = false
let lastFoodGeneration = 0
// Dino
const SPEED = 5
let lives = 3


/* --> Initializing the game <-- */
// restartDialog.close()
window.requestAnimationFrame(main)


/* --> Functions <-- */
// main(currentTime): main function of the game; organizes and set everything needded
//  input: currentTime -> number : actual time
function main(currentTime) {
    // Verify if is a game over scenario
    if(gameOver) {
        /*
        // Check if the user would like to restart the game
        // restartDialog.showModal()
        confirmButton.addEventListener('click', () => {
            window.location = '/'
        })
        cancelButton.addEventListener('click', () => {
            restartDialog.close()
        })
        */
        console.log('perdeu, otario')
        return
    } else {
        window.requestAnimationFrame(main)

        const secondsPassed = (currentTime - lastRender) / 1000     // dividir por 1000 dá o resultado em segundos
        const foodTimeVerification = (currentTime - lastFoodGeneration) / 1000

        // Verify if the time passed reach the interval
        if(secondsPassed < (1 / SPEED)) {
            return
        } else if( foodTimeVerification > 12 * (1 / SPEED)) {
            lastFoodGeneration = currentTime
            newFood()
        }
        lastRender = currentTime

        // Update and render the game
        update()
        render()
    }
}

// update(): update the food and the snake if necessary
function update() {
    updateDino()
    updateFood()
    checkDeath()
}

// render(): render the snake, the food and the current score
function render() {
    scoreBoard.innerHTML = `<p>${score}</p>`
    gameBoard.innerHTML = ''
    renderDino(gameBoard)
    renderFood(gameBoard)

}

// checkDeath(): verify if some condition of game over was reached
function checkDeath() {
    gameOver = lives === 0
}

function loseLife() {
    lives --
}

/*
=====================================================
                    dino.js
=====================================================
*/
/* --> Constants <-- */
// Board
const GRID_SIZE = 18

// Dino
dinoXPosition = 10


/* --> Functions <-- */
// updateDino(): update the dino position at each time interval
function updateDino() {
    // Get the movement direction (changed by the user)
    const inputDirection = getInputDirection()

    if(inputDirection){
        dinoXPosition += inputDirection.x
    }
}

// renderDino(gameBoard): render the dino on the board
//  input: gameBoard -> html element : div where the game renders
function renderDino(gameBoard) {
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
function foodAte(position) {
    return ((dinoXPosition === position.x) || dinoXPosition + 1 === position.x) && (position.y === (GRID_SIZE - 2) || position.y === (GRID_SIZE - 1) || position.y === GRID_SIZE)
}

/*
=====================================================
                    food.js
=====================================================
*/
/* --> Constants <-- */
// Board
// const GRID_SIZE = 18

// Food
let foodList = [getRandomFoodPosition()]

// Score
let score = 0


/* --> Functions <-- */
// updateFood(): moves the food and if the food was ate the score is updated
function updateFood() {
    foodList.forEach((food) => {
        if(foodAte(food)) {
            score += 1
            removeFood()
        }
        
        if(food.y > GRID_SIZE) {
            loseLife()
            removeFood()
        }

        food.y ++
    })
}

// renderFood(gameBoard): render the food on the board
//  input: gameBoard -> html element : div where the game renders
function renderFood(gameBoard) {
    // Render each segment
    foodList.forEach((food) => {
        const foodDiv = document.createElement('IMG')

        // Set all attributes
        foodDiv.setAttribute("src", food.image)
        foodDiv.style.gridRowStart = food.y
        foodDiv.style.gridColumnStart = food.x
        foodDiv.classList.add('food')

        // Append the segment to the board
        gameBoard.appendChild(foodDiv)
    })
}

// getRandomFoodPosition(): get a random x position for the food
//  output: newFooPosition -> { x , y } : the position of the new food
function getRandomFoodPosition() {
    let newFoodPosition

    while(newFoodPosition == null){
        newFoodPosition = {
            x: Math.floor(Math.random() * GRID_SIZE) + 1, y: 1, image: getRandomImage()
        }
    }

    return newFoodPosition
}

function getRandomImage() {
    let number = Math.floor(Math.random() * 10 + 1)

    return `./assets/food_${number}.png`
}

function newFood() {
    foodList.push(getRandomFoodPosition())
}

function removeFood() {
    foodList.shift()
}
/*
=====================================================
                    input.js
=====================================================
*/
/* --> Constants <-- */
let inputDirection = {x: 0, d:'N'}
let lastInputDirection = {x: 0, d:'N'}

let xDown = null;                                                        


/* --> Event Listeners <-- */
// Activated when an user touches the screen
document.addEventListener('touchstart', evt => {
    const firstTouch = evt.touches[0]

    xDown = firstTouch.clientX                                                                 
} , false)

// Activated when an user moves the finger along the screen
document.addEventListener('touchmove', evt => {
    if ( ! xDown ) {
        return
    }

    let xUp = evt.touches[0].clientX                                  

    // Left swipe
    if ((xDown - xUp) > 0) {
        inputDirection = {x: -1, d:'L'}
    // Right swipe
    } else {
        inputDirection = {x: 1, d:'R'}
    }                                                                   

    // Reset values
    xDown = null;                                          
}, false)

// Activated when an user uses the keys of the keyboard
window.addEventListener('keydown', e => {
    switch(e.key) {
        case 'ArrowLeft':
            inputDirection = {x: -1, d:'L'}
            break
        case 'ArrowRight':
            inputDirection = {x: 1, d:'R'}
            break
    }
})

/* --> Functions <-- */
// getInputDirection(): gets the head direction based on the user moves
//  output: inputDirection -> {x , y , direction } : direction of the movement
function getInputDirection() {
    if(lastInputDirection != inputDirection) {
        lastInputDirection = inputDirection
    } else {
        inputDirection = null
    }
    
    return inputDirection
}