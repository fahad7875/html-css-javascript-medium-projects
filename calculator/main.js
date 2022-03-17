// selecting all necessary dom element

const main = document.querySelector('main');
const display = main.querySelector('#result');
const clearResult = main.querySelector('.clear-result');
const calculate = main.querySelector('.calculate');
const deleteValue = main.querySelector('.delete');
const style = main.querySelectorAll('.btn');
// const parcent = main.querySelector('.parcent');

// global variable declaration 

let existingNumber, currentNumber;

// all functions here 

const addValue = (val) =>{
  existingNumber = display.value;
  
  currentNumber = (display.value = existingNumber + val);
}

// clearData function here

const clearData = () => {
  display.value = '';
}

// calculateData function here

const calculateData = () => {
  try{
    display.value = eval(currentNumber);
  }catch(err){
    display.value = "Undefined"
  }
}

// delValue function

const delValue = () => {

  if(currentNumber != ''){
    currentNumber = currentNumber.slice(0, -1);
    display.value = currentNumber;
  }

}

// event listener 

clearResult.addEventListener('click', clearData);

calculate.addEventListener('click', calculateData);

deleteValue.addEventListener('click', delValue);

style.forEach((x)=>{
  x.addEventListener('mousedown', ()=>{
  x.classList.add('scaling');
  });
  x.addEventListener('mouseup', ()=>{
    x.classList.remove('scaling');
    });
});