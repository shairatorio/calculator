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

function checkMsg() {
  (currentLabel.textContent === errorMsg || currentLabel.textContent === maxLimitMsg) ? clear() : null;
}

function deleteNumber() {
  checkMsg();
  currentLabel.textContent = currentLabel.textContent.toString().slice(0, -1);
  currentLabel.textContent === '' ? clear() : null;
}

function appendNumber(number) {
  checkMsg();
  reset();
  (currentLabel.textContent === '0' || boolCurrentLabel) ? clearCurrentLabel() : null;
  if (currentLabel.textContent.length >= maxLength) return;
  currentLabel.textContent += number;
  boolEqualsPressed = false;
}

function appendDecimalPoint() {
  checkMsg();
  reset();
  boolCurrentLabel ? clearCurrentLabel() : null;
  currentLabel.textContent === '' ? currentLabel.textContent = '0' : null;
  if (currentLabel.textContent.includes('.')) return;
  currentLabel.textContent += '.';
  boolEqualsPressed = false;
}

function setOperator(operator){
  checkMsg();
  currentOperator !== null ? validateAndCalculate() : null;
  firstOperand = currentLabel.textContent;
  currentOperator = operator;
  previousLabel.textContent = `${firstOperand} ${currentOperator}`;
  boolCurrentLabel = true;
  boolEqualsPressed = false;
}

// clear() is not working inside checkInvalidInputDivision() and checkMaxLength()
function checkInvalidInputDivision() {
  if (currentOperator === '÷' && currentLabel.textContent === '0') {
    clear();
    currentLabel.textContent = errorMsg;
    return;
  }
}

function checkMaxLength() {
  if (currentLabel.textContent.length >= maxLength) {
    clear();
    currentLabel.textContent = maxLimitMsg;
    checkMaxLength.clear = clear;
    return;
  } 
}

function validateAndCalculate() {
  if (currentOperator === null || boolCurrentLabel) return;
  // checkInvalidInputDivision();
  if (currentOperator === '÷' && currentLabel.textContent === '0') {
    clear();
    currentLabel.textContent = errorMsg;
    return;
  }
  secondOperand = currentLabel.textContent;
  currentLabel.textContent = roundToTwoDecimalPlaces(operate(firstOperand, currentOperator, secondOperand));
  // checkMaxLength();
  if (currentLabel.textContent.length >= maxLength) {
    clear();
    currentLabel.textContent = maxLimitMsg;
    checkMaxLength.clear = clear;
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

function subtract(x,y) {
  return x - y
}

function multiply(x,y) {
  return x * y
}

function divide(x,y) {
  return x / y;
}

function operate(x,operator,y) {
  x = Number(x);
  y = Number(y);
  switch (operator) {
    case '+':
      return add(x,y);
    case '-':
      return subtract(x,y);
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

addGlobalEventListener('click', '[data-number]', e => appendNumber(e.target.textContent));
addGlobalEventListener('click', '[data-operator]', e => setOperator(e.target.value));
addGlobalEventListener('click', '[data-clear]', () => clear());
addGlobalEventListener('click', '[data-delete]', () => deleteNumber());
addGlobalEventListener('click', '[data-decimal-point]', () => appendDecimalPoint());
addGlobalEventListener('click', '[data-equals]', () => validateAndCalculate());
addGlobalEventListener('click', 'button', () => audio(click));
addGlobalEventListener('click', 'i', () => audio(click));

// Keyboard
const operatorsObj = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷'
};

addGlobalEventListener('keydown', 'body', e => {
  (e.key === 'Escape' || e.key === 'Delete') ? (clear(), audio(click)) : null;
  (e.key === 'Backspace') ? (deleteNumber(), audio(click)) : null;
  (e.key === 'Enter' || e.key === '=') ? (validateAndCalculate(), audio(click)) : null;
  (e.key === '.') ? (appendDecimalPoint(), audio(click)) : null;
  (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') ? (setOperator(operatorsObj[e.key]), audio(click)) : null;
  (e.key >= 0 && e.key <= 9) ? (appendNumber(e.key), audio(click)) : null;
});