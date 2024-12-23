let playerScore = 0;
let enemyScore = 0;
let playerChoice = "";
let enemyChoice = "";
let playerLocked = false;
const defaultBackground = "url('../access/ready2.webp')";

const playerBackgrounds = {
  rock: "url('../access/oyuncu2.jpg')",
  paper: "url('../access/oyuncu1.jpg')",
  scissors: "url('../access/oyuncu3.jpg')",
};

const enemyBackgrounds = {
  rock: "url('../access/dusman2.jpg')",
  paper: "url('../access/dusman1.jpg')",
  scissors: "url('../access/dusman3.jpg')",
};

function playerMove(choice) {
  if (playerLocked) return;

  playerChoice = choice;
  document.getElementById("player-choice").innerText =
    choice === "rock"
      ? "👹Ghouls"
      : choice === "paper"
      ? "🦸‍♂️ Quinx"
      : "💥Chaos";

  playerLocked = true;
  document.getElementById("enemy-choice").innerText = "Ready...";

  document.getElementById("player").style.backgroundImage = getBackgroundImage(
    playerChoice,
    "player"
  );

  setTimeout(enemyMove, 3000);

  setTimeout(() => {
    playerLocked = false;
  }, 6000);
}

function enemyMove() {
  const choices = ["rock", "paper", "scissors"];
  enemyChoice = choices[Math.floor(Math.random() * choices.length)];

  document.getElementById("enemy-choice").innerText =
    enemyChoice === "rock"
      ? "👹Ghouls"
      : enemyChoice === "paper"
      ? "🦸‍♂️ Quinx"
      : "💥Chaos";

  document.getElementById("enemy").style.backgroundImage = getBackgroundImage(
    enemyChoice,
    "enemy"
  );

  const winner = determineWinner(playerChoice, enemyChoice);
  document.getElementById("winner").innerText = winner;
  updateScores(winner);

  if (playerScore === 3 || enemyScore === 3) {
    endGame(playerScore > enemyScore ? "You Win!" : "You Dead!");
    return;
  }

  setTimeout(() => {
    resetBackgrounds();
    document.getElementById("winner").innerText = "-";
  }, 2000);

  setTimeout(() => {
    document.getElementById("player-choice").innerText = "Ready";
    document.getElementById("enemy-choice").innerText = "Ready";
  }, 3000);
}

function getBackgroundImage(choice, type) {
  if (type === "player") {
    return playerBackgrounds[choice] || defaultBackground;
  } else if (type === "enemy") {
    return enemyBackgrounds[choice] || defaultBackground;
  }
  return defaultBackground;
}

function resetBackgrounds() {
  document.getElementById("player").style.backgroundImage = defaultBackground;
  document.getElementById("enemy").style.backgroundImage = defaultBackground;
}

function determineWinner(playerChoice, enemyChoice) {
  if (playerChoice === enemyChoice) return "DraW !";

  const winConditions = {
    rock: "scissors",
    scissors: "paper",
    paper: "rock",
  };

  return winConditions[playerChoice] === enemyChoice ? "You win!" : "You Lose!";
}

function updateScores(winner) {
  if (winner === "You win!") {
    playerScore++;
    document.getElementById("player-score").innerText = playerScore;
  } else if (winner === "You Lose!") {
    enemyScore++;
    document.getElementById("enemy-score").innerText = enemyScore;
  }
}

function endGame(finalMessage) {
  document.getElementById("result-screen").style.display = "block";
  document.getElementById("final-message").innerText = finalMessage;
}

function resetGame() {
  playerScore = 0;
  enemyScore = 0;
  roundCount = 0;
  document.getElementById("player-score").innerText = playerScore;
  document.getElementById("enemy-score").innerText = enemyScore;
  document.getElementById("round-count").innerText = roundCount + "/3";
  document.getElementById("player-choice").innerText = "Ready";
  document.getElementById("enemy-choice").innerText = "Ready";
  document.getElementById("winner").innerText = "-";
  document.getElementById("reset-btn").style.display = "none";
  document.getElementById("result-screen").style.display = "none";

  resetBackgrounds();
}

function redirect() {
  window.location.href = "../index.html";
}
