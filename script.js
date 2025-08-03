const choices = document.querySelectorAll('.choice');
const resultDisplay = document.getElementById('result');
const playerChoiceDisplay = document.querySelector('.player-choice');
const computerChoiceDisplay = document.querySelector('.computer-choice');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const secondPlayerLabel = document.getElementById('second-player-label');
const turnIndicator = document.getElementById('turn-indicator');

let mode = ""; // "pvc" or "pvp"
let playerScore = 0;
let computerScore = 0;
const options = ["rock", "paper", "scissors"];
const emojis = { rock: "✊", paper: "✋", scissors: "✌" };

// Mode selection
document.getElementById('pvc').onclick = () => startGame('pvc');
document.getElementById('pvp').onclick = () => startGame('pvp');

function startGame(selectedMode) {
  mode = selectedMode;
  document.querySelector('.mode-select').style.display = "none";
  document.getElementById('choice-section').style.display = "block";
  document.querySelector('.result-container').style.display = "block";
  document.querySelector('.score-board').style.display = "block";

  if (mode === 'pvc') {
    secondPlayerLabel.innerHTML = "💻 Computer Score: <span id='computer-score'>0</span>";
  } else {
    secondPlayerLabel.innerHTML = "👤 Player 2 Score: <span id='computer-score'>0</span>";
  }
}

let pvpTurn = 1;
let p1Choice = null;

choices.forEach(choice => {
  choice.addEventListener('click', () => {
    if (mode === "pvc") {
      playPVC(choice.dataset.choice);
    } else {
      playPVP(choice.dataset.choice);
    }
  });
});

function playPVC(playerChoice) {
  const computerChoice = options[Math.floor(Math.random() * 3)];
  showResult(playerChoice, computerChoice);
}

function playPVP(choice) {
  if (pvpTurn === 1) {
    p1Choice = choice;
    pvpTurn = 2;
    turnIndicator.textContent = "Player 2, make your move!";
  } else {
    showResult(p1Choice, choice);
    pvpTurn = 1;
    turnIndicator.textContent = "Player 1, make your move!";
  }
}

function showResult(playerChoice, opponentChoice) {
  playerChoiceDisplay.textContent = `${mode === 'pvp' ? "Player 1" : "You"}: ${emojis[playerChoice]}`;
  computerChoiceDisplay.textContent = `${mode === 'pvp' ? "Player 2" : "Computer"}: ${emojis[opponentChoice]}`;

  let result = "";
  if (playerChoice === opponentChoice) {
    result = "It's a Tie!";
    resultDisplay.style.color = "#ffeb3b";
  } else if (
    (playerChoice === "rock" && opponentChoice === "scissors") ||
    (playerChoice === "paper" && opponentChoice === "rock") ||
    (playerChoice === "scissors" && opponentChoice === "paper")
  ) {
    result = "Player 1 Wins!";
    resultDisplay.style.color = "#4caf50";
    playerScore++;
  } else {
    result = mode === 'pvp' ? "Player 2 Wins!" : "Computer Wins!";
    resultDisplay.style.color = "#f44336";
    computerScore++;
  }

  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
  resultDisplay.textContent = result;

  resultDisplay.style.transform = "scale(1.2)";
  setTimeout(() => (resultDisplay.style.transform = "scale(1)"), 200);
}
