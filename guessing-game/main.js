// some necessary variable here
let attempts = 0;
let totalAttempts = 5;
let won = 0;
let lost = 0;

// selecting all necessary dom element
const showAction = document.querySelector(".showAction");
const form = document.querySelector("form");
const inputData = form.querySelector(".takeGuess");
const submitBtn = form.querySelector(".submitBtn");
const resultSection = document.querySelector(".result-section");
const guessResult = resultSection.querySelector(".guessResult");
const remainingAttempts = resultSection.querySelector(".remainingAttempts");
const winLost = resultSection.querySelector(".won-lost");
const percentage = resultSection.querySelector(".percentage");
const playAgain = resultSection.querySelector(".playAgain");

// takeGuessNumber function
const takeGuessNumber = () => {
  let guessNumber = Number(inputData.value);
  let status = isNaN(guessNumber);

  if (status === true) {
    showActions("Please Enter a Number Value");
  } else if (guessNumber <= 0 || guessNumber > 5) {
    showActions("Please Enter a Number Between 1 to 5");
  } else {
    matchingRandomNumber(guessNumber);
  }
};

// generating random number
const generateRandomNumber = (limit) => {
  return Math.floor(Math.random() * limit + 1);
};

// matchingRandomNumber function
const matchingRandomNumber = (guessNumber) => {
  let status;
  attempts++;
  let randomNumber = generateRandomNumber(5);

  if (guessNumber === randomNumber) {
    won++;
    status = true;
  } else {
    lost++;
    status = false;
  }
  showResultInfo(randomNumber, status);
};

// someWork function
const someWork = () => {
  percentage.innerHTML = `Win rate : ${(won * 100) / totalAttempts} %`;
  playAgain.classList.add("playAgainActive");
  submitBtn.classList.add("submitBtnDisable");
  inputData.disabled = true;
  inputData.value = "";
};

// showResultInfo function
const showResultInfo = (randomNumber, status) => {
  let txt;
  resultSection.classList.add("result-sectionActive");
  status
    ? (txt = "You have won .")
    : (txt = `You have lost. Random number was : ${randomNumber}`);
  guessResult.innerHTML = txt;
  remainingAttempts.innerHTML = `Remaining Attempts: ${
    totalAttempts - attempts
  }`;
  winLost.innerHTML = `Won : ${won},  Lost : ${lost}`;
  inputData.value = "";

  if (attempts === 5) {
    someWork();
  }
};

// showActions function here
const showActions = (text) => {
  showAction.innerHTML = text;
  showAction.classList.add("showActionActive");
  inputData.value = "";

  setTimeout(() => {
    showAction.classList.remove("showActionActive");
  }, 2000);
};

// form event listener
form.addEventListener("submit", (event) => {
  event.preventDefault();
  takeGuessNumber();
});

// adding event listener with pllayAgain btn
playAgain.addEventListener("click", () => {
  location.reload();
});
