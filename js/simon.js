var colorArr = ['green', 'red', 'yellow', 'blue'];
var playerTurn = false;
var simonArr = [];
var playerArr = [];
var randomColor = 0;
var playerGuess = '';
var idx = 0;
var count = 0;
var gamePower = true;
var startSequence = ['green', 'red', 'blue', 'green', 'yellow', 'red', 'blue', 'green', 'yellow', 'red', 'green', 'red', 'green', 'yellow', 'blue', 'red', 'green', 'blue', 'red', 'yellow', 'green', 'red', 'blue', 'yellow'];

// Making variables for all audio that is needed.
var greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var soundsArr = [greenSound, redSound, yellowSound, blueSound];
// Wrong sound isn't correct, but good enough for demo.
var wrongSound = new Audio('https://www.freesound.org/data/previews/142/142608_1840739-lq.mp3');

function startItUp(sequence) {
	// First setTimeout is delay between pressing start and starting intro sequence.
	setTimeout(function() {
		for (var i = 0; i < sequence.length; i++) {
			(function(order) {
				// Second setTimeout is for delay between computer moves.
				setTimeout(function() {
					$('.' + sequence[order]).addClass(sequence[order] + '-glow');
					// Third setTimeout is for delay between removing glow effect.
					setTimeout(function() {
						$('.' + sequence[order]).removeClass(sequence[order] + '-glow')
					}, 200);
				}, order * 250);
			})(i);
		}
	}, 100);
	// Fourth setTimeout is for delay before starting game waiting for initial sequence to end.
	setTimeout(function() {
		nextColor();
		lightAndSound();
	}, 7100);
}

// Getting a color and pushing it to an array of computer moves.
function nextColor() {
	randomColor = colorArr[Math.floor(Math.random() * 4)];
	simonArr.push(randomColor);
	console.log(simonArr);
	return simonArr;
}

// Adding a glow effect and adding sound to computer moves.
function lightAndSound() {
	// First setTimeout is delay between player move ending and computer move starting.
	setTimeout(function() {
		speed(simonArr);
	}, 1000);
	playerTurn = true;
}

function speed(simon) {
	if (count < 5) {
		console.log('First!');
		for (var i = 0; i < simon.length; i++) {
			(function(order) {
				// Second setTimeout is for delay between computer moves.
				setTimeout(function() {
					soundIdx = colorArr.indexOf(simon[order]);
					soundsArr[soundIdx].play();
					$('.' + simon[order]).addClass(simon[order] + '-glow');
					// Third setTimeout is for delay between removing glow effect.
					setTimeout(function() {
						$('.' + simon[order]).removeClass(simon[order] + '-glow')
					}, 700);
				}, order * 750);
			})(i);
		}
	} else if (count < 13) {
		console.log('Second!');
		for (var i = 0; i < simon.length; i++) {
			(function(order) {
				setTimeout(function() {
					soundIdx = colorArr.indexOf(simon[order]);
					soundsArr[soundIdx].play();
					$('.' + simon[order]).addClass(simon[order] + '-glow');
					setTimeout(function() {
						$('.' + simon[order]).removeClass(simon[order] + '-glow')
					}, 600);
				}, order * 650);
			})(i);
		}
	} else {
		console.log('Third!');
		for (var i = 0; i < simon.length; i++) {
			(function(order) {
				setTimeout(function() {
					soundIdx = colorArr.indexOf(simon[order]);
					soundsArr[soundIdx].play();
					$('.' + simon[order]).addClass(simon[order] + '-glow');
					setTimeout(function() {
						$('.' + simon[order]).removeClass(simon[order] + '-glow')
					}, 500);
				}, order * 550);
			})(i);
		}
	}
}

// Adding to the current score.
function score() {
	count++;
	if (count < 10) {
		$('.count').html('0' + count);
	} else {
		$('.count').html(count);
	}
}

$(document).ready(function() {
	$('.game-container').on('click', '.gameboard', function(e) {
		e.stopPropagation();
		if (playerTurn === true) {
			playerGuess = $(this)[0].id;
			playerArr.push(playerGuess);
			console.log(playerArr);

			soundIdx = colorArr.indexOf(playerGuess);
			//soundsArr[soundIdx].play();

			if (simonArr[idx] === playerArr[idx]) {
				soundsArr[soundIdx].play();
				if (idx === simonArr.length - 1) {
					score();
					playerTurn = false;
					playerArr = [];
					idx = 0;
					nextColor();
					lightAndSound(simonArr);
				} else {
					idx++;
				}
			} else {
				wrongSound.play()
				playerTurn = false;
				simonArr = [];
				playerArr = [];
				idx = 0;
				count = 0;
				$('.count').html('--');
			}
		}
	});

	// Turns the game on and off.
	$('.power').on("click", function() {
		if (gamePower === true) {
			gamePower = false;
			$('.count').html('--');
			startItUp(startSequence);
		} else {
			gamePower = true;
			$('.count').html('');
			playerTurn = false;
			simonArr = [];
			playerArr = [];
			idx = 0;
			count = 0;
		}
	});

});