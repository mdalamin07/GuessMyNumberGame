// Define constants
const MIN_NUMBER = 1;
const MAX_NUMBER = 100;

// Get HTML elements
const nameLabel = document.getElementById('name-label');
const nameInput = document.getElementById('name-input');
const startButton = document.getElementById('start-button');
const gameContainer = document.getElementById('game-container');
const playerName = document.getElementById('player-name');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const result = document.getElementById('result');
const playAgainButton = document.getElementById('play-again-button');

// Function to generate a random number
function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to start a new game
function startNewGame() {
	// Get player name
	const name = nameInput.value;
    nameInput.style.textTransform  = 'capitalize';
	// Hide start button and name input and label, show game container
	startButton.style.display = 'none';
	nameInput.style.display = 'none';
	nameLabel.style.display = 'none';
	gameContainer.style.display = 'flex';
	// Display player name
	playerName.textContent = name;
	// Generate a new secret number
	const secretNumber = generateRandomNumber(MIN_NUMBER, MAX_NUMBER);
	// Initialize variables
	let numTries = 0;
	let guess;
	// Listen for guess button clicks
	guessButton.addEventListener('click', function() {
		// Get the player's guess
		guess = Number(guessInput.value);
		// Check if the guess is valid
		if (guess < MIN_NUMBER || guess > MAX_NUMBER || isNaN(guess)) {
			result.textContent = 'Please enter a valid number between 1 and 100.';
			return;
		}
		// Increase number of tries
		numTries++;
		// Check if the guess is correct
		if (guess === secretNumber) {
			result.textContent = `Congratulations 🎉 ${name}! You guessed the number in ${numTries} tries.`;
			// Disable guess button and enable play again button
			guessButton.disabled = true;
			playAgainButton.disabled = false;
		} else if (guess < secretNumber) {
			result.textContent = 'Your guess was too low. Try again!';
		} else {
			result.textContent = 'Your guess was too high. Try again!';
		}
	});
	// Listen for play again button clicks
	playAgainButton.addEventListener('click', function() {
		// Reset game
		numTries = 0;
		guessInput.value = '';
		result.textContent = '';
		guessButton.disabled = false;
		playAgainButton.disabled = false;
        
    });
}
// Listen for start button clicks
startButton.addEventListener('click', startNewGame);