const click = document.querySelector('audio[data-key="click"]');
const previousLabel = document.querySelector('[data-previous-label]');
const currentLabel = document.querySelector('[data-current-label]');

let firstOperand = '';
let secondOperand = '';
let currentOperation  = null;
let shouldResetScreen = false;

addGlobalEventListener("click", "[data-number]", e => appendNumber(e.target.textContent));
addGlobalEventListener("click", "[data-operator]", e => setOperation(e.target.value));
addGlobalEventListener("click", "[data-clear]", () => clear());
addGlobalEventListener("click", "[data-delete]", () => deleteNumber());
addGlobalEventListener("click","[data-decimal-point]", () => appendDecimalPoint());
addGlobalEventListener("click", "[data-equals]", () => evaluate());
addGlobalEventListener("click", "button", () => audio(click));
addGlobalEventListener("click", "i", () => audio(click));

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, e => e.target.matches(selector) ? callback(e) : null);
}

function audio(sound) {
  sound.play()
}

function resetScreen() {
  currentLabel.textContent = '';
  shouldResetScreen = false;
}

function clear() {
  currentLabel.textContent = '0';
  previousLabel.textContent = '';
  firstOperand = '';
  secondOperand = '';
  currentOperation = null;
}

function deleteNumber() {
  currentLabel.textContent = currentLabel.textContent.toString().slice(0, -1);
}

function appendNumber(number) {
  (currentLabel.textContent === '0' || shouldResetScreen) ? resetScreen() : null;
  currentLabel.textContent += number;
}

function appendDecimalPoint() {
  shouldResetScreen === true ? resetScreen() : null;
  currentLabel.textContent === '' ? currentLabel.textContent = '0' : null;
  if (currentLabel.textContent.includes('.')) return
  currentLabel.textContent += '.';
}

function setOperation(operator){
  currentOperation !== null ? evaluate() : null;
  firstOperand = currentLabel.textContent;
  currentOperation = operator;
  previousLabel.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return
  if (currentOperation === '÷' && currentLabel.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  secondOperand = currentLabel.textContent
  currentLabel.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand))
  previousLabel.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function add(x, y) {
  return x + y
}

function substract(x, y) {
  return x - y
}

function multiply(x, y) {
  return x * y
}

function divide(x, y) {
  return x / y
}

function operate(operator, x, y) {
  x = Number(x)
  y = Number(y)
  switch (operator) {
    case '+':
      return add(x, y)
    case '-':
      return substract(x, y)
    case '×':
      return multiply(x, y)
    case '÷':
      if (y === 0) return null
      else return divide(x, y)
    default:
      return null
  }
}