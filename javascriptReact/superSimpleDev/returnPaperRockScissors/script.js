let computerMove = '';
function pickComputerMove{
    const randomNumber = Math.random();
    let computerMove = '';

    // Determine the computer's move
    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    // Compare moves and show the result
    let computerMove = '';

    if (computerMove === 'rock') {
        result = 'Tie.';
    } else if (computerMove === 'paper') {
        result = 'You lose!';
    } else if (computerMove === 'scissors') {
        result = 'You win.';
    }
}


