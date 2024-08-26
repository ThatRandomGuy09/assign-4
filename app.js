setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  { name: "paper", beats: "rock" },
  { name: "scissors", beats: "paper" },
  { name: "rock", beats: "scissors" },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");
const nextBtn = document.querySelector(".next-btn");

const userScoreElement = document.getElementById("user-score");
const computerScoreElement = document.getElementById("computer-score");

let userScore = parseInt(localStorage.getItem("userScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

updateScores();

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aiChoice = aiChoose();
  displayResults([choice, aiChoice]);
  displayWinner([choice, aiChoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "you win";
      resultDivs[0].classList.toggle("winner");
      userScore++;
    } else if (aiWins) {
      resultText.innerText = "you lose";
      resultDivs[1].classList.toggle("winner");
      computerScore++;
    } else {
      resultText.innerText = "draw";
    }

    updateScores();
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
    checkForGameEnd();
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function updateScores() {
  localStorage.setItem("userScore", userScore);
  localStorage.setItem("computerScore", computerScore);
  userScoreElement.innerText = userScore;
  computerScoreElement.innerText = computerScore;
}

function checkForGameEnd() {
  if (userScore >= 15 || computerScore >= 15) {
    nextBtn.classList.remove("hidden");
  }
}

playAgainBtn.addEventListener("click", () => {
  if (userScore >= 15 || computerScore >= 15) {
    userScore = 0;
    computerScore = 0;
    nextBtn.classList.add("hidden");
  }

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
  updateScores();
});

btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

window.addEventListener("beforeunload", () => {
  if (userScore >= 15 || computerScore >= 15) {
    localStorage.removeItem("userScore");
    localStorage.removeItem("computerScore");
  }
});
