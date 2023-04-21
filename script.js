const click = document.querySelector('audio[data-key="click"]');
const previousLabel = document.querySelector('[data-previous-label]');
const currentLabel = document.querySelector('[data-current-label]');

let firstOperand = '';
let secondOperand = '';
let currentOperator  = null;
let boolCurrentLabel = false;
let boolEqualsPressed = false;

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

function deleteNumber() {
  currentLabel.textContent = currentLabel.textContent.toString().slice(0, -1);
  currentLabel.textContent === '' ? clear() : null;
}

function appendNumber(number) {
  reset();
  (currentLabel.textContent === '0' || boolCurrentLabel) ? clearCurrentLabel() : null;
  currentLabel.textContent += number;
  boolEqualsPressed = false;
}

function appendDecimalPoint() {
  reset();
  boolCurrentLabel ? clearCurrentLabel() : null;
  currentLabel.textContent === '' ? currentLabel.textContent = '0' : null;
  if (currentLabel.textContent.includes('.')) return
  currentLabel.textContent += '.';
  boolEqualsPressed = false;
}

function setOperation(operator){
  currentOperator !== null ? evaluate() : null;
  firstOperand = currentLabel.textContent;
  currentOperator = operator;
  previousLabel.textContent = `${firstOperand} ${currentOperator}`;
  boolCurrentLabel = true;
  boolEqualsPressed = false;
}

function evaluate() {
  if (currentOperator === null || boolCurrentLabel) return
  if (currentOperator === '÷' && currentLabel.textContent === '0') {
    // ---------------- //
    // will fix cannot divide by zero
    clear();
    currentLabel.textContent = 'Cannot divide by zero';
    boolCurrentLabel = true;
    return;
    // ---------------- //
  }
  secondOperand = currentLabel.textContent
  currentLabel.textContent = roundResult(compute(firstOperand, currentOperator, secondOperand))
  previousLabel.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`
  currentOperator = null;
  boolEqualsPressed = true;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
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
addGlobalEventListener("click", "[data-operator]", e => setOperation(e.target.value));
addGlobalEventListener("click", "[data-clear]", () => clear());
addGlobalEventListener("click", "[data-delete]", () => deleteNumber());
addGlobalEventListener("click","[data-decimal-point]", () => appendDecimalPoint());
addGlobalEventListener("click", "[data-equals]", () => evaluate());
addGlobalEventListener("click", "button", () => audio(click));
addGlobalEventListener("click", "i", () => audio(click));