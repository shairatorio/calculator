const click = document.querySelector('audio[data-key="click"]');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const negativeButton = document.querySelector('[data-negative]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

let currentNumber = '';
let previousNumber = '';
let currentOperator = '';
let previousOperator = '';
let result = '';

function audio(sound) {
    sound.play();
}

function add(x,y) {
  return x + y;
}

function subtract(x,y) {
  return x - y;
}

function multiply(x,y) {
  return x * y;
}

function divide(x,y) {
  return x / y;
}

function decimal() {

}

function displayCurrentOutput(number) {
  currentOperandTextElement.append(number);
}

function displayPreviousOutput(number,operator) {
  previousOperandTextElement.append(number,operator);
}

function clearElement(element) {
  element.innerHTML = '';
}

function remove(){
  let num = currentOperandTextElement.textContent.slice(0, -1);
  currentOperandTextElement.textContent = num;
  currentNumber = num;
}

function clear() {
  currentNumber = '';
  previousNumber = '';
  currentOperator = '';
  previousOperator = '';
  currentOperandTextElement.textContent = 0;
  previousOperandTextElement.innerHTML = '';
}

function equals(operator) {
  previousOperandTextElement.append(`${currentNumber}`);
  switch(operator) {
    case '+':
      result = add(parseInt(previousNumber),(parseInt(currentNumber)));
    break;

    case '-':
      result = subtract(parseInt(previousNumber),(parseInt(currentNumber)));
    break;

    case '×':
      result = multiply(parseInt(previousNumber),(parseInt(currentNumber)));
    break;

    case '÷':
      result = divide(parseInt(previousNumber),(parseInt(currentNumber)));
    break;
  }

  currentOperandTextElement.textContent = result;
  currentNumber = '';
  boolEquals = true;

  console.log(`func equals: ${currentOperator} ~ ${previousOperator}`);
}

function pressedOperator(operator) {
  if (previousOperator == '+' || previousOperator == '-' || 
      previousOperator == '×' || previousOperator == '÷') {
    console.log(`---------------`)
    console.log(`result: ${result} ~ currentNumber: ${currentNumber} ~ previousNumber: ${previousNumber}`);
    console.log(`---------------`)
    clearElement(previousOperandTextElement);
    displayPreviousOutput(result,operator);
    previousNumber = result;
    console.log(`func pressedOperator(have operator): ${currentOperator} ~ ${previousOperator}`);
    console.log(`---------------`)
    console.log(`result: ${result} ~ currentNumber: ${currentNumber} ~ previousNumber: ${previousNumber}`);
    console.log(`---------------`)
  } else {
    console.log(`---------------`)
    console.log(`result: ${result} ~ currentNumber: ${currentNumber} ~ previousNumber: ${previousNumber}`);
    console.log(`---------------`)
    displayPreviousOutput(currentNumber,operator);
    previousNumber = currentNumber;
    currentNumber = '';
    console.log(`func pressedOperator(no operator): ${currentOperator} ~ ${previousOperator}`);
    console.log(`---------------`)
    console.log(`result: ${result} ~ currentNumber: ${currentNumber} ~ previousNumber: ${previousNumber}`);
    console.log(`---------------`)
    // displayPreviousOutput(currentNumber,operator);
    // previousNumber = currentNumber;
    // currentNumber = '';
    // console.log(`func pressedOperator(no operator): ${currentOperator} ~ ${previousOperator}`);
  }
  currentOperator = operator; 
  console.log(`func pressedOperator(final operator result): ${currentOperator} ~ ${previousOperator}`);
}

function pressedNumber(number){
  if(currentOperandTextElement.textContent == 0 && previousOperandTextElement.textContent == '') {
    clearElement(currentOperandTextElement);
  }

  displayCurrentOutput(number);
  currentNumber += number;

  if(currentOperator != null && currentOperator != '') {
    clearElement(currentOperandTextElement);
    displayCurrentOutput(number);
    previousOperator = currentOperator;
    currentOperator = '';
  }

  console.log(`func pressedNumber: ${currentOperator} ~ ${previousOperator}`);
}

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, e => {
    if(e.target.matches(selector)) callback(e)
  })
}

addGlobalEventListener("click", ".number", e => {  
  pressedNumber(e.target.textContent);
});

addGlobalEventListener("click", ".operator", e => {  
  pressedOperator(e.target.value);
});

addGlobalEventListener("click", ".clear", () => {  
  clear();
});

addGlobalEventListener("click", ".delete", () => {  
  remove();
});

addGlobalEventListener("click", "[data-equals]", () => {  
  equals(previousOperator);
});

addGlobalEventListener("click", "button", () => audio(click));
addGlobalEventListener("click", "i", () => audio(click));

window.onload = () => {
  currentOperandTextElement.textContent = 0;
};