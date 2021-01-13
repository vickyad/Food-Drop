/* --> Imports <-- */
import {foodAte} from './dino.js'


/* --> Constants <-- */
// Board
const GRID_SIZE = 18

// Food
let foodList = [getRandomFoodPosition()]

// Score
export let score = 0
export let lives = 3


/* --> Functions <-- */
// updateFood(): moves the food and if the food was ate the score is updated
export function updateFood() {
    foodList.forEach((food) => {
        if(foodAte(food)) {
            score += 1
            removeFood()
        }
        
        if(food.y >= GRID_SIZE) {
            loseLife()
            removeFood()
        }

        food.y ++
    })
}

// renderFood(gameBoard): render the food on the board
//  input: gameBoard -> html element : div where the game renders
export function renderFood(gameBoard) {
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

// newFood(): generate a new food and add to the food array
export function newFood() {
    foodList.push(getRandomFoodPosition())
}


// loseLife(): subtract one life
export function loseLife() {
    lives --
}

// renderLives(gameBoard): render the dino's lives
//  input: gameBoard -> html element : div where the game renders 
export function renderLives(gameBoard) {
    for(let i = 0; i < lives; i++) {
        const lifeIMG = document.createElement('IMG')

        // Set all attributes
        lifeIMG.setAttribute('src', './assets/heart.png')
        lifeIMG.style.gridRowStart = 1
        lifeIMG.style.gridColumnStart = GRID_SIZE - (i + 1)
        lifeIMG.classList.add('lives')

        // Append the segment to the board
        gameBoard.appendChild(lifeIMG)
    }
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

// getRandomImage(): get a random image of food of a selection
//  output: string : directory of the image selected
function getRandomImage() {
    let number = Math.floor(Math.random() * 10 + 1)

    return `./assets/food_${number}.png`
}

// removeFood(): remove the first food of the array
function removeFood() {
    foodList.shift()
}