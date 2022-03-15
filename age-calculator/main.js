// selecting necessary dom elements

const main = document.querySelector('.main');

const form = main.querySelector("#form");
const day = form.querySelector("#date");
const month = form.querySelector("#month");
const year = form.querySelector("#year");
const validData = main.querySelector('.alert-msg');
const submitBtn = main.querySelector('input[type="submit"]');
const ageResult = main.nextElementSibling.firstElementChild;

// getting current date object here

const date = new Date();

// current date destructring

let cDay = date.getDate();
let cMonth = date.getMonth() + 1;
let cYear = date.getFullYear();

// array of months day

const mon = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// checkValidity functions here

const checkValidity = () => {
  let bDay = Number(day.value);
  let bMonth = Number(month.value);
  let bYear = Number(year.value);

  let textNum = "Please input Number Value .";
  let textHigh = "Please input valid date Value .";
  let textLow = "Date have no negative value .";

  if (isNaN(bDay) || isNaN(bMonth) || isNaN(bYear)) {
    timerVD(textNum);
  }
  else if(bDay > mon[bMonth-1] || bMonth > 12){
    timerVD(textHigh);
  }
  else if(bDay < 1 || bMonth < 1){
    timerVD(textLow);
  }  
  else {
    calculateAge(bDay, bMonth, bYear);
  }
};

// calculateAge function here

const calculateAge = (bDay, bMonth, bYear) => {

  let d, m, y;

  if(bDay > cDay){
    cDay = cDay + mon[cMonth - 1];
    cMonth = cMonth - 1;
  }
  if(bMonth > cMonth){
    cMonth = cMonth + 12;
    cYear = cYear - 1;
  }

  d = cDay - bDay;
  m = cMonth - bMonth;
  y = cYear - bYear;

  finalOutput(d, m, y);

}

// final output checking function

const finalOutput = (d, m, y) =>{

  let age = `Your age is ${y} years ${m} months and ${d} days .`;
  let textNegative = "this person has not yet been born ."

  if(y < 0){
    timerAge(textNegative);
  }else{
    timerAge(age);
  }

}

// setTmie out function here

const timerVD = (data) =>{
  validData.innerHTML = data;
  setTimeout(()=>{
    validData.innerHTML = '';
  }, 4000);
}

const timerAge = (data) => {
  ageResult.innerHTML = data;
  setTimeout(()=>{
    ageResult.innerHTML = '';
  }, 8000);
}

// form submit event

form.addEventListener("submit", (eve) => {
  eve.preventDefault();

  checkValidity();
});

// function for syle controling

const addScaling = () =>{
  submitBtn.classList.add('scaling');
}

const removeScaling = () =>{
  submitBtn.classList.remove('scaling');
}

// event listener for style controling

submitBtn.addEventListener('mousedown', addScaling);
submitBtn.addEventListener('mouseup', removeScaling);

// ending project with happy mind