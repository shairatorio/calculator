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

function percent(x,y) {
  return x % y;
}

function clear() {
  currentNumber = '';
  previousNumber = '';
  currentOperator = '';
  previousOperator = '';
  currentOperandTextElement.innerHTML = '';
  previousOperandTextElement.innerHTML = '';
}

function equals() {

}

function decimal() {

}

function negative() {

}

function displayCurrentOutput(num) {
  currentOperandTextElement.append(num);
}

function displayPreviousOutput(num,op) {
  previousOperandTextElement.append(num,op);
}

function clearElement(element) {
  element.innerHTML = '';
}

function pressedOperator(operator) {

  if (previousOperator === '+' || previousOperator === '-') {
    clearElement(previousOperandTextElement);
    displayPreviousOutput(result,operator);

    previousNumber = result;

    console.log(`have data ${currentOperator} / ${previousOperator}`);
  } else {
    displayPreviousOutput(currentNumber,operator);

    previousNumber = currentNumber;
    currentNumber = '';

    console.log(`no data ${currentOperator} / ${previousOperator}`);
  }
  currentOperator = operator; 

  // switch(operator) {
  //   case '+': 
  //     if (previousOperator === '+') {
  //       clearElement(previousOperandTextElement);
  //       displayPreviousOutput(result,operator);

  //       previousNumber = result;
  //       currentOperator = operator;

  //       console.log(`have data ${currentOperator} ${previousOperator}`)
  //     } else {
  //       displayPreviousOutput(currentNumber,operator);

  //       previousNumber = currentNumber;
  //       currentNumber = '';
  //       console.log(`no data ${currentOperator} ${previousOperator}`)
  //     }
  //     currentOperator = operator; 
  //   break;    
  // }
}

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, e => {
    if(e.target.matches(selector)) callback(e)
  })
}

addGlobalEventListener("click", ".number", e => {  
  displayCurrentOutput(e.target.textContent);
  currentNumber += e.target.textContent;
  console.log(`addGlobalEventListenerRR .number ${currentOperator} / ${previousOperator}`);

  if(currentOperator !== null && currentOperator !== '') {
    clearElement(currentOperandTextElement);
    displayCurrentOutput(e.target.textContent);
    currentOperator = '';
    console.log(`operator has value ${currentOperator} / ${previousOperator}`);
 }
});

addGlobalEventListener("click", ".operator", e => {  
  pressedOperator(e.target.value);
});

addGlobalEventListener("click", ".clear", () => {  
  clear();
});

addGlobalEventListener("click", "[data-equals]", () => {  
  console.log(`EQUALS: ${currentOperator}`);

  previousOperandTextElement.append(`${currentNumber}`);
  result = add(parseInt(previousNumber),(parseInt(currentNumber)));
  currentOperandTextElement.textContent = result;
  currentNumber = '';
  previousOperator = '+';
  console.log(`[data-equals] ${currentOperator} / ${previousOperator}`);
  
  // switch(currentOperator) {
  //   case '+':
  //     previousOperandTextElement.append(`${currentNumber}`);
  //     result = add(parseInt(previousNumber),(parseInt(currentNumber)));
  //     currentOperandTextElement.textContent = result;
  //     currentNumber = '';
  //     previousOperator = '+';
  //     console.log(`[data-equals] ${currentOperator} / ${previousOperator}`);
  //   break;
  // }

  // previousOperandTextElement.append(`${currentNumber}`);
  // result = add(parseInt(previousNumber),(parseInt(currentNumber)));
  // currentOperandTextElement.textContent = result;
  // currentNumber = '';
  // previousOperator = '+';
  // console.log(`[data-equals] ${currentOperator} / ${previousOperator}`)

});

addGlobalEventListener("click", "button", () => audio(click));
addGlobalEventListener("click", "i", () => audio(click));

window.onload = () => {
  // currentOperandTextElement.textContent = 0;
};