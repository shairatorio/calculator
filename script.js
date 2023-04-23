const click = document.querySelector('audio[data-key="click"]');
const previousLabel = document.querySelector('[data-previous-label]');
const currentLabel = document.querySelector('[data-current-label]');

let firstOperand = '';
let secondOperand = '';
let currentOperator  = null;
let boolCurrentLabel = false;
let boolEqualsPressed = false;
let errorMsg = 'Cannot divide by zero';
let maxLength = 10;
let maxLimitMsg = 'Number is too large';

function audio(sound) {
  sound.play();
}

function clearCurrentLabel() {
  currentLabel.textContent = '';
  boolCurrentLabel = false;
}

function clear() {
  currentLabel.textContent = '0';
  previousLabel.textContent = '';
  firstOperand = '';
  secondOperand = '';
  currentOperator = null;
}

function reset() {
  boolEqualsPressed ? clear() : null;
}

function checkErrorMsg() {
  currentLabel.textContent === errorMsg ? clear() : null;
}

function deleteNumber() {
  checkErrorMsg();
  currentLabel.textContent = currentLabel.textContent.toString().slice(0, -1);
  currentLabel.textContent === '' ? clear() : null;
}

function appendNumber(number) {
  checkErrorMsg();
  reset();
  (currentLabel.textContent === '0' || boolCurrentLabel) ? clearCurrentLabel() : null;
  if (currentLabel.textContent.length >= maxLength) return;
  currentLabel.textContent += number;
  boolEqualsPressed = false;
}

function appendDecimalPoint() {
  checkErrorMsg();
  reset();
  boolCurrentLabel ? clearCurrentLabel() : null;
  currentLabel.textContent === '' ? currentLabel.textContent = '0' : null;
  if (currentLabel.textContent.includes('.')) return;
  currentLabel.textContent += '.';
  boolEqualsPressed = false;
}

function setOperator(operator){
  checkErrorMsg();
  currentOperator !== null ? evaluate() : null;
  firstOperand = currentLabel.textContent;
  currentOperator = operator;
  previousLabel.textContent = `${firstOperand} ${currentOperator}`;
  boolCurrentLabel = true;
  boolEqualsPressed = false;
}

function evaluate() {
  if (currentOperator === null || boolCurrentLabel) return;
  if (currentOperator === '÷' && currentLabel.textContent === '0') {
    clear();
    currentLabel.textContent = errorMsg;
    return;
  }
  secondOperand = currentLabel.textContent;
  currentLabel.textContent = roundToTwoDecimalPlaces(compute(firstOperand, currentOperator, secondOperand));
  if (currentLabel.textContent.length >= maxLength) {
    clear();
    currentLabel.textContent = maxLimitMsg;
    return;
  } 
  previousLabel.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;
  currentOperator = null;
  boolEqualsPressed = true;
}

function roundToTwoDecimalPlaces(number) {
  return Math.round(number * 100) / 100;
}

function add(x,y) {
  return x + y
}

function substract(x,y) {
  return x - y
}

function multiply(x,y) {
  return x * y
}

function divide(x,y) {
  return x / y;
}

function compute(x,operator,y) {
  x = Number(x);
  y = Number(y);
  switch (operator) {
    case '+':
      return add(x,y);
    case '-':
      return substract(x,y);
    case '×':
      return multiply(x,y);
    case '÷':
      return divide(x,y);
    default:
      return null;
  }
}

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, e => e.target.matches(selector) ? callback(e) : null);
}

addGlobalEventListener("click", "[data-number]", e => appendNumber(e.target.textContent));
addGlobalEventListener("click", "[data-operator]", e => setOperator(e.target.value));
addGlobalEventListener("click", "[data-clear]", () => clear());
addGlobalEventListener("click", "[data-delete]", () => deleteNumber());
addGlobalEventListener("click","[data-decimal-point]", () => appendDecimalPoint());
addGlobalEventListener("click", "[data-equals]", () => evaluate());
addGlobalEventListener("click", "button", () => audio(click));
addGlobalEventListener("click", "i", () => audio(click));

// Keyboard
const operatorsObj = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷'
};

addGlobalEventListener('keydown', 'body', e => {
  console.log(e.key);
  (e.key === 'Escape' || e.key === 'Delete') ? (clear(), audio(click)) : null;
  e.key === 'Backspace' ? (deleteNumber(), audio(click)) : null;
  (e.key === 'Enter' || e.key === '=') ? (evaluate(), audio(click)) : null;
  (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') ? 
  (setOperator(operatorsObj[e.key]), audio(click)): null;
  (e.key >= 0 && e.key <= 9) ? (appendNumber(e.key),audio(click)) : null;
});