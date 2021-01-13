/* --> Constants <-- */
// General constants
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
export function getInputDirection() {
    if(lastInputDirection != inputDirection) {
        lastInputDirection = inputDirection
    } else {
        inputDirection = null
    }
    
    return inputDirection
}